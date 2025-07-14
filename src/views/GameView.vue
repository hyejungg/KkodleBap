<script lang="ts" setup>
import KeyboardView from "../components/KeyboardView.vue";
import { ref } from "vue";

const board = ref(Array(6).fill('').map(() => Array(6).fill('')));
const currentRow = ref(0);
const currentCol = ref(0);

const handleKeyPress = (key: string) => {
  if (key === 'Backspace') {
    if (currentCol.value > 0) {
      currentCol.value--;
      board.value[currentRow.value][currentCol.value] = '';
    }
  } else if (key === 'Enter') {
    // Handle submission later
    if (currentCol.value === 6) {
      // For now, just move to next row if full
      currentRow.value++;
      currentCol.value = 0;
    }
  } else if (currentCol.value < 6) {
    board.value[currentRow.value][currentCol.value] = key;
    currentCol.value++;
  }
};
</script>

<template>
  <div class="flex flex-col h-screen bg-white dark:bg-gray-900">
    <!-- Header -->
    <header class="relative flex justify-center items-center p-4">
      <img alt="KkodleBap Logo" class="h-12 w-auto" src="/logo.svg" />
      <img
        alt="Help"
        class="absolute right-4 h-6 w-6"
        src="/src/assets/icons/question-mark.svg"
      />
    </header>

    <!-- Game Board -->
    <main
      class="flex-grow flex flex-col items-center justify-center p-4 gap-2"
    >
      <div
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
        class="flex gap-2 w-full max-w-sm sm:max-w-md"
      >
        <div
          v-for="(char, cellIndex) in row"
          :key="cellIndex"
          class="flex-1 aspect-square bg-blue_100 rounded-[7.69px] flex items-center justify-center text-2xl font-bold text-gray-800 dark:text-white shadow-sm"
        >
          {{ char }}
        </div>
      </div>
    </main>

    <!-- Keyboard -->
    <footer class="p-4">
      <KeyboardView @key-press="handleKeyPress" />
    </footer>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here if needed, though Tailwind should handle most. */
</style>
