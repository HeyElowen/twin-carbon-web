/**
 * useDistrictOverlay — 区域图幅 + 名称标签
 *
 * 在给定的 Cesium Viewer 上绘制 5 类用地类型的多边形轮廓与文字，
 * 同时支持 dashboard 主视图和 PreviewCesium 预览视图使用。
 *
 * 用法：
 *   const { createOverlay, updateVisibility, removeOverlay } = useDistrictOverlay();
 *   createOverlay(viewer);
 *   updateVisibility(viewer, store.districts);
 *   removeOverlay(viewer);
 *
 * 数据来源：district-zones.json（按三维建筑实际划分）
 */

import districtZones from "@/api/district-zones.json";
import { CATEGORY_COLORS as CATEGORY_COLORS_HEX } from "@/js/constants/categoryColors";

// ─── 设计常量（与 JSON 数据分离）───────────────────

// 统一用地色板 → 转 Cesium.Color（hex 定义见 constants/categoryColors.js）
const CATEGORY_COLORS = Object.fromEntries(
  Object.entries(CATEGORY_COLORS_HEX).map(([name, hex]) => [name, Cesium.Color.fromCssColorString(hex)])
);

const DISTRICT_FONT_SIZE = {
  '农业区': 48,
  '工业区': 38,
  '住宅区': 32,
  '教育区': 28,
  '商业区': 22,
};

// ─── 从 JSON 构建边界与中心坐标 ────────────────────

/** @type {{[name:string]: [number,number][]}} */
const DISTRICT_BOUNDARIES = {};
/** @type {{[name:string]: [number,number]}} */
const DISTRICT_CENTER = {};

for (const feature of districtZones.features) {
  const name = feature.attributes['类型'];
  const centerLon = feature.attributes['经度'];
  const centerLat = feature.attributes['纬度'];
  // rings: 每个 feature 只有一个外环
  const ring = feature.geometry.rings[0];

  DISTRICT_BOUNDARIES[name] = ring;
  DISTRICT_CENTER[name] = [centerLon, centerLat];
}

// ─── 工具函数 ─────────────────────────────────────

/**
 * 生成径向渐变 Canvas，用于区域多边形填充材质
 */
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

// ─── Composable ───────────────────────────────────

export function useDistrictOverlay() {
  /** @type {{[name:string]:{polygon:Cesium.Entity, label:Cesium.Entity}}} */
  let entities = {};

  /**
   * 在指定 viewer 上创建图幅 + 文字
   * @param {Cesium.Viewer} viewer
   * @param {{[name:string]:boolean}} [districtVisibility] - 各区域可见性字典，默认全部可见
   */
  function createOverlay(viewer, districtVisibility) {
    if (!viewer) return;

    // 清理旧实体
    Object.values(entities).forEach((e) => {
      viewer.entities.remove(e.polygon);
      viewer.entities.remove(e.label);
    });
    entities = {};

    Object.entries(DISTRICT_BOUNDARIES).forEach(([name, ring]) => {
      const color = CATEGORY_COLORS[name] || Cesium.Color.WHITE;
      const center = DISTRICT_CENTER[name];
      if (!center) return;

      const visible = districtVisibility?.[name] ?? true;
      const fontSize = DISTRICT_FONT_SIZE[name] || 32;

      // 多边形轮廓（径向渐变填充）
      const positions = ring.map((c) => Cesium.Cartesian3.fromDegrees(c[0], c[1], 5));
      const polygon = viewer.entities.add({
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(positions),
          material: new Cesium.ImageMaterialProperty({
            image: createGradientCanvas(color),
            transparent: true,
          }),
          perPositionHeight: true,
          classificationType: Cesium.ClassificationType.BOTH,
          show: visible,
        },
      });

      // 名称标签（贴地，固定像素大小，20km 外隐藏）
      const label = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(center[0], center[1]),
        label: {
          text: name.split('').join(' '),
          font: `bold ${fontSize}px "Microsoft YaHei", sans-serif`,
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 3,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          scale: 1.0,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 20000),
          show: visible,
        },
      });

      entities[name] = { polygon, label };
    });
  }

  /**
   * 更新各区域的可见性
   * @param {Cesium.Viewer} viewer
   * @param {{[name:string]:boolean}} districts
   */
  function updateVisibility(viewer, districts) {
    Object.entries(districts).forEach(([name, visible]) => {
      const e = entities[name];
      if (e) {
        e.polygon.show = visible;
        e.label.show = visible;
      }
    });
  }

  /**
   * 移除所有图幅 + 文字
   * @param {Cesium.Viewer} viewer
   */
  function removeOverlay(viewer) {
    Object.values(entities).forEach((e) => {
      viewer?.entities.remove(e.polygon);
      viewer?.entities.remove(e.label);
    });
    entities = {};
  }

  return {
    createOverlay,
    updateVisibility,
    removeOverlay,
    // 暴露常量供外部按需使用
    CATEGORY_COLORS,
    DISTRICT_BOUNDARIES,
    DISTRICT_CENTER,
  };
}
