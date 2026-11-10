

// Module 8 topics organized by chapter
const CHAPTER_10_TOPICS = [
  'chi-square-goodness-of-fit',
  'chi-square-independence',
  'chi-square-corrections-effect-size',
  'chi-square-assumptions-fisher',
  'mcnemar-test'
]

const CHAPTER_11_TOPICS = [
  'one-sample-z-test',
  'one-sample-t-test',
  'independent-t-test',
  'welch-t-test',
  'paired-t-test'
]

const CHAPTER_12_TOPICS = [
  'correlation',
  'scatterplots',
  'simple-regression',
  'multiple-regression',
  'regression-inference',
  'regression-assumptions',
  'model-selection'
]

const CHAPTER_13_TOPICS = [
  'one-way-anova-basics',
  'post-hoc-tests-anova',
  'anova-assumptions',
  'repeated-measures-anova'
]

const ALL_MODULE_8_TOPICS = [
  ...CHAPTER_10_TOPICS,
  ...CHAPTER_11_TOPICS,
  ...CHAPTER_12_TOPICS,
  ...CHAPTER_13_TOPICS
]

// Chapter metadata
export const CHAPTERS = {
  'chapter-10': {
    number: 10,
    title: 'Categorical Data Analysis',
    topics: CHAPTER_10_TOPICS
  },
  'chapter-11': {
    number: 11,
    title: 'Comparing Two Means (T-Tests)',
    topics: CHAPTER_11_TOPICS
  },
  'chapter-12': {
    number: 12,
    title: 'Correlation and Linear Regression',
    topics: CHAPTER_12_TOPICS
  },
  'chapter-13': {
    number: 13,
    title: 'Comparing Several Means (ANOVA)',
    topics: CHAPTER_13_TOPICS
  }
}


export const MIN_CHAPTERS = 2;
export const CHAPTER_GUIDANCE = {
 'chapter-10': {why:'Use counts and categories to compare observed frequencies with expectations or examine associations.',example:'Is major associated with stress category?',includes:'Goodness-of-fit, independence, expected counts, effect sizes, Fisher exact and paired categorical data.'},
 'chapter-11': {why:'Compare a quantitative mean with a reference value, two independent groups, or paired measurements.',example:'Do groups differ in scores, or do the same people improve after tutoring?',includes:'One-sample, independent, Welch and paired tests; assumptions, effect sizes and alternatives.'},
 'chapter-12': {why:'Examine relationships between quantitative variables and predict a quantitative outcome.',example:'How are study hours related to exam scores, and how well do they predict them?',includes:'Scatterplots, correlation, simple and multiple regression, assumptions and interpretation.'},
 'chapter-13': {why:'Compare quantitative outcomes across three or more groups or repeated conditions.',example:'Do scores differ across Traditional, Online and Hybrid teaching methods?',includes:'One-way ANOVA, post-hoc comparisons, assumptions and repeated-measures analyses.'}
};
export function chapterFor(item) {
 const key = typeof item==='string' ? item : (item.practiceObjectiveKey || item.id || item.topic || '');
 const topic = typeof item==='string' ? item : item.topic;
 if (/anova|post-hoc|repeated-measures|mauchly|friedman|kruskal/.test(key)) return 'chapter-13';
 if (/chisq|chi-square|categorical|mcnemar/.test(key)) return 'chapter-10';
 if (/ttest|t-test|independent-t|onesample|one-sample|cohens-d|normality|wilcoxon|one-sided|nonparametric/.test(key)) return 'chapter-11';
 if (/correlation|regression|scatterplot|model-selection/.test(key)) return 'chapter-12';
 for (const [key,c] of Object.entries(CHAPTERS)) if(c.topics.includes(topic)) return key;
 return typeof item==='object' ? item.chapter || null : null;
}
export function validChapters(keys) {return [...new Set(keys || [])].filter(k=>Object.hasOwn(CHAPTERS,k));}
export function canSaveChapters(keys) {return validChapters(keys).length>=MIN_CHAPTERS;}
export function topicsForChapters(keys) {
 return validChapters(keys).flatMap(k=>[...CHAPTERS[k].topics,...(k==='chapter-11'?['effect-size-cohens-d','one-sided-tests','checking-normality','wilcoxon-tests']:[])]);
}
export function includesChapter(item,keys) {return validChapters(keys).includes(chapterFor(item));}
export function module8CompletionId(id, keys) { return id+'::chapters-v2:'+validChapters(keys).sort().join('+'); }
export function scopeModule8Lesson(lesson,keys) {
 if (!lesson || lesson.module!=='stats-module-8') return lesson;
 const selected=validChapters(keys), phases={...lesson.phases};
 const sections=(phases.iDo?.sections || []).filter(s=>includesChapter(s,selected));
 phases.iDo={...phases.iDo,sections};
 const stepChapters=['chapter-10','chapter-10','chapter-11','chapter-11','chapter-11','chapter-12','chapter-12','chapter-12','chapter-13'];
 phases.weDo={...phases.weDo,instructions:'Complete every guided step below for your selected chapters. Other chapters are optional.',steps:(phases.weDo?.steps||[]).filter((s,i)=>selected.includes(s.chapter || stepChapters[i]))};
 const checkTopics={'chapter-10':['Category counts and associations','Average paired change','Predicting a continuous outcome','Comparing several means'],'chapter-11':['Comparing one mean or two means, including paired data','Category counts only','Predicting outcomes only','Comparing four independent means only'],'chapter-12':['Relationships and prediction for quantitative variables','Paired category counts','Expected category proportions','Comparing three group means only'],'chapter-13':['Comparing three or more means or repeated conditions','Only comparing two category counts','Only a single reference mean','Only predicting one outcome']};
 phases.selfCheck={title:'Analysis choice self-check',description:'Choose the analysis purpose that matches each selected chapter.',screenshotRecognition:selected.map(k=>({id:'chapter-purpose-'+k,question:'Which question is addressed by '+CHAPTERS[k].title+'?',options:checkTopics[k],correct:0,explanation:CHAPTER_GUIDANCE[k].why}))};
 phases.youDo={...phases.youDo,instructions:'Complete all listed Apply tasks for your selected chapters, using the exact datasets named in each task. Record your work and submit the required evidence through the existing submission workflow. Unselected chapters are optional and do not count as unfinished work.'};
 return {...lesson,completionId:module8CompletionId(lesson.id,selected),overview:'Choose a minimum of two complete chapters. Finish the readings, Learn walkthroughs, guided practice, self-check and required Apply tasks for each selected chapter. Additional chapters are optional.',objectives:selected.map(k=>CHAPTERS[k].title+': '+CHAPTER_GUIDANCE[k].includes),estimatedTime:sections.reduce((n,s)=>n+(s.estimatedTime||0),0),phases};
}

const QUESTION_CHAPTERS={
 'stats-m8-q1':['chapter-11'],'stats-m8-q2':['chapter-11'],'stats-m8-q3':['chapter-12'],
 'stats-m8-q4':['chapter-12'],'stats-m8-q5':['chapter-11','chapter-13'],
 'stats-m8-q6':['chapter-12'],'stats-m8-q7':['chapter-11'],'stats-m8-q8':['chapter-11'],
 'stats-m8-q9':['chapter-10'],'stats-m8-q10':['chapter-10','chapter-11','chapter-12','chapter-13'],
 'stats-m8-q11':['chapter-12'],'stats-m8-q12':['chapter-12'],
 'stats-m8-q13':['chapter-10','chapter-11','chapter-12','chapter-13'],
 'stats-m8-q14':['chapter-12'],'stats-m8-q15':['chapter-13'],'stats-m8-q16':['chapter-13'],
 'stats-m8-q17':['chapter-10','chapter-11','chapter-12','chapter-13'],
 'stats-m8-q18':['chapter-11','chapter-13'],'stats-m8-q19':['chapter-11']
};
export function filterModule8Questions(questions,keys) {
 const selected=validChapters(keys);
 return questions.filter(q=>{
  if(q.moduleId!=='stats-module-8')return true;
  const chapters=QUESTION_CHAPTERS[q.id];
  if(!chapters) return false;
  // The matching question requires every chapter in its scenarios.
  return q.id==='stats-m8-q10' ? chapters.every(k=>selected.includes(k)) : chapters.some(k=>selected.includes(k));
 });
}
