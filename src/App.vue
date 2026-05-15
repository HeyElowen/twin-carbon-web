<script setup>
import { onMounted } from 'vue';
import home from './views/home.vue';
let viewer = null;
const printfms=()=>{
console.log("点击事件");
}
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    navigation: false
  });
  window.cesiumViewer = viewer;
  viewer.pickEvent.addEventListener(printfms);
  const scene = viewer.scene;

  try {
    const layers = await scene.open("/iserver/services/campus/rest/realspace","AnZheng");
    console.log("场景加载成功，图层数:", layers?.length ?? 0);

    if (layers?.length > 0) {
      viewer.flyTo?.(layers[0]);
    }
  } catch (error) {
    console.error("场景加载失败:", error);
  }
});
</script>

<template>
  <div id="cesiumContainer"></div>
  <home></home>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
}

input, textarea, [contenteditable] {
  user-select: text;
}

#cesiumContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>
