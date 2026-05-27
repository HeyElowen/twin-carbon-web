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
import { Heatmap3D } from "@/js/utils/heatmap3D";

let viewer = null;
let pointDataSource = null;   // 当前加载的 GeoJSON 数据源
let heatmap3D = null;         // 3D 热力图实例

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

    // 隐藏所有视觉表示：数据已加载到场景，但完全不显示外观
    // 后续仍可通过 pointDataSource.entities.values 访问属性数据做分析
    const entities = pointDataSource.entities.values;
    for (const entity of entities) {
      entity.point = undefined;
      entity.label = undefined;
      entity.billboard = undefined;
      entity.polyline = undefined;
      entity.polygon = undefined;
      // entity.properties 中保留了原始 GeoJSON 属性（category / emission / name / lon / lat 等）
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

    // 数据就绪后，同步更新 3D 热力图
    await updateHeatmap();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[观测点] 数据获取失败:', error);
    pointData.value = [];
  } finally {
    pointLoading.value = false;
  }
}

// 将观测点数据同步到 3D 热力图
async function updateHeatmap() {
  if (!heatmap3D) {
    // eslint-disable-next-line no-console
    console.log('[Heatmap] 引擎尚未初始化，跳过渲染');
    return;
  }
  if (!store.heatmapConfig.enabled) {
    // eslint-disable-next-line no-console
    console.log('[Heatmap] 开关为关闭状态，跳过渲染');
    return;
  }

  // 统一提取数据：支持对象数组 或 GeoJSON FeatureCollection
  let rawPoints = pointData.value;
  if (rawPoints && rawPoints.type === 'FeatureCollection' && Array.isArray(rawPoints.features)) {
    rawPoints = rawPoints.features.map((f) => {
      // GeoJSON 标准坐标在 geometry.coordinates，部分后端也在 properties 里冗余 lon/lat
      const coords = f.geometry?.coordinates;
      return {
        name: f.properties?.name,
        lon: f.properties?.lon ?? coords?.[0],
        lat: f.properties?.lat ?? coords?.[1],
        emission: f.properties?.emission,
      };
    });
  }
  if (!Array.isArray(rawPoints) || rawPoints.length === 0) {
    // eslint-disable-next-line no-console
    console.log('[Heatmap] 无可用数据，跳过渲染');
    return;
  }

  // 提取 lon/lat/emission，通过 name 与建筑建立关联
  const heatData = rawPoints
    .filter((p) => p != null && p.lon != null && p.lat != null && p.emission != null)
    .map((p) => ({
      name: p.name || '',
      lon: Number(p.lon),
      lat: Number(p.lat),
      value: Number(p.emission),
    }));

  // eslint-disable-next-line no-console
  console.log(`[Heatmap] 准备渲染 ${heatData.length} 个有效数据点`);

  if (heatData.length > 0) {
    await heatmap3D.render(heatData);
  } else {
    // eslint-disable-next-line no-console
    console.warn('[Heatmap] 数据点中缺少 lon/lat/emission 字段，无法渲染');
  }
}

// 监听年份/季度变化，自动重新获取数据并更新场景
watch([() => store.year, () => store.quarter], () => {
  fetchPoints();
});

// 监听热力图开关
watch(
  () => store.heatmapConfig.enabled,
  async (enabled) => {
    if (!heatmap3D) return;
    if (enabled) {
      await updateHeatmap();
    } else {
      heatmap3D.remove();
    }
  }
);

// 监听热力图参数变化，调用对应 setter（setter 内部会触发 build）
watch(
  () => [
    store.heatmapConfig.scaleHeight,
    store.heatmapConfig.gridSize,
    store.heatmapConfig.sigmaMeters,
    store.heatmapConfig.opacity,
    store.heatmapConfig.clampToGround,
    store.heatmapConfig.power,
  ],
  ([scaleHeight, gridSize, sigmaMeters, opacity, clampToGround, power]) => {
    if (!heatmap3D || !store.heatmapConfig.enabled) return;
    heatmap3D.setScaleHeight(scaleHeight);
    heatmap3D.setGridSize(gridSize);
    heatmap3D.setSigmaMeters(sigmaMeters);
    heatmap3D.setOpacity(opacity);
    heatmap3D.setClampToGround(clampToGround);
    heatmap3D.setPower(power);
  }
);

onMounted(async() => {
  store.mapPlayComplete = true;

  // 初始加载观测点数据
  fetchPoints();

  viewer = new Cesium.Viewer('cesiumContainer', {
    navigationHelpButton: false,
    baseLayerPicker: false,
    skyBox: false,
    skyAtmosphere: false,
    shouldAnimate: false
  })
  window.cesiumViewer = viewer

  // 限制并发请求数，缓解天地图 429 限流
  Cesium.RequestScheduler.maximumRequests = 12
  Cesium.RequestScheduler.maximumRequestsPerServer = 2

  const scene = viewer.scene
  const imageryLayers = viewer.imageryLayers

  // 移除默认底图
  imageryLayers.remove(imageryLayers.get(0), true)

  const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
  const tk = 'cec53f834be34c955bae0afecd4caa3e'

  // 添加天地图影像底图（使用 DataServer 轻量接口，避免 WMTS 参数重复）
  const tdtImg = new Cesium.UrlTemplateImageryProvider({
    url: `https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${tk}`,
    subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    minimumLevel: 1,
    maximumLevel: 18,
    credit: new Cesium.Credit('天地图')
  })
  imageryLayers.addImageryProvider(tdtImg)

  // 监听瓦片加载错误，429 时停止重试该瓦片，避免错误刷屏
  tdtImg.errorEvent.addEventListener((error) => {
    if (error?.statusCode === 429) {
      return false // 告诉 Cesium 不要重试这个瓦片
    }
  })

  // 标注层：天地图免费密钥限流严格，影像+标注双图层容易触发 429
  // 如需显示地名标注，可取消下面注释（但可能再次出现大量 429 错误）
  // const tdtCia = new Cesium.UrlTemplateImageryProvider({
  //   url: `https://t{s}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${tk}`,
  //   subdomains,
  //   tilingScheme: new Cesium.WebMercatorTilingScheme(),
  //   maximumLevel: 12,
  //   credit: new Cesium.Credit('天地图')
  // })
  // imageryLayers.addImageryProvider(tdtCia)

  try {
    const layers = await scene.open('http://localhost:8090/iserver/services/3D-global/rest/realspace')
    if (layers?.length > 0) {
      viewer.flyTo?.(layers[0])
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('场景加载失败:', error)
  }

  // 初始化 3D 热力图引擎（传入初始配置）
  heatmap3D = new Heatmap3D(viewer, {
    scaleHeight: store.heatmapConfig.scaleHeight,
    gridSize: store.heatmapConfig.gridSize,
    sigmaMeters: store.heatmapConfig.sigmaMeters,
    opacity: store.heatmapConfig.opacity,
    clampToGround: store.heatmapConfig.clampToGround,
    power: store.heatmapConfig.power,
  })

  // 如果数据已提前加载完毕，且开关为打开状态，立即渲染
  if (pointData.value.length > 0 && store.heatmapConfig.enabled) {
    await updateHeatmap()
  }
});
onUnmounted(() => {
  removePointDataSource();
  if (heatmap3D) {
    heatmap3D.destroy()
    heatmap3D = null
  }
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
