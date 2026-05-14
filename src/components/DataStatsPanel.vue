<template>
  <div>
    <!-- 多类占比饼图 -->
    <div class="section-title">多类占比</div>
    <div ref="pieChartRef" class="chart-container" style="height: 180px"></div>

    <!-- 对象查询 -->
    <div class="section-title">对象查询</div>
    <div class="query-box">
      <el-input
        v-model="searchText"
        placeholder="搜索地块/建筑名称..."
        size="small"
        clearable
      />
      <el-button type="primary" size="small" @click="$emit('search')">Go</el-button>
    </div>

    <!-- 查询结果 -->
    <el-card shadow="never" class="result-card" :body-style="{ padding: '12px' }">
      <div class="result-title">查询结果：商业区-A12地块</div>
      <div class="result-row">
        <span class="result-label">用地类型：</span>
        <span class="result-val purple">商业区</span>
      </div>
      <div class="result-row">
        <span class="result-label">当前季度：</span>
        <span class="result-val">2025-Q2</span>
      </div>
      <div class="result-row">
        <span class="result-label">碳排放量：</span>
        <span class="result-val red">1,245 t</span>
      </div>
      <div class="result-row">
        <span class="result-label">同比趋势：</span>
        <span class="result-val green">↑ 12%</span>
      </div>
    </el-card>

    <!-- 季度碳排放趋势 -->
    <div class="section-title">季度碳排放趋势</div>
    <el-radio-group v-model="trendTab" size="small" class="trend-tabs">
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

defineProps({
  trendTabs: { type: Array, default: () => [] }
})

const searchText = defineModel('searchText', { default: '' })
const trendTab = defineModel('trendTab', { default: '全部' })

defineEmits(['search'])

const CHART_COLORS = {
  agriculture: '#2ECC71',
  commercial: '#E67E22',
  school: '#E74C3C',
  industry: '#9B59B6',
  residential: '#3498DB'
}

function createPieOption() {
  return {
    tooltip: { show: false },
    legend: {
      bottom: 0,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { fontSize: 11, color: '#6D88A3' }
    },
    series: [{
      type: 'pie',
      radius: ['35%', '60%'],
      center: ['50%', '40%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: {
        label: {
          show: true,
          fontSize: 11,
          fontWeight: 'bold',
          color: '#fff',
          formatter: '{b}: {c}%',
          lineHeight: 14
        },
        itemStyle: {
          shadowBlur: 12,
          shadowColor: 'rgba(114,198,195,0.5)'
        }
      },
      data: [
        { name: '农业', value: 25, itemStyle: { color: CHART_COLORS.agriculture } },
        { name: '商业', value: 20, itemStyle: { color: CHART_COLORS.commercial } },
        { name: '学校', value: 15, itemStyle: { color: CHART_COLORS.school } },
        { name: '工业', value: 22, itemStyle: { color: CHART_COLORS.industry } },
        { name: '住宅', value: 18, itemStyle: { color: CHART_COLORS.residential } }
      ]
    }]
  }
}

function createLineOption() {
  return {
    tooltip: { trigger: 'axis', formatter: '{b}<br/>碳排放: {c} t' },
    grid: { left: 42, right: 12, top: 15, bottom: 28 },
    xAxis: {
      type: 'category',
      data: ['22Q1', '22Q3', '23Q1', '23Q3', '24Q1', '24Q3'],
      axisLine: { lineStyle: { color: '#495D68' } },
      axisTick: { show: false },
      axisLabel: { fontSize: 9, color: '#6D88A3' }
    },
    yAxis: {
      type: 'value', min: 0, max: 700,
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(73,93,104,0.4)' } },
      axisLabel: { fontSize: 9, color: '#6D88A3' },
      name: 'CO₂(t)',
      nameTextStyle: { fontSize: 9, color: '#6D88A3' }
    },
    series: [{
      type: 'line',
      data: [120, 200, 280, 350, 450, 550],
      smooth: false,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: '#72C6C3', width: 2 },
      itemStyle: { color: '#72C6C3' },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(114,198,195,0.18)' },
            { offset: 1, color: 'rgba(114,198,195,0.02)' }
          ]
        }
      }
    }]
  }
}

const pieChartRef = ref(null)
const lineChartRef = ref(null)
let pieChart = null
let lineChart = null
let pieObserver = null
let lineObserver = null

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

defineExpose({ resize })

onMounted(() => {
  nextTick(() => initCharts())
})

onUnmounted(() => {
  dispose()
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

.query-box {
  display: flex;
  gap: 0;
  margin-bottom: 10px;
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
</style>
