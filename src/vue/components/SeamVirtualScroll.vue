<template>
  <div
    class="vscroll-wrapper"
    @mouseenter="hoverHandler(false)"
    @mouseleave="hoverHandler(true)"
  >
    <!-- Header -->
    <div class="vscroll-header" :style="styles?.header">
      <div
        v-for="(col, idx) in column"
        :key="idx"
        :class="['vscroll-header-item', `vscroll-align-${col.align ?? 'left'}`]"
        :style="{ flex: col.flex ?? 1 }"
      >
        {{ col.title }}
      </div>
    </div>

    <!-- Body -->
    <div ref="tableRef" class="vscroll-table">
      <div
        ref="contentRef"
        class="vscroll-content"
        :style="styles?.body"
        @transitionend="onTransitionEnd"
      >
        <div
          v-for="(item, idx) in renderList"
          :key="idx + activeIndex"
          class="vscroll-row"
          :style="{ height: `${rowHeight}px` }"
        >
          <div
            v-for="(col, colIdx) in column"
            :key="colIdx"
            :class="['vscroll-row-item', `vscroll-align-${col.align ?? 'left'}`]"
            :style="{ flex: col.flex ?? 1 }"
          >
            <span v-if="col.noScroll">
              <template v-if="col.render">
                {{ col.render(idx + activeIndex, item) }}
              </template>
              <template v-else>
                {{ item[col.dataIndex ?? ''] }}
              </template>
            </span>
            <span v-else class="vscroll-scroll-item">
              <template v-if="col.render">
                {{ col.render(idx + activeIndex, item) }}
              </template>
              <template v-else>
                {{ item[col.dataIndex ?? ''] }}
              </template>
            </span>
          </div>
        </div>
        <div v-if="renderList.length === 0" class="vscroll-empty">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useSize } from "@/js/composables/useSize";

const props = defineProps({
  rowHeight: { type: Number, default: 48 },
  column: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
  speed: { type: Number, default: 3000 },
  styles: { type: Object, default: () => ({}) },
});

const tableRef = ref(null);
const contentRef = ref(null);
const size = useSize(tableRef);
const isScroll = ref(true);
const activeIndex = ref(0);
let lastTime = 0;
let rafId = 0;
let running = false;

const computedSizes = computed(() => {
  const rowH = props.rowHeight + 2;
  const wh = size.value.height;
  const _isScroll = props.data.length * rowH > wh && wh > 0;
  const len = Math.ceil(wh / rowH);

  let list = props.data;
  if (_isScroll) {
    list = list.concat(props.data.slice(0, len));
  }
  return { isScrollHeight: _isScroll, len, fullData: list };
});

const renderList = computed(() => {
  contentRef.value?.style.setProperty("transform", "translate3d(0, 0, 0)");
  contentRef.value?.style.setProperty("transition", "none");
  return computedSizes.value.fullData.slice(
    activeIndex.value,
    activeIndex.value + computedSizes.value.len
  );
});

function animLoop(timestamp) {
  if (timestamp - lastTime >= props.speed) {
    contentRef.value?.style.setProperty(
      "transform",
      `translate3d(0, ${-(props.rowHeight + 2)}px, 0)`
    );
    contentRef.value?.style.setProperty(
      "transition",
      "transform 300ms ease-in 0s"
    );
    lastTime = timestamp;
  }
  if (running) {
    rafId = requestAnimationFrame(animLoop);
  }
}

const isScrollHeight = computed(() => computedSizes.value.isScrollHeight);

function startLoop() {
  if (!running && isScroll.value && isScrollHeight.value) {
    running = true;
    lastTime = 0;
    rafId = requestAnimationFrame(animLoop);
  }
}

function stopLoop() {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
}

function hoverHandler(flag) {
  isScroll.value = flag;
  if (flag) {
    startLoop();
  } else {
    stopLoop();
  }
}

function onTransitionEnd() {
  activeIndex.value = (activeIndex.value + 1) % props.data.length;
}
</script>

<style scoped>
.vscroll-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transform: translate3d(0px, 0px, 0px);
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

.vscroll-table {
  flex: 1 1 0;
  position: relative;
  height: 100%;
  overflow: hidden;
}

.vscroll-content {
  color: #ffffff;
}

.vscroll-header {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  height: 40px;
  color: #ffffff;
  overflow-wrap: break-word;
}

.vscroll-header-item {
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vscroll-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-inline: 0.5rem;
  margin: 2px;
  border-width: 1px 0;
  border-style: solid;
}

.vscroll-row:nth-child(odd) {
  border-color: rgba(255, 255, 255, 0.1);
}

.vscroll-row:nth-child(even) {
  border-color: transparent;
}

.vscroll-row-item {
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  container-type: inline-size;
}

.vscroll-scroll-item {
  display: flex;
  width: max-content;
  animation: marquee 3s linear infinite both alternate;
}

@keyframes marquee {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(max(100cqw - 100%, 0px));
  }
}

.vscroll-empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.vscroll-align-left {
  text-align: left;
}

.vscroll-align-center {
  text-align: center;
}

.vscroll-align-right {
  text-align: right;
}
</style>
