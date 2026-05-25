import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

export function useMoveTo(direction, duration = 1, delay = 0, fixedTransform = "") {
  const eleRef = ref(null);
  let tween = null;

  function restart(includeDelay = true) {
    tween?.restart(includeDelay);
  }

  function reverse() {
    tween?.reverse();
  }

  onMounted(() => {
    if (eleRef.value) {
      const transformFrom = {
        toTop: "translate(0px, 100%)",
        toBottom: "translate(0px, -100%)",
        toLeft: "translate(100%, 0px)",
        toRight: "translate(-100%, 0px)",
      }[direction];

      tween = gsap.fromTo(
        eleRef.value,
        { opacity: 0, transform: transformFrom + " " + fixedTransform },
        { opacity: 1, transform: "translate(0px, 0px) " + fixedTransform, duration, delay }
      );
      tween.pause();
    }
  });

  onUnmounted(() => { tween?.kill(); });

  return { ref: eleRef, restart, reverse };
}
