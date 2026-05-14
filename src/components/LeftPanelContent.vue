<template>
  <div>
    <!-- 年份/季度筛选 -->
    <div class="filter-group">
      <div class="filter-row">
        <el-select v-model="filterYear" size="small" style="width: 92px">
          <el-option v-for="y in years" :key="y" :label="y" :value="y" />
        </el-select>
        <el-select v-model="filterQuarter" size="small" style="width: 120px">
          <el-option v-for="q in quarters" :key="q" :label="q" :value="q" />
        </el-select>
      </div>
      <el-button type="primary" size="small" @click="$emit('confirm')" style="width:100%">
        确认
      </el-button>
    </div>

    <!-- 图显示模式 -->
    <el-segmented v-model="activeTab" :options="chartModes" class="chart-mode" />

    <!-- 图例 -->
    <div class="legend-title">图例</div>
    <div class="legend-list">
      <div class="legend-item" v-for="item in legendList" :key="item.label">
        <div class="legend-color" :style="{ background: item.color }"></div>
        <span class="legend-label">{{ item.label }}</span>
      </div>
    </div>

    <el-button type="success" @click="$emit('add-data')" style="width:100%; margin-bottom: 10px">
      + 添加数据
    </el-button>

    <div class="btn-group">
      <el-button @click="$emit('preview')" size="small" style="flex:1">预览</el-button>
      <el-button type="warning" @click="$emit('save')" size="small" style="flex:1">保存</el-button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  years: { type: Array, default: () => [] },
  quarters: { type: Array, default: () => [] },
  chartModes: { type: Array, default: () => [] },
  legendList: { type: Array, default: () => [] }
})

const filterYear = defineModel('filterYear', { default: '2025' })
const filterQuarter = defineModel('filterQuarter', { default: '第二季度' })
const activeTab = defineModel('activeTab', { default: 'bar' })

defineEmits(['confirm', 'add-data', 'preview', 'save'])
</script>

<style scoped>
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-mode {
  display: flex;
  margin-bottom: 10px;
}

.legend-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 8px;
}

.legend-list {
  margin-bottom: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  margin-right: 8px;
  flex-shrink: 0;
}

.legend-label {
  font-size: 13px;
  color: #333;
}

.btn-group {
  display: flex;
  gap: 10px;
}
</style>
