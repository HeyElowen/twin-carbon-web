/**
 * 3D 热力图 — Cesium Primitive + Custom Material + GLSL Shader
 *
 * 核心特性：
 * 1. Primitive 渲染：比 Entity.polygon 性能更高，支持海量三角面片
 * 2. 自定义 Shader：GPU 端 7 段颜色渐变 + 边缘羽化 + 微弱发光
 * 3. 对数归一化：压缩高值动态范围，低值区域也能清晰可见
 * 4. 贴地渲染：底部对齐地形高度（globe.getHeight）
 * 5. 立体隆起：数值越高，3D 表面隆起越高
 *
 * 颜色渐变（shader 中）：
 *   浅绿 → 鲜绿 → 黄 → 橙 → 橙红 → 红 → 深红
 */

export class Heatmap3D {
  constructor(viewer, options = {}) {
    this.viewer = viewer
    this.primitive = null
    this.data = []

    // 当前配置（与 demo.vue 的 heatmapConfig 对应）
    this.options = {
      scaleHeight: options.scaleHeight ?? 0.08,
      gridSize: options.gridSize ?? 40,
      sigmaMeters: options.sigmaMeters ?? 800,
      opacity: options.opacity ?? 0.85,
      clampToGround: options.clampToGround ?? true,
      power: options.power ?? 0.4,
      minAlpha: options.minAlpha ?? 0.02,
    }

    // 缓存 bounds 用于 flyTo
    this._bounds = null
    this._maxValue = 0
  }

  /* ── 数据加载 ── */

  /**
   * 从 {name, lon, lat, value} 数组加载数据
   */
  loadFromArray(array) {
    this.data = array
      .filter((d) => d.lon != null && d.lat != null && d.value > 0)
      .map((d) => ({
        lon: parseFloat(d.lon),
        lat: parseFloat(d.lat),
        value: parseFloat(d.value),
        name: d.name || '',
        rawIntensity: 0,
      }))

    // 对数归一化：大幅压缩高值动态范围，让低值区域也能清晰可见
    if (this.data.length > 0) {
      const values = this.data.map((d) => d.value)
      const minVal = Math.min(...values)
      const maxVal = Math.max(...values)

      const logMin = Math.log(minVal + 1)
      const logMax = Math.log(maxVal + 1)
      const logRange = logMax - logMin || 1

      for (const d of this.data) {
        const logVal = Math.log(d.value + 1)
        const normalized = (logVal - logMin) / logRange
        d.rawIntensity = normalized
        d.intensity = Math.pow(normalized, this.options.power)
      }
    }

    return this
  }

  /* ── 渲染入口 ── */

  /**
   * 渲染热力图（兼容原有 async 接口）
   * @param {Array} dataPoints — [{name, lon, lat, value}]
   */
  async render(dataPoints) {
    if (!this.viewer || !dataPoints || dataPoints.length === 0) {
      this.remove()
      return
    }

    this.loadFromArray(dataPoints)

    if (this.data.length === 0) {
      this.remove()
      return
    }

    this.build()
  }

  /* ── 构建 Primitive ── */

  build() {
    if (!this.viewer || !this.viewer.scene || this.data.length === 0) return

    // 移除旧热力图
    this.destroy()

    const {
      gridSize: gs,
      sigmaMeters,
      scaleHeight,
      opacity,
      clampToGround,
    } = this.options

    // 拉伸高度：scaleHeight(0.01~0.3) → 米 (×15000)
    const extrudeScale = scaleHeight * 15000

    // 计算数据边界框，留一定边距
    const lons = this.data.map((d) => d.lon)
    const lats = this.data.map((d) => d.lat)
    const marginDeg = 0.008
    const minLon = Math.min(...lons) - marginDeg
    const maxLon = Math.max(...lons) + marginDeg
    const minLat = Math.min(...lats) - marginDeg
    const maxLat = Math.max(...lats) + marginDeg
    const centerLat = (minLat + maxLat) / 2

    // 缓存 bounds 用于 flyTo
    this._bounds = { minLon, minLat, maxLon, maxLat }

    // 米 → 度转换（近似）
    const mPerDegLat = 111320
    const mPerDegLon = 111320 * Math.cos((centerLat * Math.PI) / 180)
    const radiusDegLat = sigmaMeters / mPerDegLat
    const radiusDegLon = sigmaMeters / mPerDegLon

    // 网格中的高斯核影响半径
    const rGridX = Math.max(2, Math.ceil((radiusDegLon / (maxLon - minLon)) * gs))
    const rGridY = Math.max(2, Math.ceil((radiusDegLat / (maxLat - minLat)) * gs))
    const sigmaX = Math.max(1, rGridX / 2.5)
    const sigmaY = Math.max(1, rGridY / 2.5)

    // 初始化热力场
    const field = new Float32Array(gs * gs).fill(0)

    // 对每个数据点，在影响范围内累加高斯核
    for (const point of this.data) {
      const cx = ((point.lon - minLon) / (maxLon - minLon)) * (gs - 1)
      const cy = ((point.lat - minLat) / (maxLat - minLat)) * (gs - 1)

      const x0 = Math.max(0, Math.floor(cx - rGridX))
      const x1 = Math.min(gs - 1, Math.ceil(cx + rGridX))
      const y0 = Math.max(0, Math.floor(cy - rGridY))
      const y1 = Math.min(gs - 1, Math.ceil(cy + rGridY))

      for (let gy = y0; gy <= y1; gy++) {
        for (let gx = x0; gx <= x1; gx++) {
          const dx = gx - cx
          const dy = gy - cy
          const nx = dx / sigmaX
          const ny = dy / sigmaY
          const distSq = nx * nx + ny * ny
          if (distSq > 25) continue // 跳过远距离点(>5σ)

          const gauss = Math.exp(-distSq / 2)
          field[gy * gs + gx] += point.intensity * gauss
        }
      }
    }

    // 归一化到 [0, 1]
    let maxField = 0
    for (let i = 0; i < field.length; i++) {
      if (field[i] > maxField) maxField = field[i]
    }
    this._maxValue = maxField
    if (maxField > 0) {
      for (let i = 0; i < field.length; i++) {
        field[i] = Math.min(field[i] / maxField, 1.0)
      }
    }

    // 构建网格几何体
    const positions = []
    const normals = []
    const sts = []
    const indices = []

    // 获取当前椭球
    const ellipsoid = this.viewer.scene.globe
      ? this.viewer.scene.globe.ellipsoid
      : Cesium.Ellipsoid.WGS84

    for (let gy = 0; gy < gs; gy++) {
      for (let gx = 0; gx < gs; gx++) {
        const lon = minLon + ((maxLon - minLon) * gx) / (gs - 1)
        const lat = minLat + ((maxLat - minLat) * gy) / (gs - 1)
        const intensity = field[gy * gs + gx]

        // 贴地：获取地形高度
        let baseHeight = 0
        if (clampToGround && this.viewer.scene.globe) {
          try {
            const h = this.viewer.scene.globe.getHeight(
              Cesium.Cartographic.fromDegrees(lon, lat)
            )
            if (h !== undefined && !isNaN(h)) baseHeight = h
          } catch (_e) {
            /* 地形未就绪 */ }
        }

        // 立体隆起：数值越高，高度越高
        const height = baseHeight + intensity * extrudeScale

        const cartesian = Cesium.Cartesian3.fromDegrees(lon, lat, height)
        positions.push(cartesian.x, cartesian.y, cartesian.z)

        // 法线（近似为从地心向外的方向）
        const normal = ellipsoid.geodeticSurfaceNormal(cartesian)
        normals.push(normal.x, normal.y, normal.z)

        // st 坐标：t 分量存储强度值，供 shader 做颜色映射
        sts.push(0.5, intensity)
      }
    }

    // 构建三角形索引（两个三角形组成一个四边形）
    for (let gy = 0; gy < gs - 1; gy++) {
      for (let gx = 0; gx < gs - 1; gx++) {
        const a = gy * gs + gx
        const b = a + 1
        const c = (gy + 1) * gs + gx
        const d = c + 1
        // 两个三角形：a-c-b 和 b-c-d
        indices.push(a, c, b)
        indices.push(b, c, d)
      }
    }

    // 创建 Geometry
    const geometry = new Cesium.Geometry({
      attributes: {
        position: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: new Float64Array(positions),
        }),
        normal: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: new Float32Array(normals),
        }),
        st: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: new Float32Array(sts),
        }),
      },
      indices: new Uint32Array(indices),
      primitiveType: Cesium.PrimitiveType.TRIANGLES,
      boundingSphere: Cesium.BoundingSphere.fromVertices(positions),
    })

    // 创建自定义 Material（颜色映射 + 边缘羽化 + 透明度）
    const material = new Cesium.Material({
      fabric: {
        type: 'Heatmap3D',
        uniforms: {
          u_minAlpha: this.options.minAlpha,
          u_opacity: opacity,
        },
        source: `
          uniform float u_minAlpha;
          uniform float u_opacity;

          czm_material czm_getMaterial(czm_materialInput materialInput) {
            czm_material material = czm_getDefaultMaterial(materialInput);
            float t = materialInput.st.t;

            // 颜色渐变：浅绿 → 鲜绿 → 黄 → 橙 → 橙红 → 红 → 深红
            vec3 c0 = vec3(0.18, 0.80, 0.18);   // 浅绿（最低）
            vec3 c1 = vec3(0.00, 1.00, 0.00);   // 鲜绿
            vec3 c2 = vec3(1.00, 1.00, 0.00);   // 黄
            vec3 c3 = vec3(1.00, 0.55, 0.00);   // 橙
            vec3 c4 = vec3(1.00, 0.15, 0.00);   // 橙红
            vec3 c5 = vec3(0.90, 0.00, 0.00);   // 红
            vec3 c6 = vec3(0.50, 0.00, 0.00);   // 深红（最高）

            vec3 color;
            if (t < 0.12)      color = mix(c0, c1, t / 0.12);
            else if (t < 0.28) color = mix(c1, c2, (t - 0.12) / 0.16);
            else if (t < 0.45) color = mix(c2, c3, (t - 0.28) / 0.17);
            else if (t < 0.60) color = mix(c3, c4, (t - 0.45) / 0.15);
            else if (t < 0.78) color = mix(c4, c5, (t - 0.60) / 0.18);
            else               color = mix(c5, c6, (t - 0.78) / 0.22);

            // 边缘羽化：低强度区域使用 smoothstep 平滑过渡到透明
            float alpha = smoothstep(u_minAlpha, u_minAlpha + 0.06, t) * u_opacity;

            material.diffuse = color;
            material.alpha = alpha;
            material.emission = color * 0.15;
            return material;
          }
        `,
      },
      translucent: true,
    })

    // 创建 Primitive
    this.primitive = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: geometry,
      }),
      appearance: new Cesium.MaterialAppearance({
        material: material,
        translucent: true,
        flat: false,
        faceForward: true,
        renderState: {
          depthTest: {
            enabled: true,
          },
          blending: {
            enabled: true,
            equationRgb: Cesium.BlendFunction.ADD,
            equationAlpha: Cesium.BlendFunction.ADD,
            functionSourceRgb: Cesium.BlendFunction.SOURCE_ALPHA,
            functionSourceAlpha: Cesium.BlendFunction.SOURCE_ALPHA,
            functionDestinationRgb: Cesium.BlendFunction.ONE_MINUS_SOURCE_ALPHA,
            functionDestinationAlpha: Cesium.BlendFunction.ONE_MINUS_SOURCE_ALPHA,
          },
          cull: {
            enabled: false, // 双面渲染
          },
        },
      }),
      asynchronous: false,
      show: true,
    })

    this.viewer.scene.primitives.add(this.primitive)

    // eslint-disable-next-line no-console
    console.log(
      `[Heatmap3D] 已渲染：${this.data.length} 个数据点 → ${indices.length} 个三角面片` +
      `（网格 ${gs}×${gs}，扩散半径 ${sigmaMeters}m，贴地 ${clampToGround}）`
    )

    // 自动飞行到热力图区域
    setTimeout(() => {
      this.flyTo()
    }, 300)
  }

  /* ── 视角飞行 ── */

  flyTo() {
    if (!this.viewer || !this._bounds) return

    const { minLon, minLat, maxLon, maxLat } = this._bounds
    const centerLon = (minLon + maxLon) / 2
    const centerLat = (minLat + maxLat) / 2

    const dLat = (maxLat - minLat) * 111000
    const dLon = (maxLon - minLon) * 111000 * Math.cos(Cesium.Math.toRadians(centerLat))
    const diagM = Math.sqrt(dLat * dLat + dLon * dLon)

    const extrudeScale = this.options.scaleHeight * 15000
    const heatMaxH = Math.min(this._maxValue * extrudeScale, 3000)
    const targetHeight = Math.max(diagM * 2.2, heatMaxH * 4, 500)

    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(centerLon, centerLat, targetHeight),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-50),
        roll: 0,
      },
      duration: 2,
    })
  }

  /* ── 参数设置 ── */

  setScaleHeight(scale) {
    const changed = this.options.scaleHeight !== scale
    this.options.scaleHeight = scale
    if (changed && this.data.length > 0) {
      this.build()
    }
  }

  setGridSize(size) {
    const changed = this.options.gridSize !== size
    this.options.gridSize = Math.max(15, Math.min(200, size))
    if (changed && this.data.length > 0) {
      this.build()
    }
  }

  setSigmaMeters(meters) {
    const changed = this.options.sigmaMeters !== meters
    this.options.sigmaMeters = Math.max(100, Math.min(5000, meters))
    if (changed && this.data.length > 0) {
      this.build()
    }
  }

  setOpacity(opacity) {
    const changed = this.options.opacity !== opacity
    this.options.opacity = Math.max(0.1, Math.min(1, opacity))
    if (changed && this.data.length > 0) {
      this.build()
    }
  }

  setClampToGround(enabled) {
    const changed = this.options.clampToGround !== enabled
    this.options.clampToGround = enabled
    if (changed && this.data.length > 0) {
      this.build()
    }
  }

  setShow(show) {
    this.options.show = show
    if (this.primitive) {
      this.primitive.show = show
    }
  }

  /* ── 生命周期 ── */

  remove() {
    this.destroy()
  }

  destroy() {
    if (this.primitive) {
      if (this.viewer && this.viewer.scene) {
        this.viewer.scene.primitives.remove(this.primitive)
      }
      this.primitive = null
    }
  }
}
