<template>
  <div class="cesium-page">
    <div id="cesiumContainer" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

let viewer = null

onMounted(() => {
  // 可选：填入你的 Cesium Ion 令牌（如果没有可以省略）
  // Cesium.Ion.defaultAccessToken = '你的令牌'

  viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: false,
    geocoder: false,
    animation: false,
    timeline: false,
    shouldAnimate: true,
  })
})

onUnmounted(() => {
  if (viewer && !viewer.isDestroyed()) {
    viewer.destroy()
    viewer = null
  }
})
</script>

<style scoped>
.cesium-page {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>