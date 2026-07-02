/**
 * useBuildingColoring — 三维建筑分层设色
 *
 * 策略：
 *   1. Cesium3DTileStyle 条件表达式（始终尝试）
 *   2. setObjsColor（通过 getAttributesById 获取 ID 后）
 *   3. 屏幕拾取设色（经纬度 → 屏幕坐标 → pick → setObjsColor）
 *   4. 点击交互式设色（click → pickPosition → 最近邻匹配 → setObjsColor）
 */

import { getLayeredColoring } from "@/api/monitoring";

const LEVEL_COLORS = {
  1: new Cesium.Color(0.133, 0.773, 0.369, 1),
  2: new Cesium.Color(0.518, 0.8, 0.086, 1),
  3: new Cesium.Color(0.961, 0.620, 0.043, 1),
  4: new Cesium.Color(0.976, 0.451, 0.086, 1),
  5: new Cesium.Color(0.937, 0.267, 0.267, 1),
};
const LEVEL_CSS = {
  1: 'rgba(34,197,94,1)', 2: 'rgba(132,204,22,1)',
  3: 'rgba(245,158,11,1)', 4: 'rgba(249,115,22,1)',
  5: 'rgba(239,68,68,1)',
};

const NAME_FIELDS = ["name", "名称", "Name", "NAME", "buildingName", "BuildingName", "SmID"];

/** 屏幕拾取偏移量网格（补偿 API 坐标与模型位置偏差） */
const PICK_OFFSETS = [
  [0, 0], [-5, -5], [5, -5], [-5, 5], [5, 5],
  [0, -10], [0, 10], [-10, 0], [10, 0],
];

function extractName(attrs) {
  if (!attrs) return null;
  for (const f of NAME_FIELDS) if (attrs[f]) return String(attrs[f]);
  if (attrs.fieldNames && attrs.fieldValues) {
    for (let i = 0; i < attrs.fieldNames.length; i++) {
      if (NAME_FIELDS.includes(attrs.fieldNames[i])) return String(attrs.fieldValues[i]);
    }
  }
  return null;
}

const SENTINEL = {};
async function getAttrsTO(layer, id, ms = 500) {
  try {
    const r = layer.getAttributesById(id);
    if (!r) return null;
    if (typeof r.then !== 'function') return r;
    const v = await Promise.race([r, new Promise(r2 => setTimeout(() => r2(SENTINEL), ms))]);
    return v === SENTINEL ? null : v;
  } catch (e) { return null; }
}

function getS3MLayers(viewer) {
  if (!viewer || !viewer.scene) return [];
  const found = [];
  if (viewer.scene.layers) {
    for (const q of [viewer.scene.layers.layerQueue || []]) {
      for (const L of q) { if (L && L.setObjsColor && !found.includes(L)) found.push(L); }
    }
    if (viewer.scene.layers._layers) {
      for (const k of Object.keys(viewer.scene.layers._layers)) {
        const L = viewer.scene.layers._layers[k];
        if (L && L.setObjsColor && !found.includes(L)) found.push(L);
      }
    }
  }
  // eslint-disable-next-line no-console
  console.log(`[BuildingColoring] 图层: ${found.length}`, found.map(l => l.name));
  return found;
}

/**
 * 多点拾取：在屏幕坐标周围尝试多个偏移，补偿模型位置偏差
 */
function pickBuildingAt(scene, layer, screenPos) {
  for (const [dx, dy] of PICK_OFFSETS) {
    try {
      const p = scene.pick(new Cesium.Cartesian2(screenPos.x + dx, screenPos.y + dy));
      if (p && p.primitive === layer && p.id != null) return p;
    } catch (e) { /* 跳过 */ }
  }
  return null;
}

export function useBuildingColoring() {
  let abortController = null;
  let clickHandler = null;
  let currentBuildings = [];
  let viewerRef = null;

  /**
   * 屏幕拾取设色：将已知建筑坐标转为屏幕坐标 → pick → setObjsColor
   * 单帧快速尝试，供 colorLayer 同步调用
   */
  async function colorViaScreenPickOnce(viewer, layer, buildings) {
    if (!viewer || !layer || !buildings || buildings.length === 0) return 0;
    const scene = viewer.scene;
    if (!scene) return 0;

    await new Promise(resolve => {
      const r = scene.postRender.addEventListener(() => { r(); setTimeout(resolve, 50); });
    });

    const byLevel = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    let found = 0;

    for (const b of buildings) {
      if (b.lon == null || b.lat == null || !b.level || !byLevel[b.level]) continue;
      try {
        const pos = Cesium.Cartesian3.fromDegrees(b.lon, b.lat, 300);
        const sp = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, pos);
        if (!sp || sp.x < 0 || sp.y < 0 || sp.x > scene.canvas.width - 1 || sp.y > scene.canvas.height - 1) continue;
        const picked = pickBuildingAt(scene, layer, sp);
        if (picked) {
          byLevel[b.level].push(picked.id);
          found++;
        }
      } catch (e) { /* 跳过 */ }
    }

    if (found === 0) return 0;
    for (const [lv, ids] of Object.entries(byLevel)) {
      if (ids.length > 0) layer.setObjsColor(ids, LEVEL_COLORS[Number(lv)]);
    }
    // eslint-disable-next-line no-console
    console.log(`[BuildingColoring] ScreenPick ${layer.name}: ${found}/${buildings.length}`);
    return found;
  }

  /**
   * 后台持续屏幕拾取：每 2s 重试一次，直到全部找到或超时
   * 在 colorLayer 中 fire-and-forget 调用，不阻塞主流程
   */
  async function colorViaScreenPickLoop(viewer, layer, buildings, signal) {
    if (!viewer || !layer || !buildings || buildings.length === 0) return 0;
    const scene = viewer.scene;
    if (!scene) return 0;

    const byLevel = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    const foundNames = new Set();

    // 首次尝试（利用刚渲染完的帧）
    for (const b of buildings) {
      if (b.lon == null || b.lat == null || !b.level || !byLevel[b.level]) continue;
      try {
        const pos = Cesium.Cartesian3.fromDegrees(b.lon, b.lat, 300);
        const sp = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, pos);
        if (!sp || sp.x < 0 || sp.y < 0 || sp.x >= scene.canvas.width || sp.y >= scene.canvas.height) continue;
        const picked = pickBuildingAt(scene, layer, sp);
        if (picked) {
          byLevel[b.level].push(picked.id);
          foundNames.add(b.name);
        }
      } catch (e) { /* 跳过 */ }
    }

    const applyColors = () => {
      for (const [lv, ids] of Object.entries(byLevel)) {
        if (ids.length > 0) layer.setObjsColor(ids, LEVEL_COLORS[Number(lv)]);
      }
    };
    if (foundNames.size > 0) applyColors();

    // 每 2s 重试拾取剩余建筑（最多 30s）
    for (let retry = 0; retry < 15; retry++) {
      if (signal?.aborted) break;
      if (foundNames.size >= buildings.length) break;

      await new Promise(r => setTimeout(r, 2000));
      if (signal?.aborted) break;

      const batch = { 1: [], 2: [], 3: [], 4: [], 5: [] };
      let newFound = 0;

      for (const b of buildings) {
        if (foundNames.has(b.name)) continue;
        if (b.lon == null || b.lat == null || !b.level || !byLevel[b.level]) continue;
        try {
          const pos = Cesium.Cartesian3.fromDegrees(b.lon, b.lat, 300);
          const sp = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, pos);
          if (!sp || sp.x < 0 || sp.y < 0 || sp.x >= scene.canvas.width || sp.y >= scene.canvas.height) continue;
          const picked = pickBuildingAt(scene, layer, sp);
          if (picked) {
            batch[b.level].push(picked.id);
            foundNames.add(b.name);
            newFound++;
          }
        } catch (e) { /* 跳过 */ }
      }
      if (newFound > 0) {
        for (const [lv, ids] of Object.entries(batch)) {
          if (ids.length > 0) {
            byLevel[lv].push(...ids);
          }
        }
        applyColors();
        // eslint-disable-next-line no-console
        console.log(`[BuildingColoring] ${layer.name} 后台: +${newFound} (${foundNames.size}/${buildings.length})`);
      }
    }
    return foundNames.size;
  }

  /** 设色单个图层 */
  async function colorLayer(viewer, layer, buildings) {
    if (!viewer || !layer || !buildings || buildings.length === 0) return;
    // eslint-disable-next-line no-console
    console.log(`[BuildingColoring] ${layer.name} 开始`);

    try {
      // ── 1. 快速尝试 getAttributesById（短超时，不阻塞着色）──
      const nameToId = {};
      for (let id = 1; id <= 10; id++) {
        const attrs = await getAttrsTO(layer, id, 100);
        if (attrs && typeof attrs === 'object' && !Array.isArray(attrs)) {
          const n = extractName(attrs);
          if (n) nameToId[n] = id;
        }
      }
      if (Object.keys(nameToId).length > 0) {
        // eslint-disable-next-line no-console
        console.log(`[BuildingColoring] ${layer.name} getAttributesById 命中 ${Object.keys(nameToId).length}`);
        for (let i = 1; i <= 2000; i += 50) {
          const ids = Array.from({ length: 50 }, (_, j) => i + j);
          const rs = await Promise.all(ids.map(id => getAttrsTO(layer, id, 50)));
          for (let j = 0; j < rs.length; j++) {
            if (rs[j] && typeof rs[j] === 'object') {
              const n = extractName(rs[j]);
              if (n) nameToId[n] = ids[j];
            }
          }
          if (Object.keys(nameToId).length >= buildings.length) break;
        }
        const lv = { 1: [], 2: [], 3: [], 4: [], 5: [] };
        for (const b of buildings) {
          const id = nameToId[b.name];
          if (id !== undefined && lv[b.level]) lv[b.level].push(id);
        }
        for (const [level, ids] of Object.entries(lv)) {
          if (ids.length > 0) layer.setObjsColor(ids, LEVEL_COLORS[level]);
        }
        // eslint-disable-next-line no-console
        console.log(`[BuildingColoring] ${layer.name} → setObjsColor 完成`);
        return;
      }

      // ── 2. Cesium3DTileStyle（始终尝试，batch table 在渲染时可能可用）──
      // eslint-disable-next-line no-console
      console.log(`[BuildingColoring] ${layer.name} → Cesium3DTileStyle`);
      const cond = [];
      for (const b of buildings) {
        const c = LEVEL_CSS[b.level];
        for (const f of NAME_FIELDS) cond.push([`\${${f}} === "${b.name}"`, c]);
      }
      cond.push(['true', 'rgba(255,255,255,1)']);
      try {
        layer.themeStyle = new Cesium.Cesium3DTileStyle({ color: { conditions: cond } });
        // eslint-disable-next-line no-console
        console.log(`[BuildingColoring] ${layer.name} → themeStyle 已设置 (${cond.length} 条件)`);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`[BuildingColoring] ${layer.name} themeStyle 失败:`, e);
      }

      // ── 3. 快速屏幕拾取 ──
      const found = await colorViaScreenPickOnce(viewer, layer, buildings);
      // eslint-disable-next-line no-console
      console.log(`[BuildingColoring] ${layer.name} ScreenPick 首次: ${found}/${buildings.length}`);

      // ── 4. 后台持续拾取（不阻塞）──
      colorViaScreenPickLoop(viewer, layer, buildings, abortController.signal)
        .then(n => {
          if (n > found) {
            // eslint-disable-next-line no-console
            console.log(`[BuildingColoring] ${layer.name} 后台拾取全部完成: ${n}/${buildings.length}`);
          }
        })
        .catch(() => {});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[BuildingColoring] ${layer.name} 失败:`, error);
    }
  }

  // ── 点击变色 ─────────────────────────────────────
  function setupClickHandler(viewer) {
    removeClickHandler(viewer);
    if (!viewer || !viewer.scene) return;

    clickHandler = viewer.screenSpaceEventHandler;
    clickHandler.setInputAction((click) => {
      const picks = viewer.scene.drillPick(click.position);
      if (!picks || picks.length === 0) return;

      // 找 S3M 瓦片对象
      let s3mPick = null;
      for (const p of picks) {
        if (p.primitive && typeof p.primitive.setObjsColor === 'function' && p.id != null) {
          s3mPick = p;
          break;
        }
      }
      if (!s3mPick) return;

      const layer = s3mPick.primitive;
      const objId = s3mPick.id;

      // ── 空间位置匹配：点击位置 → lon/lat → 最近邻建筑 ──
      let entityName = null;
      try {
        const cartesian = viewer.scene.pickPosition(click.position);
        if (cartesian) {
          const carto = Cesium.Cartographic.fromCartesian(cartesian);
          const lon = Cesium.Math.toDegrees(carto.longitude);
          const lat = Cesium.Math.toDegrees(carto.latitude);
          let minD = Infinity;
          let nearest = null;
          for (const b of currentBuildings) {
            if (b.lon == null || b.lat == null) continue;
            const d = Math.hypot(b.lon - lon, b.lat - lat);
            if (d < minD) { minD = d; nearest = b; }
          }
          if (nearest && minD < 0.01) entityName = nearest.name;
        }
      } catch (e) {}

      // ── 诊断（静默）：getAttributesById 在点击时是否可用 ──
      getAttrsTO(layer, objId, 300).then(attrs => {
        if (attrs) {
          // eslint-disable-next-line no-console
          console.log(`[BuildingColoring] 点击诊断 attrs(${objId}):`, attrs);
        }
      }).catch(() => {});

      // eslint-disable-next-line no-console
      console.log(`[BuildingColoring] 点击: id=${objId} layer=${layer.name} name=${entityName}`);

      // ── 没有匹配到名称 → 不染色 ──
      if (!entityName) return;

      const match = currentBuildings.find(b => b.name === entityName);
      if (!match || !match.level || !LEVEL_COLORS[match.level]) return;

      // eslint-disable-next-line no-console
      console.log(`[BuildingColoring] → 等级 ${match.level}`);
      layer.setObjsColor([objId], LEVEL_COLORS[match.level]);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  function removeClickHandler(viewer) {
    if (clickHandler && viewer) {
      try { viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK); } catch (e) {}
    }
    clickHandler = null;
  }

  // ── 主入口 ──────────────────────────────────────
  async function applyColoring(viewer, year, quarter) {
    if (!viewer) return;
    if (abortController) abortController.abort();
    abortController = new AbortController();
    viewerRef = viewer;

    try {
      // 清除旧的 setObjsColor 颜色，避免年/季度切换后残留
      for (const L of getS3MLayers(viewer)) {
        if (L.removeAllObjsColor) L.removeAllObjsColor();
      }
      // 旧的 click handler 也一并清理
      removeClickHandler(viewer);

      const res = await getLayeredColoring(year, quarter);
      const buildings = res.data?.buildings;
      if (!buildings || buildings.length === 0) return;
      currentBuildings = buildings;

      // 对每个 S3M 图层设色
      for (const L of getS3MLayers(viewer)) {
        if (abortController.signal.aborted) return;
        await colorLayer(viewer, L, buildings);
      }

      // 注册点击变色
      if (!abortController.signal.aborted) setupClickHandler(viewer);
    } catch (error) {
      if (error.name !== "AbortError") console.error("[BuildingColoring] 失败:", error);
    }
  }

  function clearAllColoring(viewer) {
    if (!viewer) return;
    for (const L of getS3MLayers(viewer)) {
      if (L.removeAllObjsColor) L.removeAllObjsColor();
      try { L.themeStyle = null; } catch (e) {}
    }
    removeClickHandler(viewer);
    currentBuildings = [];
    viewerRef = null;
    if (abortController) { abortController.abort(); abortController = null; }
  }

  return { applyColoring, clearAllColoring };
}
