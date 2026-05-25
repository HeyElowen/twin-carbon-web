<template>
  <div class="wrapper">
    <div class="map-placeholder">
      <div id="cesiumContainer"></div>
    </div>
    <Panel />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getBuildingObservationPoint } from "@/api/monitoring";
import Panel from "./panel/index.vue";

let viewer = null;
let pointDataSource = null;   // 当前加载的 GeoJSON 数据源

const store = useConfigStore();
const pointData = ref([]);      // 观测点数据
const pointLoading = ref(false);

// 按用地类型分配颜色
const categoryColors = {
  '工业区': Cesium.Color.fromCssColorString('#ef4444'),
  '农业区': Cesium.Color.fromCssColorString('#22c55e'),
  '住宅区': Cesium.Color.fromCssColorString('#3b82f6'),
  '商业区': Cesium.Color.fromCssColorString('#f59e0b'),
  '教育区': Cesium.Color.fromCssColorString('#a855f7'),
};
const defaultPointColor = Cesium.Color.fromCssColorString('#60a5fa');

// 移除旧的数据源
function removePointDataSource() {
  if (pointDataSource && viewer) {
    viewer.dataSources.remove(pointDataSource, true);
    pointDataSource = null;
  }
}

// 将 GeoJSON 加载到 Cesium 场景
async function loadGeoJsonToCesium(geoJson) {
  if (!viewer || !geoJson) return;

  // 移除旧数据源
  removePointDataSource();

  try {
    pointDataSource = await Cesium.GeoJsonDataSource.load(geoJson, {
      clampToGround: true,  // 贴地
    });
    await viewer.dataSources.add(pointDataSource);

    // 设置点样式
    const entities = pointDataSource.entities.values;
    for (const entity of entities) {
      const category = entity.properties?.category?.getValue?.() || entity.properties?.用地类型?.getValue?.();
      const emission = entity.properties?.emission?.getValue?.() || 0;
      const name = entity.properties?.name?.getValue?.() || '';

      // 点大小根据排放量动态计算（有最小值保证可见）
      const size = Math.max(8, Math.min(24, Math.sqrt(emission) * 0.3));
      const color = categoryColors[category] || defaultPointColor;

      entity.point = {
        pixelSize: size,
        color: color,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 1,
        scaleByDistance: new Cesium.NearFarScalar(500, 1.5, 50000, 0.5),
        translucencyByDistance: new Cesium.NearFarScalar(500, 1.0, 50000, 0.3),
      };

      // 标签：显示名称和排放量
      entity.label = {
        text: `${name}\n${emission.toFixed(1)}t`,
        font: '12px sans-serif',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -10),
        scaleByDistance: new Cesium.NearFarScalar(500, 1.0, 20000, 0.0),
      };

      // 清除默认的 billboard（如果有）
      entity.billboard = undefined;
    }

    // eslint-disable-next-line no-console
    console.log(`[Cesium] 已加载 ${entities.length} 个观测点到场景`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Cesium] GeoJSON 加载失败:', error);
  }
}

// 获取观测点数据
async function fetchPoints() {
  pointLoading.value = true;
  try {
    const res = await getBuildingObservationPoint(store.year, store.quarter, true);
    pointData.value = res.data || [];

    // 如果返回的是 GeoJSON FeatureCollection，加载到 Cesium
    const geoJson = res.data;
    if (geoJson && geoJson.type === 'FeatureCollection') {
      await loadGeoJsonToCesium(geoJson);
    }

    // eslint-disable-next-line no-console
    console.log(`[观测点] ${store.year} ${store.quarter}: 获取到 ${geoJson?.features?.length || 0} 条数据`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[观测点] 数据获取失败:', error);
    pointData.value = [];
  } finally {
    pointLoading.value = false;
  }
}

// 监听年份/季度变化，自动重新获取数据并更新场景
watch([() => store.year, () => store.quarter], () => {
  fetchPoints();
});

onMounted(async() => {
  store.mapPlayComplete = true;

  // 初始加载观测点数据
  fetchPoints();

 viewer = new Cesium.Viewer('cesiumContainer', {
    navigation: false
  })
  window.cesiumViewer = viewer

  const scene = viewer.scene
  try {
    const layers = await scene.open('/iserver/services/3D-twin-carbon-city/rest/realspace')
    if (layers?.length > 0) {
      viewer.flyTo?.(layers[0])
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('场景加载失败:', error)
  }

});
onUnmounted(() => {
  removePointDataSource();
  store.reset();
});
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
