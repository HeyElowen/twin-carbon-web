<template>
  <div>
    <!-- 多类占比饼图 -->
    <div class="section-title">多类占比</div>
    <ChartContainer
      ref="pieChartContainer"
      :option="pieOption"
      :loading="chartStore.loading"
      :empty="!chartStore.pieData.length"
      height="180px"
    />

    <!-- 对象查询 -->
    <div class="section-title">对象查询</div>
    <div class="query-wrapper">
      <div class="query-box">
        <el-input
          v-model="localSearchText"
          placeholder="搜索地块/建筑名称..."
          size="small"
        />
        <el-button type="primary" size="small" @click="onSearch">Go</el-button>
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
    <div class="section-title" style="justify-content: space-between;">
      <span>季度碳排放趋势</span>
      <el-radio-group v-model="selectedTimeScale" size="small" class="time-scale">
        <el-radio-button v-for="s in timeScales" :key="s.value" :value="s.value">
          {{ s.label }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <el-radio-group v-model="localTrendTab" size="small" class="trend-tabs">
      <el-radio-button
        v-for="item in trendTabs"
        :key="item"
        :value="item"
      >
        {{ item }}
      </el-radio-button>
    </el-radio-group>
    <ChartContainer
      ref="lineChartContainer"
      :option="lineOption"
      :loading="chartStore.loading"
      :empty="!chartStore.trendData.length"
      height="180px"
      style="margin-top: 6px"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { usePanelFilterStore } from '@/stores/panelFilter'
import { useChartDataStore } from '@/stores/chartData'
import { queryObjects } from '@/api/index.js'
import ChartContainer from '@/components/chart/ChartContainer.vue'

const filterStore = usePanelFilterStore()
const chartStore = useChartDataStore()

const props = defineProps({
  searchText: { type: String, default: '' },
  trendTab: { type: String, default: '全部' },
  trendTabs: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:searchText', 'update:trendTab'])

const localSearchText = computed({
  get: () => props.searchText,
  set: (val) => emit('update:searchText', val)
})

const localTrendTab = computed({
  get: () => props.trendTab,
  set: (val) => {
    chartStore.selectedCategory = categoryMap[val] || ''
    emit('update:trendTab', val)
    if (filterStore.lastConfirmedParams) {
      chartStore.loadTrendOnly(filterStore.filterYear, filterStore.lastConfirmedParams?.dataSource)
    }
  }
})

// ── 时间尺度（从 chartStore 读取/设置）──
const timeScales = [
  { label: '1年', value: '1y' },
  { label: '2年', value: '2y' },
  { label: '5年', value: '5y' },
  { label: '全部', value: 'all' }
]

const selectedTimeScale = computed({
  get: () => chartStore.selectedTimeScale,
  set: (val) => {
    chartStore.selectedTimeScale = val
    if (filterStore.lastConfirmedParams) {
      chartStore.loadTrendOnly(filterStore.filterYear, filterStore.lastConfirmedParams?.dataSource)
    }
  }
})

// ── category 映射（前端简写 → 后端完整名称）──
const categoryMap = {
  '全部': '',
  '商业': '商业区',
  '工业': '工业区',
  '农业': '农业区',
  '住宅': '住宅区',
  '教育': '教育区'
}

const CHART_COLORS = {
  agriculture: '#27AE60',
  commercial: '#9B59B6',
  school: '#E74C3C',
  industry: '#F39C12',
  residential: '#5BA3D9'
}

// 查询数据（保留在组件内，不放入 Store）
const queryResult = ref(null)
const selectedIndex = ref(0)

const selectedItem = computed(() => {
  if (!queryResult.value || !queryResult.value.length) return null
  return queryResult.value[selectedIndex.value] || null
})

watch(() => queryResult.value, () => {
  selectedIndex.value = 0
})

// ── 自主搜索 ──
const onSearch = async () => {
  if (!localSearchText.value.trim()) {
    ElMessage.warning('请输入搜索内容')
    return
  }
  try {
    const res = await queryObjects({
      name: localSearchText.value.trim(),
      year: parseInt(filterStore.filterYear),
      quarter: filterStore.quarterCode
    })
    queryResult.value = res.data || []
    ElMessage.success('查询到 ' + queryResult.value.length + ' 条结果')
  } catch (err) {
    ElMessage.error('查询失败')
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
      data: list
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
      data: xData,
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
      data: yData,
      smooth: false,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: '#fff', width: 2 },
      itemStyle: { color: '#fff' },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255,255,255,0.12)' },
            { offset: 1, color: 'rgba(255,255,255,0.02)' }
          ]
        }
      }
    }]
  }
}

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

// ── 图表 option 响应式 ──
const pieOption = computed(() => createPieOption(chartStore.pieData))
const lineOption = computed(() => createLineOption(chartStore.trendData))



// ── 图表容器 ref ──
const pieChartContainer = ref(null)
const lineChartContainer = ref(null)

function resize() {
  pieChartContainer.value?.resize()
  lineChartContainer.value?.resize()
}

function updateCharts() {
  pieChartContainer.value?.update()
  lineChartContainer.value?.update()
}

defineExpose({ resize, updateCharts })
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

.query-wrapper {
  position: relative;
  margin-bottom: 10px;
}

.query-box {
  display: flex;
  gap: 0;
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
  margin-bottom: 6px;
}

.time-scale {
  margin-left: auto;
}

.time-scale :deep(.el-radio-button__inner) {
  padding: 2px 8px;
  font-size: 12px;
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
