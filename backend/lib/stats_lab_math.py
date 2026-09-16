"""Small stats helpers for live-lab aggregates."""

from __future__ import annotations

from collections import Counter
from typing import Any


def mean(values: list[float]) -> float | None:
    if not values:
        return None
    return sum(values) / len(values)


def median(values: list[float]) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    n = len(ordered)
    mid = n // 2
    if n % 2 == 1:
        return float(ordered[mid])
    return (ordered[mid - 1] + ordered[mid]) / 2.0


def mode(values: list[Any]) -> Any:
    if not values:
        return None
    counts = Counter(values)
    max_count = max(counts.values())
    winners = sorted(k for k, c in counts.items() if c == max_count)
    return winners[0] if len(winners) == 1 else winners


def histogram(values: list[float], n_bins: int = 10) -> list[dict[str, float | int]]:
    if not values:
        return []
    if n_bins < 1:
        n_bins = 1
    lo = min(values)
    hi = max(values)
    if lo == hi:
        return [{"bin_start": lo, "bin_end": hi, "count": len(values)}]
    width = (hi - lo) / n_bins
    bins: list[dict[str, float | int]] = []
    for i in range(n_bins):
        start = lo + i * width
        end = lo + (i + 1) * width if i < n_bins - 1 else hi
        bins.append({"bin_start": start, "bin_end": end, "count": 0})
    for v in values:
        if v == hi:
            bins[-1]["count"] = int(bins[-1]["count"]) + 1
            continue
        idx = int((v - lo) / width)
        if idx < 0:
            idx = 0
        elif idx >= n_bins:
            idx = n_bins - 1
        bins[idx]["count"] = int(bins[idx]["count"]) + 1
    return bins
