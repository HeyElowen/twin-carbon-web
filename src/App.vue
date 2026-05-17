<script setup>
import { onMounted } from 'vue';
import home from './views/home.vue';
import cesiumMap from './views/cesiumMap.vue';
</script>

<template>
 <cesiumMap></cesiumMap>
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
