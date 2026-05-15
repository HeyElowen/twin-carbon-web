<template>
  <div>
    <!-- 多类占比饼图 -->
    <div class="section-title">多类占比</div>
    <div ref="pieChartRef" class="chart-container" style="height: 180px"></div>

    <!-- 对象查询 -->
    <div class="section-title">对象查询</div>
    <div class="query-wrapper">
      <div class="query-box">
        <el-input
          v-model="localSearchText"
          placeholder="搜索地块/建筑名称..."
          size="small"
        />
        <el-button type="primary" size="small" @click="$emit('search')">Go</el-button>
      </div>
      <div v-if="showSuggestions" class="suggestion-dropdown">
        <div
          v-for="item in suggestions"
          :key="`${item.name}-${item.category}`"
          class="suggestion-item"
          @click="onSelectSuggestion(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- 查询结果详情 -->
    <el-card v-if="selectedItem" shadow="never" class="result-card" :body-style="{ padding: '12px' }">
      <div class="result-title">查询结果：{{ selectedItem.name }}</div>
      <div class="result-row">
        <span class="result-label">用地类型：</span>
        <span class="result-val purple">{{ selectedItem.category }}</span>
      </div>
      <div class="result-row">
        <span class="result-label">当前季度：</span>
        <span class="result-val">{{ selectedItem.year }}-{{ selectedItem.quarter }}</span>
      </div>
      <div class="result-row">
        <span class="result-label">碳排放量：</span>
        <span class="result-val red">{{ selectedItem.emission?.toLocaleString() }} t</span>
      </div>
      <div class="result-row">
        <span class="result-label">建筑面积：</span>
        <span class="result-val">{{ selectedItem.area?.toLocaleString() }} m²</span>
      </div>
    </el-card>
    <el-card v-else-if="queryResult && queryResult.length === 0" shadow="never" class="result-card" :body-style="{ padding: '12px' }">
      <div class="result-title" style="color: #6D88A3">未找到匹配结果</div>
    </el-card>


    <!-- 季度碳排放趋势 -->
    <div class="section-title">季度碳排放趋势</div>
    <el-radio-group v-model="localTrendTab" size="small" class="trend-tabs">
      <el-radio-button
        v-for="item in trendTabs"
        :key="item"
        :value="item"
      >
        {{ item }}
      </el-radio-button>
    </el-radio-group>
    <div ref="lineChartRef" class="chart-container" style="height: 180px; margin-top: 6px"></div>
  </div>
</template>

 <script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
  import * as echarts from 'echarts'
  import { mockPoints, mockCustomPoints, mockQuery } from '@/api/mock-data.js'

  const props = defineProps({
    searchText: { type: String, default: '' },
    trendTab: { type: String, default: '全部' },
    trendTabs: { type: Array, default: () => [] }
  })

  const emit = defineEmits(['update:searchText', 'update:trendTab', 'search'])

const localSearchText = computed({
    get: () => props.searchText,
    set: (val) => emit('update:searchText', val)
  })

  const localTrendTab = computed({
    get: () => props.trendTab,
    set: (val) => emit('update:trendTab', val)
  })

  const CHART_COLORS = {
    agriculture: '#27AE60',
    commercial: '#9B59B6',
    school: '#E74C3C',
    industry: '#F39C12',
    residential: '#5BA3D9'
  }

  // 图表 DOM 与实例
  const pieChartRef = ref(null)
  const lineChartRef = ref(null)
  let pieChart = null
  let lineChart = null
  let pieObserver = null
  let lineObserver = null

  // 外部传入的数据
  const pieData = ref([
    { name: '农业', value: 25, itemStyle: { color: CHART_COLORS.agriculture } },
    { name: '商业', value: 20, itemStyle: { color: CHART_COLORS.commercial } },
    { name: '学校', value: 15, itemStyle: { color: CHART_COLORS.school } },
    { name: '工业', value: 22, itemStyle: { color: CHART_COLORS.industry } },
    { name: '住宅', value: 18, itemStyle: { color: CHART_COLORS.residential } }
  ])

  const trendData = ref([
    { name: '22Q1', value: 120 },
    { name: '22Q3', value: 200 },
    { name: '23Q1', value: 280 },
    { name: '23Q3', value: 350 },
    { name: '24Q1', value: 450 },
    { name: '24Q3', value: 550 }
  ])

  const queryResult = ref(null)
  const selectedIndex = ref(0)

  const selectedItem = computed(() => {
    if (!queryResult.value || !queryResult.value.length) return null
    return queryResult.value[selectedIndex.value] || null
  })

  watch(() => queryResult.value, () => {
    selectedIndex.value = 0
  })

  // ── 实时搜索建议 ──
  const suggestions = ref([])
  const showSuggestions = ref(false)
  let suppressSuggestions = false

  const allDataSources = computed(() => {
    const map = new Map()
    const addItem = (item) => {
      const key = `${item.name}-${item.category}`
      if (!map.has(key)) {
        map.set(key, item)
      }
    }
    ;(mockPoints.data || []).forEach(addItem)
    ;(mockCustomPoints.data || []).forEach(addItem)
    ;(mockQuery.data || []).forEach(addItem)
    return Array.from(map.values())
  })

  watch(() => localSearchText.value, (val) => {
    if (suppressSuggestions) return
    if (!val || !val.trim()) {
      suggestions.value = []
      showSuggestions.value = false
      return
    }
    const kw = val.trim().toLowerCase()
    suggestions.value = allDataSources.value.filter(item =>
      item.name.toLowerCase().includes(kw) ||
      item.category.toLowerCase().includes(kw)
    ).slice(0, 8)
    showSuggestions.value = suggestions.value.length > 0
  })

  function onSelectSuggestion(item) {
    suppressSuggestions = true
    localSearchText.value = item.name
    queryResult.value = [item]
    selectedIndex.value = 0
    showSuggestions.value = false
    setTimeout(() => { suppressSuggestions = false }, 150)
  }

  function onDocumentClick(e) {
    if (!e.target.closest('.query-wrapper')) {
      showSuggestions.value = false
    }
  }

  // ── 图表配置生成 ──
  function createPieOption(data) {
    const list = (data || []).map(item => ({
      name: item.name,
      value: item.value,
      itemStyle: { color: CHART_COLORS[mapCategoryKey(item.name)] || '#999' }
    }))
    return {
      tooltip: { trigger: 'item', formatter: '{b}: {c}' },
      legend: {
        bottom: 0,
        itemWidth: 8,
        itemHeight: 8,
        textStyle: { fontSize: 11, color: '#666' }
      },
      series: [{
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
        data: list.length ? list : pieData.value
      }]
    }
  }

  function createLineOption(data) {
    const list = data || []
    const xData = list.map(d => d.name)
    const yData = list.map(d => d.value)
    return {
      tooltip: { trigger: 'axis', formatter: '{b}<br/>碳排放: {c} t' },
      grid: { left: 42, right: 12, top: 15, bottom: 28 },
      xAxis: {
        type: 'category',
        data: xData.length ? xData : trendData.value.map(d => d.name),
        axisLine: { lineStyle: { color: '#D0D5DC' } },
        axisTick: { show: false },
        axisLabel: { fontSize: 9, color: '#888' }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { type: 'dashed', color: '#E8ECF0' } },
        axisLabel: { fontSize: 9, color: '#888' },
        name: 'CO₂(t)',
        nameTextStyle: { fontSize: 9, color: '#888' }
      },
      series: [{
        type: 'line',
        data: yData.length ? yData : trendData.value.map(d => d.value),
        smooth: false,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#333', width: 2 },
        itemStyle: { color: '#333' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0,0,0,0.08)' },
              { offset: 1, color: 'rgba(0,0,0,0.01)' }
            ]
          }
        }
      }]
    }
  }

  // 中文类别 → key 映射
  function mapCategoryKey(name) {
    const map = {
      '农业区': 'agriculture',
      '商业区': 'commercial',
      '教育区': 'school',
      '工业区': 'industry',
      '住宅区': 'residential',
      '农业': 'agriculture',
      '商业': 'commercial',
      '学校': 'school',
      '工业': 'industry',
      '住宅': 'residential'
    }
    return map[name] || 'industry'
  }

  // ── 图表初始化与更新 ──
  function initCharts() {
    if (pieChartRef.value) {
      pieChart?.dispose()
      pieChart = echarts.init(pieChartRef.value)
      pieChart.setOption(createPieOption())
      pieObserver = new ResizeObserver(() => pieChart?.resize())
      pieObserver.observe(pieChartRef.value)
    }
    if (lineChartRef.value) {
      lineChart?.dispose()
      lineChart = echarts.init(lineChartRef.value)
      lineChart.setOption(createLineOption())
      lineObserver = new ResizeObserver(() => lineChart?.resize())
      lineObserver.observe(lineChartRef.value)
    }
  }

  /** 供父组件调用：更新图表数据 */
  function updateCharts(newPieData, newTrendData) {
    if (newPieData) pieData.value = newPieData
    if (newTrendData) trendData.value = newTrendData
    if (pieChart) {
      pieChart.setOption(createPieOption(pieData.value), true)
    }
    if (lineChart) {
      lineChart.setOption(createLineOption(trendData.value), true)
    }
  }

  /** 供父组件调用：设置查询结果 */
  function setQueryResult(result) {
    queryResult.value = result
  }

  function resize() {
    pieChart?.resize()
    lineChart?.resize()
  }

  function dispose() {
    pieObserver?.disconnect()
    lineObserver?.disconnect()
    pieChart?.dispose()
    lineChart?.dispose()
    pieChart = null
    lineChart = null
  }

  defineExpose({ resize, updateCharts, setQueryResult })

  onMounted(() => {
    nextTick(() => initCharts())
    document.addEventListener('click', onDocumentClick)
  })

  onUnmounted(() => {
    dispose()
    document.removeEventListener('click', onDocumentClick)
  })
  </script>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
  text-align: left;
  margin-bottom: 10px;
  padding-left: 4px;
}

.section-title::before {
  content: '';
  width: 3px;
  height: 16px;
  background: linear-gradient(180deg, #72C6C3, rgba(114,198,195,0.4));
  border-radius: 2px;
}

.chart-container {
  width: 100%;
}

.query-wrapper {
  position: relative;
  margin-bottom: 10px;
}

.query-box {
  display: flex;
  gap: 0;
}

.suggestion-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 200;
  background: rgba(32, 51, 71, 0.98);
  border: 1px solid rgba(73, 93, 104, 0.6);
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 8px 12px;
  font-size: 13px;
  color: #cbd5e1;
  cursor: pointer;
  transition: background 0.15s;
}

.suggestion-item:hover {
  background: rgba(114, 198, 195, 0.15);
  color: #72C6C3;
}



.query-box .el-input {
  flex: 1;
}

.result-card {
  margin-bottom: 12px;
  border: 1px solid rgba(73, 93, 104, 0.3);
}

.result-card .result-title {
  font-size: 15px;
  font-weight: 600;
  color: #72C6C3;
  margin-bottom: 6px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 3px;
}

.result-label { color: #6D88A3; }
.result-val { color: #e2e8f0; font-weight: 500; }
.result-val.red { color: #E74C3C; font-weight: 600; }
.result-val.green { color: #2ECC71; font-weight: 500; }
.result-val.purple { color: #9B59B6; font-weight: 500; }

.trend-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.result-item {
  padding-top: 10px;
  border-top: 1px dashed rgba(73, 93, 104, 0.4);
}

.result-item.is-first {
  padding-top: 0;
  border-top: none;
}

</style>
