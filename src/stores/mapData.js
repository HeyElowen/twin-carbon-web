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
      const [mainRes, customRes] = await Promise.all([
        getObservationPoints(params),
        getCustomObservationPoints(params)
      ])
      mapPoints.value = mainRes.data || []
      customPoints.value = customRes.data || []
    } catch (err) {
      console.error('地图数据加载失败', err)
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
