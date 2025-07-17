import {defineStore} from 'pinia';
import {computed, Ref} from 'vue';
import {useStorage} from '@vueuse/core';
import {drawAnswer, isValidWord, splitWordToJamo} from '@/utils/jamo';

interface GameState {
  answerWord: string;
  answer: string[];
  guesses: string[][];
  guessStates: string[][];
  currentRow: number;
  isGameOver: boolean;
  charStates: Record<string, string>;
}

const defaultState: GameState = {
  answerWord: '',
  answer: [],
  guesses: Array.from({ length: 6 }, () => []),
  guessStates: Array.from({ length: 6 }, () => Array(6).fill('empty')),
  currentRow: 0,
  isGameOver: false,
  charStates: {},
};

export const useGameStore = defineStore('gameState', () => {
  const state = useStorage<GameState>('gameState', defaultState, sessionStorage, {
    mergeDefaults: true,
  });

  // --- GETTERS (as computed) ---
  const answerWord = computed(() => state.value.answerWord);
  const guesses = computed(() => state.value.guesses);
  const guessStates = computed(() => state.value.guessStates);
  const currentRow = computed(() => state.value.currentRow);
  const isGameOver = computed(() => state.value.isGameOver);
  const charStates = computed(() => state.value.charStates);
  const currentGuess = computed(() => state.value.guesses[state.value.currentRow]);
  const isWin = computed(() => isGameOver.value && currentGuess.value.join('') === state.value.answer.join(''));

  // --- ACTIONS ---
  function initializeOrResetGame() {
    const drawnWord = drawAnswer();
    if (drawnWord) {
      state.value.answerWord = drawnWord;
      state.value.answer = splitWordToJamo(state.value.answerWord);
    } else {
      console.error("Failed to draw an answer word.");
      state.value.isGameOver = true;
    }
    state.value.guesses = Array.from({ length: 6 }, () => []);
    state.value.guessStates = Array.from({ length: 6 }, () => Array(6).fill('empty'));
    state.value.currentRow = 0;
    state.value.isGameOver = false;
    state.value.charStates = {};
  }

  function calculateGuessState(guessJamos: string[]): string[] {
    const states: string[] = Array(6).fill('absent');
    const answerCopy = [...state.value.answer];
    const guessCopy = [...guessJamos];

    for (let i = 0; i < 6; i++) {
      if (guessCopy[i] === answerCopy[i]) {
        states[i] = 'correct';
        answerCopy[i] = '';
        guessCopy[i] = '';
      }
    }

    for (let i = 0; i < 6; i++) {
      if (guessCopy[i] !== '') {
        const presentIndex = answerCopy.indexOf(guessCopy[i]);
        if (presentIndex !== -1) {
          states[i] = 'present';
          answerCopy[presentIndex] = '';
        }
      }
    }
    return states;
  }

  function checkWinLoss() {
    if (currentGuess.value.join('') === state.value.answer.join('')) {
      state.value.isGameOver = true;
    } else if (state.value.currentRow === 5) {
      state.value.isGameOver = true;
    }
  }

  function submitGuess(feedbackMessageRef: Ref<string>) {
    if (currentGuess.value.length !== 6) {
      feedbackMessageRef.value = '자모 6개를 입력해주세요!';
      return false;
    }

    if (!isValidWord(currentGuess.value)) {
      feedbackMessageRef.value = '사전에 없는 단어입니다.';
      state.value.guesses[state.value.currentRow] = [];
      return false;
    }

    const newStates = calculateGuessState(currentGuess.value);
    state.value.guessStates[state.value.currentRow] = newStates;

    currentGuess.value.forEach((char, index) => {
      const currentState = state.value.charStates[char];
      const newState = newStates[index];
      if (currentState === 'correct') return;
      if (newState === 'correct' || (currentState === 'present' && newState === 'present')) {
        state.value.charStates[char] = newState;
      } else if (currentState !== 'present') {
        state.value.charStates[char] = newState;
      }
    });

    checkWinLoss();
    if (!isGameOver.value && currentRow.value < 5) {
      state.value.currentRow++;
    }
    return true;
  }

  function addCharToGuess(char: string) {
    if (currentGuess.value.length < 6) {
      state.value.guesses[currentRow.value].push(char);
    }
  }

  function removeCharFromGuess() {
    state.value.guesses[currentRow.value].pop();
  }

  return {
    // State & Getters
    answerWord,
    guesses,
    guessStates,
    currentRow,
    isGameOver,
    charStates,
    currentGuess,
    isWin,
    // Actions
    initializeOrResetGame,
    submitGuess,
    addCharToGuess,
    removeCharFromGuess,
  };
});
