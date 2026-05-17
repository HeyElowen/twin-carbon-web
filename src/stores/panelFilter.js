import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePanelFilterStore = defineStore('panelFilter', () => {
  const years = ['2025', '2024', '2023', '2022']
  const quarters = ['第一季度', '第二季度', '第三季度', '第四季度', '全年']
  const quarterMap = { '第一季度': 'Q1', '第二季度': 'Q2', '第三季度': 'Q3', '第四季度': 'Q4', '全年': 'ALL' }

  const filterYear = ref('2025')
  const filterQuarter = ref('第二季度')
  const filterDataSource = ref('system')

  const dataSourceOptions = [
    { label: '系统数据', value: 'system' },
    { label: '用户数据', value: 'custom' }
  ]

  const quarterCode = computed(() => quarterMap[filterQuarter.value] || 'Q2')

  /**
   * 最后一次全局确认的筛选参数。
   * 各面板 watch 此值变化来触发数据加载。
   */
  const lastConfirmedParams = ref(null)

  function getParams() {
    return {
      year: filterYear.value,
      quarter: quarterMap[filterQuarter.value],
      dataSource: filterDataSource.value
    }
  }

  function confirm() {
    lastConfirmedParams.value = getParams()
  }

  return {
    years,
    quarters,
    quarterMap,
    dataSourceOptions,
    filterYear,
    filterQuarter,
    filterDataSource,
    quarterCode,
    lastConfirmedParams,
    getParams,
    confirm
  }
})
