<template>
  <svg
    class="milestone-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    v-html="markup"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true }
})

/** Hand-drawn line icons (24x24, stroked with currentColor). Static markup only. */
const ICONS = {
  search: '<path d="M13 3H6v18h6"/><path d="M13 3l4 4v3"/><circle cx="16" cy="16" r="3.5"/><path d="M18.6 18.6L21 21"/>',
  bulb: '<path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/><path d="M9.5 18.5h5M10.5 21h3"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 15.5h5"/>',
  ai: '<path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>',
  reply: '<path d="M4 5h16v11H10l-4 4v-4H4z"/><path d="M9 10.5h6M13 8l2.5 2.5L13 13"/>',
  books: '<path d="M4 4h4v16H4zM9.5 4h4v16h-4z"/><path d="M15 6l3.6-1 3 13.4-3.6 1z"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6"/>',
  ruler: '<rect x="3" y="8" width="18" height="8" rx="1.5"/><path d="M7 8v3M11 8v4M15 8v3M19 8v4"/>',
  clip: '<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 3h6v4H9zM9 12h6M9 16h4"/>',
  send: '<path d="M21 3L3 10.5l7 2.5 2.5 7z"/><path d="M10 13L21 3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 5-5"/>',
  flag: '<path d="M6 21V4"/><path d="M6 4h11l-2.5 4 2.5 4H6"/>',
  finish: '<path d="M6 21V4"/><path d="M6 4h12v9H6z"/><path d="M6 8.5h12M10 4v9M14 4v9"/>',
  poster: '<rect x="4" y="3" width="16" height="12" rx="1"/><path d="M8 11.5V9M12 11.5V7M16 11.5V8.5"/><path d="M9 21l3-6 3 6"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 01-8 0z"/><path d="M8 6H5v1.5A3 3 0 008 10.5M16 6h3v1.5a3 3 0 01-3 3"/><path d="M12 13v4M8.5 20h7M10 17h4"/>',
  peers: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',
  present: '<rect x="3" y="4" width="18" height="11" rx="1"/><path d="M12 15v4M8 20h8"/><path d="M7.5 11.5l3-3 2 2 3-3"/>'
}

const markup = computed(() => ICONS[props.name] ?? ICONS.doc)
</script>

<style scoped>
.milestone-icon {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
