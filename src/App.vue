<script setup lang="ts">
import TutorialView from "./views/TutorialView.vue";
import KeyboardView from "./components/KeyboardView.vue";
import { ref } from 'vue';

const pressedKey = ref('');
const handleKeyPress = (key: string) => {
  pressedKey.value = key;
};
</script>

<template>
  <div class="container">
    <h1 class="suit_b1">디자인 시스템 예시</h1>

    <section>
      <h2 class="suit_sb1">타이포그래피</h2>
      <p class="suit_m1">suit_m1: 가장 큰 폰트</p>
      <p class="suit_m3">suit_m3: 중간 폰트</p>
      <p class="suit_r5">suit_r5: 가장 작은 폰트</p>
    </section>

    <section>
      <h2 class="suit_sb1">색상 시스템</h2>
      <div class="color-box-container">
        <div class="color-box" style="background-color: var(--gray-100)">gray-100</div>
        <div class="color-box" style="background-color: var(--gray-400)">gray-400</div>
        <div class="color-box" style="background-color: var(--blue-100)">blue-100</div>
        <div class="color-box" style="background-color: var(--blue-600); color: white;">blue-600</div>
        <div class="color-box" style="background-color: var(--red-700); color: white;">red-700</div>
      </div>
    </section>

    <hr/>

    <section>
      <h2 class="suit_sb1">컴포넌트 테스트</h2>
      <TutorialView />
    </section>

    <KeyboardView @key-press="handleKeyPress" />
    <p>Pressed key: {{ pressedKey }}</p>

  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.color-box-container {
  display: flex;
  gap: 1rem;
}

.color-box {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
}
</style>

