import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryRatio, getTrend } from '@/api/index.js'

export const useChartDataStore = defineStore('chartData', () => {
  const pieData = ref([])
  const trendData = ref([])
  const loading = ref(false)

  // 趋势图筛选状态（原为 DataStatsPanel 的本地状态，移入 Store）
  const selectedTimeScale = ref('2y')
  const selectedCategory = ref('')

  function buildTrendParams(yearStr) {
    const yearEnd = parseInt(yearStr)
    const scaleMap = {
      '1y': yearEnd,
      '2y': yearEnd - 1,
      '5y': yearEnd - 4,
      'all': 2020
    }
    const yearStart = scaleMap[selectedTimeScale.value] ?? 2020
    return {
      yearStart,
      yearEnd,
      category: selectedCategory.value
    }
  }

  async function load(params) {
    loading.value = true
    try {
      const trendParams = buildTrendParams(params.year)
      const [pieRes, trendRes] = await Promise.all([
        getCategoryRatio(params),
        getTrend(trendParams)
      ])
      pieData.value = pieRes.data || []
      trendData.value = trendRes.data || []
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('图表数据加载失败', err)
    } finally {
      loading.value = false
    }
  }

  async function loadTrendOnly(yearStr) {
    try {
      const trendParams = buildTrendParams(yearStr)
      const res = await getTrend(trendParams)
      trendData.value = res.data || []
    } catch (err) {
      // 趋势图加载失败，已在调用方处理
    }
  }

  return {
    pieData,
    trendData,
    loading,
    selectedTimeScale,
    selectedCategory,
    load,
    loadTrendOnly
  }
})
