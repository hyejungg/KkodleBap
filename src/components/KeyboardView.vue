<template>
  <div class="keyboard-view">
    <div v-for="(row, rowIndex) in keyRows" :key="rowIndex" class="keyboard-row">
      <button
        v-for="key in row"
        :key="key"
        class="key"
        :class="getKeyClass(key)"
        @click="handleKeyPress(key)"
      >
        <img v-if="key === 'backspace'" src="@/assets/icons/backspace.svg" alt="Backspace" />
        <img v-else-if="key === 'enter'" src="@/assets/icons/check.svg" alt="Enter" />
        <span v-else>{{ key }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  return 'key-char';
};
</script>

<style scoped>
.keyboard-view {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 1rem;
  background-color: #FFFFFF; /* Assuming a white background */
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
  background-color: var(--blue-100);
  color: var(--gray-700);
}

.key-char:hover {
  background-color: #dbeffc;
}

.key-special {
  flex-grow: 1;
  min-width: 44px;
}

.key-backspace {
  background-color: var(--gray-200);
}

.key-backspace:hover {
  background-color: #c4c4c8;
}

.key-enter {
  background-color: var(--blue-600);
  color: white;
}

.key-enter:hover {
  background-color: #2980b9;
}
</style>
