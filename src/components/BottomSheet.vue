<template>
  <transition name="bottom-sheet">
    <div v-if="modelValue" class="bottom-sheet-backdrop" @click.self="close">
      <div class="bottom-sheet-container">
        <div class="bottom-sheet-header">
          <button class="close-button suit_r4" @click="close">닫기</button>
        </div>
        <div class="bottom-sheet-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);

const close = () => {
  emit('update:modelValue', false);
};
</script>

<style scoped>
.bottom-sheet-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
}

.bottom-sheet-container {
  width: 100%;
  background-color: white;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.bottom-sheet-header {
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid var(--gray-100);
}

.close-button {
  color: var(--gray-700);
  background: none;
  border: none;
  cursor: pointer;
}

.bottom-sheet-content {
  padding: 1rem;
  overflow-y: auto;
}

.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: opacity 0.3s ease;
}

.bottom-sheet-enter-active .bottom-sheet-container,
.bottom-sheet-leave-active .bottom-sheet-container {
  transition: transform 0.3s ease;
}

.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  opacity: 0;
}

.bottom-sheet-enter-from .bottom-sheet-container,
.bottom-sheet-leave-to .bottom-sheet-container {
  transform: translateY(100%);
}
</style>
