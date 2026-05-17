<script setup>
import { onMounted, onUnmounted } from 'vue'

let viewer = null

onMounted(async () => {
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
})

onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
  if (window.cesiumViewer) {
    window.cesiumViewer = null
  }
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style>
#cesiumContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>
