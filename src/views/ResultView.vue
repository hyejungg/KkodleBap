<template>
  <Modal :show="show" @close="$emit('close')">
    <div class="result-container">
      <h3 class="suit_b_title">{{ resultTitle }}</h3>
      <p class="py-2 suit_b1">{{ resultDescription }}</p>

      <div class="my-[3rem] result-image-section">
        <img :alt="resultImageAlt" :src="resultImage" class="result-illustration" />
        <p class="suit_r5 text-gray-300 ">{{ resultImageDescription }}</p>
      </div>

      <div v-if="resultType === 'win'">
        <button class="bg-blue-600 text-white w-[291px] h-[48px] m-1 rounded cursor-pointer" @click="handleButtonClick">
          {{ buttonText }}
        </button>
        <p class="pt-2 suit_m4 text-gray-400 sm:decoration-solid cursor-pointer" @click="copyResultToClipboard">결과 공유하기</p>
      </div>
      <div v-else>
        <button class="bg-blue-600 text-white w-[291px] h-[48px] m-1 rounded cursor-pointer" @click="handleButtonClick">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import Modal from '../components/Modal.vue';
import {useRouter} from 'vue-router';

const props = defineProps<{
  show: boolean;
  resultType: 'win' | 'loss' | null;
  answerWord: string;
  guessStates: string[][];
  currentRow: number;
}>();

const emit = defineEmits(['close', 'show-toast']);
const router = useRouter();
const shareFeedback = ref('');

const resultTitle = computed(() => {
  if (props.resultType === 'win') {
    return '🥳 축하합니다 🥳';
  } else if (props.resultType === 'loss') {
    return '아쉽네요.. 🥲';
  }
  return '';
});

const resultDescription = computed(() => {
  return `정답은 ‘${props.answerWord}’ 입니다!`;
});

const resultImage = computed(() => {
  if (props.resultType === 'win') {
    return new URL('@/assets/images/result_view/win_img.png', import.meta.url).href;
  } else if (props.resultType === 'loss') {
    return new URL('@/assets/images/result_view/loss_img.png', import.meta.url).href;
  }
  return '';
});

const resultImageAlt = computed(() => {
  if (props.resultType === 'win') {
    return 'win';
  } else if (props.resultType === 'loss') {
    return 'loss';
  }
  return '';
});

const resultImageDescription = computed(() => {
  if (props.resultType === 'win') {
    return '밥풀을 모은 꼬들이는 행복해요!';
  } else if (props.resultType === 'loss') {
    return '텅 - 다시 한번 해볼까요?';
  }
  return '';
});

const buttonText = computed(() => {
  if (props.resultType === 'win') {
    return '한 판 더!';
  } else if (props.resultType === 'loss') {
    return '다시 도전하기';
  }
  return '';
});

const handleButtonClick = () => {
  emit('close');
  router.go(0); // Reload the page to restart the game
};

const generateShareText = () => {
  const EMOJI_MAP = {
    correct: '🟩',
    present: '🟨',
    absent: '⬜️',
    empty: '⬜️',
  };

  let text = `꼬들밥 ${props.currentRow + 1}/6\n\n`;

  for (let i = 0; i <= props.currentRow; i++) {
    const rowText = props.guessStates[i].map(state => EMOJI_MAP[state] || '⬜️').join('');
    text += rowText + '\n';
  }
  return text;
}

const copyResultToClipboard = async () => {
  try {
    const textToCopy = generateShareText();
    await navigator.clipboard.writeText(textToCopy);
    emit('show-toast', '복사된 결과를 공유해주세요');
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    emit('show-toast', '복사에 실패했습니다.');
  }
};
</script>


<style scoped>
@import "@/assets/styles/index.css";

.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}
.result-image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 231px;
  margin-bottom: 40px;
}

.result-illustration {
  width: 231px;
  height: 231px;
  object-fit: contain;
}

</style>
