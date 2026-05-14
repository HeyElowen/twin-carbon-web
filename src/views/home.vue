<template>
  <div class="carbon-emission-app">
    <!-- 顶部标题栏 -->
    <header class="header">
      <h1>城市碳排放三维可视化系统</h1>
    </header>

    <!-- 主体区域 -->
    <div class="main-wrap">
      <!-- 左侧面板 -->
      <aside class="left-panel">
        <div class="panel-title">图层控制</div>

        <!-- 年份/季度筛选 -->
        <div class="filter-group">
          <div class="filter-row">
            <span class="filter-label">年份</span>
            <select v-model="filterYear" class="filter-select">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>

            <span class="filter-label">季度</span>
            <select v-model="filterQuarter" class="filter-select">
              <option>第一季度</option>
              <option>第二季度</option>
              <option>第三季度</option>
              <option>第四季度</option>
            </select>
          </div>
          <button class="btn-confirm" @click="onConfirm">确认</button>
        </div>

        <!-- 标签页 -->
        <div class="tabs">
          <div class="tab" :class="{ active: activeTab === 'heat' }" @click="switchTab('heat')">
            热力图
          </div>
          <div class="tab" :class="{ active: activeTab === 'bar' }" @click="switchTab('bar')">
            柱状图
          </div>
        </div>

        <!-- 图例 -->
        <div class="legend-title">图例</div>
        <div class="legend-list">
          <div class="legend-item" v-for="item in legendList" :key="item.label">
            <div class="legend-color" :style="{ background: item.color }"></div>
            <span class="legend-label">{{ item.label }}</span>
          </div>
        </div>

        <button class="btn-add" @click="onAddData">+ 添加数据</button>

        <div class="btn-group">
          <button class="btn-preview" @click="onPreview">预览</button>
          <button class="btn-save" @click="onSave">保存</button>
        </div>
      </aside>

      <!-- 中间可视化区域 -->
      <main class="center-area">
        <div class="area-label"></div>

        <!-- 指北针 -->
        <div class="compass">
          <div class="compass-n">N</div>
        </div>

        <!-- 功能区块 -->
        <div class="map-block block-school"><span>学校</span></div>
        <div class="map-block block-commercial"><span>商业</span></div>
        <div class="map-block block-industry"><span>工业</span></div>
        <div class="map-block block-agriculture"><span>农业</span></div>
        <div class="map-block block-residential"><span>住宅</span></div>

        <!-- 比例尺 -->
        <div class="scale-bar">
          <div class="scale-text">比例尺</div>
          <div class="scale-line">
            <div class="scale-tick left"></div>
            <div class="scale-tick right"></div>
          </div>
        </div>
      </main>

      <!-- 右侧面板 -->
      <aside class="right-panel">
        <div class="panel-title">数据统计</div>

        <!-- 多类占比饼图 -->
        <div style="margin-bottom: 4px">
          <div style="font-size: 14px; font-weight: 600; color: #333; text-align: center; margin-bottom: 8px">
            多类占比
          </div>
          <div class="pie-chart-wrap">
            <svg class="pie-svg" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#27AE60"
                stroke-width="40"
                stroke-dasharray="62.83 188.5"
                stroke-dashoffset="0"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#9B59B6"
                stroke-width="40"
                stroke-dasharray="50.27 201.06"
                stroke-dashoffset="-62.83"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#E74C3C"
                stroke-width="40"
                stroke-dasharray="37.7 213.63"
                stroke-dashoffset="-113.1"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#F39C12"
                stroke-width="40"
                stroke-dasharray="55.29 196.04"
                stroke-dashoffset="-150.8"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#5BA3D9"
                stroke-width="40"
                stroke-dasharray="45.24 206.09"
                stroke-dashoffset="-206.09"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <div class="pie-legend-wrap">
            <div class="pie-legend-item" v-for="item in pieLegend" :key="item.name">
              <div class="pie-legend-dot" :style="{ background: item.color }"></div>
              {{ item.name }}
            </div>
          </div>
        </div>

        <!-- 对象查询 -->
        <div class="query-title">对象查询</div>
        <div class="query-box">
          <input
            v-model="searchText"
            class="query-input"
            type="text"
            placeholder="搜索地块/建筑名称..."
          />
          <button class="query-btn" @click="onSearch">Go</button>
        </div>

        <!-- 查询结果 -->
        <div class="result-card">
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
        </div>

        <!-- 季度碳排放趋势 -->
        <div class="query-title">季度碳排放趋势</div>
        <div class="filter-tabs">
          <div
            class="filter-tab"
            :class="{ active: trendTab === item }"
            v-for="item in trendTabs"
            :key="item"
            @click="switchTrendTab(item)"
          >
            {{ item }}
          </div>
        </div>

        <!-- 趋势折线图 -->
        <svg class="trend-chart" viewBox="0 0 300 160">
          <line x1="40" y1="20" x2="40" y2="130" stroke="#D0D5DC" stroke-width="1" />
          <line x1="40" y1="130" x2="280" y2="130" stroke="#D0D5DC" stroke-width="1" />

          <line
            x1="40"
            y1="50"
            x2="280"
            y2="50"
            stroke="#E8ECF0"
            stroke-width="1"
            stroke-dasharray="4,4"
          />
          <line
            x1="40"
            y1="80"
            x2="280"
            y2="80"
            stroke="#E8ECF0"
            stroke-width="1"
            stroke-dasharray="4,4"
          />
          <line
            x1="40"
            y1="110"
            x2="280"
            y2="110"
            stroke="#E8ECF0"
            stroke-width="1"
            stroke-dasharray="4,4"
          />

          <text x="30" y="25" font-size="9" fill="#888" text-anchor="end">700</text>
          <text x="30" y="55" font-size="9" fill="#888" text-anchor="end">500</text>
          <text x="30" y="85" font-size="9" fill="#888" text-anchor="end">300</text>
          <text x="30" y="115" font-size="9" fill="#888" text-anchor="end">100</text>
          <text x="30" y="135" font-size="9" fill="#888" text-anchor="end">0</text>
          <text x="25" y="15" font-size="9" fill="#888" text-anchor="end">CO₂(t)</text>

          <text x="50" y="145" font-size="9" fill="#888" text-anchor="middle">22Q1</text>
          <text x="90" y="145" font-size="9" fill="#888" text-anchor="middle">22Q3</text>
          <text x="130" y="145" font-size="9" fill="#888" text-anchor="middle">23Q1</text>
          <text x="170" y="145" font-size="9" fill="#888" text-anchor="middle">23Q3</text>
          <text x="210" y="145" font-size="9" fill="#888" text-anchor="middle">24Q1</text>
          <text x="250" y="145" font-size="9" fill="#888" text-anchor="middle">24Q3</text>

          <polyline
            points="50,110 90,100 130,92 170,85 210,75 250,65"
            fill="none"
            stroke="#333"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <circle cx="50" cy="110" r="3" fill="#333" />
          <circle cx="90" cy="100" r="3" fill="#333" />
          <circle cx="130" cy="92" r="3" fill="#333" />
          <circle cx="170" cy="85" r="3" fill="#333" />
          <circle cx="210" cy="75" r="3" fill="#333" />
          <circle cx="250" cy="65" r="3" fill="#333" />

          <circle cx="235" cy="18" r="3" fill="#333" />
          <text x="242" y="21" font-size="10" fill="#666">全部</text>
        </svg>
      </aside>
    </div>

    <!-- 底部脚注 -->
    <footer class="footer">
      2025年 城市碳排放可视化系统 | 热力图
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 筛选
const filterYear = ref('2025')
const filterQuarter = ref('第二季度')
const searchText = ref('')

// 标签页
const activeTab = ref('bar')
const trendTab = ref('全部')
const trendTabs = ref(['全部', '商业', '工业', '农业', '住宅'])

// 图例
const legendList = ref([
  { color: '#E74C3C', label: 'school' },
  { color: '#27AE60', label: '农业' },
  { color: '#F39C12', label: '工业' },
  { color: '#9B59B6', label: '商业' },
  { color: '#5BA3D9', label: '住宅' }
])

// 饼图图例
const pieLegend = ref([
  { name: '农业', color: '#27AE60' },
  { name: '商业', color: '#9B59B6' },
  { name: '学校', color: '#E74C3C' },
  { name: '工业', color: '#F39C12' },
  { name: '住宅', color: '#5BA3D9' }
])

// 切换标签
const switchTab = (tab) => {
  activeTab.value = tab
}

const switchTrendTab = (tab) => {
  trendTab.value = tab
}

// 按钮事件
const onConfirm = () => {
  console.log('筛选确认', filterYear.value, filterQuarter.value)
}

const onAddData = () => {
  console.log('添加数据')
}

const onPreview = () => {
  console.log('预览')
}

const onSave = () => {
  console.log('保存')
}

const onSearch = () => {
  console.log('搜索', searchText.value)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.carbon-emission-app {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  background: #e8ecf0;
  min-width: 1280px;
  overflow-x: auto;
}
.header {
  height: 56px;
  background: #3a4556;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header h1 {
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
}
.main-wrap {
  display: flex;
  height: calc(100vh - 56px - 40px);
}

/* 左侧面板 */
.left-panel {
  width: 280px;
  background: #f5f7fa;
  border-right: 1px solid #d0d5dc;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-label {
  font-size: 13px;
  color: #666;
  width: 40px;
  flex-shrink: 0;
  text-align: right;
}
.filter-select {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #d0d5dc;
  border-radius: 4px;
  font-size: 13px;
  color: #333;
  background: #fff;
  outline: none;
  cursor: pointer;
}
.btn-confirm {
  width: 100%;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #5ba3d9;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  margin-top: 4px;
}
.tabs {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #d0d5dc;
  margin-bottom: 16px;
}
.tab {
  flex: 1;
  padding: 8px 0;
  text-align: center;
  font-size: 13px;
  border: none;
  cursor: pointer;
  background: #e0e4e8;
  color: #666;
}
.tab.active {
  background: #5ba3d9;
  color: #fff;
}
.legend-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 12px;
}
.legend-list {
  margin-bottom: 20px;
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  margin-right: 10px;
  flex-shrink: 0;
}
.legend-label {
  font-size: 13px;
  color: #333;
}
.btn-add {
  width: 100%;
  height: 500px;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background: #5cb85c;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
}
.btn-group {
  display: flex;
  gap: 12px;
}
.btn-group button {
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.btn-preview {
  background: #6c757d;
}
.btn-save {
  background: #f0ad4e;
}

/* 中间可视化区域 */
.center-area {
  flex: 1;
  background: #edf1f5;
  border: 2px dashed #5ba3d9;
  margin: 12px;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}
.area-label {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #5ba3d9;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  color: #5ba3d9;
  z-index: 10;
}
.compass {
  position: absolute;
  top: 16px;
  right: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.compass-n {
  font-size: 14px;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 2px;
}
.map-block {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  opacity: 0.75;
  cursor: default;
}
.map-block span {
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  user-select: none;
}
.block-school {
  left: 42%;
  top: 22%;
  width: 14%;
  height: 18%;
  background: #e74c3c;
}
.block-commercial {
  left: 22%;
  top: 32%;
  width: 16%;
  height: 20%;
  background: #9b59b6;
}
.block-industry {
  left: 62%;
  top: 35%;
  width: 15%;
  height: 22%;
  background: #f39c12;
}
.block-agriculture {
  left: 28%;
  top: 58%;
  width: 20%;
  height: 22%;
  background: #27ae60;
}
.block-residential {
  left: 55%;
  top: 62%;
  width: 16%;
  height: 20%;
  background: #5ba3d9;
}
.scale-bar {
  position: absolute;
  bottom: 20px;
  left: 24px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.scale-text {
  font-size: 11px;
  color: #333;
  margin-bottom: 4px;
}
.scale-line {
  position: relative;
  width: 80px;
  height: 2px;
  background: #333;
}
.scale-tick {
  position: absolute;
  top: -4px;
  width: 1px;
  height: 10px;
  background: #333;
}
.scale-tick.left {
  left: 0;
}
.scale-tick.right {
  right: 0;
}

/* 右侧面板 */
.right-panel {
  width: 320px;
  background: #f5f7fa;
  border-left: 1px solid #d0d5dc;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.pie-chart-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;
}
.pie-svg {
  width: 140px;
  height: 140px;
}
.pie-legend-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 12px;
  margin-top: 8px;
}
.pie-legend-item {
  display: flex;
  align-items: center;
  font-size: 11px;
  color:#666;
}
.pie-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}
.query-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}
.query-box {
  display: flex;
  margin-bottom: 12px;
}
.query-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d0d5dc;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 13px;
  color: #333;
  outline: none;
}
.query-input::placeholder {
  color: #aaa;
}
.query-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 0 4px 4px 0;
  background: #5ba3d9;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.result-card {
  background: #fff;
  border: 1px solid #d0d5dc;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 16px;
}
.result-title {
  font-size: 13px;
  font-weight: 600;
  color: #5ba3d9;
  margin-bottom: 8px;
}
.result-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 4px;
}
.result-label {
  color: #666;
}
.result-val {
  color: #333;
  font-weight: 500;
}
.result-val.red {
  color: #e74c3c;
  font-weight: 600;
}
.result-val.green {
  color: #27ae60;
  font-weight: 500;
}
.result-val.purple {
  color: #9b59b6;
  font-weight: 500;
}
.filter-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.filter-tab {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  border: 1px solid #d0d5dc;
  background: #fff;
  color: #666;
  cursor: pointer;
}
.filter-tab.active {
  background: #4a5568;
  color: #fff;
  border-color: #4a5568;
}
.trend-chart {
  width: 100%;
  height: 180px;
}

/* 底部 */
.footer {
  height: 40px;
  background: #f5f7fa;
  border-top: 1px solid #d0d5dc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
}
</style>