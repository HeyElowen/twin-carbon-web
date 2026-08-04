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

    <!-- 建筑属性卡片（点击三维建筑时弹出） -->
    <div v-if="buildingInfo" class="building-info-card">
      <button class="bi-close" @click="buildingInfo = null">✕</button>
      <div class="bi-title">{{ buildingInfo.name || '建筑属性' }}</div>
      <table class="bi-table">
        <tr><td class="bi-label">SMID</td><td class="bi-value">{{ buildingInfo.smid }}</td></tr>
        <tr v-if="buildingInfo.year"><td class="bi-label">年份</td><td class="bi-value">{{ buildingInfo.year }}</td></tr>
        <tr v-if="buildingInfo.quarter"><td class="bi-label">季度</td><td class="bi-value">{{ buildingInfo.quarter }}</td></tr>
        <tr v-if="buildingInfo.category"><td class="bi-label">用地类型</td><td class="bi-value">{{ buildingInfo.category }}</td></tr>
        <tr v-if="buildingInfo.emission != null"><td class="bi-label">碳排放</td><td class="bi-value">{{ buildingInfo.emission }} tCO₂</td></tr>
      </table>
      <div v-if="!buildingInfo.year" class="bi-nodata">当前时段未加载该建筑的碳数据</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getBuildingObservationPoint } from "@/api/monitoring";
import { getLayeredColoring } from "@/api/analysis";
import { fetchSpatialData } from "@/api/agent";
import Panel from "./panel/index.vue";
import PreviewCesium from "./PreviewCesium.vue";
import { Heatmap3D } from "@/js/utils/heatmap3D";
import { useDistrictOverlay } from "@/js/composables/useDistrictOverlay";
// useBuildingColoring（已删除：旧版屏幕拾取染色，改用 setObjsColor）

let viewer = null;
let pointDataSource = null;   // 当前加载的 GeoJSON 数据源
let spatialDataSource = null; // 空间分析结果（缓冲区多边形）数据源
let heatmap3D = null;         // 3D 热力图实例
// anomalyEntities（已删除，改用 setObjsColor）

const store = useConfigStore();
const districtOverlay = useDistrictOverlay();
const pointData = ref([]);      // 观测点数据
const pointLoading = ref(false);
const buildingInfo = ref(null); // 点击建筑后弹出的属性表

let defaultSceneLayers = [];   // 默认 3D-global 场景加载的图层
let districtSceneLayers = [];  // 分区场景加载的图层
let isDistrictMode = false;    // 当前是否处于分区叠加模式

// ── 分层设色：排放等级颜色（1~5 从低到高）──
const LEVEL_COLORS = {
  1: new Cesium.Color(0.133, 0.773, 0.369, 1),
  2: new Cesium.Color(0.518, 0.800, 0.086, 1),
  3: new Cesium.Color(0.961, 0.620, 0.043, 1),
  4: new Cesium.Color(0.976, 0.451, 0.086, 1),
  5: new Cesium.Color(0.937, 0.267, 0.267, 1),
};

// ── 叠加分析高亮颜色（默认 blue）──
const HIGHLIGHT_COLORS = {
  blue: new Cesium.Color(0.133, 0.518, 0.773, 1),
  red: new Cesium.Color(0.937, 0.267, 0.267, 1),
  orange: new Cesium.Color(0.976, 0.451, 0.086, 1),
  green: new Cesium.Color(0.133, 0.773, 0.369, 1),
};

/** 找到当前 S3M 图层 */
function getS3MLayer(v) {
  if (!v?.scene?.layers) return null;
  const ls = v.scene.layers;
  // AssociativeArray._array（之前控制台验证的路径）
  if (ls._layers && ls._layers._array) {
    for (const l of ls._layers._array) {
      if (l && typeof l.setObjsColor === 'function') return l;
    }
  }
  // 兜底：_layers 枚举
  if (ls._layers) {
    for (const k in ls._layers) {
      const l = ls._layers[k];
      if (l && typeof l.setObjsColor === 'function') return l;
    }
  }
  return null;
}

/** 基于后端分层设色数据，用 setObjsColor 染色 */
async function applyLevelColoring(v) {
  const layer = getS3MLayer(v);
  if (!layer) return;
  try {
    const res = await getLayeredColoring(store.year, store.quarter);
    const buildings = res.data?.buildings;
    if (!buildings || buildings.length === 0) return;
    layer.removeAllObjsColor();
    const byLevel = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    for (const b of buildings) {
      if (b.smid && byLevel[b.level]) byLevel[b.level].push(b.smid);
    }
    for (const [lv, ids] of Object.entries(byLevel)) {
      if (ids.length > 0) layer.setObjsColor(ids, LEVEL_COLORS[Number(lv)]);
    }
    console.log('[LevelColoring] 已染色', buildings.length, '栋建筑');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[LevelColoring] 失败:', e);
  }
}

/** 高亮指定 SMID 的三维建筑（叠加染色，不影响分层设色） */
async function loadHighlightToCesium(smids, color = 'blue') {
  if (!viewer) { console.warn('[Highlight] viewer is null'); return; }
  if (!smids || smids.length === 0) { console.warn('[Highlight] smids 为空'); return; }

  const layer = getS3MLayer(viewer);
  if (!layer) { console.warn('[Highlight] 找不到 S3M 图层'); return; }

  const cesiumColor = HIGHLIGHT_COLORS[color] || HIGHLIGHT_COLORS.blue;
  try {
    layer.setObjsColor(smids, cesiumColor);
    console.log('[Highlight] 已高亮', smids.length, '栋建筑，颜色:', color);
  } catch (e) {
    console.error('[Highlight] setObjsColor 失败:', e);
  }
}

/** 清除建筑高亮（保留缓冲区图层和分层设色） */
function clearHighlight() {
  if (!viewer) { console.warn('[Highlight] viewer is null'); return; }
  const layer = getS3MLayer(viewer);
  if (layer && typeof layer.removeAllObjsColor === 'function') {
    try {
      layer.removeAllObjsColor();
      console.log('[Highlight] 已清除所有建筑高亮');
    } catch (e) {
      console.error('[Highlight] removeAllObjsColor 失败:', e);
    }
  }
}

// ── 极值分析图标 ──
let extremeEntities = [];

const _base = import.meta.env.BASE_URL || '/';
const EXTREME_ICONS = {
  HIGH: `${_base}images/high.jpg`,
  LOW: `${_base}images/low.png`,
  SEVERE_HIGH: `${_base}images/high.jpg`,
  MILD_HIGH: `${_base}images/high.jpg`,
  SEVERE_LOW: `${_base}images/low.png`,
  MILD_LOW: `${_base}images/low.png`,
};

function clearExtremeIcons(v) {
  if (!v) return;
  extremeEntities.forEach(e => v.entities.remove(e));
  extremeEntities = [];
}

function updateExtremeIcons(v) {
  clearExtremeIcons(v);
  if (!v || !isDistrictMode) return;
  const outliers = store.extremeAnalysisData.outliers || [];
  for (const o of outliers) {
    if (!o.smid || o.lon == null || o.lat == null) continue;
    const h = (o.height || 30) + 20;
    const entity = v.entities.add({
      name: o.name,
      position: Cesium.Cartesian3.fromDegrees(o.lon, o.lat, h),
      billboard: {
        image: EXTREME_ICONS[o.type] || EXTREME_ICONS.HIGH,
        width: 28,
        height: 28,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    });
    extremeEntities.push(entity);
  }
}

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

/**
 * 加载空间分析结果（缓冲区多边形等）到 Cesium 场景。
 * 使用三维立体效果：多边形向上拉伸 + 超图扫描边样式。
 * 自动移除上一次的空间结果图层，可选飞行定位。
 */
async function loadSpatialToCesium(geoJson, shouldFlyTo = true) {
  if (!viewer) { console.warn('[Spatial] viewer is null'); return; }
  if (!geoJson) { console.warn('[Spatial] geoJson is null/undefined'); return; }

  const featureCount = geoJson.features?.length ?? 0;
  console.log('[Spatial] loadSpatialToCesium: features=', featureCount, 'flyTo=', shouldFlyTo);
  console.log('[Spatial] geoJson sample:', JSON.stringify(geoJson).substring(0, 200));

  // 移除旧的空间数据源
  if (spatialDataSource) {
    console.log('[Spatial] 移除旧 spatialDataSource');
    viewer.dataSources.remove(spatialDataSource, true);
    spatialDataSource = null;
  }

  try {
    // ★ 三维立体：不用 clampToGround，用 extrudedHeight 做垂直拉伸
    spatialDataSource = await Cesium.GeoJsonDataSource.load(geoJson, {
      clampToGround: false,
    });
    await viewer.dataSources.add(spatialDataSource);

    console.log('[Spatial] GeoJsonDataSource.load 成功');

    // 计算多边形中心点坐标
    let centerLng = 0, centerLat = 0;
    const firstCoords = geoJson.features?.[0]?.geometry?.coordinates?.[0];
    if (firstCoords && firstCoords.length > 0) {
      let sumLng = 0, sumLat = 0, count = 0;
      for (const c of firstCoords) { sumLng += c[0]; sumLat += c[1]; count++; }
      centerLng = sumLng / count;
      centerLat = sumLat / count;
      console.log('[Spatial] 多边形中心:', centerLng, centerLat);
    }

    // 应用三维立体样式（拉伸 + 超图扫描边）
    const EXTRUDE_HEIGHT = 150; // 拉伸高度
    const FILL_COLOR = 'rgba(59, 130, 246, 0.30)';

    const entities = spatialDataSource.entities.values;
    let styledCount = 0;
    for (const entity of entities) {
      if (entity.polygon) {
        // ★ 三维拉伸
        entity.polygon.height = 0;
        entity.polygon.extrudedHeight = EXTRUDE_HEIGHT;
        entity.polygon.closeTop = true;
        entity.polygon.closeBottom = true;
        entity.polygon.material = Cesium.Color.fromCssColorString(FILL_COLOR);
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Cesium.Color.fromCssColorString('rgba(59, 130, 246, 0.9)');
        entity.polygon.outlineWidth = 1;
        styledCount++;
      }
    }
    console.log('[Spatial] 已应用三维样式:', styledCount, '个 polygon, extrudedHeight=', EXTRUDE_HEIGHT);

    // ★ 超图扫描边效果（在缓冲区中心创建一个扩散扫描环）
    try {
      let scanEffect = viewer.scene.ScanEffect;
      if (!scanEffect && Cesium.ScanEffect) {
        scanEffect = new Cesium.ScanEffect();
        scanEffect._scene = viewer.scene;
        viewer.scene.ScanEffect = scanEffect;
        console.log('[Spatial] 已创建 ScanEffect 实例');
      }
      if (scanEffect) {
        // 关闭之前的扫描
        scanEffect.show = false;

        // 设置新的扫描参数
        const centerCartesian = Cesium.Cartesian3.fromDegrees(centerLng, centerLat, 0);
        scanEffect.centerPostion = centerCartesian;
        scanEffect.mode = Cesium.ScanEffectMode.CIRCLE;
        scanEffect.color = new Cesium.Color(0.3, 0.6, 1.0, 0.8); // 蓝色
        scanEffect.speed = 800;   // 扩散速度
        scanEffect.period = 3.0;  // 周期（秒）
        scanEffect.lineWidth = 100; // 扫描线宽度
        scanEffect.show = true;
        console.log('[Spatial] 超图扫描边已启动');
      } else {
        console.warn('[Spatial] ScanEffect 不可用（当前 Cesium 版本不支持）');
      }
    } catch (e) {
      console.warn('[Spatial] 扫描边初始化失败:', e);
    }

    // 飞行定位到渲染出来的空间分析图层（自适应 BoundingSphere，而非固定坐标）。
    // viewer.flyTo 对 DataSource 自动计算整个数据源实体的 BoundingSphere；
    // 因位于实体应用 extrudedHeight 之后，包围球包含三维拉伸顶面，相机距离自动适配内容大小。
    // guard 用 featureCount（整个数据源有无内容），而非 firstCoords（只看第一个多边形）。
    if (shouldFlyTo && featureCount > 0) {
      try {
        console.log('[Spatial] flyTo 到图层 (BoundingSphere 自适应)');
        viewer.flyTo(spatialDataSource, {
          duration: 1.5,
          offset: new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(30),
            Cesium.Math.toRadians(-35),
            0 // range=0 → 距离由 Cesium 根据内容自动计算
          ),
        });
      } catch (e) {
        console.warn('[Spatial] 飞行定位失败:', e);
      }
    }

    console.log('[Spatial] ✅ 三维缓冲区加载完成, extrude=', EXTRUDE_HEIGHT, 'm, scan=ON');
  } catch (error) {
    console.error('[Spatial] 空间结果加载失败:', error);
    spatialDataSource = null;
  }
}

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
  buildingInfo.value = null;
  fetchPoints();
  if (isDistrictMode && viewer) {
    applyLevelColoring(viewer);
    updateExtremeIcons(viewer);
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

// ─── 极值分析图标（已删除：旧版 billboard 方案，改用 setObjsColor 染色）───

// ─── 分区三维场景切换 ────────────────────────────────────

/** 切换到 rotation 模式 */
async function switchToDistrictScenes() {
  if (!viewer || isDistrictMode) return;
  const scene = viewer.scene;

  // 使用已有图层，不重新 scene.open
  districtSceneLayers = [];
  const ls = scene.layers;
  if (ls && ls._layers) {
    for (const k in ls._layers) {
      const l = ls._layers[k];
      if (l && typeof l.setObjsColor === 'function') {
        if (l.fileType !== undefined) l.fileType = 'S3MB';
        districtSceneLayers.push(l);
      }
    }
  }

  isDistrictMode = true;
  districtOverlay.updateVisibility(viewer, store.districts);
  if (store.heatmapConfig.enabled) {
    await updateHeatmap();
  }
  applyLevelColoring(viewer);
  updateExtremeIcons(viewer);
}

/** 切出 rotation 模式：移除分区场景，恢复默认 3D-global 场景 */
async function switchToDefaultScene() {
  if (!viewer || !isDistrictMode) return;
  const layer = getS3MLayer(viewer);
  if (layer && layer.removeAllObjsColor) layer.removeAllObjsColor();
  clearExtremeIcons(viewer);
  isDistrictMode = false;
  districtSceneLayers = [];
  districtOverlay.updateVisibility(viewer, store.districts);
  if (store.heatmapConfig.enabled) {
    await updateHeatmap();
  }
}

// 离开首页时关闭预览分屏 + 热力图
watch(() => store.activeKey, (key) => {
  if (key !== 'bar') {
    store.setUploadPreview(false);
    store.heatmapConfig.enabled = false;
  }
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

// 极值分析数据就绪后更新图标
watch(() => store.extremeAnalysisData, () => {
  if (isDistrictMode && viewer) updateExtremeIcons(viewer);
}, { deep: true });

// 前端渲染指令 → 实时渲染到 Cesium。
// ★ 串行执行：SSE 实时推送后命令可能背靠背到达（如链式 Pattern A 的 render → highlight），
//   用 Promise 链保证按到达顺序执行，避免并行渲染互相覆盖/竞态。
let renderChain = Promise.resolve();

function queueRender(cmd) {
  if (!cmd) return;
  renderChain = renderChain
    .then(() => executeRender(cmd))
    .catch((e) => console.error("[Render] 串行链执行异常:", e));
}

async function executeRender(cmd) {
  // 清除操作优先处理（不需要 dataRef）
  if (cmd.action === "clear_spatial") {
    // 清除缓冲区多边形
    if (spatialDataSource) {
      viewer?.dataSources.remove(spatialDataSource, true);
      spatialDataSource = null;
      console.log('[Spatial] 已清除缓冲区图层');
    }
    // 同步清除建筑高亮
    clearHighlight();
    return;
  }
  // 仅清除高亮
  if (cmd.action === "clear_highlight") {
    clearHighlight();
    return;
  }
  // 高亮操作（不需要 dataRef）
  if (cmd.action === "highlight") {
    await loadHighlightToCesium(cmd.smids, cmd.highlightColor);
    return;
  }
  // 渲染操作需要 dataRef
  if (!cmd.dataRef) return;
  if (cmd.action === "render_spatial") {
    try {
      const geoJson = await fetchSpatialData(cmd.dataRef, store.currentConversationId);
      await loadSpatialToCesium(geoJson, cmd.flyTo !== false);
    } catch (e) {
      console.error("[Cesium] 获取空间数据失败:", e);
    }
  }
}

watch(
  () => store.renderCommand,
  (cmd) => queueRender(cmd),
  { deep: true }
);

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
    shouldAnimate: false,
    infoBox: false,
    selectionIndicator: false,
  })
  window.cesiumViewer = viewer

  // 关闭雾效
  viewer.scene.fog.enabled = false;
  viewer.scene.fog.density = 0.0;
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#070a0e');

  // S3MD 属性加载：Cesium 自动加载 .s3md 文件中的属性数据

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
  const tk = import.meta.env.VITE_TIANDITU_TOKEN || 'cec53f834be34c955bae0afecd4caa3e'

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
    const sceneUrl = import.meta.env.VITE_ISERVER_URL || 'http://localhost:8090/iserver/services/3D-twin-carbon-city/rest/realspace'
    const layers = await scene.open(sceneUrl)
    if (layers?.length > 0) {
      defaultSceneLayers = layers;
      viewer.flyTo?.(layers[0]);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('场景加载失败:', error)
  }
  scene.fog.enabled = false;
  scene.fog.density = 0.0;


  // ─── 建筑点击属性查询（S3MD → getAttributesById 两级 fallback）───
  (function() {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    /** 按 SMID 从 buildingPointFeatures 中查属性，写入 buildingInfo（本地查找，零延迟） */
    function applyProps(smid, props) {
      if (smid == null) { buildingInfo.value = null; return; }

      var name = '', year = null, quarter = null, emission = null, category = null;

      // GeoJSON features 属性中已有 smid 字段（后端 SQL JOIN building_3d）
      var features = store.buildingPointFeatures;
      if (features) {
        for (var i = 0; i < features.length; i++) {
          var p = features[i].properties || {};
          if (Number(p.smid) === Number(smid)) {
            name = p.name || '';
            year = p.year;
            quarter = p.quarter;
            emission = p.emission;
            category = p.category || '';
            break;
          }
        }
      }

      buildingInfo.value = { smid: smid, name: name, year: year, quarter: quarter, emission: emission, category: category };
    }

    /** 将 getAttributesById 返回的原始属性转成统一 {key: val} 格式 */
    function normalizeAttrs(attrs) {
      var result = {};
      if (!attrs) return result;
      // 格式 1：{fieldNames: [...], fieldValues: [...]}
      if (attrs.fieldNames && attrs.fieldValues) {
        for (var i = 0; i < attrs.fieldNames.length; i++) {
          result[attrs.fieldNames[i]] = attrs.fieldValues[i];
        }
      }
      // 格式 2：直接 {NAME: "...", height: ...}
      else {
        for (var key in attrs) {
          if (Object.prototype.hasOwnProperty.call(attrs, key)) {
            result[key] = attrs[key];
          }
        }
      }
      return result;
    }

    handler.setInputAction(function(m) {
      var p = viewer.scene.pick(m.position);
      // 偏移重试：补偿 S3M 模型坐标偏差
      if (!p || p.id == null) {
        var offsets = [[0,0],[-5,-5],[5,-5],[-5,5],[5,5],[0,-10],[0,10],[-10,0],[10,0]];
        for (var i = 0; i < offsets.length; i++) {
          p = viewer.scene.pick(new Cesium.Cartesian2(m.position.x+offsets[i][0], m.position.y+offsets[i][1]));
          if (p && p.id != null) break;
        }
      }

      if (p && p.id != null) {
        var smid = Number(p.id);
        console.log('━━━ 建筑点击 SmID = ' + smid + ' ━━━');

        // ★ 立即展示属性卡片（本地查 buildingPointFeatures，不依赖 S3MD/getAttributesById）
        applyProps(smid);

        // 以下仅为控制台日志，不影响卡片显示
        // S3MD 模式
        if (typeof p.getPropertyNames === 'function') {
          var names = p.getPropertyNames();
          for (var i = 0; i < names.length; i++) {
            console.log('  [S3MD] ' + names[i] + ': ' + p.getProperty(names[i]));
          }
          return;
        }
        // getAttributesById（仅日志，不等待）
        if (p.primitive && typeof p.primitive.getAttributesById === 'function') {
          try {
            var attrs = p.primitive.getAttributesById(smid);
            if (attrs && typeof attrs.then === 'function') {
              Promise.resolve(attrs).then(function(resolved) {
                if (resolved) {
                  var props = normalizeAttrs(resolved);
                  for (var key in props) console.log('  [Attr] ' + key + ': ' + props[key]);
                }
              }).catch(function() {});
            } else if (attrs) {
              var props = normalizeAttrs(attrs);
              for (var key in props) console.log('  [Attr] ' + key + ': ' + props[key]);
            }
          } catch (e) {}
        }
      } else {
        store.setClickedBuilding(null);
        buildingInfo.value = null;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  })();
  // ────────────────────────────────────────────
  // 初始激活面板为 rotation，立即加载分区场景
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
  if (spatialDataSource && viewer) {
    viewer.dataSources.remove(spatialDataSource, true);
    spatialDataSource = null;
  }
  // 关闭超图扫描边
  if (viewer?.scene?.ScanEffect) {
    viewer.scene.ScanEffect.show = false;
    viewer.scene.ScanEffect.destroy?.();
    viewer.scene.ScanEffect = null;
    console.log('[Spatial] 扫描边已关闭并销毁');
  }
  districtOverlay.removeOverlay(viewer);
  clearExtremeIcons(viewer);
  const layer = getS3MLayer(viewer);
  if (layer && layer.removeAllObjsColor) layer.removeAllObjsColor();
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

/* ── 建筑属性卡片 ── */
.building-info-card {
  position: fixed;
  bottom: 160px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  background: rgba(15, 20, 32, 0.92);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 14px 18px;
  min-width: 240px;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
}
.bi-close {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 22px;
  height: 22px;
  border: none;
  background: transparent;
  color: rgba(200, 208, 224, 0.35);
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s;
}
.bi-close:hover {
  color: rgba(200, 208, 224, 0.7);
  background: rgba(200, 208, 224, 0.08);
}
.bi-title {
  font-size: 14px;
  font-weight: 600;
  color: #e0e6f0;
  margin-bottom: 10px;
  padding-right: 20px;
}
.bi-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.bi-table tr {
  border-bottom: 1px solid rgba(59, 130, 246, 0.06);
}
.bi-table tr:last-child {
  border-bottom: none;
}
.bi-label {
  padding: 5px 8px 5px 0;
  color: rgba(200, 208, 224, 0.5);
  white-space: nowrap;
  width: 70px;
}
.bi-value {
  padding: 5px 0;
  color: #e0e6f0;
  font-weight: 500;
}
.bi-nodata {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(200, 208, 224, 0.35);
  text-align: center;
}
</style>
