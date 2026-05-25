import { ref, onMounted, onUnmounted } from "vue";

export function useSize(targetRef) {
  const windowSize = ref({ width: 0, height: 0 });
  let observer = null;

  onMounted(() => {
    if (!targetRef.value) return;
    observer = new ResizeObserver(([entry]) => {
      windowSize.value = { width: entry.contentRect.width, height: entry.contentRect.height };
    });
    observer.observe(targetRef.value);
  });

  onUnmounted(() => { observer?.disconnect(); });

  return windowSize;
}
