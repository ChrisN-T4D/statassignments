import test from 'node:test';
import assert from 'node:assert/strict';
import {statsModule8Questions} from '../src/data/conceptQuestions.js';
import {filterModule8Questions} from '../src/data/module8Chapters.js';
test('Categorical and t-test selection excludes regression and ANOVA questions',()=>{
 const ids=filterModule8Questions(statsModule8Questions,['chapter-10','chapter-11']).map(q=>q.id);
 assert.ok(ids.includes('stats-m8-q9'));
 assert.ok(ids.includes('stats-m8-q1'));
 for(const id of ['stats-m8-q3','stats-m8-q6','stats-m8-q14','stats-m8-q15','stats-m8-q16','stats-m8-q10'])assert.ok(!ids.includes(id),id);
});
test('Regression and ANOVA selection excludes categorical and t-test questions',()=>{
 const ids=filterModule8Questions(statsModule8Questions,['chapter-12','chapter-13']).map(q=>q.id);
 for(const id of ['stats-m8-q3','stats-m8-q14','stats-m8-q15','stats-m8-q16'])assert.ok(ids.includes(id),id);
 for(const id of ['stats-m8-q1','stats-m8-q2','stats-m8-q7','stats-m8-q9','stats-m8-q19'])assert.ok(!ids.includes(id),id);
});
test('No selected chapters yields no Module 8 questions',()=>{
 assert.deepEqual(filterModule8Questions(statsModule8Questions,[]),[]);
});
test('Every question is available when all four chapters are selected',()=>{
 assert.deepEqual(filterModule8Questions(statsModule8Questions,['chapter-10','chapter-11','chapter-12','chapter-13']),statsModule8Questions);
});
test('Other modules remain unchanged',()=>{
 const other={id:'other',moduleId:'stats-module-7'};assert.deepEqual(filterModule8Questions([other],[]),[other]);
});
