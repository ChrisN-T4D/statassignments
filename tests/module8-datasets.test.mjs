import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {statisticsExercises} from '../src/data/statisticsPractices.js';
import {module8Datasets} from '../src/data/module8Datasets.js';
const read=f=>fs.readFileSync(new URL('../public/'+f,import.meta.url),'utf8').trim().split(/\r?\n/).map(x=>x.split(','));
test('Every Module 8 software analysis has a supplied dataset',()=>{
 const missing=statisticsExercises.filter(x=>x.module==='module-8'&&x.software_type!=='conceptual'&&!['written_response','conceptual'].includes(x.exercise_type)&&!x.dataset);
 assert.deepEqual(missing.map(x=>x.practiceObjectiveKey+' '+x.software_type),[]);
});
test('Every assigned file is published and its requested columns exist',()=>{
 for(const x of statisticsExercises.filter(x=>x.dataset)){
 const [header,...rows]=read(x.dataset.filename);
 assert.ok(rows.length>=16,x.dataset.filename);
 for(const c of x.dataset.columns)assert.ok(header.includes(c),x.practiceObjectiveKey+': '+c);
 assert.ok(x.instructions.includes(x.dataset.filename));
 assert.equal(x.sample_data,null);
 }
 for(const d of module8Datasets)assert.ok(fs.existsSync(new URL('../dist'+d.url,import.meta.url)),d.filename);
});
test('Survey has 300 rows, three majors and three stress categories',()=>{
 const [header,...rows]=read('module8_survey.csv');
 assert.equal(rows.length,300);
 assert.equal(new Set(rows.map(r=>r[1])).size,3);
 assert.equal(new Set(rows.map(r=>r[2])).size,3);
 const totals={};for(const r of rows)totals[r[1]]=(totals[r[1]]||0)+1;
 assert.deepEqual(Object.values(totals),[100,100,100]);
});
test('Learning data supports independent groups, all factorial cells, and matched repeated observations',()=>{
 const [h,...rows]=read('module8_learning.csv');const col=c=>h.indexOf(c);
 assert.equal(rows.length,90);
 assert.equal(new Set(rows.map(r=>r[0])).size,90);
 assert.equal(new Set(rows.map(r=>r[col('Group')]+' '+r[col('Method')])).size,6);
 for(const c of ['Before','After','Speech','Conceptual','Syntax','Score','MethodScore','StudyHours','ExamScore','SleepHours'])
 assert.ok(rows.every(r=>Number.isFinite(Number(r[col(c)]))));
 const diffs=rows.map(r=>Number(r[col('After')])-Number(r[col('Before')]));
 assert.ok(new Set(diffs).size>1);
});
test('Known categorical counts agree with task directions',()=>{
 const [, ...suits]=read('module8_suits.csv');const counts={};
 for(const r of suits)counts[r[1]]=(counts[r[1]]||0)+1;
 assert.deepEqual(counts,{clubs:35,diamonds:51,hearts:64,spades:50});
 const [, ...paired]=read('module8_paired_categories.csv');assert.equal(paired.length,100);
 const [, ...small]=read('module8_small_counts.csv');assert.equal(small.length,16);
});

import {withModule8Dataset} from '../src/data/module8Datasets.js';
test('Non-Module-8 tasks remain unchanged',()=>{for(const module of ['module-2','module-3','module-4','module-5','module-6','module-7','rm-module-8']){const ex={module,instructions:'Unchanged',software_type:'jamovi'};assert.equal(withModule8Dataset(ex),ex);}});
