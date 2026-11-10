import test from 'node:test';
import assert from 'node:assert/strict';
import {statisticsExercises} from '../src/data/statisticsPractices.js';
import {consolidateModule8Exercises,withModule8Dataset} from '../src/data/module8Datasets.js';
import {chapterFor,CHAPTERS} from '../src/data/module8Chapters.js';
import {instructionItems,instructionHtml} from '../src/lib/practiceInstructions.js';
test('Repeated analyses consolidate within software while preserving other modules and packages',()=>{
 const ex=(key,software='jamovi')=>withModule8Dataset({module:'module-8',practiceObjectiveKey:key,software_type:software,is_active:true});
 const other={module:'module-7',is_active:true};
 const rows=consolidateModule8Exercises([other,ex('m8-ttest-independent-nav'),ex('m8-ttest-full-writeup'),ex('m8-ttest-full-writeup','spss'),ex('m8-ttest-paired-nav')]);
 assert.equal(rows.length,4);assert.equal(rows[0],other);
 assert.ok(rows[1].instructionSteps.some(x=>x.includes('Shapiro-Wilk')));
 assert.ok(rows[1].instructionSteps.some(x=>x.includes('95% CI')));
 assert.ok(rows[1].instructionSteps.some(x=>x.includes('APA-style')));
});
test('Distinct methods retain separate task directions',()=>{
 for(const software of ['jamovi','spss','r','excel','stata']){
 const rows=statisticsExercises.filter(x=>x.module==='module-8'&&x.software_type===software&&x.is_active);
 for(const key of ['m8-chisq-gof','m8-chisq-custom-proportions','m8-anova-friedman']){
 const row=rows.find(x=>x.practiceObjectiveKey===key);
 if(row)assert.ok(row.instructionSteps.length>=4,key);
 }
 const signatures=rows.filter(x=>x.dataset).map(x=>x.instructions);
 assert.equal(new Set(signatures).size,signatures.length,software);
 const counts=Object.keys(CHAPTERS).map(chapter=>[chapter,rows.filter(x=>chapterFor(x)===chapter).length]);
 console.log(software,JSON.stringify(counts));
 }
});
test('Bullet instructions retain decimals, split numbered explanations and escape HTML',()=>{
 assert.deepEqual(instructionItems({instructions:'Report p = .05. Explain the result.'}),['Report p = .05.','Explain the result.']);
 assert.deepEqual(instructionItems({instructions:'Explain: (1) First item (2) Second item'}),['Explain:','First item','Second item']);
 assert.equal(instructionHtml({instructionSteps:['p < .05','A & B']}),'<ul class="task-directions"><li>p &lt; .05</li><li>A &amp; B</li></ul>');
});
