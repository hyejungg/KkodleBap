<template>
  <div class="flex flex-col h-screen max-w-md mx-auto bg-white">
    <!-- Header -->
    <header class="relative flex items-center justify-center p-4 border-b">
      <div class="text-center">
        <h1 class="text-xl font-bold">꼬들밥</h1>
        <p class="text-sm text-gray-500">한글 자모 맞추기 게임</p>
      </div>
      <button @click="showTutorial" class="absolute right-4 bg-transparent">
        <img src="@/assets/icons/question-mark.svg" alt="Tutorial" class="h-6 w-6">
      </button>
    </header>

    <!-- Game Grid -->
    <main class="flex-grow p-4 flex items-center justify-center">
      <div class="grid grid-rows-6 gap-1.5">
        <div v-for="(row, rowIndex) in board" :key="rowIndex" class="grid grid-cols-6 gap-1.5">
          <div
            v-for="(tile, tileIndex) in row"
            :key="tileIndex"
            :class="getTileClass(tile, rowIndex, tileIndex)"
            class="w-16 h-16 border-2 rounded-md flex items-center justify-center text-2xl font-bold"
          >
            {{ tile.key }}
          </div>
        </div>
      </div>
    </main>

    <!-- Keyboard -->
    <KeyboardView @key-press="handleKeyPress" />

    <!-- Tutorial Bottom Sheet -->
    <BottomSheet v-model="isTutorialVisible">
      <TutorialView />
    </BottomSheet>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import KeyboardView from '@/components/KeyboardView.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import TutorialView from '@/views/TutorialView.vue';

const isTutorialVisible = ref(false);

// --- Game State ---
const answer = ref('ㅂㅏㄴㅏㄴㅏ'); // 6 jamos
const guesses = ref<string[]>(Array(6).fill(''));
const currentRow = ref(0);
const isRevealing = ref(false);
const isGameOver = ref(false);

// --- Board Logic ---
const board = computed(() => {
  const boardState: { key: string; state: string }[][] = [];
  for (let i = 0; i < 6; i++) {
    const row: { key: string; state: string }[] = [];
    const guess = guesses.value[i];
    for (let j = 0; j < 6; j++) {
      const key = i === currentRow.value ? (currentGuess.value[j] || '') : (guess[j] || '');
      const state = getLetterState(guess, j);
      row.push({ key, state });
    }
    boardState.push(row);
  }
  return boardState;
});

const currentGuess = computed(() => guesses.value[currentRow.value]);

// --- Event Handlers ---
const handleKeyPress = (key: string) => {
  if (isGameOver.value || isRevealing.value) return;

  if (key === 'enter') {
    submitGuess();
  } else if (key === 'backspace') {
    guesses.value[currentRow.value] = currentGuess.value.slice(0, -1);
  } else if (currentGuess.value.length < 6) {
    guesses.value[currentRow.value] += key;
  }
};

const submitGuess = () => {
  if (currentGuess.value.length !== 6) {
    // Add feedback for not enough letters
    console.log('Not enough letters');
    return;
  }

  // Basic validation (can be expanded with a word list)
  console.log(`Submitting guess: ${currentGuess.value}`);
  
  isRevealing.value = true;
  setTimeout(() => {
    isRevealing.value = false;
    checkWinLoss();
    currentRow.value++;
  }, 300 * 6); // Animation delay
};

const checkWinLoss = () => {
    if (currentGuess.value === answer.value) {
        isGameOver.value = true;
        setTimeout(() => alert('성공!'), 100);
        // router.push('/result');
    } else if (currentRow.value === 5) {
        isGameOver.value = true;
        setTimeout(() => alert(`실패! 정답: ${answer.value}`), 100);
        // router.push('/result');
    }
}

// --- Styling Logic ---
const getLetterState = (guess: string, index: number): string => {
  if (!guess || guess.length <= index) return 'empty';
  
  const letter = guess[index];
  const answerLetter = answer.value[index];

  if (letter === answerLetter) {
    return 'correct'; // Green
  }
  if (answer.value.includes(letter)) {
    return 'present'; // Yellow
  }
  return 'absent'; // Gray
};

const getTileClass = (tile: { key: string; state: string }, rowIndex: number, tileIndex: number) => {
  const classes = [];

  // Set base style for tiles with content
  if (tile.key) {
    classes.push('border-gray-400');
    // Apply blue background for the current guessing row
    if (rowIndex === currentRow.value) {
      classes.push('bg-blue-100');
    }
  } else {
    classes.push('border-gray-300');
  }

  // Set styles for revealed tiles (previous rows)
  if (rowIndex < currentRow.value) {
    classes.push('transition-transform duration-300 ease-in-out');
    classes.push(`delay-${tileIndex * 100}`);
    classes.push('transform rotate-x-180');

    if (tile.state === 'correct') {
      classes.push('bg-green-500 text-white border-green-500');
    } else if (tile.state === 'present') {
      classes.push('bg-yellow-500 text-white border-yellow-500');
    } else {
      classes.push('bg-gray-500 text-white border-gray-500');
    }
  }
  
  return classes.join(' ');
};

const bgBlue100 = {
  'background-color': 'var(--blue-100)'
}



// --- Navigation ---
const showTutorial = () => {
  isTutorialVisible.value = true;
};

// --- Lifecycle ---
onMounted(() => {
  // Logic to fetch daily word can go here
  console.log('GameView mounted. Today\'s answer:', answer.value);
});
</script>

<style scoped>
.rotate-x-180 {
  transform: rotateX(180deg);
}
.delay-0 { transition-delay: 0ms; }
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
.delay-400 { transition-delay: 400ms; }
.delay-500 { transition-delay: 500ms; }

.bg-blue-100 {
  background-color: var(--blue-100);
}
</style>
