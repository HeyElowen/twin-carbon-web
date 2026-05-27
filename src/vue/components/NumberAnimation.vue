<template>
  <div ref="elRef" :class="className" :style="style">{{ displayText }}</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  value: { type: Number, required: true },
  duration: { type: Number, default: 2 },
  delay: { type: Number, default: 0 },
  options: { type: Object, default: undefined },
  className: { type: String, default: undefined },
  style: { type: Object, default: undefined },
});

const displayText = ref("0");
const elRef = ref(null);

let tween = null;
let observer = null;
let isVisible = false;
let hasAnimated = false;

function parseCurrent() {
  const raw = displayText.value.replace(/,/g, "").replace(/[^0-9.\-]/g, "");
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

function setText(val) {
  displayText.value = val.toLocaleString("zh-CN", props.options);
}

function playAnimation(targetValue) {
  tween?.kill();
  const fromVal = { current: parseCurrent() };
  tween = gsap.to(fromVal, {
    current: targetValue,
    duration: props.duration,
    delay: props.delay,
    ease: "power1.out",
    onUpdate() {
      displayText.value = fromVal.current.toLocaleString(
        "zh-CN",
        props.options
      );
    },
  });
}

onMounted(() => {
  if (!elRef.value) return;

  // 保险1：挂载时如果已经在视口内，立即播放动画（不等待 IO 异步回调）
  const rect = elRef.value.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    isVisible = true;
    hasAnimated = true;
    playAnimation(props.value);
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !isVisible) {
        // 从不可见变为可见
        isVisible = true;
        if (!hasAnimated) {
          hasAnimated = true;
          playAnimation(props.value);
        }
      }
      isVisible = nowVisible;
    },
    { threshold: 0.1 }
  );

  observer.observe(elRef.value);
});

watch(
  () => props.value,
  (newVal) => {
    if (isVisible) {
      // 可见时播放动画
      playAnimation(newVal);
    } else {
      // 不可见时直接设置文本，确保用户最终看到正确数值
      setText(newVal);
    }
  }
);

onUnmounted(() => {
  tween?.kill();
  observer?.disconnect();
});
</script>
