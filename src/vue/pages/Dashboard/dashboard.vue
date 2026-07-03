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
import { useDistrictOverlay } from "@/js/composables/useDistrictOverlay";
import { useBuildingColoring } from "@/js/composables/useBuildingColoring";

let viewer = null;
let pointDataSource = null;   // 当前加载的 GeoJSON 数据源
let heatmap3D = null;         // 3D 热力图实例
let anomalyEntities = [];     // 极值分析 billboard 实体列表

const store = useConfigStore();
const districtOverlay = useDistrictOverlay();
const buildingColoring = useBuildingColoring();
const pointData = ref([]);      // 观测点数据
const pointLoading = ref(false);

let defaultSceneLayers = [];   // 默认 3D-global 场景加载的图层
let districtSceneLayers = [];  // 分区场景加载的图层
let isDistrictMode = false;    // 当前是否处于分区叠加模式

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
  // rotation 模式下同步更新建筑分层设色
  if (store.activeKey === 'rotation' && isDistrictMode) {
    buildingColoring.applyColoring(viewer, store.year, store.quarter);
    showAnomalyIcons(viewer);
  }
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

// ─── 极值分析图标：在三维建筑上方显示 high / low ──────

// ─── 极值分析图标：Canvas 绘制，避免图片加载问题 ──────────
function createAnomalyIcon(isHigh) {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  // 圆形背景
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 3, 0, Math.PI * 2);
  ctx.fillStyle = isHigh ? '#ef4444' : '#22c55e';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.stroke();
  // 文字
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 28px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(isHigh ? '!' : '√', size / 2, size / 2 + 1);
  return c;
}
async function getBuildingPosition(buildingName) {
  const dataBase = '/iserver/services/3D-global5/rest/data';
  try {
    const dsRes = await fetch(dataBase + '/datasources.json');
    if (!dsRes.ok) return null;
    const dsJson = await dsRes.json();
    const dsNames = (dsJson.datasourceNames || dsJson.datasources || [])
      .map(n => typeof n === 'string' ? n : n.name);
    for (const ds of dsNames) {
      const q = `maxFeatures=1&attributeFilter=名称='${encodeURIComponent(buildingName)}'`;
      const r = await fetch(`${dataBase}/datasources/${ds}/features.json?${q}`);
      if (!r.ok) continue;
      const j = await r.json();
      const f = j.features?.[0];
      if (!f) continue;
      const names = f.fieldNames || [];
      const vals  = f.fieldValues  || [];
      if (names.indexOf('名称') < 0 || vals[names.indexOf('名称')] !== buildingName) continue;
      const iLon = names.indexOf('经度') >= 0 ? names.indexOf('经度') : names.indexOf('lon');
      const iLat = names.indexOf('纬度') >= 0 ? names.indexOf('纬度') : names.indexOf('lat');
      const iH   = names.indexOf('Height') >= 0 ? names.indexOf('Height') : names.indexOf('高度');
      if (iLon >= 0 && iLat >= 0) {
        return { lon: Number(vals[iLon]), lat: Number(vals[iLat]), height: iH >= 0 ? Number(vals[iH]) : 30 };
      }
    }
  } catch (e) { /* 网络异常，返回 null 使用数据自带坐标 */ }
  return null;
}

function clearAnomalyIcons(v) {
  if (!v) return;
  anomalyEntities.forEach(e => v.entities.remove(e));
  anomalyEntities = [];
}

async function showAnomalyIcons(v) {
  if (!v) return;
  clearAnomalyIcons(v);

  const outliers = store.extremeAnalysisData.outliers || [];
  console.log('[AnomalyIcon] 离群建筑:', outliers.filter(o => o.anomalyLevel === 'severe_high' || o.anomalyLevel === 'severe_low').length, '个');
  for (const o of outliers) {
    if (o.anomalyLevel !== 'severe_high' && o.anomalyLevel !== 'severe_low') continue;

    // 优先通过"名称"查询三维建筑真实坐标
    let lon, lat, bldHeight;
    const pos = await getBuildingPosition(o.name);
    if (pos) {
      lon = pos.lon;
      lat = pos.lat;
      bldHeight = pos.height;
    } else if (o.lon != null && o.lat != null) {
      lon = o.lon;
      lat = o.lat;
      bldHeight = o.height || 30;
    } else {
      console.warn('[AnomalyIcon] 无法定位:', o.name);
      continue;
    }

    const isHigh = o.anomalyLevel === 'severe_high';
    const iconHeight = bldHeight + 15;

    const entity = v.entities.add({
      name: o.name,
      position: Cesium.Cartesian3.fromDegrees(lon, lat, iconHeight),
      billboard: {
        image: createAnomalyIcon(isHigh),
        width: 28,
        height: 28,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    });
    anomalyEntities.push(entity);
    console.log('[AnomalyIcon]', o.name, isHigh ? '↑高' : '↓低', lon, lat);
  }
}

// 极值分析数据就绪后自动显示图标
watch(() => store.extremeAnalysisData, () => {
  if (store.activeKey === 'rotation' && viewer) {
    showAnomalyIcons(viewer);
  }
}, { deep: true });

// ─── 分区三维场景切换 ────────────────────────────────────

/** 切换到 rotation 模式：移除默认场景，加载5个分区场景叠加 */
async function switchToDistrictScenes() {
  if (!viewer || isDistrictMode) return;
  const scene = viewer.scene;

  // 移除默认场景图层
  defaultSceneLayers.forEach((layer) => {
    if (layer && scene.layers.find(layer.name)) {
      scene.layers.remove(layer.name);
    }
  });
  defaultSceneLayers = [];

  // 加载统一三维场景
  const loaded = [];
  const url = 'http://localhost:8090/iserver/services/3D-global5/rest/realspace';
  try {
    const layers = await scene.open(url);
    if (layers && layers.length > 0) {
      // 兼容旧版 .s3mb 缓存：强制图层请求 S3MB 格式
      for (const layer of layers) {
        if (layer.fileType !== undefined) {
          layer.fileType = 'S3MB';
        }
      }
      loaded.push(...layers);
      // eslint-disable-next-line no-console
      console.log('[DistrictScene] 统一场景加载成功:', layers.length, '个图层');
      // 加载后关闭雾效
      scene.fog.enabled = false;
      scene.fog.density = 0.0;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[DistrictScene] 统一场景加载失败:', error);
  }
  districtSceneLayers = loaded;
  isDistrictMode = true;

  // 分区场景加载后，确保区域图幅叠加和热力图状态正确
  districtOverlay.updateVisibility(viewer, store.districts);
  if (store.heatmapConfig.enabled) {
    await updateHeatmap();
  }

  // 应用建筑分层设色
  await buildingColoring.applyColoring(viewer, store.year, store.quarter);

  // 自动显示极值分析符号
  showAnomalyIcons(viewer);
}

/** 切出 rotation 模式：移除分区场景，恢复默认 3D-global 场景 */
async function switchToDefaultScene() {
  if (!viewer || !isDistrictMode) return;
  const scene = viewer.scene;

  // 移除所有分区场景图层
  districtSceneLayers.forEach((layer) => {
    if (layer && scene.layers.find(layer.name)) {
      scene.layers.remove(layer.name);
    }
  });
  districtSceneLayers = [];

  // 恢复默认场景
  try {
    const url = 'http://localhost:8090/iserver/services/3D-global5/rest/realspace';
    const layers = await scene.open(url);
    if (layers && layers.length > 0) {
      defaultSceneLayers = layers;
      viewer.flyTo?.(layers[0]);
    }
    // eslint-disable-next-line no-console
    console.log('[DefaultScene] 默认场景恢复成功');
    scene.fog.enabled = false;
    scene.fog.density = 0.0;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[DefaultScene] 默认场景恢复失败:', error);
  }

  isDistrictMode = false;

  // 恢复后同步区域图幅和热力图
  districtOverlay.updateVisibility(viewer, store.districts);
  if (store.heatmapConfig.enabled) {
    await updateHeatmap();
  }

  // 清除建筑分层设色
  buildingColoring.clearAllColoring(viewer);

  // 清除极值分析图标
  clearAnomalyIcons(viewer);
}

// 离开数据上传面板时强制关闭预览分屏
watch(() => store.activeKey, (key) => {
  if (key !== 'bar') store.setUploadPreview(false);
});

// 监听 activeKey 切换，rotation 模式加载分区三维场景叠加
watch(() => store.activeKey, async (key) => {
  if (!viewer) return;
  if (key === 'rotation') {
    await switchToDistrictScenes();
  } else {
    await switchToDefaultScene();
  }
});

// 区域图幅可见性切换
watch(
  () => store.districts,
  (val) => { districtOverlay.updateVisibility(viewer, val); },
  { deep: true }
);

// ─── 区域显示控制由 useDistrictOverlay composable 管理 ────────
// createOverlay / updateVisibility / removeOverlay 在 composable 中统一实现
// dashboard 和 PreviewCesium 共享同一套边界/颜色/字号数据

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

  // 关闭雾效
  viewer.scene.fog.enabled = false;
  viewer.scene.fog.density = 0.0;
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#070a0e');

  // 拦截 .s3md 网络请求，兼容旧版 .s3mb 缓存数据
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (typeof url === 'string' && url.includes('.s3md')) {
      url = url.replace(/\.s3md/g, '.s3mb');
    }
    return originalXHROpen.call(this, method, url, ...args);
  };
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.includes('.s3md')) {
      url = url.replace(/\.s3md/g, '.s3mb');
    }
    return originalFetch.call(this, url, options);
  };

  // 阻止 Ctrl+滚轮 触发浏览器页面缩放，避免标签被浏览器缩放影响
  const cesiumContainer = document.getElementById('cesiumContainer');
  if (cesiumContainer) {
    cesiumContainer.addEventListener('wheel', (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    }, { passive: false });
  }

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
    const layers = await scene.open('http://localhost:8090/iserver/services/3D-global5/rest/realspace')
    if (layers?.length > 0) {
      defaultSceneLayers = layers;
      viewer.flyTo?.(layers[0])
    }
    scene.fog.enabled = false;
    scene.fog.density = 0.0;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('场景加载失败:', error)
  }

  // 如果初始激活面板就是 rotation，立即加载分区场景
  if (store.activeKey === 'rotation') {
    await switchToDistrictScenes();
  }

  // ─── 相机双向同步（主↔预览）───
  let mainCamSyncing = false;
  // 主→预览：主相机变化 → 写入 store
  viewer.scene.camera.changed.addEventListener(() => {
    if (mainCamSyncing) return;
    store.setMainCamera(viewer.scene.camera);
  });
  // 预览→主：store 变化 → 同步到主视图
  watch(() => store.mainCamera, (cam) => {
    if (!viewer || !cam || !cam.destination || mainCamSyncing) return;
    mainCamSyncing = true;
    viewer.camera.setView({
      destination: new Cesium.Cartesian3(cam.destination.x, cam.destination.y, cam.destination.z),
      orientation: { heading: cam.heading, pitch: cam.pitch, roll: cam.roll },
    });
    requestAnimationFrame(() => { mainCamSyncing = false; });
  }, { deep: true });
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
  districtOverlay.createOverlay(viewer, store.districts);

  // 如果数据已提前加载完毕，且开关为打开状态，立即渲染
  if (pointData.value.length > 0 && store.heatmapConfig.enabled) {
    await updateHeatmap()
  }
});
onUnmounted(() => {
  removePointDataSource();
  districtOverlay.removeOverlay(viewer);
  buildingColoring.clearAllColoring(viewer);
  clearAnomalyIcons(viewer);
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
