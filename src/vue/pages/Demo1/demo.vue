<template>
  <div class="wrapper">
    <div class="map-placeholder">
      <div id="cesiumContainer"></div>
    </div>
    <Panel />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import Panel from "./panel/index.vue";

let viewer = null;

const store = useConfigStore();
onMounted(async() => {
  store.mapPlayComplete = true;


 viewer = new Cesium.Viewer('cesiumContainer', {
    navigation: false
  })
  window.cesiumViewer = viewer

  const scene = viewer.scene
  try {
    const layers = await scene.open('/iserver/services/campus/rest/realspace', 'AnZheng')
    if (layers?.length > 0) {
      viewer.flyTo?.(layers[0])
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('场景加载失败:', error)
  }

});
onUnmounted(() => store.reset());
</script>

<style scoped>

#cesiumContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
.wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #070a0e;
}

.map-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(224, 230, 240, 0.12);
  font-size: 48px;
  letter-spacing: 8px;
  z-index: 1;
}
</style>
