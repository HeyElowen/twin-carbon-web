import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getObservationPoints, getCustomObservationPoints } from '@/api/index.js'

export const useMapDataStore = defineStore('mapData', () => {
  const mapPoints = ref([])
  const customPoints = ref([])
  const loading = ref(false)

  async function load(params) {
    loading.value = true
    try {
      if (params.dataSource === 'custom') {
        const res = await getCustomObservationPoints(params)
        customPoints.value = res.data || []
        mapPoints.value = []
      } else {
        const res = await getObservationPoints(params)
        mapPoints.value = res.data || []
        customPoints.value = []
      }
    } catch (err) {
      // 地图数据加载失败，已在调用方处理
    } finally {
      loading.value = false
    }
  }

  function clear() {
    mapPoints.value = []
    customPoints.value = []
  }

  return { mapPoints, customPoints, loading, load, clear }
})
