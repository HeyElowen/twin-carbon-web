<script setup>
import { el } from 'element-plus/es/locale/index.mjs';
import { onMounted } from 'vue';
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
  <div id="cesiumContainer"></div>
  <h1>这里是Vue布局测试分支</h1>

  <h1>这里是cesium分支测试</h1>
</template>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
