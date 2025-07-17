import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { drawAnswer, splitWordToJamo, isValidWord } from '@/utils/jamo';

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
    mergeDefaults: true, // On first load, merge default state with stored state
  });

  const currentGuess = (): string[] => {
    return state.value.guesses[state.value.currentRow];
  };

  const isWin = (): boolean => {
    return state.value.isGameOver && state.value.guesses[state.value.currentRow].join('') === state.value.answer.join('');
  }

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

  function submitGuess(feedbackMessageRef: Ref<string>) {
    const guess = currentGuess();
    if (guess.length !== 6) {
      feedbackMessageRef.value = '자모 6개를 입력해주세요!';
      return false;
    }

    if (!isValidWord(guess)) {
      feedbackMessageRef.value = '사전에 없는 단어입니다.';
      state.value.guesses[state.value.currentRow] = []; // Clear current guess
      return false;
    }

    const newStates = calculateGuessState(guess);
    state.value.guessStates[state.value.currentRow] = newStates;

    guess.forEach((char, index) => {
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
    if (!state.value.isGameOver && state.value.currentRow < 5) {
      state.value.currentRow++;
    }
    return true;
  }

  function calculateGuessState(guessJamos: string[]): string[] {
      const states: string[] = Array(6).fill('absent');
      const answerCopy = [...state.value.answer];
      const guessCopy = [...guessJamos];

      // First pass for 'correct' matches
      for (let i = 0; i < 6; i++) {
          if (guessCopy[i] === answerCopy[i]) {
          states[i] = 'correct';
          answerCopy[i] = '';
          guessCopy[i] = '';
          }
      }

      // Second pass for 'present' matches
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
    if (currentGuess().join('') === state.value.answer.join('')) {
      state.value.isGameOver = true;
    } else if (state.value.currentRow === 5) {
      state.value.isGameOver = true;
    }
  }

  return {
    state,
    currentGuess,
    isWin,
    initializeOrResetGame,
    submitGuess,
  };
});
