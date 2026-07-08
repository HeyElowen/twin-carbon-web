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
import { getBuildingObservationPoint, getLayeredColoring } from "@/api/monitoring";
import Panel from "./panel/index.vue";
import PreviewCesium from "./PreviewCesium.vue";
import { Heatmap3D } from "@/js/utils/heatmap3D";
import { useDistrictOverlay } from "@/js/composables/useDistrictOverlay";
// useBuildingColoring（已删除：旧版屏幕拾取染色，改用 setObjsColor）

let viewer = null;
let pointDataSource = null;   // 当前加载的 GeoJSON 数据源
let heatmap3D = null;         // 3D 热力图实例
// anomalyEntities（已删除，改用 setObjsColor）

const store = useConfigStore();
const districtOverlay = useDistrictOverlay();
const pointData = ref([]);      // 观测点数据
const pointLoading = ref(false);

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

    /** 统一输出属性到控制台并写入 store */
    function applyProps(smid, props) {
      var name = props['NAME'] || props['name'] || props['Name'] || '';
      console.log('  建筑名称: ' + (name || '(未知)'));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
      store.setClickedBuilding({ smid: smid, name: name });
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

        // 方案 1：S3MD 模式（同步，需 .s3md 文件 + getPropertyNames() 支持）
        if (typeof p.getPropertyNames === 'function') {
          var names = p.getPropertyNames();
          var props = {};
          for (var i = 0; i < names.length; i++) {
            var val = p.getProperty(names[i]);
            props[names[i]] = val;
            console.log('  [S3MD] ' + names[i] + ': ' + val);
          }
          applyProps(smid, props);
          return;
        }

        // 方案 2：S3MTilesLayer.getAttributesById（官方 API，读 indexedDB 缓存的 SCVD）
        if (p.primitive && typeof p.primitive.getAttributesById === 'function') {
          var attrs;
          try { attrs = p.primitive.getAttributesById(smid); } catch (e) { attrs = null; }

          // 2a：同步返回
          if (attrs && typeof attrs.then !== 'function') {
            var props = normalizeAttrs(attrs);
            for (var key in props) {
              console.log('  [Attr] ' + key + ': ' + props[key]);
            }
            applyProps(smid, props);
            return;
          }

          // 2b：异步返回 thenable（indexedDB 数据未就绪），先存 smid 即时反馈
          if (attrs && typeof attrs.then === 'function') {
            store.setClickedBuilding({ smid: smid, name: '' });
            console.log('  (getAttributesById 异步加载中，5s 超时…)');
            // Promise.race 防挂起：SuperMap thenable 可能永不 resolve
            Promise.race([
              Promise.resolve(attrs),
              new Promise(function(r) { setTimeout(r, 5000); })
            ]).then(function(resolved) {
              if (!resolved) {
                console.log('  (getAttributesById 超时，仅存 SmID)');
                applyProps(smid, {});
                return;
              }
              var props = normalizeAttrs(resolved);
              for (var key in props) {
                console.log('  [Attr] ' + key + ': ' + props[key]);
              }
              applyProps(smid, props);
              console.log('  √ 异步属性加载完成');
            });
            return;
          }
        }

        // 兜底：至少存 smid
        console.log('  (S3MD 与 getAttributesById 均不可用，仅存 SmID)');
        applyProps(smid, {});
      } else {
        store.setClickedBuilding(null);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  })();
  // ────────────────────────────────────────────
  // 如果初始激活面板就是 rotation// 如果初始激活面板就是 rotation，立即加载分区场景
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
</style>
