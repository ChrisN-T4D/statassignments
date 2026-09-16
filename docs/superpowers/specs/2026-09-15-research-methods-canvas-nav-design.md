# Research Methods — Canvas-aligned navigation

**Date:** 2026-09-15  
**Status:** Implemented

## Problem

Methods Market grouped Pressbooks chapters by coarse parts (Part 1 = Ch 1–2 only; Part 2 = all design chapters). Canvas organizes by **capstone phases** (Phase 1 article review, Phase 2 lit review, Phase 3/4 worksheets). Study Plan lived only in the header, not in the course module menus.

## Solution

New `researchMethodsCourseNav.js` defines Part → Phase → items matching Canvas assignment groups:

| Part | Phases | Study Plan sections |
|------|--------|---------------------|
| Part 1 — Introduction & literature review | Intro, Phase 1 topic, Article Review, Lit Review | Article Review, Lit Review Outline |
| Part 2 — Research question & methodological route | Phase 3 & 4, Methods Section, Method paths | Phase 3, Phase 4 |
| Part 3 — Ethics, training & IRB | HRT, IRB | — (assignment-help links) |
| Analysis | By path | — |

Module menu items:

- **Chapter** — opens module content (Topics / Concept Review) as before
- **Study Plan** — routes to `/class/research-methods/study-plan/:sectionId`
- **Assignment Help** — routes to assignment detail (paths, HRT, IRB)

## Files

- `src/data/researchMethodsCourseNav.js` — nav config + resolver
- `src/views/ClassHome.vue` — phased module lists for research-methods
- `src/data/researchMethodsTextbook.js` — part titles aligned with Canvas group names

## Not changed

- Experimental course nav (still chapter-based parts)
- Study Plan hub route (still available from header)
- Canvas assignment descriptions (already synced)
