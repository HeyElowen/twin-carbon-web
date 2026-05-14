<script setup>
import { el } from 'element-plus/es/locale/index.mjs';
import { onMounted } from 'vue';
import home from './views/home.vue';
let viewer = null;
const printfms=()=>{
console.log("点击事件");
}
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
   
    navigation:false,
    




  });
  viewer.pickEvent.addEventListener(printfms);
  const scene = viewer.scene;

  try {
    const layers = await scene.open("/iserver/services/campus/rest/realspace","AnZheng"); //更换为你自己的isevrver地址和场景名称
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
  <home></home>
</template>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

nav {
  padding: 10px;
  background: #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
#app {
  margin-top: 40px; /* 避免导航栏遮挡内容 */
}

</style>
