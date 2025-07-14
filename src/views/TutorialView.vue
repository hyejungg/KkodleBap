<template>
  <div>
    <button class="tutorial-button" @click="isTutorialOpen = true">
      튜토리얼 보기
    </button>

    <BottomSheet v-model="isTutorialOpen">
      <div class="tutorial-content">
        <img alt="튜토리얼 설명 이미지" class="tutorial-image" src="@/assets/images/tutorial-cartoon.png" />
        <h2 class="title">매일 밥풀 하나씩, 꼬들밥 어떠세요? 🍚</h2>
        <p class="description">
          ”꼬들밥"은 한글 자모를 조합해 단어를 맞히는 게임이에요! 자모 6개로 정답을 유추해 보세요.
        </p>
        
        <div class="info-box">
          <p>💙 파란색은 ‘정확한 자모 + 위치까지 정답!’</p>
          <p>🩵 하늘색은 ‘단어에 포함돼 있지만 위치가 달라요!’</p>
          <p>🩶 회색은 ‘정답에 없는 자모예요!’</p>
        </div>

        <div class="example-box">
          <p class="example-title">예시: 정답이 "오누이"일 때</p>
          <div class="example-flow">
            <p>입력 →️  ㅁ  ㅣ  ㄴ  ㅏ  ㄹ  ㅣ</p>
            <p>결과 → 🩶🩵💙🩶🩶💙</p>
          </div>
        </div>

        <p class="description">
          기회는 총 6번! 실제 존재하는 단어만 정답으로 등장해요. 오늘의 꼬들밥을 맛있게 맞혀보세요 😋
        </p>
      </div>
    </BottomSheet>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import BottomSheet from '@/components/BottomSheet.vue';

const isTutorialOpen = ref(false);
</script>

<style scoped>
.tutorial-button {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--blue-600);
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'SUIT', sans-serif;
}

.tutorial-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tutorial-image {
  width: 100%;
  max-width: 285px;
  align-self: center;
  margin-bottom: 1rem;
}

.title {
  font-family: 'SUIT', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--gray-700);
}

.description {
  font-family: 'SUIT', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.375;
  color: var(--gray-700);
}

.info-box, .example-box {
  background-color: var(--gray-100);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'SUIT', sans-serif;
  font-size: 16px;
  color: var(--gray-700);
}

.example-title {
  font-weight: 600;
}

.example-flow {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
