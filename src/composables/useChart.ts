import { ref, shallowRef, watch, onMounted, onUnmounted, nextTick, type Ref } from 'vue'
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

export interface UseChartOptions {
  /** 是否自动监听容器尺寸变化并调用 resize，默认 true */
  autoResize?: boolean
  /** setOption 时是否不跟之前的 option 合并，默认 true（全量替换） */
  notMerge?: boolean
  /** 是否懒更新，默认 false */
  lazyUpdate?: boolean
  /** 主题 */
  theme?: string | object
  /** 渲染器，默认 canvas */
  renderer?: 'canvas' | 'svg'
}

/**
 * 封装单个 ECharts 实例的生命周期管理
 *
 * @param elRef   图表容器的 DOM ref
 * @param getOption  获取当前 option 的函数（会被监听自动更新）
 * @param options 配置项
 *
 * @example
 * const { chartInstance, update, resize } = useChart(chartRef, () => ({
 *   xAxis: { type: 'category', data: ['A', 'B'] },
 *   series: [{ type: 'bar', data: [1, 2] }]
 * }))
 */
export function useChart(
  elRef: Ref<HTMLDivElement | null>,
  getOption: () => EChartsOption,
  options: UseChartOptions = {}
) {
  const {
    autoResize = true,
    notMerge = true,
    lazyUpdate = false,
    theme,
    renderer = 'canvas'
  } = options

  const chartInstance = shallowRef<ECharts | null>(null)
  let resizeObserver: ResizeObserver | null = null

  function init() {
    if (!elRef.value) return
    // 防止重复 init
    dispose()

    chartInstance.value = echarts.init(elRef.value, theme, { renderer })

    const option = getOption()
    if (option && Object.keys(option).length > 0) {
      chartInstance.value.setOption(option, { notMerge, lazyUpdate })
    }

    if (autoResize) {
      resizeObserver = new ResizeObserver(() => {
        chartInstance.value?.resize()
      })
      resizeObserver.observe(elRef.value)
    }
  }

  /**
   * 手动更新 option
   * @param option  新的 option，不传则重新调用 getOption()
   */
  function update(option?: EChartsOption) {
    if (!chartInstance.value) return
    const opt = option !== undefined ? option : getOption()
    if (!opt) return
    chartInstance.value.setOption(opt, { notMerge, lazyUpdate })
  }

  /** 手动触发 resize */
  function resize() {
    chartInstance.value?.resize()
  }

  /** 销毁实例 */
  function dispose() {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
    if (chartInstance.value) {
      chartInstance.value.dispose()
      chartInstance.value = null
    }
  }

  onMounted(() => {
    nextTick(init)
  })

  onUnmounted(() => {
    dispose()
  })

  return {
    chartInstance,
    init,
    update,
    resize,
    dispose
  }
}
