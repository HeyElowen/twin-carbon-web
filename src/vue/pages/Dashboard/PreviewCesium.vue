<template>
  <div ref="containerRef" v-show="store.uploadPreviewActive" class="preview-cesium"></div>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";

const store = useConfigStore();
const containerRef = ref(null);
let previewViewer = null;

function setupBaseImagery(v) {
  const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
  const tk = "cec53f834be34c955bae0afecd4caa3e";
  const layers = v.imageryLayers;
  layers.remove(layers.get(0), true);
  layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
    url: `https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${tk}`,
    subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    minimumLevel: 1,
    maximumLevel: 18,
  }));
}

watch(() => store.uploadPreviewActive, async (active) => {
  await nextTick();
  if (active && containerRef.value) {
    previewViewer = new Cesium.Viewer(containerRef.value, {
      navigationHelpButton: false,
      baseLayerPicker: false,
      skyBox: false,
      skyAtmosphere: false,
      shouldAnimate: false,
    });
    setupBaseImagery(previewViewer);
    // 同步主 viewer 的相机视角
    const main = window.cesiumViewer;
    if (main) {
      const cam = main.scene.camera;
      previewViewer.camera.setView({
        destination: cam.position,
        orientation: { heading: cam.heading, pitch: cam.pitch, roll: cam.roll },
      });
    }
  } else {
    if (previewViewer) {
      previewViewer.destroy();
      previewViewer = null;
    }
  }
  // 通知主 viewer 重新调整尺寸
  window.cesiumViewer?.resize();
});

onUnmounted(() => {
  if (previewViewer) {
    previewViewer.destroy();
    previewViewer = null;
  }
});
</script>

<style scoped>
.preview-cesium {
  position: fixed;
  top: 0;
  left: 0;
  width: 50vw;
  height: 100vh;
  z-index: 1;
}
</style>
