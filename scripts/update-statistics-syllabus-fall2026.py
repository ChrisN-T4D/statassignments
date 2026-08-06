"""Build PSYC 4213 Statistics Fall 2026 syllabus (Methods Market + NWOSU calendar)."""
import sys
from docx import Document
from docx.oxml import OxmlElement
from docx.text.paragraph import Paragraph

SRC = r"C:\Users\couga\Downloads\Psych 4123- Neu - Statistics - Spring 2026.docx"
OUT = r"C:\Users\couga\Downloads\Psych 4213 - Statistics - Fall 2026.docx"
OUT_INPERSON = r"C:\Users\couga\Downloads\Psych 4213 - Statistics - Fall 2026 (In Person).docx"


def replace_paragraph_text(paragraph, new_text):
    if not paragraph.runs:
        paragraph.add_run(new_text)
        return
    paragraph.runs[0].text = new_text
    for run in paragraph.runs[1:]:
        run.text = ""


def insert_paragraph_after(paragraph, text):
    new_p = OxmlElement("w:p")
    paragraph._p.addnext(new_p)
    new_para = Paragraph(new_p, paragraph._parent)
    if text:
        new_para.add_run(text)
    return new_para


def find_paragraph(doc, startswith):
    for p in doc.paragraphs:
        if p.text.strip().startswith(startswith):
            return p
    return None


def find_paragraph_contains(doc, fragment):
    for p in doc.paragraphs:
        if fragment in p.text:
            return p
    return None


def replace_section_after_header(doc, header, content):
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip().startswith(header):
            if i + 1 < len(doc.paragraphs):
                replace_paragraph_text(doc.paragraphs[i + 1], content)
            return
    p = find_paragraph_contains(doc, content[:40])
    if p:
        replace_paragraph_text(p, content)


def ensure_ada_section(doc):
    """Set Services for Students with Disabilities body; insert section if missing."""
    header = "Services for Students with Disabilities:"
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip().rstrip(":").lower() == "services for students with disabilities":
            replace_paragraph_text(p, header)
            for j in range(i + 1, min(i + 5, len(doc.paragraphs))):
                if doc.paragraphs[j].text.strip():
                    replace_paragraph_text(doc.paragraphs[j], ADA_SERVICES)
                    return
            insert_paragraph_after(p, ADA_SERVICES)
            return
    for p in doc.paragraphs:
        if p.text.strip().startswith("Student Complaint Protocol") or p.text.strip().startswith(
            "University Closure Communication"
        ):
            new_body = OxmlElement("w:p")
            p._p.addprevious(new_body)
            body_para = Paragraph(new_body, p._parent)
            body_para.add_run(ADA_SERVICES)
            new_h = OxmlElement("w:p")
            body_para._p.addprevious(new_h)
            h_para = Paragraph(new_h, p._parent)
            h_para.add_run(header)
            return


def set_table_rows(table, rows):
    while len(table.rows) > 1:
        table._tbl.remove(table.rows[-1]._tr)
    for row_data in rows:
        cells = table.add_row().cells
        for i, val in enumerate(row_data):
            cells[i].text = val


COURSE_MATERIALS = (
    "We use free, open-access materials — no textbook purchase required.\n\n"
    "Primary textbook: Learning Statistics with jamovi (LSJ), read online at "
    "https://davidfoxcroft.github.io/lsj-book/\n\n"
    "Course platform: Canvas (https://nwosu.instructure.com) holds the syllabus, weekly modules, "
    "due dates, grades, discussions, and graded benchmarks.\n\n"
    "Practice platform: Methods Market (https://methods-market.clneu.com/class/statistics) holds "
    "Concept Review quizzes and Software Practice for each module. Due dates and points are always "
    "in Canvas — not Methods Market.\n\n"
    "Methods Market Setup (complete by end of Week 1)\n"
    "Step 1 — Create your account at https://methods-market.clneu.com/auth\n"
    "Step 2 — Link your student key at https://methods-market.clneu.com/claim (semester Fall 2026 / "
    "2026FA; key from instructor)\n"
    "Step 3 — Bookmark https://methods-market.clneu.com/class/statistics and Assignment Help "
    "(…/class/statistics/assignment-help)\n"
    "Step 4 — Install jamovi before Module 3: https://www.jamovi.org/download.html\n"
    "Each week: read the LSJ chapter → Concept Review → Software Practice (Modules 3–8) → complete "
    "Canvas assignments. See also the Canvas page Getting Started on Methods Market.\n\n"
    "Supplementary materials may include instructor videos, open-access articles, and other web "
    "resources linked from Canvas modules."
)

ADA_SERVICES = (
    "To be eligible for academic accommodations for a physical, mental or learning disability, "
    "students must contact the Coordinator of Services for Students with Disabilities, or faculty "
    "member personally. This should be completed within the first two weeks of the semester so that "
    "appropriate accommodations may be arranged.  The location for ADA assistance is the Ryerson Hall "
    "room 131 on the Alva Campus and the contact is Ethan Sacket. To request ADA assistance in Enid, "
    "Woodward, and Ponca City please contact the following:  Enid – Dr. Wayne McMillin; Woodward - "
    "Dr. Jonathan Thomason; Ponca City – Tim Williams. Online students will need to contact Ethan "
    "Sacket for assistance with ADA accommodations. This procedure applies to concurrent students as "
    "well, since 504 plans, Individualized Educational Programs (IEPs), etc. in pre-college school "
    "settings are separate from the required paperwork Student Services needs to have on file for "
    "documenting necessary ADA accommodations at the University."
)

PERFORMANCE_ASSESSMENT = (
    "The readings, instructor videos, and Methods Market activities present the major topics in "
    "statistics along with recent developments in the field. To build a thorough understanding, "
    "complete the assigned LSJ chapter reading, finish Concept Review for that module, and complete "
    "Software Practice (Modules 3–8) before graded Jamovi assignments and benchmarks. Readings and "
    "videos often contain unique material (presented in one medium but not the other).\n\n"
    "Recommended preparation for benchmarks: read the assigned chapters, complete Concept Review "
    "(and Software Practice where assigned), work through Methods Market topics, then use the "
    "formative benchmark practice in Methods Market before the proctored Canvas benchmark. Post "
    "questions in the module discussion board before emailing. Talking with classmates and attending "
    "office hours helps organize concepts.\n\n"
    "This is an ideas-and-application course. Assessments stress concepts, relationships among "
    "concepts, and application to practical examples — not isolated memorization."
)

BENCHMARKS = (
    "There will be three benchmarks during the semester. Your benchmark average accounts for 50% of "
    "your final grade, weighted as follows within that category: Benchmark 1 = 15%, Benchmark 2 = "
    "15%, Benchmark 3 (final exam) = 20%.\n\n"
    "Benchmark 1 comes after Module 3 (Chapters 1–3), Benchmark 2 after Module 5 (Methods Market "
    "Modules 4–5; LSJ Chapters 4–6), and Benchmark 3 during NWOSU final exam week Dec 7â€“11 "
    "(Modules 6â€“8 only; LSJ Chapters 7â€“13; not a comprehensive final). Benchmarks may include multiple-choice, essay, and numerical "
)

EVALUATION_AND_GRADING = (
    "EVALUATION AND GRADING\n"
    "Your grade will be based on the following components:\n"
    "  â€¢ Benchmark 1 (Modules 1â€“3, Ch. 1â€“3) â€” 15%\n"
    "  â€¢ Benchmark 2 (Modules 4â€“5, Ch. 4â€“6) â€” 15%\n"
    "  â€¢ Benchmark 3 / Final Exam (Modules 6â€“8 only, Ch. 7â€“13; not a comprehensive final) â€” 20%\n\n"
)

ASSIGNMENTS = (
    "Assignments will include weekly readings, Concept Review quizzes, Software Practice exercises, "
    "and Jamovi assignments. Each assignment is designed to reinforce the concepts covered in class "
    "and provide hands-on experience with statistical software.\n\n"
    "Late assignments will be accepted with a 10% penalty per day late, up to three days. After "
    "three days, no late assignments will be accepted."
)

DISCUSSIONS = (
    "Discussion boards are an essential part of this course. You are required to participate in at "
    "least two discussions per week. Your participation will be graded based on the quality and "
    "relevance of your posts.\n\n"
    "You should aim to post at least one original response and one reply to a classmate's post each "
    "week."
)

ATTENDANCE_ONLINE = (
    "As this class is online, we do not meet in person. Module discussion boards are where you ask "
    "questions, connect with classmates, and complete graded discussion prompts. Use them actively — "
    "they count as our shared class meeting time."
)

ATTENDANCE_INPERSON = (
    "This section meets on campus. Regular attendance is expected per university policy. "
    "Module discussion boards are for questions between class meetings and for graded discussion "
    "prompts — post there before emailing when possible."
)

MEETING_ONLINE = "Online â€“ asynchronous (no scheduled meeting time)"

MEETING_INPERSON = (
    "On campus â€“ see your section listing in RangerNet / the official course schedule for meeting "
    "days, times, and room (sections A025, E926, W094, X098, X150)."
)


def main():
    in_person = "--in-person" in sys.argv
    doc = Document(SRC)

    replace_paragraph_text(doc.paragraphs[1], "Psych 4213 â€“ Statistics")
    replace_paragraph_text(doc.paragraphs[2], "Fall 2026")
    replace_paragraph_text(doc.paragraphs[16], "In Person" if in_person else "Online")

    # Meeting Times and Location (paragraph after Course Modality value)
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip().startswith("Meeting Times and Location") and i + 1 < len(doc.paragraphs):
            replace_paragraph_text(
                doc.paragraphs[i + 1],
                MEETING_INPERSON if in_person else MEETING_ONLINE,
            )
            break
        # Sometimes the value is the next non-empty paragraph after a bare header line
        if p.text.strip() == "Meeting Times and Location:" and i + 1 < len(doc.paragraphs):
            replace_paragraph_text(
                doc.paragraphs[i + 1],
                MEETING_INPERSON if in_person else MEETING_ONLINE,
            )
            break

    for i, p in enumerate(doc.paragraphs):
        if p.text.startswith("We use free") or p.text.startswith("We will use free"):
            replace_paragraph_text(p, COURSE_MATERIALS)
            break

    replace_section_after_header(doc, "Performance Assessment:", PERFORMANCE_ASSESSMENT)
    replace_section_after_header(doc, "Benchmarks:", BENCHMARKS)
    replace_section_after_header(doc, "Assignments:", ASSIGNMENTS)
    replace_section_after_header(doc, "Discussions:", DISCUSSIONS)
    ensure_ada_section(doc)

    for p in doc.paragraphs:
        if p.text.startswith("Students are responsible for regularly checking both"):
            replace_paragraph_text(
                p,
                "Students are responsible for regularly checking both Canvas and their NWOSU email "
                "during all university closures. These include closures caused by weather, safety "
                "concerns, or other emergencies. This course will adapt as necessary to support "
                "continued progress toward achieving learning outcomes. Instructors will provide "
                "updates, expectations, and instructions through NWOSU email and Canvas."
            )
            break

    eval_p = find_paragraph(doc, "EVALUATION AND GRADING")
    if eval_p:
        replace_paragraph_text(eval_p, EVALUATION_AND_GRADING)
        start = None
        for i, p in enumerate(doc.paragraphs):
            if p.text.strip().startswith("EVALUATION AND GRADING"):
                start = i
                break
        if start is not None:
            for j in range(start + 1, start + 15):
                if j >= len(doc.paragraphs):
                    break
                t = doc.paragraphs[j].text.strip()
                if t.startswith("Student Complaint") or t.startswith("Class Attendance"):
                    break
                if t in ("Example:", "Benchmarks: 50% of total grade", "Assignments: 35% of total grade",
                         "Discussions: 15% of total grade", "Final Course Grade:", "A= 90-100",
                         "B= 80-89", "C= 70-79", "D= 60-69", "F= 0-59") or t.startswith("Extra Credit"):
                    replace_paragraph_text(doc.paragraphs[j], "")

    # Keep Testing identical for online and in-person (LockDown options); only modality /
    # meeting location / attendance differ between the two Fall syllabi.
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip().startswith("Testing and Proctoring"):
            replace_paragraph_text(p, TESTING)
            for j in range(i + 1, i + 10):
                if j >= len(doc.paragraphs):
                    break
                t = doc.paragraphs[j].text.strip()
                if t.startswith("Course Outline"):
                    break
                if t:
                    replace_paragraph_text(doc.paragraphs[j], "")
            break

    outline_p = find_paragraph(doc, "Course Outline and Tentative Schedule")
    if outline_p:
        insert_paragraph_after(outline_p, SCHEDULE_FOOTNOTE)

    for i, p in enumerate(doc.paragraphs):
        if p.text.strip().startswith("Final Exam Date and Time") and i + 1 < len(doc.paragraphs):
            replace_paragraph_text(
                doc.paragraphs[i + 1],
                "Benchmark 3 (Final Exam): Dec 7â€“11, 2026 (Proctored, LockDown Browser + Webcam). Semester ends Dec 11."
            )
            break

    attendance_p = find_paragraph(doc, "Class Attendance")
    if attendance_p:
        # Header may be "Class Attendance:" with body in same or next paragraph
        body = ATTENDANCE_INPERSON if in_person else ATTENDANCE_ONLINE
        if attendance_p.text.strip() in ("Class Attendance", "Class Attendance:"):
            if attendance_p.text.strip().endswith(":"):
                # body often in next paragraph
                idx = doc.paragraphs.index(attendance_p)
                if idx + 1 < len(doc.paragraphs):
                    replace_paragraph_text(doc.paragraphs[idx + 1], body)
                else:
                    replace_paragraph_text(attendance_p, "Class Attendance:\n" + body)
            else:
                replace_paragraph_text(attendance_p, "Class Attendance:\n" + body)
        else:
            replace_paragraph_text(attendance_p, body)

    for p in doc.paragraphs:
        if "Blackboard" in p.text or "blackboard" in p.text:
            replace_paragraph_text(p, p.text.replace("Blackboard", "Canvas").replace("blackboard", "Canvas"))

    set_table_rows(doc.tables[0], SCHEDULE_ROWS)

    doc.save(OUT_INPERSON if in_person else OUT)
    print(f"Saved: {OUT_INPERSON if in_person else OUT}")


if __name__ == "__main__":
    main()
