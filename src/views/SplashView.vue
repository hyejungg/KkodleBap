<template>
  <div class="splash-view">
    <div class="content">
      <img src="@/assets/images/splash-logo.png" alt="꼬들밥 로고" class="logo" />
      <div class="text-group">
        <h1 class="title">꼬들밥</h1>
        <p class="subtitle">한글 자모 맞추기 게임</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    // TODO: GameView 라우트가 추가되면 경로 수정 필요
    router.push({ path: '/' }); 
  }, 3000);
});
</script>

<style scoped>
.splash-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--blue-100);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  text-align: center;
}

.logo {
  width: 263px;
  height: 263px;
}

.text-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.title {
  font-family: 'SUIT', sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1.125;
  color: var(--gray-700);
}

.subtitle {
  font-family: 'SUIT', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.33;
  color: var(--gray-300);
}
</style>
