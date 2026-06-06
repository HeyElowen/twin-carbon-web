<template>
  <div class="wrapper" :class="{ 'is-split': store.uploadPreviewActive }">
    <PreviewCesium />
    <div id="cesiumContainer"></div>

    <!-- 预览时间回溯条（跨两个地图容器） -->
    <div class="preview-timeline" v-if="store.uploadPreviewActive && previewPeriods.length > 0">
      <button class="pt-btn" @click="toggleTraceback" :title="tbPlaying ? '暂停' : '播放'">
        <svg v-if="tbPlaying" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <div class="pt-track">
        <div class="pt-fill" :style="{ width: tbProgress + '%' }" />
      </div>
      <span class="pt-label">{{ tbCurrentLabel }}</span>
      <button class="pt-btn" @click="tbReset" title="重置">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
      </button>
    </div>

    <Panel />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getBuildingObservationPoint } from "@/api/monitoring";
import Panel from "./panel/index.vue";
import PreviewCesium from "./PreviewCesium.vue";
import { Heatmap3D } from "@/js/utils/heatmap3D";

let viewer = null;
let pointDataSource = null;   // 当前加载的 GeoJSON 数据源
let heatmap3D = null;         // 3D 热力图实例

const store = useConfigStore();
const pointData = ref([]);      // 观测点数据
const pointLoading = ref(false);

// ── 预览时间回溯 ──
const tbPlaying = ref(false);
const tbIndex = ref(0);
let tbTimer = null;

const previewPeriods = computed(() => {
  const fc = store.previewFeatures;
  if (!fc?.features) return [];
  const seen = new Set();
  const periods = [];
  for (const f of fc.features) {
    const y = f.properties?.year;
    const q = f.properties?.quarter;
    if (y == null || !q) continue;
    const key = `${y}-${q}`;
    if (!seen.has(key)) {
      seen.add(key);
      periods.push({ year: y, quarter: q, label: `${y} ${q}` });
    }
  }
  return periods.sort((a, b) => a.year - b.year || a.quarter.localeCompare(b.quarter));
});
const tbCurrentLabel = computed(() => previewPeriods.value[tbIndex.value]?.label || '');
const tbProgress = computed(() => {
  if (!previewPeriods.value.length) return 0;
  return ((tbIndex.value + 1) / previewPeriods.value.length) * 100;
});

function tbReset() {
  tbStop();
  tbIndex.value = 0;
  if (previewPeriods.value.length > 0) {
    const p = previewPeriods.value[0];
    store.setYear(p.year);
    store.setQuarter(p.quarter);
  }
}
function tbStop() {
  tbPlaying.value = false;
  if (tbTimer) { clearInterval(tbTimer); tbTimer = null; }
}
function toggleTraceback() {
  if (tbPlaying.value) { tbStop(); return; }
  if (!previewPeriods.value.length) return;
  if (tbIndex.value >= previewPeriods.value.length - 1) tbIndex.value = 0;
  tbPlaying.value = true;
  const p = previewPeriods.value[tbIndex.value];
  store.setYear(p.year);
  store.setQuarter(p.quarter);
  tbTimer = setInterval(() => {
    const next = tbIndex.value + 1;
    if (next >= previewPeriods.value.length) { tbStop(); return; }
    tbIndex.value = next;
    const np = previewPeriods.value[next];
    store.setYear(np.year);
    store.setQuarter(np.quarter);
  }, 500);
}
watch(() => store.previewFeatures, () => { tbReset(); });
watch(() => store.uploadPreviewActive, (v) => { if (!v) tbStop(); });

// 按用地类型分配颜色
const categoryColors = {
  '工业区': Cesium.Color.fromCssColorString('#ef4444'),
  '农业区': Cesium.Color.fromCssColorString('#22c55e'),
  '住宅区': Cesium.Color.fromCssColorString('#3b82f6'),
  '商业区': Cesium.Color.fromCssColorString('#f59e0b'),
  '教育区': Cesium.Color.fromCssColorString('#a855f7'),
};

// ─── 区域边界（经纬度多边形）────────────────────
const districtBoundaries = {
  '教育区': [
    [120.480, 31.552], [120.510, 31.552],
    [120.510, 31.570], [120.480, 31.570],
  ],
  '商业区': [
    [120.498, 31.570], [120.522, 31.570],
    [120.522, 31.588], [120.498, 31.588],
  ],
  '工业区': [
    [120.518, 31.582], [120.552, 31.582],
    [120.552, 31.612], [120.518, 31.612],
  ],
  '住宅区': [
    [120.472, 31.564], [120.498, 31.564],
    [120.498, 31.582], [120.472, 31.582],
  ],
  '农业区': [
    [120.452, 31.538], [120.482, 31.538],
    [120.482, 31.562], [120.452, 31.562],
  ],
};
const districtCenter = {
  '教育区': [120.495, 31.561],
  '商业区': [120.510, 31.579],
  '工业区': [120.535, 31.597],
  '住宅区': [120.485, 31.573],
  '农业区': [120.467, 31.550],
};

let districtEntities = {}; // key: 区域名 → { polygon, label }
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
      // 同步到 store 供 AnalysisLeft / AnalysisRight 复用，避免重复请求
      store.buildingPointFeatures = geoJson.features || [];
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
    // 回溯模式下通知进度管理器
    if (store.tracebackPlaying) store.tracebackTick();
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

// 离开数据上传面板时强制关闭预览分屏
watch(() => store.activeKey, (key) => {
  if (key !== 'bar') store.setUploadPreview(false);
});

// ─── 区域显示控制（Cesium 多边形 + 标签）────────
function createGradientCanvas(color) {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const r = Math.round(color.red * 255);
  const g = Math.round(color.green * 255);
  const b = Math.round(color.blue * 255);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, `rgba(${r},${g},${b},0)`);
  gradient.addColorStop(0.5, `rgba(${r},${g},${b},0.06)`);
  gradient.addColorStop(0.8, `rgba(${r},${g},${b},0.20)`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0.55)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

// 生成文字 Canvas：字号、字间距、渐变色填充
function createTextCanvas(text, color, fontSize) {
  const r = Math.round(color.red * 255);
  const g = Math.round(color.green * 255);
  const b = Math.round(color.blue * 255);
  const font = `bold ${fontSize}px "Microsoft YaHei", sans-serif`;
  const spaced = text.split('').join(' ');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  const tw = Math.ceil(ctx.measureText(spaced).width);
  const th = fontSize * 1.4;
  canvas.width = tw + 20;
  canvas.height = th + 12;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = `rgba(${r},${g},${b},0.6)`;
  ctx.fillText(spaced, canvas.width / 2, canvas.height / 2);
  return canvas;
}

function createDistrictOverlay() {
  if (!viewer) return;
  Object.values(districtEntities).forEach((e) => {
    viewer.entities.remove(e.polygon);
    viewer.entities.remove(e.label);
  });
  districtEntities = {};

  Object.entries(districtBoundaries).forEach(([name, coords]) => {
    const positions = coords.map((c) => Cesium.Cartesian3.fromDegrees(c[0], c[1], 15));
    const color = categoryColors[name] || Cesium.Color.WHITE;
    const center = districtCenter[name];
    const visible = store.districts[name];

    const polygon = viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(positions),
        material: new Cesium.ImageMaterialProperty({
          image: createGradientCanvas(color),
          transparent: true,
        }),
        outline: true,
        outlineColor: color.withAlpha(0.6),
        outlineWidth: 3,
        perPositionHeight: true,
        show: visible,
      },
    });

    // 根据区域地理跨度（经度宽度）计算字号，使文字刚好适配区域大小
    const lons = coords.map((c) => c[0]);
    const lonSpan = Math.max(...lons) - Math.min(...lons);
    const fontSize = Math.round(lonSpan * 1600);
    // 使用 Canvas 绘制带渐变、字间距的文字，以 billboard 固定在区域上方
    const textCanvas = createTextCanvas(name, color, fontSize);
    const label = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(center[0], center[1], 30),
      billboard: {
        image: textCanvas,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scaleByDistance: new Cesium.NearFarScalar(500, 4.0, 40000, 0.15),
        show: visible,
      },
    });

    districtEntities[name] = { polygon, label };
  });
}

watch(
  () => store.districts,
  (val) => {
    Object.entries(val).forEach(([name, visible]) => {
      const e = districtEntities[name];
      if (e) {
        e.polygon.show = visible;
        e.label.show = visible;
      }
    });
  },
  { deep: true }
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
    const layers = await scene.open('http://localhost:8090/iserver/services/3D-twin-carbon-city/rest/realspace')
    if (layers?.length > 0) {
      viewer.flyTo?.(layers[0])
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('场景加载失败:', error)
  }

  // 跟踪主相机变化 → 实时同步预览视图（camera.changed 每帧触发）
  viewer.scene.camera.changed.addEventListener(() => {
    store.setMainCamera(viewer.scene.camera);
  });
  // 首次触发一次，确保预览视图初始同步
  store.setMainCamera(viewer.scene.camera);

  // 初始化 3D 热力图引擎（传入初始配置）
  heatmap3D = new Heatmap3D(viewer, {
    scaleHeight: store.heatmapConfig.scaleHeight,
    gridSize: store.heatmapConfig.gridSize,
    sigmaMeters: store.heatmapConfig.sigmaMeters,
    opacity: store.heatmapConfig.opacity,
    clampToGround: store.heatmapConfig.clampToGround,
    power: store.heatmapConfig.power,
  })

  // 创建区域显示控制（多边形 + 标签）
  createDistrictOverlay();

  // 如果数据已提前加载完毕，且开关为打开状态，立即渲染
  if (pointData.value.length > 0 && store.heatmapConfig.enabled) {
    await updateHeatmap()
  }
});
onUnmounted(() => {
  removePointDataSource();
  Object.values(districtEntities).forEach((e) => {
    viewer?.entities.remove(e.polygon);
    viewer?.entities.remove(e.label);
  });
  districtEntities = {};
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
  transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.wrapper.is-split #cesiumContainer {
  left: 50vw;
  width: 50vw;
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

/* ── 预览时间回溯条 ── */
.preview-timeline {
  position: fixed;
  bottom: 95px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(15, 20, 32, 0.85);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  min-width: 320px;
  pointer-events: auto;
}
.pt-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  background: rgba(15, 20, 32, 0.5);
  color: rgba(200, 208, 224, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.pt-btn:hover {
  border-color: rgba(59, 130, 246, 0.4);
  color: #60a5fa;
}
.pt-track {
  flex: 1;
  height: 4px;
  background: rgba(100, 116, 139, 0.2);
  border-radius: 2px;
  overflow: hidden;
}
.pt-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #60a5fa);
  border-radius: 2px;
  transition: width 0.3s ease;
}
.pt-label {
  font-size: 12px;
  color: rgba(200, 208, 224, 0.6);
  white-space: nowrap;
  min-width: 60px;
  text-align: center;
}
</style>
