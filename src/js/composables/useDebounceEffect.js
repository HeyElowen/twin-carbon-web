import { watch, onUnmounted, ref } from "vue";

export function useDebounceEffect(effect, deps, delay) {
  const cleanupRef = ref(undefined);
  let timer;

  watch(deps, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (cleanupRef.value) cleanupRef.value();
      cleanupRef.value = effect();
    }, delay);
  }, { immediate: true });

  onUnmounted(() => {
    clearTimeout(timer);
    if (cleanupRef.value) cleanupRef.value();
  });
}
