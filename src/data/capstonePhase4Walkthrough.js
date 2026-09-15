/**
 * Interactive spotlight tour for Phase 4 operationalization: guide only.
 */

export const PHASE4_TOUR_STORAGE_KEY = 'study-plan-phase4-tour-completed'

export const PHASE4_TOUR_STEPS = [
  {
    id: 'intro',
    target: 'tour-p4-intro',
    title: 'Turn your research question into a study plan',
    body:
      'Phase 4 asks how you could actually collect data for your one research question. You will define variables conceptually and operationally, sketch four possible methods, compare them honestly, and choose ONE path. Submit with Phase 3 in Canvas.',
    beforeShow: null
  },
  {
    id: 'reminders',
    target: 'tour-p4-reminders',
    title: 'Build on Phase 3 and your outline',
    body:
      'Your elevator speech, working RQ, and lit review outline are starting points, not copy-paste answers. Use them to stay aligned with the gap you already argued, then get specific about measurement and data collection here.',
    beforeShow: null
  },
  {
    id: 'part-a',
    target: 'tour-p4-part-a',
    title: 'Part A: Recap topic and question',
    body:
      'State your broad topic area and proposed research question in one place so every pathway below answers the same question. Copy your working RQ from the Lit Review Outline if you have not typed it here yet.',
    narrow: 'RQ still vague? Name one IV, one DV, and one population before Part B.',
    widen: 'RQ lists three relationships? Pick the one relationship you will test this semester.',
    beforeShow: null
  },
  {
    id: 'part-b-conceptual',
    target: 'tour-p4-part-b-conceptual',
    title: 'Part B: Conceptual IV and DV',
    body:
      'Conceptual definitions describe what your variables mean as constructs in your field, the ideas your literature discusses. Pull language from your theme buckets and article cards; do not invent new constructs that never appear in your sources.',
    narrow: 'Sounds like a measure (“score on PHQ-9”)? Step back to the underlying construct.',
    widen: 'One vague word each? Add how your sources define the construct and why it matters.',
    beforeShow: null
  },
  {
    id: 'part-b-operational',
    target: 'tour-p4-part-b-operational',
    title: 'Part B: Operational IV and DV',
    body:
      'Operational definitions say how you would manipulate or measure each variable in a real study, specific enough that another researcher could replicate your procedure. Name scales, task rules, observation codes, or dataset fields; include levels or scoring when you can.',
    narrow: 'Still abstract? Name the exact survey item, task, condition, or variable column.',
    widen: 'Full methods section here? Keep Part B to IV/DV only, pathway details go in Part C.',
    beforeShow: null
  },
  {
    id: 'part-c',
    target: 'tour-p4-part-c',
    title: 'Part C: Explore four data-collection paths',
    body:
      'For each pathway, describe how your IV and DV would work if you used that method, survey scales, experimental task, observation, or archival dataset. Mark a path “not viable” when it truly cannot answer your question; ruling paths out is strong design thinking.',
    beforeShow: null
  },
  {
    id: 'part-d',
    target: 'tour-p4-part-d',
    title: 'Part D: Compare pathways side by side',
    body:
      'Use the table to compare feasibility, access, measurement quality, and ethics for each path you still consider viable. The Canvas Helpful Table shows example IV/DV logic, you decide which path fits your question and your semester.',
    beforeShow: null
  },
  {
    id: 'part-e',
    target: 'tour-p4-part-e',
    title: 'Part E: Commit to one pathway',
    body:
      'Choose the single data-collection strategy you will pursue in the methods section. That choice unlocks the data analysis helper for your path so you can preview the stats or analysis approach that matches your design.',
    beforeShow: null
  },
  {
    id: 'export',
    target: 'tour-p4-export',
    title: 'Export for Canvas',
    body:
      'Copy the full worksheet text for Parts A–E (conceptual and operational definitions included) and paste into the Phase 4 assignment. Submit together with Phase 3 on the due date shown in Canvas.',
    beforeShow: null
  }
]
