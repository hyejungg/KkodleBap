<template>
  <div class="tutorial-content">
    <img alt="튜토리얼 설명 이미지" class="tutorial-image" src="@/assets/images/tutorial-cartoon.png" />
    <h2 class="title suit_b1">매일 밥풀 하나씩, 꼬들밥 어떠세요? 🍚</h2>
    <p class="description suit_r4">
      ”꼬들밥"은 한글 자모를 조합해 단어를 맞히는 게임이에요! <br />자모 6개로 정답을 유추해 보세요.
    </p>
    
    <div class="info-box suit_r4">
      <p>💙 파란색은 ‘정확한 자모 + 위치까지 정답!’</p>
      <p>🩵 하늘색은 ‘단어에 포함돼 있지만 위치가 달라요!’</p>
      <p>🩶 회색은 ‘정답에 없는 자모예요!’</p>
    </div>

    <div class="example-box suit_r4">
      <p class="example-title">예시: 정답이 "오누이"일 때</p>
      <div class="example-flow">
        <p>입력 →️  ㅁ  ㅣ  ㄴ  ㅏ  ㄹ  ㅣ</p>
        <p>결과 → 🩶🩵💙🩶🩶💙</p>
      </div>
    </div>

    <p class="description suit_r4">
      기회는 총 6번! 실제 존재하는 단어만 정답으로 등장해요.<br />오늘의 꼬들밥을 맛있게 맞혀보세요 😋
    </p>
  </div>
</template>

<script lang="ts" setup>
// This component is now content-only and doesn't need script setup logic for the bottom sheet.
</script>

<style scoped>
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
  color: var(--color-gray-700);
}

.description {
  color: var(--color-gray-700);
}

.info-box, .example-box {
  background-color: var(--color-gray-100);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

