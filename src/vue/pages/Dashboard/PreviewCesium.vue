<template>
  <div ref="containerRef" v-show="store.uploadPreviewActive" class="preview-cesium"></div>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";

const store = useConfigStore();
const containerRef = ref(null);
let previewViewer = null;
let syncing = false;

// 已注册的相机事件引用，用于销毁时移除
let mainCameraRemove = null;
let previewCameraRemove = null;

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

function syncCamera(source, target) {
  if (!source || !target) return;
  const cam = source.camera;
  target.camera.setView({
    destination: cam.position,
    orientation: { heading: cam.heading, pitch: cam.pitch, roll: cam.roll },
  });
}

function startSync() {
  const main = window.cesiumViewer;
  if (!main || !previewViewer) return;

  let mainRafId = null;
  let previewRafId = null;

  mainCameraRemove = main.scene.camera.changed.addEventListener(() => {
    if (syncing) return;
    if (mainRafId) return;
    mainRafId = requestAnimationFrame(() => {
      mainRafId = null;
      syncing = true;
      syncCamera(main, previewViewer);
      syncing = false;
    });
  });

  previewCameraRemove = previewViewer.scene.camera.changed.addEventListener(() => {
    if (syncing) return;
    if (previewRafId) return;
    previewRafId = requestAnimationFrame(() => {
      previewRafId = null;
      syncing = true;
      syncCamera(previewViewer, main);
      syncing = false;
    });
  });
}

function stopSync() {
  if (mainCameraRemove) { mainCameraRemove(); mainCameraRemove = null; }
  if (previewCameraRemove) { previewCameraRemove(); previewCameraRemove = null; }
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
    // 初始同步主 viewer 的相机视角
    const main = window.cesiumViewer;
    if (main) {
      syncCamera(main, previewViewer);
    }
    // 开启双向同步
    startSync();
  } else {
    stopSync();
    if (previewViewer) {
      previewViewer.destroy();
      previewViewer = null;
    }
  }
  window.cesiumViewer?.resize();
});

onUnmounted(() => {
  stopSync();
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
