# Design: Concept Review unlocks on mastery, not full-bank coverage

**Date:** 2026-08-17  
**Scope:** Fall 2026 PSYC 4213 Concept Review only — Methods Market `/class/statistics` modules 1–8, online-primary and offline-primary. Canvas courses 3177 and 2405 keep the same slip-upload assignment; copy in Assignment Help / Canvas tips changes to match the new stop rule.  
**Out of scope:** Research Methods; Software Practice; Canvas points, due dates, or assignment types; changing the BKT model itself (neural vs classic, 0.90 threshold already in `backend/models/bkt_core.py`).

## Problem

Concept Review exists so students **learn the material**. Today the completion slip unlocks only after every question in the module bank is answered once. That is a coverage receipt. Module 1 is 15 items every time (`stats-m1-q1` … `stats-m1-q15`), all mapped to `M1-O1`, while three other Module 1 content objectives have no items. A short lucky streak on one skill cannot mean “learned the chapter,” and forcing the leftover bank on students who already know it is the wrong stop rule.

Offline-primary students work from a print packet with limited internet (library machine, a helper typing, a short window). They cannot get an adaptive BKT path while working. Their answers can still update BKT **after** they type them in.

## Goals

1. Online Concept Review stops when the student has learned the module’s Concept Review objectives, not when they have clicked every leftover item.
2. Offline Concept Review still uses the full print packet; first submit of entered answers unlocks the slip at any score (limited-internet constraint).
3. Every **content** and **hybrid** objective in modules 1–8 has at least two Concept Review items, by retagging existing questions first and writing new ones only when nothing in the bank measures that objective.
4. Pure **software** objectives never gate Concept Review (they belong in Software Practice).
5. The Canvas deliverable stays the Methods Market completion slip (student key, not legal name).

## Non-goals

- Mastery-gating Research Methods Concept Review.
- Adaptive question selection for print packets.
- Requiring a passing percent for the offline slip.
- Making retries required for offline students.
- Putting software/jamovi click-path objectives into the Concept Review unlock rule.
- Changing how Canvas receives the file (student still uploads the PDF/slip).

## Approach (locked)

Two-mode hybrid.

- **Online-primary, signed in:** at least two answered items per eligible objective in this module’s Concept Review record, **and** each of those objectives has BKT `pL >= 0.90`. Then the slip prints. Cap: slip also unlocks if every in-scope bank item has been answered (nobody is trapped).
- **Offline-primary:** print the full current bank. First batch submit, any score, unlocks the slip. That submit is the frozen slip score and the BKT snapshot of the paper work. Optional on-screen review/retry if they still have internet; it does not replace the slip.

---

## 1. Eligible objectives

For module `stats-module-N`:

- Include objectives with `objectiveType` `content` or `hybrid` and `moduleId` matching that module.
- Exclude `software` objectives (including `M*-S*` and Module 3 `M3-O1`–`M3-O3`).
- After the bank pass in section 3, each included objective has ≥ 2 mapped Concept Review questions. The unlock helper still treats “≥ 2 mapped items” as the eligibility check so a mapping bug cannot block a slip on an empty objective.

**Module 8:** if the student has selected a topic subset, in-scope questions are those in the selected topics. Eligible objectives are those with ≥ 2 in-scope items. The print packet for Module 8 follows the same subset.

**Already-mastered objective:** still requires the two-item floor **this assignment** (this module’s Concept Review `answeredIds`). If `pL` is already ≥ 0.90 and those two are answered, that objective is done.

## 2. Online unlock and serving

After each scored answer (correct or incorrect; first attempt on an item counts toward the floor):

Unlock when **either**:

1. For every eligible objective: count of answered mapped items ≥ 2 **and** current `pL >= 0.90`, or
2. Every in-scope question ID is in `answeredIds`.

**Score on the slip:** `correct / answered` unique items in this review record, not `/` the full bank. An item counts once toward the floor whether the first recorded outcome is right or wrong. `correct` follows the existing slip store (first recorded outcome per item; later retries on the same item do not rewrite it).

**Serving:** drop the 6-item easy/medium/hard mastery set as the completion path. Choose the next item from eligible objectives that still need the floor or have `pL < 0.90`. Prefer lower `pL`. Do not repeat an already-answered item until the bank-exhausted cap needs leftovers.

**Progress UI:** objectives remaining (floor and/or mastery), not a fake “6 of 6” or “15 of 15.”

**BKT:** update live after each answer, as today (signed-in Concept Review). If `pL` cannot be read, do not treat the objective as mastered; the student continues until the bank-exhausted cap.

**No student key:** they may practice with the same serving rule; they cannot print a slip.

**Unsigned-in:** no slip; treat `pL` as unmastered so they are not told they finished on mastery.

## 3. Question bank (match, then write)

Prefer **matching**: retag an existing question in that module when the prompt already assesses the objective. **Write** a new item only when nothing in the bank measures it. Do not leave a content/hybrid objective with 0–1 items.

Known gaps at spec time (re-count from `questionObjectiveMap.js` + `objectives.js` during implementation):

| Module | Objective | Action |
|---|---|---|
| 1 | `M1-O1` | Keep items that actually ask why scientists use stats / human reasoning. Do not leave all 15 parked here if they belong elsewhere. |
| 1 | `M1-O2` belief bias | Write ≥ 2 (current bank does not ask this). |
| 1 | `M1-O3` validity vs truth/believability | Write ≥ 2. |
| 1 | `M1-O4` Simpson’s paradox | Write ≥ 2. |
| 2 | `M2-O1` construct vs observed measurement | Match existing items if they fit; else write until 2. |
| 3 | `M3-O4`, `M3-O5` hybrid | Gate CR on these only. Rematch current CR items tagged to `M3-O1`–`O3` onto O4/O5 when the prompt is conceptual. `M3-O5` has one mapped item today; match or write until 2. |
| 3 | `M3-O1`–`O3` software | Do not gate CR. |
| 4–8 | content/hybrid | Audit; retag or write so each has ≥ 2. |

New items follow the existing Concept Review shape in `src/data/conceptQuestions.js` (id `stats-mN-q#`, `moduleId`, `type`, `options`/`correct`, `feedback`, `difficulty`) and must be added to `src/data/questionObjectiveMap.js`.

Print packets use the full in-scope bank after this pass, so Module 1’s packet grows by the new O2–O4 items.

## 4. Offline unlock, scoring, and BKT

1. Packet: all in-scope questions, numbered, no correct answers on paper (unchanged).
2. **Enter answers** still submits the whole set once.
3. First successful submit: score every item, show feedback, **unlock the slip at any score**, save `completedAt`, freeze `correct` and `total` (= packet size) for the slip.
4. That first submit writes BKT updates for each answered item (after-the-fact snapshot of the paper work).
5. If they still have the tab open, they may retry missed items. Retries may update BKT as extra practice. They must not change the frozen slip score, timestamp, or require a second visit.
6. Regenerating a lost slip reprints the same frozen completion.

Someone else may type the paper answers during a short internet window. First submit is the honest record; do not require a pass bar or a second submit.

## 5. Slip (unchanged object, new unlock)

Still: `PSYC 4213 · Methods Market completion slip`; student key; Activity: Concept Review; module label; score; completed at; “Upload this slip to the matching Canvas assignment.” Print/Save PDF and Copy. `canPrint` requires `studentKey`.

Online score label is `correct/answered`. Offline score label is `correct/packetSize` from first submit.

## 6. Implementation shape

Put the unlock rule in one helper (new), e.g. `src/lib/conceptReviewUnlock.js`, not inline in `Practice.vue`:

- `eligibleObjectives(moduleId, options)`
- `onlineReviewComplete({ moduleId, answeredIds, pLByObjective, inScopeQuestionIds })`
- `offlineFirstSubmitComplete()` is always true after a full batch score; the store freezes the slip payload

Call it from `Practice.vue` after each online answer and after offline batch submit. Replace `allIds.every(answered)` as the slip gate.

Serving changes in `src/composables/usePractice.js`: next item from unmet eligible objectives, then `loadNextUnanswered` only for the exhausted-bank cap.

Slip store (`src/lib/conceptReviewSlipStore.js`) keeps `answeredIds`, frozen `correct` / `total`, `completedAt`, and must not overwrite a frozen offline slip on retry.

Copy updates: `src/data/statisticsCanvasLinks.js` Concept Review tips (today: “Answer every concept review question”) and the online-primary sentence in `Practice.vue` that says they must answer every question.

## 7. Tests

Extend `scripts/verify-concept-review-scoring.mjs` (or a sibling verify script) so it fails if:

- Online: 2 items per eligible objective and all `pL >= 0.90` unlocks even when other bank items remain.
- Online: `pL` below 0.90 does not unlock until the bank is exhausted.
- Online: one objective with `pL >= 0.90` but only one answered item does not unlock.
- Offline: first submit unlocks at 0 correct.
- Offline: a later retry does not change frozen `correct` / `total` / `completedAt`.
- Software-only objectives are not in `eligibleObjectives`.
- After the bank pass, every content/hybrid objective in stats modules 1–8 has ≥ 2 mapped questions.

## 8. Error handling

- Missing BKT state for an objective: treat as not mastered (`pL` missing ≠ 0.90).
- Empty bank / no eligible objectives: do not unlock on mastery. Do not turn on the new online gate for a module until that module’s match/write pass is done.
- Ship order: for each of modules 1–8, finish the bank pass, then enable the mastery gate. All eight stats modules are in scope. Do not leave a finished module on “answer every item.”

## 9. Rollout

No Canvas assignment-type change. Students still upload a slip. Assignment Help / Canvas tip text must describe mastery-until-slip for online and packet-then-enter for offline, not “answer every question.”
