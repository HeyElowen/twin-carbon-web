<template>
  <div :id="autofitId" class="autofit-wrapper">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import autofit from "autofit.js";

const autofitId = `autofit_${Date.now().toString(36)}`;

onMounted(() => {
  autofit.init({ el: `#${autofitId}` });
});

onUnmounted(() => {
  autofit.off();
});
</script>

<style scoped>
.autofit-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
</style>
