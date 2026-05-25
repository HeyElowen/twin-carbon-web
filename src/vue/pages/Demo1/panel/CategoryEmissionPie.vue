<template>
  <Chart ref="chartRef" :use="chartModules" :option="chartOptionRef" />
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import Chart from "@/vue/components/Chart.vue";
import { PieChart } from "echarts/charts";
import { LegendComponent, TooltipComponent } from "echarts/components";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getCategoryRatio } from "@/api/monitoring";

const store = useConfigStore();
const chartRef = ref(null);

// 从后端获取的原始数据
const rawData = ref([]);

const colorMap = {
  工业区: "#3b82f6",
  商业区: "#60a5fa",
  住宅区: "#8b5cf6",
  农业区: "#fbbf24",
  教育区: "#34d399",
};

const order = ["工业区", "商业区", "住宅区", "农业区", "教育区"];

// 请求饼图数据
async function fetchData() {
  try {
    const res = await getCategoryRatio(store.year, store.quarter);
    rawData.value = res.data || [];
  } catch {
    rawData.value = [];
  }
}

// 初始化请求
fetchData();

// year / quarter 变化时重新请求数据
watch([() => store.year, () => store.quarter], fetchData);

// 格式化后的饼图数据（包含 itemStyle）
const pieDataBase = computed(() => {
  const raw = rawData.value;
  const result = [];
  order.forEach((name) => {
    const item = raw.find((r) => r.name === name);
    if (item) {
      const c = colorMap[name];
      result.push({
        value: item.value,
        name: item.name,
        itemStyle: {
          borderRadius: 8,
          shadowBlur: 16,
          color: c,
          shadowColor: c,
        },
      });
      result.push({
        value: 2,
        name: "",
        itemStyle: { color: "rgba(0, 0, 0, 0)", borderColor: "rgba(0, 0, 0, 0)", borderWidth: 0 },
      });
    }
  });
  return result;
});

const legendData = computed(() => {
  return order.filter((name) => pieDataBase.value.some((d) => d.name === name));
});

function applyOpacity(data, selected) {
  return data.map((item) => {
    if (!item.name) return item;
    const isDimmed = selected && selected !== item.name;
    return {
      ...item,
      itemStyle: {
        ...item.itemStyle,
        opacity: isDimmed ? 0.25 : 1,
        shadowBlur: isDimmed ? 0 : 16,
      },
    };
  });
}

function buildOption(data, selected) {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
      textStyle: { color: "rgba(224, 230, 240, 0.9)" },
      backgroundColor: "rgba(15, 20, 32, 0.85)",
      borderColor: "#3b82f6",
      borderWidth: 1,
      borderRadius: 8,
    },
    legend: {
      icon: "circle",
      orient: "vertical",
      data: legendData.value,
      top: "middle",
      right: "10%",
      textStyle: { color: "rgba(224, 230, 240, 0.8)" },
      itemGap: 20,
      selectedMode: false,
    },
    series: {
      name: "碳排放占比",
      type: "pie",
      center: ["30%", "50%"],
      radius: ["45%", "60%"],
      label: { show: false },
      labelLine: { show: false },
      data: applyOpacity(data, selected),
      animationDuration: 400,
      animationDurationUpdate: 400,
    },
  };
}

// 用 ref 持有 option，避免 selectedCategory 变化时触发 Chart.vue 的 watch
const chartOptionRef = ref(buildOption([], store.selectedCategory));

// 数据变化时更新整个 option（走 Chart.vue 的正常 setOption）
watch(pieDataBase, (data) => {
  chartOptionRef.value = buildOption(data, store.selectedCategory);
}, { immediate: true });

// selectedCategory 变化时直接操作 ECharts 实例，只更新 itemStyle，不重绘整个饼图
watch(() => store.selectedCategory, (selected) => {
  const inst = chartRef.value?.chartInstance;
  if (!inst) return;

  inst.setOption(
    {
      series: [
        {
          data: applyOpacity(pieDataBase.value, selected),
        },
      ],
    },
    {
      notMerge: false,
      replaceMerge: [],
      animationDuration: 300,
      animationDurationUpdate: 300,
    }
  );
});

const chartModules = [PieChart, TooltipComponent, LegendComponent];

// 绑定饼图 click 事件
function bindClick(inst) {
  inst.off("click");
  inst.on("click", (params) => {
    if (params.name && colorMap[params.name]) {
      store.setSelectedCategory(params.name);
    }
  });
}

onMounted(() => {
  const tryBind = () => {
    const inst = chartRef.value?.chartInstance;
    if (inst) {
      bindClick(inst);
    } else {
      setTimeout(tryBind, 100);
    }
  };
  tryBind();
});
</script>
