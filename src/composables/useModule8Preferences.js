import {ref,computed} from 'vue';
import {CHAPTERS,CHAPTER_GUIDANCE,validChapters,canSaveChapters,topicsForChapters,chapterFor,includesChapter} from '../data/module8Chapters.js';
const STORAGE_KEY='module8SelectedTopics';
const saved=ref([]);
try {
 const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
 // Old individual-topic choices need explicit confirmation under the two-chapter requirement.
 if(data?.version===2 && data.hasCompleted && canSaveChapters(data.selectedChapters)) saved.value=validChapters(data.selectedChapters);
} catch {}
const selectedTopics=computed(()=>new Set(topicsForChapters(saved.value)));
export function useModule8Preferences(){
 const saveChapters=keys=>{
  if(!canSaveChapters(keys)) return false;
  const chapters=validChapters(keys);
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:2,selectedChapters:chapters,selectedTopics:topicsForChapters(chapters),hasCompleted:true}));saved.value=chapters;return true;}catch{return false;}
 };
 return {
  selectedChapters:computed(()=>saved.value),selectedTopics,
  hasCompletedSelection:computed(()=>canSaveChapters(saved.value)),
  selectedCount:computed(()=>selectedTopics.value.size),
  totalTopics:computed(()=>Object.values(CHAPTERS).flatMap(c=>c.topics).length),
  isTopicSelected:id=>saved.value.includes(chapterFor(id)),
  isExerciseSelected:ex=>includesChapter(ex,saved.value),
  getSelectedTopicsForChapter:key=>saved.value.includes(key)?CHAPTERS[key]?.topics||[]:[],
  isChapterFullySelected:key=>saved.value.includes(key),
  getChapters:()=>Object.entries(CHAPTERS).map(([key,c])=>({key,...c,...CHAPTER_GUIDANCE[key]})),
  saveChapters,
  savePreferences:()=>saveChapters(saved.value),
  resetPreferences:()=>{saved.value=[];try{localStorage.removeItem(STORAGE_KEY);}catch{}},
  ALL_MODULE_8_TOPICS:Object.values(CHAPTERS).flatMap(c=>c.topics)
 };
}
