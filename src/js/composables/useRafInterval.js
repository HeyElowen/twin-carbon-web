import { ref, watch, onUnmounted } from "vue";

export function useRafInterval(callback, delay, immediate = false) {
  const savedCallback = ref(callback);

  watch(() => callback, (cb) => { savedCallback.value = cb; });

  let rafId = 0;
  let lastTime = performance.now();

  function tick(currentTime) {
    let delta = currentTime - lastTime;
    while (delta >= delay) {
      savedCallback.value();
      delta -= delay;
      lastTime += delay;
    }
    rafId = requestAnimationFrame(tick);
  }

  if (delay > 0) {
    if (immediate) { savedCallback.value(); lastTime = performance.now(); }
    rafId = requestAnimationFrame(tick);
  }

  onUnmounted(() => { if (rafId) cancelAnimationFrame(rafId); });
}
