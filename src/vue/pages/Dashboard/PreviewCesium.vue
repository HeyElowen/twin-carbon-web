<template>
  <div ref="containerRef" v-show="store.uploadPreviewActive" class="preview-cesium"></div>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { Heatmap3D } from "@/js/utils/heatmap3D";
import { useDistrictOverlay } from "@/js/composables/useDistrictOverlay";

const store = useConfigStore();
const containerRef = ref(null);
const districtOverlay = useDistrictOverlay();
let previewViewer = null;
let previewHeatmap = null;

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

/**
 * 将预览 GeoJSON FeatureCollection 加载到预览场景 + 热力图数据源
 */
async function loadPreviewDataToViewer(geoJson) {
  if (!previewViewer || !geoJson || !geoJson.features) return;

  // 移除旧的数据实体（如果有）
  previewViewer.dataSources.removeAll(true);

  // 加载 GeoJSON 到场景（贴地显示点位）
  if (geoJson.features.length > 0) {
    try {
      const ds = await Cesium.GeoJsonDataSource.load(geoJson, { clampToGround: true });
      previewViewer.dataSources.add(ds);
      const entities = ds.entities.values;
      for (const entity of entities) {
        entity.point = undefined;
        entity.label = undefined;
        entity.billboard = undefined;
      }
    } catch (e) {
      console.warn("[PreviewCesium] 预览数据加载失败:", e);
    }
  }

  // 同步更新热力图数据源
  updatePreviewHeatmapData(geoJson);
}

/**
 * 从 GeoJSON 提取热力图所需数据并传递给 Heatmap3D 实例
 */
function updatePreviewHeatmapData(geoJson) {
  if (!previewHeatmap) return;

  if (!geoJson || !geoJson.features || geoJson.features.length === 0) {
    previewHeatmap.remove();
    return;
  }

  const heatData = geoJson.features
    .map((f) => {
      const props = f.properties || {};
      const coords = f.geometry?.coordinates || [];
      const lon = props.lon ?? coords[0];
      const lat = props.lat ?? coords[1];
      const emission = props.emission;
      if (lon == null || lat == null || emission == null) return null;
      return { name: props.name || "", lon: Number(lon), lat: Number(lat), value: Number(emission) };
    })
    .filter(Boolean);

  if (heatData.length === 0) {
    previewHeatmap.remove();
    return;
  }

  if (store.heatmapConfig.enabled) {
    previewHeatmap.render(heatData);
  }
}

// ==================== 预览 Cesium 生命周期 ====================

watch(() => store.uploadPreviewActive, async (active) => {
  await nextTick();
  if (active && containerRef.value) {
    // 创建预览 Viewer
    previewViewer = new Cesium.Viewer(containerRef.value, {
      navigationHelpButton: false,
      baseLayerPicker: false,
      skyBox: false,
      skyAtmosphere: false,
      shouldAnimate: false,
    });
    setupBaseImagery(previewViewer);

    // 绘制区域图幅 + 名称标签（与主视图一致，共享同一套边界/颜色数据）
    districtOverlay.createOverlay(previewViewer, store.districts);

    // 等待 3D 场景加载完成后再初始化热力图（与主视图时序一致）
    const sceneUrl = 'http://localhost:8090/iserver/services/3D-twin-carbon-city/rest/realspace';
    try {
      await previewViewer.scene.open(sceneUrl);
    } catch (e) {
      // 3D 场景加载失败不阻塞，只显示底图
    }

    setupPreviewCameraSync();
    console.log('[PCH] 场景加载完成, 准备创建热力图引擎');
    // 创建预览热力图实例
    previewHeatmap = new Heatmap3D(previewViewer, {
      scaleHeight: store.heatmapConfig.scaleHeight,
      gridSize: store.heatmapConfig.gridSize,
      sigmaMeters: store.heatmapConfig.sigmaMeters,
      opacity: store.heatmapConfig.opacity,
      clampToGround: store.heatmapConfig.clampToGround,
      power: store.heatmapConfig.power,
    });
    console.log('[PCH] 热力图引擎已创建:', !!previewHeatmap, 'viewer:', !!previewViewer);

    // 如果有预览数据，按当前年/季度筛选后加载
    if (store.previewFeatures) {
      reloadPreviewData();
    }
  } else {
    // 销毁预览图幅 + 热力图 + Viewer
    districtOverlay.removeOverlay(previewViewer);
    if (previewHeatmap) {
      previewHeatmap.destroy();
      previewHeatmap = null;
    }
    if (previewViewer) {
      previewViewer.destroy();
      previewViewer = null;
    }
  }
  // 通知主 viewer 重新调整尺寸
  window.cesiumViewer?.resize();
});

/**
 * 从 previewFeatures 中筛选出匹配当前 year/quarter 的 features
 * 若 features 没有 year/quarter 字段（旧后端数据），则返回全部
 */
function getFilteredFeatures() {
  const fc = store.previewFeatures;
  if (!fc || !fc.features) return null;
  // 检查首条 feature 是否有 year 字段，没有则说明是旧格式 → 不过滤
  const first = fc.features[0];
  if (!first || first.properties?.year == null) return fc;
  const year = store.year;
  const quarter = store.quarter;
  if (quarter === 'ALL') {
    return { ...fc, features: fc.features.filter(f => f.properties?.year === year) };
  }
  return {
    ...fc,
    features: fc.features.filter(f => f.properties?.year === year && f.properties?.quarter === quarter)
  };
}

/** 加载筛选后的预览数据到场景 + 热力图 */
function reloadPreviewData() {
  if (!previewViewer || !store.previewFeatures) return;
  const filtered = getFilteredFeatures();
  console.log('[PCH] reloadPreviewData filtered.features=', filtered?.features?.length, 'heatmap.enabled=', store.heatmapConfig.enabled, 'heatmap.engine=', !!previewHeatmap);
  if (filtered && filtered.features.length > 0) {
    loadPreviewDataToViewer(filtered);
    if (store.heatmapConfig.enabled) {
      updatePreviewHeatmapData(filtered);
    }
  } else {
    previewViewer.dataSources.removeAll(true);
    if (previewHeatmap) previewHeatmap.remove();
  }
}

// ==================== 预览数据变化 ====================
watch(
  () => store.previewFeatures,
  (features) => {
    if (previewViewer && features) {
      reloadPreviewData();
    }
  },
  { deep: true }
);

// ==================== 年/季度筛选变化 ====================
watch(
  () => [store.year, store.quarter],
  () => {
    if (previewViewer && store.previewFeatures) {
      reloadPreviewData();
    }
  }
);

// ==================== 热力图开关联动 ====================
watch(
  () => store.heatmapConfig.enabled,
  (enabled) => {
    if (!store.previewFeatures) return;
    if (!previewHeatmap) return;
    if (enabled) {
      const filtered = getFilteredFeatures();
      if (filtered) updatePreviewHeatmapData(filtered);
    } else {
      previewHeatmap.remove();
    }
  }
);

// ==================== 相机双向同步 ====================
let previewCamSyncing = false;

// 主→预览：mainCamera 变化 → 同步到预览视图
watch(
  () => store.mainCamera,
  (cam) => {
    if (!previewViewer || !cam || !cam.destination) return;
    previewCamSyncing = true;
    previewViewer.camera.setView({
      destination: new Cesium.Cartesian3(cam.destination.x, cam.destination.y, cam.destination.z),
      orientation: { heading: cam.heading, pitch: cam.pitch, roll: cam.roll },
    });
    // 下一帧清除标志（camera.changed 异步触发）
    requestAnimationFrame(() => { previewCamSyncing = false; });
  },
  { deep: true }
);

// 预览→主：预览相机变化 → 回写到 store，由 dashboard 同步到主视图
function setupPreviewCameraSync() {
  if (!previewViewer) return;
  previewViewer.scene.camera.changed.addEventListener(() => {
    if (previewCamSyncing) return;
    const c = previewViewer.scene.camera;
    store.mainCamera = {
      destination: { x: c.position.x, y: c.position.y, z: c.position.z },
      heading: c.heading,
      pitch: c.pitch,
      roll: c.roll,
    };
  });
}

// ==================== 区域图幅可见性切换 ====================
watch(
  () => store.districts,
  (val) => { districtOverlay.updateVisibility(previewViewer, val); },
  { deep: true }
);

// ==================== 热力图参数联动 ====================
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
    if (!previewHeatmap || !store.heatmapConfig.enabled || !store.previewFeatures) return;
    previewHeatmap.setScaleHeight(scaleHeight);
    previewHeatmap.setGridSize(gridSize);
    previewHeatmap.setSigmaMeters(sigmaMeters);
    previewHeatmap.setOpacity(opacity);
    previewHeatmap.setClampToGround(clampToGround);
    previewHeatmap.setPower(power);
  }
);

onUnmounted(() => {
  districtOverlay.removeOverlay(previewViewer);
  if (previewHeatmap) {
    previewHeatmap.destroy();
    previewHeatmap = null;
  }
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
