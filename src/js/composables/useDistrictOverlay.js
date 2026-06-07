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
 * 数据来源：类型分区.json（按三维建筑实际划分）
 */

// ─── 常量 ─────────────────────────────────────────

const CATEGORY_COLORS = {
  '工业区': Cesium.Color.fromCssColorString('#ef4444'),
  '农业区': Cesium.Color.fromCssColorString('#22c55e'),
  '住宅区': Cesium.Color.fromCssColorString('#3b82f6'),
  '商业区': Cesium.Color.fromCssColorString('#f59e0b'),
  '教育区': Cesium.Color.fromCssColorString('#a855f7'),
};

const DISTRICT_BOUNDARIES = {
  '农业区': [
    [120.44453311315738, 31.582980213885889],
    [120.44970844084514, 31.581314591181808],
    [120.44988690042044, 31.578756670600512],
    [120.46315239552803, 31.580838698980585],
    [120.4827472569109, 31.58083275032817],
    [120.49766231336071, 31.580193666759726],
    [120.49743388510433, 31.560605943759697],
    [120.46824741640683, 31.560786782796072],
    [120.443152034332, 31.565831240128432],
    [120.43639436507544, 31.568781771775718],
  ],
  '工业区': [
    [120.47114228788053, 31.580836273391071],
    [120.47226657588885, 31.592322814571901],
    [120.48190339296252, 31.590966521798691],
    [120.48204616062287, 31.599960884400616],
    [120.49753645177077, 31.599889500570555],
    [120.49766231336071, 31.580193666759726],
    [120.4827472569109, 31.58083275032817],
    [120.47203299286696, 31.580836002988747],
  ],
  '商业区': [
    [120.45846788322763, 31.585608269080524],
    [120.46178723133062, 31.584430435882609],
    [120.4609198560396, 31.580488300406273],
    [120.45732932244903, 31.579924763743975],
  ],
  '教育区': [
    [120.46178723133062, 31.584430435882609],
    [120.46344167154143, 31.586972294746829],
    [120.46560222213463, 31.589104291808212],
    [120.46826721846116, 31.593006607857717],
    [120.46300860963834, 31.593815624599642],
    [120.46303240424834, 31.596385442485939],
    [120.46428756992907, 31.59989514746951],
    [120.48204616062287, 31.599960884400616],
    [120.48190339296252, 31.590966521798691],
    [120.47226657588885, 31.592322814571901],
    [120.47114228788053, 31.580836273391071],
    [120.46315239552803, 31.580838698980585],
    [120.4609198560396, 31.580488300406273],
  ],
  '住宅区': [
    [120.46428756992907, 31.59989514746951],
    [120.46387581942872, 31.598743807207768],
    [120.46303240424834, 31.596385442485939],
    [120.46300860963834, 31.593815624599642],
    [120.46826721846116, 31.593006607857717],
    [120.46560222213463, 31.589104291808212],
    [120.46344167154143, 31.586972294746829],
    [120.46178723133062, 31.584430435882609],
    [120.45846788322763, 31.585608269080524],
    [120.45732932244914, 31.579924763744145],
    [120.44988690042044, 31.578756670600512],
    [120.44970844084514, 31.581314591181808],
    [120.44453311315738, 31.582980213885889],
    [120.46140326661327, 31.599950192334177],
  ],
};

const DISTRICT_CENTER = {
  '农业区': [120.470064491, 31.5712461355],
  '工业区': [120.486305147, 31.5891198715],
  '商业区': [120.459524558, 31.582632613],
  '教育区': [120.470944573, 31.5920172888],
  '住宅区': [120.456854576, 31.5884363629],
};

const DISTRICT_FONT_SIZE = {
  '农业区': 48,
  '工业区': 38,
  '住宅区': 32,
  '教育区': 28,
  '商业区': 22,
};

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
  /** @type {{[name:string]: {polygon:Cesium.Entity, label:Cesium.Entity}}} */
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

    Object.entries(DISTRICT_BOUNDARIES).forEach(([name, coords]) => {
      const color = CATEGORY_COLORS[name] || Cesium.Color.WHITE;
      const center = DISTRICT_CENTER[name];
      if (!center) return;

      const visible = districtVisibility?.[name] ?? true;
      const fontSize = DISTRICT_FONT_SIZE[name] || 32;

      // 多边形轮廓（径向渐变填充）
      const positions = coords.map((c) => Cesium.Cartesian3.fromDegrees(c[0], c[1], 5));
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
