from pathlib import Path
import re
from wordfreq import zipf_frequency

ROOT = Path(r"C:/Users/couga/Documents/statassignments/src/content/topics")


def _maybe_merge_word_parts(text: str) -> str:
    pattern = re.compile(r"\b([A-Za-z]{1,4})\s+([A-Za-z]{2,14})\b")
    changed = True
    while changed:
        changed = False

        def repl(match: re.Match[str]) -> str:
            nonlocal changed
            left, right = match.group(1), match.group(2)
            merged = f"{left}{right}"

            merged_freq = zipf_frequency(merged.lower(), "en")
            left_freq = zipf_frequency(left.lower(), "en")
            right_freq = zipf_frequency(right.lower(), "en")

            # Merge only when combined token is a clear English word, and one side
            # is unlikely to be a standalone word (common PDF extraction artifact).
            if merged_freq >= 4.3 and (left_freq < 2.8 or right_freq < 2.8):
                changed = True
                return merged
            return match.group(0)

        text = pattern.sub(repl, text)
    return text


def _cleanup_text(text: str) -> str:
    text = text.replace("\u2019", "'")
    text = text.replace("  ", " ")
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    text = re.sub(r"\(\s+", "(", text)
    text = re.sub(r"\s+\)", ")", text)
    text = re.sub(r"\s{2,}", " ", text).strip()
    text = _maybe_merge_word_parts(text)
    text = re.sub(r"\s{2,}", " ", text).strip()
    return text


def _split_long_paragraph(paragraph_text: str) -> list[str]:
    if len(paragraph_text) < 900:
        return [paragraph_text]

    sentences = re.split(r"(?<=[.!?])\s+", paragraph_text)
    chunks: list[str] = []
    current = []
    current_len = 0
    for sent in sentences:
        if not sent:
            continue
        if current and current_len + len(sent) > 650:
            chunks.append(" ".join(current).strip())
            current = [sent]
            current_len = len(sent)
        else:
            current.append(sent)
            current_len += len(sent)
    if current:
        chunks.append(" ".join(current).strip())
    return chunks or [paragraph_text]


def _rewrite_paragraphs(html: str) -> str:
    p_pattern = re.compile(r"<p>(.*?)</p>", re.DOTALL)

    def p_repl(match: re.Match[str]) -> str:
        raw = match.group(1)
        cleaned = _cleanup_text(raw)
        split_parts = _split_long_paragraph(cleaned)
        return "".join(f"<p>{part}</p>" for part in split_parts)

    html = p_pattern.sub(p_repl, html)
    html = re.sub(r"\n{3,}", "\n\n", html)
    return html


def main() -> None:
    files = sorted(ROOT.glob("rm-chapter-*__rm-module-*/jamovi.html"))
    if not files:
        raise SystemExit("No Research Methods chapter files found.")

    for path in files:
        src = path.read_text(encoding="utf-8")
        cleaned = _rewrite_paragraphs(src)
        path.write_text(cleaned, encoding="utf-8")
        print(f"Cleaned {path}")


if __name__ == "__main__":
    main()
