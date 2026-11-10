import test from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTERS,canSaveChapters,chapterFor,topicsForChapters,includesChapter,scopeModule8Lesson,module8CompletionId} from '../src/data/module8Chapters.js';
import {statisticsExercises} from '../src/data/statisticsPractices.js';
import {module8UnifiedLessons} from '../src/data/softwareLessons_module8_unified.js';
test('Minimum is two distinct complete chapters, with invalid identifiers ignored',()=>{
 assert.equal(canSaveChapters([]),false);assert.equal(canSaveChapters(['chapter-11']),false);
 assert.equal(canSaveChapters(['chapter-11','chapter-11']),false);
 assert.equal(canSaveChapters(['chapter-11','invalid']),false);
 assert.equal(canSaveChapters(['chapter-10','chapter-11']),true);
});
test('Whole t-test chapter includes one-sample, independent, Welch and paired topics',()=>{
 const ids=topicsForChapters(['chapter-11']);
 for(const id of ['one-sample-t-test','independent-t-test','welch-t-test','paired-t-test'])assert.ok(ids.includes(id));
});
test('Every active Module 8 exercise has an unambiguous chapter, across software variants',()=>{
 for(const ex of statisticsExercises.filter(e=>e.module==='module-8'&&e.is_active!==false))
 assert.ok(Object.hasOwn(CHAPTERS,chapterFor(ex)),ex.practiceObjectiveKey+' '+ex.topic);
});
test('ANOVA metadata cannot accidentally put ANOVA tasks in t-test chapter',()=>{
 assert.equal(chapterFor({practiceObjectiveKey:'m8-anova-oneway-nav',chapter:'chapter-11'}),'chapter-13');
});
test('All six two-chapter combinations filter sections, guided steps and tasks',()=>{
 const keys=Object.keys(CHAPTERS);
 for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
 const selected=[keys[i],keys[j]],lesson=scopeModule8Lesson(module8UnifiedLessons[0],selected);
 assert.ok(lesson.phases.iDo.sections.length>0);
 for(const section of lesson.phases.iDo.sections)assert.ok(includesChapter(section,selected),section.id);
 assert.ok(lesson.phases.weDo.steps.length>0);
 assert.equal(lesson.phases.selfCheck.screenshotRecognition.length,2);
 for(const ex of statisticsExercises.filter(e=>e.module==='module-8')){
 assert.equal(includesChapter(ex,selected),selected.includes(chapterFor(ex)));
 }
 }
});
test('Scoping never mutates shared lessons or other modules',()=>{
 const original=JSON.stringify(module8UnifiedLessons[0]);
 scopeModule8Lesson(module8UnifiedLessons[0],['chapter-10','chapter-11']);
 assert.equal(JSON.stringify(module8UnifiedLessons[0]),original);
 const other={module:'stats-module-7'};assert.equal(scopeModule8Lesson(other,[]),other);
});
test('Completion markers are independent of selection order and change with the chapter plan',()=>{
 assert.equal(module8CompletionId('lesson',['chapter-10','chapter-11']),module8CompletionId('lesson',['chapter-11','chapter-10']));
 assert.notEqual(module8CompletionId('lesson',['chapter-10','chapter-11']),module8CompletionId('lesson',['chapter-12','chapter-13']));
});
