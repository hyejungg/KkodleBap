<template>
  <div class="keyboard-view" >
    <div v-for="(row, rowIndex) in keyRows" :key="rowIndex" class="keyboard-row">
      <button
        v-for="key in row"
        :key="key"
        :class="getKeyClass(key)"
        class="key"
        @click="handleKeyPress(key)"
      >
        <img v-if="key === 'backspace'" alt="Backspace" src="@/assets/icons/backspace.svg" />
        <img v-else-if="key === 'enter'" alt="Enter" src="@/assets/icons/check.svg" />
        <span v-else>{{ key }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  charStates: Record<string, string>;
}>();

const emit = defineEmits(['key-press']);

const keyRows = [
  ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'],
  ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
  ['backspace', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', 'enter'],
];

const handleKeyPress = (key: string) => {
  emit('key-press', key);
};

const getKeyClass = (key: string) => {
  if (key === 'backspace') return 'key-special key-backspace';
  if (key === 'enter') return 'key-special key-enter';

  const state = props.charStates[key];
  if (state === 'correct') return 'key-char correct';
  if (state === 'present') return 'key-char present';
  if (state === 'absent') return 'key-char absent';

  return 'key-char';
};
</script>

<style scoped>
.keyboard-view {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 1rem;
  background-color: #FFFFFF; /* Assuming a white background */
  max-width: 500px; /* Adjust as needed for larger screens */
  margin: 0 auto; /* Center the keyboard */
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.key {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6.36px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  width: 33px;
  height: 41px;
  transition: background-color 0.2s;
}

.key-char {
  background-color: var(--color-blue-100);
  color: var(--color-gray-700);
}

.key-char:hover {
  background-color: #dbeffc;
}

.key-special {
  flex-grow: 1;
  min-width: 44px;
}

.key-backspace {
  background-color: var(--color-gray-200);
}

.key-backspace:hover {
  background-color: #c4c4c8;
}

.key-enter {
  background-color: var(--color-blue-600);
  color: white;
}

.key-enter:hover {
  background-color: #2980b9;
}

.key-char.correct {
  background-color: var(--color-blue-600);
  color: var(--color-gray-700);
}

.key-char.present {
  background-color: var(--color-blue-400);
  color: var(--color-gray-700);
}

.key-char.absent {
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);
}
</style>
