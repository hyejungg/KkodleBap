<template>
  <div class="flex flex-col w-screen h-screen max-w-md mx-auto bg-white">
    <!-- Header -->
    <header class="flex items-center justify-between m-2 p-2 relative">
      <div class="w-6"></div> <!-- 왼쪽 공간 확보용 -->
      <div class="title-text text-center">
        <h1 class="suit_b_title">꼬들밥</h1>
        <p class="p-1 text-sm text-gray-200">한글 자모 맞추기 게임</p>
      </div>
      <div class="cursor-pointer" @click="showTutorial">
        <img alt="Tutorial" class="pr-2 h-8 w-8" src="@/assets/icons/question-mark.svg">
      </div>
    </header>

    <!-- Game Grid -->
    <main class="flex-grow p-4 flex items-center justify-center">
      <div class="flex flex-col items-center">
        <div class="grid grid-rows-6 gap-1.5">
          <div v-for="(row, rowIndex) in board" :key="rowIndex" class="grid grid-cols-6 gap-x-[8px] gap-y-[8px]">
            <div
                v-for="(tile, tileIndex) in row"
                :key="tileIndex"
                :class="getTileClass(tile, rowIndex, tileIndex)"
                class="w-[42px] h-[42px] rounded-[7.69px] flex items-center justify-center text-2xl font-bold"
            >
              {{ tile.key }}
            </div>
          </div>
        </div>
        <div class="h-8 mt-2 flex items-center justify-center">
          <p v-if="feedbackMessage" class="text-red-700 text-sm font-medium">
            {{ feedbackMessage }}
          </p>
        </div>
      </div>
    </main>

    <!-- Keyboard -->
    <KeyboardView :char-states="charStates" @key-press="handleKeyPress"/>

    <!-- Tutorial Bottom Sheet -->
    <BottomSheet v-model="isTutorialVisible">
      <TutorialView/>
    </BottomSheet>

    <!-- Result Modal -->
    <ResultView
        :answerWord="answerWord"
        :current-row="currentRow"
        :guess-states="guessStates"
        :resultType="gameResultType"
        :show="showResultModal"
        @close="showResultModal = false"
        @show-toast="handleShowToast"
    />

    <!-- Toast Notification -->
    <Toast :message="toastMessage" :show="showToast" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import KeyboardView from '@/components/KeyboardView.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import TutorialView from '@/views/TutorialView.vue';
import ResultView from '@/views/ResultView.vue';
import Toast from '@/components/Toast.vue';
import { isValidJamo } from '@/utils/jamo';
import { useGameStore } from '@/stores/gameState';

const isTutorialVisible = ref(false);
const showResultModal = ref(false);
const gameResultType = ref<'win' | 'loss' | null>(null);
const feedbackMessage = ref('');

// --- Toast State ---
const showToast = ref(false);
const toastMessage = ref('');

const handleShowToast = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000); // 2초 후 토스트 사라짐
};

// --- Game State from Pinia Store ---
const gameStore = useGameStore();
const { state, submitGuess, isWin } = gameStore;

// Destructure reactive state properties
const { answerWord, guesses, guessStates, currentRow, isGameOver, charStates } = state;

// --- Board Logic ---
const board = computed(() => {
  return guesses.value.map((guessRow, rowIndex) => {
    const row: { key: string; state: string }[] = [];
    for (let i = 0; i < 6; i++) {
      const key = guessRow[i] || '';
      const state = guessStates.value[rowIndex][i];
      row.push({ key, state });
    }
    return row;
  });
});

// --- Event Handlers ---
const handleKeyPress = (key: string) => {
  if (isGameOver.value) return;

  const currentGuessArray = guesses.value[currentRow.value];

  if (key === 'enter') {
    submitGuess(feedbackMessage); // Pass feedbackMessage ref
  } else if (key === 'backspace') {
    currentGuessArray.pop();
  } else if (currentGuessArray.length < 6) {
    if (feedbackMessage.value.length > 0) {
      feedbackMessage.value = ''; // Clear feedback message on new input
    }
    currentGuessArray.push(key);
  }
};

// --- Styling Logic ---
const getTileClass = (tile: { key: string; state: string }, rowIndex: number, tileIndex: number) => {
  const classes = ['bg-blue-100', 'text-gray-700'];

  if (rowIndex < currentRow.value) {
    if (tile.state === 'correct') {
      classes.push('bg-blue-600', 'text-gray-700');
    } else if (tile.state === 'present') {
      classes.push('bg-blue-400', 'text-gray-700');
    } else if (tile.state === 'absent') {
      classes.push('bg-gray-200', 'text-gray-700');
    }
  }

  return classes.join(' ');
};

// --- Navigation ---
const showTutorial = () => {
  isTutorialVisible.value = true;
};

// --- Lifecycle ---
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  // Initialize game if it's a new session (answerWord is empty)
  if (!state.value.answerWord) {
    gameStore.initializeOrResetGame();
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const handleKeydown = (e: KeyboardEvent) => {
  const key = e.key;

  if (isValidJamo(key)) {
    handleKeyPress(key);
  } else if (key === 'Enter') {
    handleKeyPress('enter');
  } else if (key === 'Backspace') {
    handleKeyPress('backspace');
  }
};

// Watch for isGameOver to show result modal
watch(isGameOver, (newValue) => {
  if (newValue) {
    gameResultType.value = isWin() ? 'win' : 'loss';
    showResultModal.value = true;
  }
});
</script>

<style scoped>
.delay-0 {
  transition-delay: 0ms;
}

.delay-100 {
  transition-delay: 100ms;
}

.delay-200 {
  transition-delay: 200ms;
}

.delay-300 {
  transition-delay: 300ms;
}

.delay-400 {
  transition-delay: 400ms;
}

.delay-500 {
  transition-delay: 500ms;
}

</style>
