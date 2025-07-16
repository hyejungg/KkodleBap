<template>
  <div class="splash-view">
    <div class="content">
      <img alt="꼬들밥 로고" class="logo" src="@/assets/images/splash-logo.png" />
      <div class="text-group">
        <h1 class="title">꼬들밥</h1>
        <p class="subtitle suit_m3">한글 자모 맞추기 게임</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push({ path: '/game' }); 
  }, 1500);
});
</script>

<style scoped>
.splash-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-blue-100);
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
  color: var(--color-gray-700);
}

.subtitle {
  color: var(--color-gray-300);
}
</style>
