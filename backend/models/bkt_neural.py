"""
Supercharging BKT: Neural Bayesian Knowledge Tracing in PyTorch

Requires ``pip install torch`` (not installed by default). Used for offline /
research training; the live API uses ``neural_bkt`` or ``bkt_tabular`` instead.

Implements the framework described in:
  Khajah, M. (2024). Supercharging Bayesian Knowledge Tracing.
  Journal of Educational Data Mining, 16(2).
  https://files.eric.ed.gov/fulltext/EJ1430505.pdf

Key insight: BKT's forward (alpha) algorithm is mathematically equivalent to
a recurrent neural network cell, enabling GPU-accelerated training via
backpropagation through time (BPTT). The paper further extends BKT with IRT
item parameters and automatic skill discovery via Gumbel-Softmax.

Designed for MethodsMarket — a Vue 3 + PocketBase platform teaching
undergraduate psychology students statistics. Constraints:
  - Single-semester usage: 5–15 attempts per KC
  - Cold start is permanent (no warm-up data)
  - Item parameters accumulate across cohorts
"""

from __future__ import annotations

import logging
import math
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, Dataset, random_split

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

EPSILON = 1e-8  # Numerical stability guard
LOG_EPSILON = math.log(EPSILON)


# ---------------------------------------------------------------------------
# 1. BKTRNNCell — BKT forward algorithm as an RNN cell
# ---------------------------------------------------------------------------

class BKTRNNCell(nn.Module):
    """
    BKT forward algorithm implemented as a recurrent neural network cell.

    Per Khajah (2024, §3), the HMM forward pass for BKT maps directly onto
    an RNN cell where:
      - Hidden state  h ∈ R^2 is the joint probability over {unmastered, mastered}
      - Observation   y ∈ {0, 1} is student correctness
      - Parameters    pL0, pT, pF, pG, pS are the five canonical BKT params

    All five parameters are stored in *logit* space so optimisation is
    unconstrained (no clamping needed); sigmoid maps them to (0, 1).

    Reference: https://files.eric.ed.gov/fulltext/EJ1430505.pdf
    """

    def __init__(self, num_kcs: int) -> None:
        """
        Args:
            num_kcs: Number of knowledge components (skills).
        """
        super().__init__()
        self.num_kcs = num_kcs

        # --- BKT parameters in logit space (unconstrained) ---
        # Shape: [num_kcs] — one parameter vector per KC
        self.pL0_logit = nn.Parameter(torch.zeros(num_kcs))   # Initial mastery
        self.pT_logit  = nn.Parameter(torch.full((num_kcs,), -2.0))  # Learn (low default)
        self.pF_logit  = nn.Parameter(torch.full((num_kcs,), -4.0))  # Forget (very low default)
        self.pG_logit  = nn.Parameter(torch.full((num_kcs,), -1.5))  # Guess
        self.pS_logit  = nn.Parameter(torch.full((num_kcs,), -1.5))  # Slip

    # ------------------------------------------------------------------
    # Public helpers
    # ------------------------------------------------------------------

    def get_params(self, kc_ids: torch.Tensor) -> Tuple[
        torch.Tensor, torch.Tensor, torch.Tensor, torch.Tensor, torch.Tensor
    ]:
        """
        Return probability-space BKT params for the given KC indices.

        Args:
            kc_ids: LongTensor of shape [batch] — KC index per sample.

        Returns:
            pL0, pT, pF, pG, pS — each FloatTensor of shape [batch].
        """
        pL0 = torch.sigmoid(self.pL0_logit[kc_ids])
        pT  = torch.sigmoid(self.pT_logit[kc_ids])
        pF  = torch.sigmoid(self.pF_logit[kc_ids])
        pG  = torch.sigmoid(self.pG_logit[kc_ids])
        pS  = torch.sigmoid(self.pS_logit[kc_ids])
        return pL0, pT, pF, pG, pS

    def init_hidden(
        self,
        kc_ids: torch.Tensor,
        device: Optional[torch.device] = None,
    ) -> torch.Tensor:
        """
        Construct the initial hidden state from pL0.

        Args:
            kc_ids: LongTensor [batch].
            device: Target device.

        Returns:
            h0: FloatTensor [batch, 2] — (P(unmastered), P(mastered)).
        """
        pL0 = torch.sigmoid(self.pL0_logit[kc_ids])
        h0 = torch.stack([1.0 - pL0, pL0], dim=-1)
        return h0.to(device or pL0.device)

    # ------------------------------------------------------------------
    # Forward step
    # ------------------------------------------------------------------

    def forward(
        self,
        h_prev: torch.Tensor,
        observation: torch.Tensor,
        kc_ids: torch.Tensor,
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Single BKT time-step (one RNN cell step).

        Implements (Khajah 2024, eq. 3–5):
          h_t(j) = Σ_{s_{t-1}} P(s_t | s_{t-1}) · P(y_{t-1} | s_{t-1}) · h_{t-1}(s_{t-1})
        followed by normalisation.

        Args:
            h_prev:      FloatTensor [batch, 2] — previous (P_unmastered, P_mastered).
            observation: FloatTensor [batch]    — correctness at t-1 (0 or 1).
            kc_ids:      LongTensor  [batch]    — KC index per sample.

        Returns:
            h_new:     FloatTensor [batch, 2] — updated state distribution.
            p_correct: FloatTensor [batch]    — P(correct at step t).
        """
        _pL0, pT, pF, pG, pS = self.get_params(kc_ids)  # [batch] each

        # Emission probabilities
        # P(correct | mastered)     = 1 - pS
        # P(correct | not-mastered) = pG
        p_obs_given_mastered   = torch.where(observation.bool(), 1.0 - pS, pS)
        p_obs_given_unmastered = torch.where(observation.bool(), pG, 1.0 - pG)

        # h_prev columns: 0 = unmastered, 1 = mastered
        h_unmastered = h_prev[:, 0]  # [batch]
        h_mastered   = h_prev[:, 1]  # [batch]

        # Weighted by emission (Bayes numerator before transition)
        alpha_unmastered = p_obs_given_unmastered * h_unmastered
        alpha_mastered   = p_obs_given_mastered   * h_mastered

        # Transition: P(s_t | s_{t-1})
        #   mastered   <- mastered:   1 - pF
        #   mastered   <- unmastered: pT
        #   unmastered <- mastered:   pF
        #   unmastered <- unmastered: 1 - pT
        new_mastered   = (1.0 - pF) * alpha_mastered + pT * alpha_unmastered
        new_unmastered = pF         * alpha_mastered + (1.0 - pT) * alpha_unmastered

        # Normalise (prevents underflow accumulation)
        normaliser = new_mastered + new_unmastered + EPSILON
        new_mastered   = new_mastered   / normaliser
        new_unmastered = new_unmastered / normaliser

        h_new = torch.stack([new_unmastered, new_mastered], dim=-1)

        # Predictive probability for *current* step
        p_correct = (1.0 - pS) * h_new[:, 1] + pG * h_new[:, 0]

        return h_new, p_correct


# ---------------------------------------------------------------------------
# 2. BKTRNNCellIRT — BKT + IRT item/student parameters
# ---------------------------------------------------------------------------

class BKTRNNCellIRT(BKTRNNCell):
    """
    BKT-IRT extension of the RNN cell (Khajah 2024, §4).

    Adds learnable per-problem and per-student IRT parameters that modulate
    guess/slip (unidimensional) or all four BKT parameters (multidimensional).

    Unidimensional IRT:
        logit(pG) = γ_k + ω_p + θ_u
        logit(pS) = ψ_k + σ_p − θ_u

    Multidimensional IRT:
        logit(pL)  = ℓ_k  + θ^L_u
        logit(pF)  = φ_k  − θ^{¬F}_u
        logit(pG)  = γ_k  + ω_p + θ^G_u
        logit(pS)  = ψ_k  + σ_p − θ^{¬S}_u

    Reference: https://files.eric.ed.gov/fulltext/EJ1430505.pdf
    """

    def __init__(
        self,
        num_kcs: int,
        num_problems: int,
        num_students: int,
        multidimensional: bool = True,
    ) -> None:
        """
        Args:
            num_kcs:          Number of knowledge components.
            num_problems:     Vocabulary size of problem IDs.
            num_students:     Vocabulary size of student IDs.
            multidimensional: If True, use 4-dim student ability (Khajah 2024 §4.2).
        """
        super().__init__(num_kcs)
        self.num_problems = num_problems
        self.num_students = num_students
        self.multidimensional = multidimensional

        # Per-problem IRT parameters (logit space)
        self.omega = nn.Embedding(num_problems, 1)   # Difficulty shift on pG
        self.sigma = nn.Embedding(num_problems, 1)   # Difficulty shift on pS

        if multidimensional:
            # 4 student ability dims: [L, ¬F, G, ¬S]
            self.student_ability = nn.Embedding(num_students, 4)
        else:
            # Single latent trait θ
            self.student_ability = nn.Embedding(num_students, 1)

        nn.init.normal_(self.omega.weight, mean=0.0, std=0.1)
        nn.init.normal_(self.sigma.weight, mean=0.0, std=0.1)
        nn.init.normal_(self.student_ability.weight, mean=0.0, std=0.5)

    def forward(
        self,
        h_prev: torch.Tensor,
        observation: torch.Tensor,
        kc_ids: torch.Tensor,
        problem_ids: Optional[torch.Tensor] = None,
        student_ids: Optional[torch.Tensor] = None,
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Single IRT-augmented BKT step.

        Args:
            h_prev:      [batch, 2]
            observation: [batch]
            kc_ids:      [batch] LongTensor
            problem_ids: [batch] LongTensor — problem identifier.
            student_ids: [batch] LongTensor — student identifier.

        Returns:
            h_new:     [batch, 2]
            p_correct: [batch]
        """
        batch = h_prev.shape[0]
        device = h_prev.device

        # Base KC parameters (logit space)
        pT_logit  = self.pT_logit[kc_ids]
        pF_logit  = self.pF_logit[kc_ids]
        pG_logit  = self.pG_logit[kc_ids]
        pS_logit  = self.pS_logit[kc_ids]

        # IRT item parameters
        if problem_ids is not None:
            omega_p = self.omega(problem_ids).squeeze(-1)  # [batch]
            sigma_p = self.sigma(problem_ids).squeeze(-1)
        else:
            omega_p = torch.zeros(batch, device=device)
            sigma_p = torch.zeros(batch, device=device)

        # IRT student parameters
        if student_ids is not None:
            theta = self.student_ability(student_ids)  # [batch, D]
        else:
            D = 4 if self.multidimensional else 1
            theta = torch.zeros(batch, D, device=device)

        if self.multidimensional:
            theta_L  = theta[:, 0]   # Learning ability
            theta_nF = theta[:, 1]   # Anti-forgetting ability
            theta_G  = theta[:, 2]   # Guessing ability
            theta_nS = theta[:, 3]   # Anti-slipping ability

            pT_logit_irt = pT_logit + theta_L
            pF_logit_irt = pF_logit - theta_nF
            pG_logit_irt = pG_logit + omega_p + theta_G
            pS_logit_irt = pS_logit + sigma_p - theta_nS
        else:
            theta_u = theta[:, 0]

            pT_logit_irt = pT_logit
            pF_logit_irt = pF_logit
            pG_logit_irt = pG_logit + omega_p + theta_u
            pS_logit_irt = pS_logit + sigma_p - theta_u

        pT = torch.sigmoid(pT_logit_irt)
        pF = torch.sigmoid(pF_logit_irt)
        pG = torch.sigmoid(pG_logit_irt)
        pS = torch.sigmoid(pS_logit_irt)

        # Emission
        p_obs_given_mastered   = torch.where(observation.bool(), 1.0 - pS, pS)
        p_obs_given_unmastered = torch.where(observation.bool(), pG, 1.0 - pG)

        h_unmastered = h_prev[:, 0]
        h_mastered   = h_prev[:, 1]

        alpha_unmastered = p_obs_given_unmastered * h_unmastered
        alpha_mastered   = p_obs_given_mastered   * h_mastered

        new_mastered   = (1.0 - pF) * alpha_mastered + pT * alpha_unmastered
        new_unmastered = pF         * alpha_mastered + (1.0 - pT) * alpha_unmastered

        normaliser = new_mastered + new_unmastered + EPSILON
        new_mastered   = new_mastered   / normaliser
        new_unmastered = new_unmastered / normaliser

        h_new = torch.stack([new_unmastered, new_mastered], dim=-1)
        p_correct = (1.0 - pS) * h_new[:, 1] + pG * h_new[:, 0]

        return h_new, p_correct


# ---------------------------------------------------------------------------
# 3. PrototypeBayesianUpdater — online student ability estimation
# ---------------------------------------------------------------------------

class PrototypeBayesianUpdater:
    """
    Real-time student ability estimation via Bayesian prototype averaging.

    Maintains R prototype vectors across V discretization levels. After each
    observation the posterior over prototypes is updated via Bayes' rule:

        P(r | data) ∝ P(data | r) · P(r)

    Student ability is then the posterior-weighted average of prototype values.

    This approach (Khajah 2024, §5) is critical for MethodsMarket's cold-start
    constraint: it requires no warm-up data and works from the very first
    interaction, making personalisation possible within a single semester.

    Reference: https://files.eric.ed.gov/fulltext/EJ1430505.pdf
    """

    def __init__(
        self,
        num_prototypes: int = 20,
        num_discretization: int = 13,
        ability_range: Tuple[float, float] = (-3.0, 3.0),
    ) -> None:
        """
        Args:
            num_prototypes:      R — number of prototype profiles.
            num_discretization:  V — discretization levels per ability dimension.
            ability_range:       (min, max) of the ability grid.
        """
        self.R = num_prototypes
        self.V = num_discretization

        # Ability grid — evenly spaced over ability_range
        self.ability_grid = np.linspace(ability_range[0], ability_range[1], self.V)

        # Prototype table: shape [R, V] — each row is a prototype's distribution
        # over ability levels. Initialise as a mix of random Gaussians.
        rng = np.random.default_rng(42)
        raw = np.exp(-0.5 * (
            self.ability_grid[None, :] - rng.uniform(-2, 2, (num_prototypes, 1))
        ) ** 2)
        self.prototypes = raw / raw.sum(axis=1, keepdims=True)  # [R, V]

        # Uniform prior over prototypes
        self.prior = np.ones(num_prototypes) / num_prototypes

    # ------------------------------------------------------------------

    def reset(self) -> np.ndarray:
        """Return a fresh uniform posterior for a new student."""
        return self.prior.copy()

    def update(
        self,
        posterior: np.ndarray,
        p_correct_per_prototype: np.ndarray,
        observed_correct: bool,
    ) -> np.ndarray:
        """
        Update prototype posterior given one observation.

        Args:
            posterior:                Current [R] posterior over prototypes.
            p_correct_per_prototype:  [R] model P(correct) for each prototype.
            observed_correct:         Whether the student answered correctly.

        Returns:
            Updated [R] posterior (normalised).
        """
        if observed_correct:
            likelihood = p_correct_per_prototype
        else:
            likelihood = 1.0 - p_correct_per_prototype

        new_posterior = posterior * likelihood
        total = new_posterior.sum()
        if total < EPSILON:
            return self.prior.copy()  # Degenerate — reset to prior
        return new_posterior / total

    def estimate_ability(self, posterior: np.ndarray) -> float:
        """
        Posterior-weighted average ability estimate.

        Args:
            posterior: [R] current prototype posterior.

        Returns:
            Scalar ability estimate (weighted mean of prototype abilities).
        """
        # Each prototype's expected ability = dot(prototype[r], ability_grid)
        prototype_abilities = self.prototypes @ self.ability_grid  # [R]
        return float(np.dot(posterior, prototype_abilities))

    def estimate_ability_per_prototype(self) -> np.ndarray:
        """Return ability estimate for each prototype (shape [R])."""
        return self.prototypes @ self.ability_grid  # [R]


# ---------------------------------------------------------------------------
# 4. SkillDiscovery — automatic KC structure via Gumbel-Softmax
# ---------------------------------------------------------------------------

class SkillDiscovery(nn.Module):
    """
    Automatic skill discovery via Gumbel-Softmax (Khajah 2024, §6).

    Learns a soft Q-matrix mapping problems to latent KCs. During training,
    the Gumbel-Softmax relaxation produces differentiable soft assignments.
    At inference, argmax produces hard (discrete) KC assignments.

    Temperature annealing drives the distribution from uniform (τ=1.0) to
    near-discrete (τ=0.1), enabling the model to discover KC structure that
    may differ from instructor-provided labels.

    Reference: https://files.eric.ed.gov/fulltext/EJ1430505.pdf
    """

    def __init__(
        self,
        num_problems: int,
        num_kcs: int,
        tau_start: float = 1.0,
        tau_end: float = 0.1,
    ) -> None:
        """
        Args:
            num_problems: Total number of distinct problems.
            num_kcs:      Number of latent KCs to discover.
            tau_start:    Initial Gumbel-Softmax temperature.
            tau_end:      Final temperature after annealing.
        """
        super().__init__()
        self.num_problems = num_problems
        self.num_kcs = num_kcs
        self.tau_start = tau_start
        self.tau_end = tau_end
        self._tau = tau_start

        # Learnable assignment logits: [num_problems, num_kcs]
        self.q_logits = nn.Parameter(torch.randn(num_problems, num_kcs) * 0.1)

    @property
    def tau(self) -> float:
        return self._tau

    def set_tau(self, tau: float) -> None:
        """Manually set temperature (called by trainer during annealing)."""
        self._tau = max(tau, self.tau_end)

    def anneal(self, progress: float) -> None:
        """
        Anneal temperature according to training progress.

        Args:
            progress: Float in [0, 1] — fraction of training complete.
        """
        self._tau = self.tau_end + (self.tau_start - self.tau_end) * (1.0 - progress)

    def forward(self, hard: bool = False) -> torch.Tensor:
        """
        Compute Q-matrix assignments.

        Args:
            hard: If True, return hard (one-hot) assignments via straight-through.

        Returns:
            assignments: [num_problems, num_kcs] soft or hard assignment matrix.
        """
        if self.training and not hard:
            return F.gumbel_softmax(self.q_logits, tau=self._tau, hard=False)
        else:
            # Hard argmax for inference
            indices = self.q_logits.argmax(dim=-1)  # [num_problems]
            return F.one_hot(indices, self.num_kcs).float()

    def get_hard_assignments(self) -> torch.Tensor:
        """Return discrete problem→KC assignments as LongTensor [num_problems]."""
        return self.q_logits.argmax(dim=-1)


# ---------------------------------------------------------------------------
# 5. SuperchargingBKT — main model
# ---------------------------------------------------------------------------

class SuperchargingBKT(nn.Module):
    """
    Full Supercharging BKT model combining BKT-IRT, prototype-based
    student modelling, and optional automatic skill discovery.

    Implements the complete framework from Khajah (2024):
      https://files.eric.ed.gov/fulltext/EJ1430505.pdf

    Usage::

        model = SuperchargingBKT(num_kcs=10, num_problems=200,
                                  num_students=300)
        predictions, mastery = model(sequences, kc_ids, problem_ids, student_ids)
        loss = model.train_step(batch)
    """

    def __init__(
        self,
        num_kcs: int,
        num_problems: int,
        num_students: int,
        use_irt: bool = True,
        use_skill_discovery: bool = False,
        num_prototypes: int = 20,
        num_discretization: int = 13,
        multidimensional: bool = True,
    ) -> None:
        """
        Args:
            num_kcs:               Number of knowledge components.
            num_problems:          Problem vocabulary size.
            num_students:          Student vocabulary size.
            use_irt:               Enable IRT item/student parameters.
            use_skill_discovery:   Enable latent skill discovery.
            num_prototypes:        R for PrototypeBayesianUpdater.
            num_discretization:    V for PrototypeBayesianUpdater.
            multidimensional:      4-dim student ability (only used if use_irt).
        """
        super().__init__()
        self.num_kcs = num_kcs
        self.num_problems = num_problems
        self.num_students = num_students
        self.use_irt = use_irt
        self.use_skill_discovery = use_skill_discovery

        # Core BKT cell
        if use_irt:
            self.cell = BKTRNNCellIRT(
                num_kcs, num_problems, num_students, multidimensional
            )
        else:
            self.cell = BKTRNNCell(num_kcs)

        # Prototype-based online student ability estimation
        self.prototype_updater = PrototypeBayesianUpdater(
            num_prototypes, num_discretization
        )

        # Optional skill discovery
        if use_skill_discovery:
            self.skill_discovery = SkillDiscovery(num_problems, num_kcs)
        else:
            self.skill_discovery = None

        # Per-student posterior cache (populated at runtime, not a nn.Parameter)
        self._student_posteriors: Dict[int, np.ndarray] = {}

    # ------------------------------------------------------------------
    # Forward pass
    # ------------------------------------------------------------------

    def forward(
        self,
        sequences: torch.Tensor,
        kc_ids: torch.Tensor,
        problem_ids: Optional[torch.Tensor] = None,
        student_ids: Optional[torch.Tensor] = None,
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Run BKT-RNN over padded sequences.

        Args:
            sequences:   [batch, max_seq_len] — correctness values (0/1), -1 = pad.
            kc_ids:      [batch, max_seq_len] — KC index at each step.
            problem_ids: [batch, max_seq_len] — problem index at each step.
            student_ids: [batch] — one student ID per sequence.

        Returns:
            predictions: [batch, max_seq_len] — P(correct) at each step.
            mastery:     [batch, max_seq_len] — P(mastered) at each step.
        """
        batch_size, max_seq_len = sequences.shape
        device = sequences.device

        all_p_correct = []
        all_mastery   = []

        # Initialise hidden state from pL0 for the *first* KC in each sequence
        first_kc = kc_ids[:, 0]
        h = self.cell.init_hidden(first_kc, device)

        for t in range(max_seq_len):
            kc_t  = kc_ids[:, t]            # [batch]
            obs_t = sequences[:, t].float() # [batch]

            # For step t=0 we use the initialised h; for t>0 we use observation t-1
            if t == 0:
                obs_prev = torch.zeros(batch_size, device=device)
            else:
                obs_prev = sequences[:, t - 1].float()

            # Mask pad tokens (value -1)
            pad_mask = (sequences[:, t] == -1)

            # IRT-aware cell call
            if self.use_irt and isinstance(self.cell, BKTRNNCellIRT):
                p_ids = problem_ids[:, t] if problem_ids is not None else None
                s_ids = student_ids        if student_ids is not None else None
                h_new, p_correct = self.cell(h, obs_prev, kc_t, p_ids, s_ids)
            else:
                h_new, p_correct = self.cell(h, obs_prev, kc_t)

            # Freeze state for padded positions
            h = torch.where(pad_mask.unsqueeze(-1), h, h_new)
            p_correct = torch.where(pad_mask, torch.zeros_like(p_correct), p_correct)

            all_p_correct.append(p_correct)
            all_mastery.append(h[:, 1])

        predictions = torch.stack(all_p_correct, dim=1)  # [batch, T]
        mastery     = torch.stack(all_mastery,   dim=1)  # [batch, T]
        return predictions, mastery

    # ------------------------------------------------------------------
    # Training helpers
    # ------------------------------------------------------------------

    def train_step(self, batch: Dict[str, torch.Tensor]) -> torch.Tensor:
        """
        Compute binary cross-entropy loss on next-step prediction.

        Args:
            batch: Dict containing:
                'sequences'   — [B, T] correctness (0/1, -1=pad)
                'kc_ids'      — [B, T]
                'problem_ids' — [B, T] (optional)
                'student_ids' — [B] (optional)

        Returns:
            Scalar loss tensor (BCELoss, mean reduction).
        """
        sequences   = batch['sequences']
        kc_ids      = batch['kc_ids']
        problem_ids = batch.get('problem_ids')
        student_ids = batch.get('student_ids')

        predictions, _ = self.forward(sequences, kc_ids, problem_ids, student_ids)

        # Next-step prediction: predict y_t from steps 0..t-1
        # predictions[:, t] = P(correct at t) from state after t-1
        # Target: sequences[:, t]
        valid_mask = sequences != -1                # [B, T]
        targets    = sequences.float().clamp(0, 1)  # [B, T]

        loss = F.binary_cross_entropy(
            predictions[valid_mask],
            targets[valid_mask],
        )
        return loss

    # ------------------------------------------------------------------
    # Inference helpers
    # ------------------------------------------------------------------

    def predict_mastery(
        self,
        student_id: int,
        kc_ids: List[int],
        history: Optional[List[Dict]] = None,
    ) -> Dict[str, Dict[str, float]]:
        """
        Predict mastery and BKT params for a student over requested KCs.

        Args:
            student_id: Integer student ID.
            kc_ids:     List of KC indices to report.
            history:    List of past interactions, each a Dict with keys
                        'kc_id', 'correct', 'problem_id'.

        Returns:
            Dict keyed by KC index with sub-dicts: {pL, pT, pG, pS, pF, pL0}.
        """
        self.eval()
        device = next(self.parameters()).device

        result: Dict[str, Dict[str, float]] = {}
        for kc in kc_ids:
            kc_t = torch.tensor([kc], device=device)
            h = self.cell.init_hidden(kc_t, device)

            if history:
                kc_hist = [x for x in history if x['kc_id'] == kc]
                for step in kc_hist:
                    obs  = torch.tensor([float(step['correct'])], device=device)
                    p_id = (
                        torch.tensor([step['problem_id']], device=device)
                        if 'problem_id' in step else None
                    )
                    s_id = torch.tensor([student_id], device=device)

                    with torch.no_grad():
                        if self.use_irt and isinstance(self.cell, BKTRNNCellIRT):
                            h, _ = self.cell(h, obs, kc_t, p_id, s_id)
                        else:
                            h, _ = self.cell(h, obs, kc_t)

            pL0, pT, pF, pG, pS = self.cell.get_params(kc_t)
            result[str(kc)] = {
                'pL':  float(h[0, 1]),
                'pL0': float(pL0[0]),
                'pT':  float(pT[0]),
                'pF':  float(pF[0]),
                'pG':  float(pG[0]),
                'pS':  float(pS[0]),
            }
        return result

    def get_interpretable_params(
        self, kc_names: Optional[List[str]] = None
    ) -> Dict[str, Dict[str, float]]:
        """
        Return human-readable BKT parameters for all KCs.

        Args:
            kc_names: Optional list mapping KC index → name.

        Returns:
            Dict keyed by KC name (or 'KC_{i}') with BKT probability values.
        """
        result = {}
        all_ids = torch.arange(self.num_kcs)
        with torch.no_grad():
            pL0, pT, pF, pG, pS = self.cell.get_params(all_ids)

        for i in range(self.num_kcs):
            name = kc_names[i] if kc_names and i < len(kc_names) else f'KC_{i}'
            result[name] = {
                'pL0': float(pL0[i]),
                'pT':  float(pT[i]),
                'pF':  float(pF[i]),
                'pG':  float(pG[i]),
                'pS':  float(pS[i]),
            }
        return result


# ---------------------------------------------------------------------------
# 6. Interaction Dataset
# ---------------------------------------------------------------------------

class InteractionDataset(Dataset):
    """
    PyTorch Dataset wrapping padded interaction sequences.

    Each sample is one student's full interaction history, padded to
    `max_seq_len` with -1 sentinels.
    """

    def __init__(self, data: List[Dict[str, torch.Tensor]]) -> None:
        self.data = data

    def __len__(self) -> int:
        return len(self.data)

    def __getitem__(self, idx: int) -> Dict[str, torch.Tensor]:
        return self.data[idx]


# ---------------------------------------------------------------------------
# 7. Helper functions
# ---------------------------------------------------------------------------

def prepare_sequences(
    raw_interactions: List[Dict],
    pad_value: int = -1,
) -> List[Dict[str, torch.Tensor]]:
    """
    Convert raw interaction records into padded per-student tensors.

    Args:
        raw_interactions: List of interaction dicts, each containing:
            'student_id' (int), 'kc_id' (int), 'correct' (0/1),
            optionally 'problem_id' (int).
        pad_value: Sentinel for padding (-1 by default).

    Returns:
        List of per-student dicts with keys:
            'sequences'   — LongTensor [1, T]
            'kc_ids'      — LongTensor [1, T]
            'problem_ids' — LongTensor [1, T] (if available)
            'student_ids' — LongTensor [1]
    """
    # Group by student
    from collections import defaultdict
    student_records: Dict[int, List[Dict]] = defaultdict(list)
    for rec in raw_interactions:
        student_records[int(rec['student_id'])].append(rec)

    samples = []
    for student_id, records in student_records.items():
        # Sort chronologically if a timestamp key exists
        if records and 'timestamp' in records[0]:
            records = sorted(records, key=lambda r: r['timestamp'])

        T = len(records)
        sequences   = torch.tensor([r['correct']    for r in records], dtype=torch.long)
        kc_ids      = torch.tensor([r['kc_id']      for r in records], dtype=torch.long)
        has_problem = 'problem_id' in records[0]
        if has_problem:
            problem_ids = torch.tensor([r['problem_id'] for r in records], dtype=torch.long)

        sample: Dict[str, torch.Tensor] = {
            'sequences':   sequences.unsqueeze(0),
            'kc_ids':      kc_ids.unsqueeze(0),
            'student_ids': torch.tensor([student_id], dtype=torch.long),
        }
        if has_problem:
            sample['problem_ids'] = problem_ids.unsqueeze(0)
        samples.append(sample)

    return samples


def collate_fn(
    batch: List[Dict[str, torch.Tensor]],
    pad_value: int = -1,
) -> Dict[str, torch.Tensor]:
    """
    Collate per-student samples into a padded batch.

    Sequences of different lengths are right-padded to the longest in the
    batch using `pad_value`.

    Args:
        batch:     List of sample dicts from InteractionDataset.
        pad_value: Integer pad sentinel.

    Returns:
        Batched dict with tensors of shape [B, T_max] (or [B] for student_ids).
    """
    max_len = max(s['sequences'].shape[-1] for s in batch)

    def pad_seq(t: torch.Tensor, length: int) -> torch.Tensor:
        """Pad a [1, T] tensor to [1, length]."""
        current = t.shape[-1]
        if current < length:
            padding = torch.full((1, length - current), pad_value, dtype=t.dtype)
            return torch.cat([t, padding], dim=-1)
        return t

    sequences   = torch.cat([pad_seq(s['sequences'],   max_len) for s in batch], dim=0)
    kc_ids      = torch.cat([pad_seq(s['kc_ids'],      max_len) for s in batch], dim=0)
    student_ids = torch.cat([s['student_ids']                   for s in batch], dim=0)

    out: Dict[str, torch.Tensor] = {
        'sequences':   sequences,
        'kc_ids':      kc_ids,
        'student_ids': student_ids,
    }

    if 'problem_ids' in batch[0]:
        problem_ids = torch.cat([pad_seq(s['problem_ids'], max_len) for s in batch], dim=0)
        out['problem_ids'] = problem_ids

    return out


# ---------------------------------------------------------------------------
# 8. BKTTrainer
# ---------------------------------------------------------------------------

class BKTTrainer:
    """
    Training loop for SuperchargingBKT with early stopping and evaluation.

    Uses the Adam optimiser with a decoupled weight-decay as recommended by
    Khajah (2024): https://files.eric.ed.gov/fulltext/EJ1430505.pdf

    Supports:
      - Validation split with early stopping
      - Temperature annealing for SkillDiscovery
      - Checkpoint save / load
      - Evaluation metrics: AUC, accuracy, RMSE
    """

    def __init__(
        self,
        model: SuperchargingBKT,
        lr: float = 0.01,
        weight_decay: float = 1e-4,
        device: Optional[torch.device] = None,
    ) -> None:
        """
        Args:
            model:        SuperchargingBKT instance.
            lr:           Adam learning rate.
            weight_decay: L2 regularisation coefficient.
            device:       Target device; auto-detects GPU if None.
        """
        self.model = model
        self.device = device or torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)

        self.optimizer = torch.optim.Adam(
            model.parameters(), lr=lr, weight_decay=weight_decay
        )

    # ------------------------------------------------------------------

    def fit(
        self,
        interaction_data: List[Dict],
        epochs: int = 50,
        batch_size: int = 32,
        validation_split: float = 0.2,
        patience: int = 5,
        min_delta: float = 1e-4,
    ) -> Dict[str, List[float]]:
        """
        Train the model with early stopping on validation BCE loss.

        Args:
            interaction_data: Raw interaction dicts (see prepare_sequences).
            epochs:           Maximum training epochs.
            batch_size:       Samples per mini-batch.
            validation_split: Fraction of data held out for validation.
            patience:         Early stopping patience (epochs).
            min_delta:        Minimum improvement in val loss to reset patience.

        Returns:
            History dict: {'train_loss': [...], 'val_loss': [...]}.
        """
        samples = prepare_sequences(interaction_data)
        dataset = InteractionDataset(samples)

        n_val   = max(1, int(len(dataset) * validation_split))
        n_train = len(dataset) - n_val
        train_ds, val_ds = random_split(dataset, [n_train, n_val])

        train_loader = DataLoader(
            train_ds, batch_size=batch_size, shuffle=True,
            collate_fn=collate_fn, drop_last=False,
        )
        val_loader = DataLoader(
            val_ds, batch_size=batch_size, shuffle=False,
            collate_fn=collate_fn, drop_last=False,
        )

        history: Dict[str, List[float]] = {'train_loss': [], 'val_loss': []}
        best_val_loss = float('inf')
        patience_counter = 0
        best_state = None

        for epoch in range(1, epochs + 1):
            # Anneal skill-discovery temperature
            if self.model.skill_discovery is not None:
                self.model.skill_discovery.anneal(epoch / epochs)

            # --- Training ---
            self.model.train()
            train_loss = self._run_epoch(train_loader, train=True)

            # --- Validation ---
            self.model.eval()
            with torch.no_grad():
                val_loss = self._run_epoch(val_loader, train=False)

            history['train_loss'].append(train_loss)
            history['val_loss'].append(val_loss)

            logger.info(
                'Epoch %3d/%d  train_loss=%.4f  val_loss=%.4f',
                epoch, epochs, train_loss, val_loss,
            )

            # Early stopping
            if val_loss < best_val_loss - min_delta:
                best_val_loss = val_loss
                patience_counter = 0
                best_state = {k: v.clone() for k, v in self.model.state_dict().items()}
            else:
                patience_counter += 1
                if patience_counter >= patience:
                    logger.info('Early stopping at epoch %d.', epoch)
                    break

        # Restore best weights
        if best_state is not None:
            self.model.load_state_dict(best_state)

        return history

    def _run_epoch(
        self, loader: DataLoader, train: bool
    ) -> float:
        total_loss = 0.0
        n_batches  = 0
        for batch in loader:
            batch = {k: v.to(self.device) for k, v in batch.items()}
            if train:
                self.optimizer.zero_grad()

            loss = self.model.train_step(batch)

            if train:
                loss.backward()
                # Gradient clipping for numerical stability
                nn.utils.clip_grad_norm_(self.model.parameters(), max_norm=5.0)
                self.optimizer.step()

            total_loss += loss.item()
            n_batches  += 1

        return total_loss / max(n_batches, 1)

    # ------------------------------------------------------------------
    # Persistence
    # ------------------------------------------------------------------

    def save_model(self, path: str) -> None:
        """
        Save model weights and configuration to disk.

        Args:
            path: File path (e.g. 'bkt_model.pt').
        """
        torch.save(
            {
                'model_state_dict':     self.model.state_dict(),
                'optimizer_state_dict': self.optimizer.state_dict(),
                'config': {
                    'num_kcs':             self.model.num_kcs,
                    'num_problems':        self.model.num_problems,
                    'num_students':        self.model.num_students,
                    'use_irt':             self.model.use_irt,
                    'use_skill_discovery': self.model.use_skill_discovery,
                },
            },
            path,
        )
        logger.info('Model saved to %s', path)

    def load_model(self, path: str) -> None:
        """
        Load model weights from a checkpoint saved by save_model.

        Args:
            path: File path to the saved checkpoint.
        """
        checkpoint = torch.load(path, map_location=self.device)
        self.model.load_state_dict(checkpoint['model_state_dict'])
        self.optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        logger.info('Model loaded from %s', path)

    # ------------------------------------------------------------------
    # Evaluation
    # ------------------------------------------------------------------

    def evaluate(self, test_data: List[Dict]) -> Dict[str, float]:
        """
        Evaluate model on held-out test interactions.

        Computes:
          - **accuracy**: Fraction of correctly predicted responses.
          - **RMSE**: Root-mean-square error of P(correct) vs observed.
          - **AUC**: Area under the ROC curve (requires scikit-learn).

        Args:
            test_data: Raw interaction dicts (same format as fit input).

        Returns:
            Dict with keys 'accuracy', 'rmse', 'auc'.
        """
        samples  = prepare_sequences(test_data)
        dataset  = InteractionDataset(samples)
        loader   = DataLoader(
            dataset, batch_size=32, shuffle=False, collate_fn=collate_fn
        )

        all_preds:   List[float] = []
        all_targets: List[float] = []

        self.model.eval()
        with torch.no_grad():
            for batch in loader:
                batch = {k: v.to(self.device) for k, v in batch.items()}
                predictions, _ = self.model(
                    batch['sequences'],
                    batch['kc_ids'],
                    batch.get('problem_ids'),
                    batch.get('student_ids'),
                )
                mask    = batch['sequences'] != -1
                targets = batch['sequences'].float()

                all_preds.extend(predictions[mask].cpu().numpy().tolist())
                all_targets.extend(targets[mask].cpu().numpy().tolist())

        preds   = np.array(all_preds)
        targets = np.array(all_targets)

        accuracy = float(((preds >= 0.5) == (targets >= 0.5)).mean())
        rmse     = float(np.sqrt(((preds - targets) ** 2).mean()))

        try:
            from sklearn.metrics import roc_auc_score
            auc = float(roc_auc_score(targets, preds))
        except ImportError:
            logger.warning('scikit-learn not available; AUC set to NaN.')
            auc = float('nan')
        except ValueError:
            auc = float('nan')  # Only one class present

        return {'accuracy': accuracy, 'rmse': rmse, 'auc': auc}
