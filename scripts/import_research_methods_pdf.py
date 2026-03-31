from pathlib import Path
from html import escape
import re
import fitz

PDF_PATH = Path(r"C:/Users/couga/Downloads/Research-Methods-in-Psychology-1641401927.pdf")
OUT_ROOT = Path(r"C:/Users/couga/Documents/statassignments/src/content/topics")

# 1-indexed inclusive page ranges in the PDF.
CHAPTERS = [
    ("I", "rm-chapter-1", "rm-module-1", "Chapter 1: The Science of Psychology", 21, 42),
    ("II", "rm-chapter-2", "rm-module-2", "Chapter 2: Overview of the Scientific Method", 43, 76),
    ("III", "rm-chapter-3", "rm-module-3", "Chapter 3: Research Ethics", 77, 100),
    ("IV", "rm-chapter-4", "rm-module-4", "Chapter 4: Psychological Measurement", 101, 126),
    ("V", "rm-chapter-5", "rm-module-5", "Chapter 5: Experimental Research", 127, 160),
    ("VI", "rm-chapter-6", "rm-module-6", "Chapter 6: Non-Experimental Research", 161, 200),
    ("VII", "rm-chapter-7", "rm-module-7", "Chapter 7: Survey Research", 201, 226),
    ("VIII", "rm-chapter-8", "rm-module-8", "Chapter 8: Quasi-Experimental Research", 227, 240),
    ("IX", "rm-chapter-9", "rm-module-9", "Chapter 9: Factorial Designs", 241, 258),
    ("X", "rm-chapter-10", "rm-module-10", "Chapter 10: Single-Subject Research", 259, 280),
    ("XI", "rm-chapter-11", "rm-module-11", "Chapter 11: Presenting Your Research", 281, 312),
    ("XII", "rm-chapter-12", "rm-module-12", "Chapter 12: Descriptive Statistics", 313, 360),
    ("XIII", "rm-chapter-13", "rm-module-13", "Chapter 13: Inferential Statistics", 361, 404),
]

SOURCE_URLS = {
    "I": "https://kpu.pressbooks.pub/psychmethods4e/part/the-science-of-psychology/",
    "II": "https://kpu.pressbooks.pub/psychmethods4e/part/overview-of-the-scientific-method/",
    "III": "https://kpu.pressbooks.pub/psychmethods4e/part/research-ethics/",
    "IV": "https://kpu.pressbooks.pub/psychmethods4e/part/psychological-measurement/",
    "V": "https://kpu.pressbooks.pub/psychmethods4e/part/experimental-research/",
    "VI": "https://kpu.pressbooks.pub/psychmethods4e/part/non-experimental-research/",
    "VII": "https://kpu.pressbooks.pub/psychmethods4e/part/survey-research/",
    "VIII": "https://kpu.pressbooks.pub/psychmethods4e/part/quasi-experimental-research/",
    "IX": "https://kpu.pressbooks.pub/psychmethods4e/part/factorial-designs/",
    "X": "https://kpu.pressbooks.pub/psychmethods4e/part/single-subject-research/",
    "XI": "https://kpu.pressbooks.pub/psychmethods4e/part/presenting-your-research/",
    "XII": "https://kpu.pressbooks.pub/psychmethods4e/part/descriptive-statistics/",
    "XIII": "https://kpu.pressbooks.pub/psychmethods4e/part/inferential-statistics/",
}


def is_header_or_footer(line: str) -> bool:
    s = line.strip()
    if not s:
        return False
    if s.startswith("-- ") and " of " in s and s.endswith(" --"):
        return True
    if " | " in s and any(ch.isdigit() for ch in s[:5]):
        return True
    if s in {
        "Research Methods in Psychology",
        "Rajiv S. Jhangiani, Carrie Cuttler, & Dana C. Leighton",
    }:
        return True
    return False


def extract_pages_text(reader: fitz.Document, start_page: int, end_page: int) -> str:
    chunks = []
    for page_num in range(start_page, end_page + 1):
        raw = reader[page_num - 1].get_text("text") or ""
        lines = [ln.rstrip() for ln in raw.splitlines()]
        filtered = [ln for ln in lines if not is_header_or_footer(ln)]
        chunks.append("\n".join(filtered))
    return "\n\n".join(chunks)


def trim_to_chapter_body(text: str, chapter_roman: str, next_chapter_roman: str | None) -> str:
    start_pat = re.compile(rf"\bCHAPTER\s+{re.escape(chapter_roman)}\b", re.IGNORECASE)
    end_pat = (
        re.compile(rf"\bCHAPTER\s+{re.escape(next_chapter_roman)}\b", re.IGNORECASE)
        if next_chapter_roman
        else None
    )
    start_match = start_pat.search(text)
    if start_match:
        text = text[start_match.start():]
    if end_pat:
        end_match = end_pat.search(text)
        if end_match:
            text = text[: end_match.start()]
    return text


def clean_paragraph_text(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+\|\s+\d+\b", "", text)
    text = re.sub(r"\s{2,}", " ", text)
    return text.strip()


def split_long_paragraph(text: str) -> list[str]:
    text = clean_paragraph_text(text)
    if len(text) < 900:
        return [text]
    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks: list[str] = []
    current: list[str] = []
    current_len = 0
    for sentence in sentences:
        if not sentence:
            continue
        if current and (current_len + len(sentence) > 700):
            chunks.append(" ".join(current).strip())
            current = [sentence]
            current_len = len(sentence)
        else:
            current.append(sentence)
            current_len += len(sentence)
    if current:
        chunks.append(" ".join(current).strip())
    return chunks or [text]


def to_html(
    title: str,
    text: str,
    source_pages: tuple[int, int],
    chapter_roman: str,
) -> str:
    paras = []
    current = []
    for line in text.replace("\uf0b7", "•").replace("�", "").splitlines():
        line = line.strip()
        if not line:
            if current:
                paras.append(" ".join(current))
                current = []
            continue
        current.append(line)
    if current:
        paras.append(" ".join(current))

    blocks = []
    for p in paras:
        if not p:
            continue
        safe = escape(p)

        # Pull section heading out of paragraph start (e.g., "1. Methods of Knowing ...")
        section_match = re.match(r"^(\d+\.\s+[^.]{4,120}?)(?:\s{2,}|\s+Learning Objectives\b)(.*)$", p)
        if section_match:
            heading = escape(section_match.group(1).strip())
            remainder = section_match.group(2).strip()
            blocks.append(f"  <h3>{heading}</h3>")
            if remainder:
                safe = escape(remainder)
            else:
                continue

        if "Learning Objectives" in p:
            parts = split_long_paragraph(safe)
            body = "\n".join(f"    <p>{part}</p>" for part in parts if part)
            blocks.append(
                "  <div class=\"critical-points\">\n"
                "    <h4>Learning Objectives</h4>\n"
                f"{body}\n"
                "  </div>"
            )
            continue

        if "Key Takeaways" in p or "Exercises" in p:
            parts = split_long_paragraph(safe)
            body = "\n".join(f"    <p>{part}</p>" for part in parts if part)
            blocks.append(
                "  <div class=\"key-points\">\n"
                "    <h4>Key Takeaways and Exercises</h4>\n"
                f"{body}\n"
                "  </div>"
            )
            continue

        if p.startswith("Notes ") or p.startswith("Notes"):
            parts = split_long_paragraph(safe)
            body = "\n".join(f"    <p>{part}</p>" for part in parts if part)
            blocks.append(
                "  <div class=\"terminology-box\">\n"
                "    <h4>Notes and References</h4>\n"
                f"{body}\n"
                "  </div>"
            )
            continue

        for part in split_long_paragraph(safe):
            if part:
                blocks.append(f"  <p>{part}</p>")

    source_url = SOURCE_URLS.get(chapter_roman, "https://kpu.pressbooks.pub/psychmethods4e/")
    return (
        '<section class="module-content" aria-labelledby="rm-title">\n'
        f'  <h2 id="rm-title">{escape(title)}</h2>\n'
        f"{chr(10).join(blocks)}\n"
        '  <div class="attribution">\n'
        "    <h4>Attribution</h4>\n"
        "    <p>\n"
        "      This content is copied from <em>Research Methods in Psychology (4th edition)</em> "
        "by Rajiv S. Jhangiani, I-Chant A. Chiang, Carrie Cuttler, and Dana C. Leighton. "
        "Licensed under CC BY-NC-SA 4.0.\n"
        "    </p>\n"
        "    <p>\n"
        f"      <strong>Source:</strong> <a href=\"{source_url}\" target=\"_blank\" rel=\"noopener\">"
        "Research Methods in Psychology (Pressbooks)</a>\n"
        "    </p>\n"
        f"    <p><strong>PDF pages used:</strong> {source_pages[0]}-{source_pages[1]}</p>\n"
        "    <p><strong>Modifications:</strong> Reformatted for web display, with section callout cards and "
        "course-module mapping added while preserving chapter wording from the source PDF text.</p>\n"
        "  </div>\n"
        "</section>\n"
    )


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"Missing PDF: {PDF_PATH}")
    reader = fitz.open(str(PDF_PATH))
    for idx, (roman, topic_id, module_id, chapter_title, start_page, end_page) in enumerate(CHAPTERS):
        next_roman = CHAPTERS[idx + 1][0] if idx + 1 < len(CHAPTERS) else None
        text = extract_pages_text(reader, start_page, end_page)
        text = trim_to_chapter_body(text, roman, next_roman)
        html = to_html(chapter_title, text, (start_page, end_page), roman)
        out_dir = OUT_ROOT / f"{topic_id}__{module_id}"
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "jamovi.html").write_text(html, encoding="utf-8")
        print(f"Wrote {out_dir / 'jamovi.html'}")


if __name__ == "__main__":
    main()
