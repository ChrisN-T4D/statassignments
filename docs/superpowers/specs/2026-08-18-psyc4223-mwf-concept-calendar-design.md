# PSYC 4223 Research Methods — M/W/F concept calendar (design)

**Course:** PSYC 4223 Research Methodology, Fall 2026, Canvas **2406**  
**Meeting:** Mon / Wed / Fri, **12:00–12:50** (50 min)  
**OWUI:** `teaching_today` on `qwythos:5` (instructor), course slug `psyc-4223`  
**Date:** 2026-08-18  
**Status:** approved in conversation; awaiting spec review  

**Goal:** Instructor opens today’s row (or asks OWUI) and sees 2–4 named concepts from this week’s Methods Market chapter, or a Friday capstone workshop. No class-ritual playbook.

---

## Decisions

- Same M/W/F week-stub shape as the Statistics playbook. Not the Statistics rituals.
- **No** hook / concept fight / studio. **No** exit tickets.
- The **only chapter** each week is the Jhangiani Pressbooks chapter already assigned in `src/data/fall2026ResearchMethodsSchedule.js` (Methods Market).
- The Canvas “holy handbook” is an outline of what comes next (Parts / phases). It does **not** supply a second textbook. Use it with Canvas Parts to name the Friday workshop.
- Named concepts = Pressbooks **section titles** (`h3` headings in `src/content/topics/rm-chapter-N__rm-module-N/jamovi.html`). Cluster adjacent sections so each meeting has **2–4** names. Short chapters (2–3 sections) may list **1–2** on a thinner day rather than inventing extra names.
- Mon / Wed split that same chapter. Friday = workshop only, no new concepts.
- OWUI access is required: one day card per meeting date in the teaching pack, then copy the pack into the Open WebUI container.

---

## 1. Success criteria

- Instructor can open the calendar (or ask `qwythos:5` / `teaching_today`) and see today’s concepts or workshop without inventing them.
- `teaching_today` with `course_id=psyc-4223` (or empty, all courses that day) returns the 12:00 Research Methods card on every M/W/F meeting date, including no-class days labeled as such.
- After a neu1 pack copy, OWUI reads the new cards (no new Workspace Tool; existing `teaching_today` is enough).
- Canvas dues, Methods Market banks, and the locked one-chapter-per-week schedule do not change.

---

## 2. Day roles

| Day | Calendar lists |
|-----|----------------|
| **Mon** | 2–4 named concepts from this week’s Methods Market chapter |
| **Wed** | Remaining concepts from the **same** chapter |
| **Fri** | Capstone workshop named from Canvas Part / holy-handbook outline; no new concepts |

**Exceptions**

- Labor Day Mon Sep 7: no class. Ch. 5 concepts all on Wednesday.
- Fall Break Fri Oct 16: no class. Ch. 3 concepts Mon/Wed; Wednesday also carries the lit-review workshop.
- Thanksgiving Wed Nov 25 and Fri Nov 27: no class. Monday Nov 23 is a workshop-style checkpoint (no new chapter).
- Weeks 14 and 16: no new chapter. Mon/Wed list 2–4 **revisit** concepts from path chapters (5–7, 3, 12–13), not new titles. Friday is still a workshop.

---

## 3. Semester map

One Methods Market chapter per week. Canvas Part + holy handbook set the Friday workshop.

| Week | Dates | Part | MM chapter | Friday workshop |
|------|-------|------|------------|-----------------|
| 1 | Aug 17–21 | Part 1 | Ch. 1 Science of Psychology | Syllabus ack + Ch. 1 intro (due Fri) |
| 2 | Aug 24–28 | Part 1 | Ch. 2 Scientific Method | Phase 1 workshop / groups (due Fri) |
| 3 | Aug 31–Sep 4 | Part 1 | Ch. 4 Measurement | Article-review work session |
| 4 | Sep 7–11 | Part 1 | Ch. 5 Experimental | Article Review due Fri · **Mon Labor Day** |
| 5 | Sep 14–18 | Part 1 | Ch. 6 Non-experimental | Lit review Draft 1 work session |
| 6 | Sep 21–25 | Part 1 | Ch. 7 Survey | Lit Review Draft 1 due Fri |
| 7 | Sep 28–Oct 2 | Part 1 | Ch. 11 Presenting / APA | Lit review revision (refs + structure) |
| 8 | Oct 5–9 | Part 1 | Ch. 8 Quasi-experimental | Lit review revision (design labels) |
| 9 | Oct 12–16 | Part 1 | Ch. 3 Ethics | Lit review revision · **Fri Fall Break** (workshop on Wed) |
| 10 | Oct 19–23 | Part 1 | Ch. 9 Factorial | Lit Review Final due Fri |
| 11 | Oct 26–30 | Part 2 | Ch. 10 Single-subject | Phase 3 & 4 + HRT 1–3 |
| 12 | Nov 2–6 | Part 2 | Ch. 12 Descriptive stats | Methods + IRB first draft + HRT 4–5 |
| 13 | Nov 9–13 | Part 3 | Ch. 13 Inferential stats | IRB Final due Fri |
| 14 | Nov 16–20 | Part 3 | No new chapter (revisit 5–7 + 3) | Data-collection / IRB processing |
| 15 | Nov 23–27 | — | No new chapter | **Mon only** · Thanksgiving Wed/Fri |
| 16 | Nov 30–Dec 4 | Part 3 | No new chapter | IRB Status Update + plan (due Fri) |

---

## 4. Concept splits (Pressbooks section titles)

Drop the Pressbooks leading numbers (e.g. `1. Methods of Knowing` → `Methods of knowing`).

### Week 1 · Ch. 1 · Aug 17–21

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Aug 17 | Methods of knowing · Understanding science · Goals of science |
| Wed | Aug 19 | Science and common sense · Experimental and clinical psychologists |
| Fri | Aug 21 | Workshop: syllabus ack + Ch. 1 intro due |

### Week 2 · Ch. 2 · Aug 24–28

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Aug 24 | Model of scientific research · Finding a research topic · Generating good research questions · Developing a hypothesis |
| Wed | Aug 26 | Designing a research study · Analyzing the data · Drawing conclusions and reporting the results |
| Fri | Aug 28 | Workshop: Phase 1 / groups due |

### Week 3 · Ch. 4 · Aug 31–Sep 4

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Aug 31 | Understanding psychological measurement · Reliability and validity of measurement |
| Wed | Sep 2 | Practical strategies for psychological measurement |
| Fri | Sep 4 | Workshop: article-review work session |

### Week 4 · Ch. 5 · Sep 7–13

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Sep 7 | **No class — Labor Day** |
| Wed | Sep 9 | Experiment basics · Experimental design · Experimentation and validity · Practical considerations |
| Fri | Sep 11 | Workshop: Article Review due |

### Week 5 · Ch. 6 · Sep 14–18

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Sep 14 | Overview of non-experimental research · Correlational research · Complex correlation |
| Wed | Sep 16 | Qualitative research · Observational research |
| Fri | Sep 18 | Workshop: Lit review Draft 1 work session |

### Week 6 · Ch. 7 · Sep 21–25

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Sep 21 | Overview of survey research · Constructing surveys |
| Wed | Sep 23 | Conducting surveys |
| Fri | Sep 25 | Workshop: Lit Review Draft 1 due |

### Week 7 · Ch. 11 · Sep 28–Oct 2

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Sep 28 | APA Style · Writing a research report in APA style |
| Wed | Sep 30 | Other presentation formats |
| Fri | Oct 2 | Workshop: lit review revision (refs + structure) |

### Week 8 · Ch. 8 · Oct 5–9

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Oct 5 | One-group designs |
| Wed | Oct 7 | Non-equivalent groups designs |
| Fri | Oct 9 | Workshop: lit review revision (design labels) |

### Week 9 · Ch. 3 · Oct 12–16

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Oct 12 | Moral foundations of ethical research · From moral principles to ethics codes |
| Wed | Oct 14 | Putting ethics into practice · Workshop: lit review revision |
| Fri | Oct 16 | **No class — Fall Break** |

### Week 10 · Ch. 9 · Oct 19–23

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Oct 19 | Setting up a factorial experiment |
| Wed | Oct 21 | Interpreting the results of a factorial experiment |
| Fri | Oct 23 | Workshop: Lit Review Final due |

### Week 11 · Ch. 10 · Oct 26–30

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Oct 26 | Overview of single-subject research · Single-subject research designs |
| Wed | Oct 28 | The single-subject versus group debate |
| Fri | Oct 30 | Workshop: Phase 3 & 4 + HRT 1–3 |

### Week 12 · Ch. 12 · Nov 2–6

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Nov 2 | Describing single variables · Describing statistical relationships |
| Wed | Nov 4 | Expressing your results |
| Fri | Nov 6 | Workshop: Methods + IRB first draft + HRT 4–5 |

### Week 13 · Ch. 13 · Nov 9–13

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Nov 9 | Understanding null hypothesis testing · Some basic null hypothesis tests |
| Wed | Nov 11 | Additional considerations · From the replicability crisis to open science |
| Fri | Nov 13 | Workshop: IRB Final due |

### Week 14 · no new chapter · Nov 16–20

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Nov 16 | Revisit: experimental / non-experimental / survey path (Ch. 5–7) as it applies to this group’s design |
| Wed | Nov 18 | Revisit: putting ethics into practice (Ch. 3) in the IRB protocol |
| Fri | Nov 20 | Workshop: data-collection / IRB processing |

### Week 15 · Thanksgiving · Nov 23–27

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Nov 23 | Workshop: capstone checkpoint (IRB status, what is left) — only meeting this week |
| Wed | Nov 25 | **No class — Thanksgiving** |
| Fri | Nov 27 | **No class — Thanksgiving** |

### Week 16 · capstone · Nov 30–Dec 4

| Day | Date | On the calendar |
|-----|------|-----------------|
| Mon | Nov 30 | Revisit: describing results / analysis plan (Ch. 12–13) for the detailed plan |
| Wed | Dec 2 | Revisit: consent and procedure language for the status update |
| Fri | Dec 4 | Workshop: IRB Status Update + detailed plan due |

No regular M/W/F cards in finals week (Dec 7–11) unless a section final is later scheduled.

---

## 5. Artifacts

### 5.1 Instructor calendar (statassignments)

`docs/teaching/psyc4223-fall2026-mwf-concept-calendar.md`

- Short how-to: open today’s week; Mon/Wed = concepts; Fri = workshop; 12:00–12:50.
- Semester map table.
- Every meeting as a three-row stub (date, concepts or workshop, no-class note).
- Pointers: Methods Market `https://methods-market.clneu.com/class/research-methods`; Canvas 2406.

Do **not** copy Statistics hybrid lanes, Mentimeter repertoire, or the 50-minute ritual skeleton.

### 5.2 OWUI day cards (teaching pack) — required for access

Pack: `$CURSOR_MEMORY/teaching` (git repo `cursor-memory`).  
Runtime: neu1 Docker `open-webui` at `/app/backend/data/teaching`.  
Tool already registered: Workspace Tools → `teaching_today`, enabled on `qwythos:5` only.

`teaching_today(date="", course_id="")` reads `days/<course_id>/<YYYY-MM-DD>.md`. Empty `course_id` returns every course that has a card that day. Cards sort by the `- When:` clock so Statistics 08:00 appears before Research Methods 12:00.

**Must change**

1. `courses.json` entry `psyc-4223`: set `"meeting"` to `"M/W/F 12:00-12:50"` (replace `"weekly Methods Market + Canvas dues"`).
2. Replace weekly stubs under `days/psyc-4223/` with **one card per M/W/F date** listed in §4 (including no-class days).
3. Update `scripts/generate_day_cards.py` `research_methods()` so regenerating cards does not wipe the M/W/F concept calendar.
4. After commit/push of `cursor-memory`, on neu1:

```bash
git -C ~/cursor-memory pull
docker cp ~/cursor-memory/teaching/. open-webui:/app/backend/data/teaching/
```

No new OWUI tool source paste unless `teaching_today.py` itself changes (it should not).

**Day card schema** (keep existing fields so `playbook_for` still parses `- When:`):

```
# Research Methods - YYYY-MM-DD
- Course: PSYC-4223 · Canvas 2406
- When: 12:00-12:50   # or "no class"
- Topic: Mon: <concepts>   # or Wed:/Fri: workshop line; no-class days repeat the reason
- Reading: Ch. N <short title>   # or "No new chapter — revisit …"
- Ritual / skeleton: Concepts day (listed Topic)   # or Workshop: no new concepts / No class
- Dues: <that week's Canvas due, or none>
- Pointers: https://methods-market.clneu.com/class/research-methods; Canvas 2406
```

Instructor prompt in OWUI: `teaching_today` with `course_id=psyc-4223` (optional `date=YYYY-MM-DD`). Default date is today, America/Chicago.

---

## 6. Testing

- `pytest` in the teaching pack: `playbook_for("2026-08-17", "psyc-4223")` contains `12:00` and Ch. 1 concept names; `playbook_for("2026-09-07", "psyc-4223")` contains `Labor Day`; a date with both stats and RM cards lists 08:00 before 12:00.
- After neu1 `docker cp`, from OWUI on `qwythos:5`: `teaching_today` with `course_id=psyc-4223` returns the card for that Chicago date.

---

## 7. Out of scope

- Canvas due dates, points, Part modules, or new “Class: Mon …” pages
- Methods Market chapter HTML, Concept Review banks, or the locked `WEEKLY_SCHEDULE_RAW`
- Statistics playbook rewrite
- Mentimeter / Zoom lane scripts
- Finals-week meeting cards
- New OWUI Workspace Tool (reuse `teaching_today`)

---

## 8. Sources

- Methods Market chapters: `src/content/topics/rm-chapter-*__rm-module-*/jamovi.html` section titles
- Week/chapter/dues: `src/data/fall2026ResearchMethodsSchedule.js`
- Canvas Parts: `CANVAS_COURSE_PARTS` in `src/data/researchMethodsTextbook.js` and course 2406 modules (Part 1 / 2 / HRT / Part 3 / Method Types)
- Stats shape reference: `docs/teaching/psyc4213-fall2026-mwf-interactive-playbook.md` (shape only)
- OWUI pack: `$CURSOR_MEMORY/teaching` README “Sync neu1”
