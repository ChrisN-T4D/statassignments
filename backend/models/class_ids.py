"""Infer Methods Market class slug from objective/item/module ids."""

STATISTICS = "statistics"
RESEARCH_METHODS = "research-methods"


def infer_class_id(objective_id=None, hint=None, module_id=None, item_id=None) -> str:
    for value in (objective_id, item_id, module_id, hint):
        if not value:
            continue
        text = str(value)
        lowered = text.lower()
        if (
            text.startswith("RM")
            or lowered.startswith("rm-")
            or lowered == RESEARCH_METHODS
            or "research-methods" in lowered
        ):
            return RESEARCH_METHODS
        if lowered == STATISTICS:
            return STATISTICS
    return STATISTICS


def prototype_key(user_id: str, class_id: str) -> str:
    return f"{user_id}::{class_id or STATISTICS}"
