<template>
  <div ref="elRef" :class="className" :style="style">{{ displayText }}</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
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

onMounted(() => {
  if (!elRef.value) return;

  const fromVal = { current: 0 };

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        tween = gsap.to(fromVal, {
          current: props.value,
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
    },
    { threshold: 0.1 }
  );

  observer.observe(elRef.value);
});

onUnmounted(() => {
  tween?.kill();
  observer?.disconnect();
});
</script>
