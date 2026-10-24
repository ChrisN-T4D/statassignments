import { test } from 'node:test'
import { ok, strictEqual, deepStrictEqual } from 'node:assert'
import {
  RESEARCH_METHODS_SCHEDULES,
  chapterLinks,
  findTargetWeek,
  hasSchedule,
  parseScheduleDate,
  scheduleFamily
} from '../src/data/researchMethodsSchedule.js'
import { modulesByClass } from '../src/data/modules.js'
import { getAssignmentById } from '../src/data/assignmentHelp.js'

const schedules = Object.values(RESEARCH_METHODS_SCHEDULES)
// Experimental shares the research-methods class page, so its help pages live under that class
const helpClass = (slug) => (slug === 'experimental' ? 'research-methods' : slug)

test('every schedule starts weeks on a Monday, seven days apart', () => {
  for (const sched of schedules) {
    sched.weeks.forEach((w, i) => {
      const d = parseScheduleDate(w.start)
      strictEqual(d.getDay(), 1, `${sched.slug} week ${i + 1} (${w.start}) is not a Monday`)
      if (i > 0) {
        const prev = parseScheduleDate(sched.weeks[i - 1].start)
        strictEqual(Math.round((d - prev) / 86400000), 7, `${sched.slug} week ${i + 1} is not 7 days after week ${i}`)
      }
    })
  }
})

test('milestones and phases point at real weeks', () => {
  for (const sched of schedules) {
    const last = sched.weeks.length - 1
    sched.milestones.forEach((m) => ok(m.week >= 0 && m.week <= last, `${sched.slug} milestone ${m.label}`))
    sched.phases.forEach((p) => ok(p.from >= 0 && p.to <= last && p.from <= p.to, `${sched.slug} phase ${p.label}`))
    sched.minorWeeks.forEach((w) => ok(w >= 0 && w <= last))
  }
})

test('chapter and software items name modules that exist in the class', () => {
  for (const sched of schedules) {
    // Spring chapters (9-13) open through /topic pages; the experimental class page lists only a few modules
    if (sched.slug === 'experimental') continue
    const ids = new Set(modulesByClass[sched.slug].map((m) => m.id))
    sched.weeks.forEach((w, i) => {
      w.items
        .filter((it) => it.kind === 'chapter' || it.kind === 'software')
        .forEach((it) => ok(ids.has(it.moduleId), `${sched.slug} week ${i + 1}: unknown module ${it.moduleId}`))
    })
  }
})

test('assignment-help items resolve to a help page', () => {
  for (const sched of schedules) {
    sched.weeks.forEach((w, i) => {
      w.items
        .filter((it) => it.kind === 'assignment-help')
        .forEach((it) => ok(getAssignmentById(helpClass(sched.slug), it.assignmentId), `${sched.slug} week ${i + 1}: no help page ${it.assignmentId}`))
    })
  }
})

test('due dates fall in the week they are listed under', () => {
  for (const sched of schedules) {
    sched.weeks.forEach((w, i) => {
      const start = parseScheduleDate(w.start)
      w.items.filter((it) => it.due).forEach((it) => {
        const days = Math.round((parseScheduleDate(it.due) - start) / 86400000)
        ok(days >= 0 && days <= 6, `${sched.slug} week ${i + 1}: ${it.label} due ${it.due}`)
      })
    })
  }
})

test('chapterLinks: Research Methods reads on its own page, Statistics on the class page', () => {
  const rm = chapterLinks(RESEARCH_METHODS_SCHEDULES['research-methods'], { moduleId: 'rm-module-4' }, { classSlug: 'research-methods', from: 'research-methods.3' })
  strictEqual(rm.name, 'Ch. 4')
  deepStrictEqual(rm.read, { path: '/topic/rm-chapter-4', query: { from: 'research-methods.3' } })
  strictEqual(rm.review.query.module, 'rm-module-4')

  const st = chapterLinks(RESEARCH_METHODS_SCHEDULES.statistics, { moduleId: 'stats-module-4' }, { classSlug: 'statistics' })
  strictEqual(st.name, 'Module 4')
  strictEqual(st.read.path, '/class/statistics')
  strictEqual(st.read.query.module, 'stats-module-4')
  strictEqual(st.review.path, '/class/statistics/practice')
})

test('scheduleFamily: research methods is a year, the others one semester', () => {
  deepStrictEqual(scheduleFamily('research-methods').map((s) => s.slug), ['research-methods', 'experimental'])
  deepStrictEqual(scheduleFamily('experimental').map((s) => s.slug), ['research-methods', 'experimental'])
  deepStrictEqual(scheduleFamily('statistics').map((s) => s.slug), ['statistics'])
  deepStrictEqual(scheduleFamily('intro-research').map((s) => s.slug), ['intro-research'])
  ok(!hasSchedule('nope'))
})

test('findTargetWeek stays inside the asked class', () => {
  const today = new Date('2027-02-10T12:00:00')
  const intro = findTargetWeek({ kind: 'chapter', id: 4 }, { classSlug: 'intro-research', today })
  strictEqual(intro.schedule.slug, 'intro-research')
  const stats = findTargetWeek({ kind: 'chapter', id: 4 }, { classSlug: 'statistics', today })
  strictEqual(stats.schedule.slug, 'statistics')
})
