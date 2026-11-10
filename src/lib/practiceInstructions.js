// Structured Module 8 directions shared by the page and recorder pop-outs.
export function instructionItems(exercise) {
 if (exercise.instructionSteps) return exercise.instructionSteps;
 return (exercise.instructions || '').split(/\n+|\s*\(\d+\)\s*|(?<=\.)\s+(?=[A-Z])/).map(s => s.trim()).filter(Boolean);
}
const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function instructionHtml(exercise) {
 return '<ul class="task-directions">' + instructionItems(exercise).map(item => '<li>'+escape(item)+'</li>').join('') + '</ul>';
}
