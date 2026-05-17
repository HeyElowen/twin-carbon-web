# ECharts 使用手册 — 图表类型篇

> 来源：Apache ECharts 官方使用手册（https://echarts.apache.org/handbook/zh/）
> 整理时间：2026-05-17
> 用途：开发参考，可按需加载到上下文中

---



Title: 基础柱状图 - 柱状图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/bar/basic-bar

柱状图 
基础柱状图
堆叠柱状图
动态排序柱状图
阶梯瀑布图
折线图 
饼图 
散点图 
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};


在这个例子中，横坐标是类目型的，因此需要在 xAxis 中指定对应的值；而纵坐标是数值型的，可以根据 series 中的 data，自动生成对应的坐标范围。

多系列的柱状图

我们可以用一个系列表示一组相关的数据，如果需要实现多系列的柱状图，只需要在 series 多添加一项就可以了——

option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    },
    {
      type: 'bar',
      data: [26, 24, 18, 22, 23, 20, 27]
    }
  ]
};

柱状图样式设置
柱条样式

柱条的样式可以通过 series.itemStyle 设置，包括：

柱条的颜色（color）；
柱条的描边颜色（borderColor）、宽度（borderWidth）、样式（borderType）；
柱条圆角的半径（barBorderRadius）；
柱条透明度（opacity）；
阴影（shadowBlur、shadowColor、shadowOffsetX、shadowOffsetY）。
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [
        10,
        22,
        28,
        {
          value: 43,
          // 设置单个柱子的样式
          itemStyle: {
            color: '#91cc75',
            shadowColor: '#91cc75',
            borderType: 'dashed',
            opacity: 0.5
          }
        },
        49
      ],
      itemStyle: {
        barBorderRadius: 5,
        borderWidth: 1,
        borderType: 'solid',
        borderColor: '#73c0de',
        shadowColor: '#5470c6',
        shadowBlur: 3
      }
    }
  ]
};


在这个例子中，我们通过设置柱状图对应 series 的itemStyle，设置了柱条的样式。完整的配置项及其用法请参见配置项手册 series.itemStyle。

柱条宽度和高度

柱条宽度可以通过 barWidth 设置。比如在下面的例子中，将 barWidth 设为 '20%'，表示每个柱条的宽度就是类目宽度的 20%。由于这个例子中，每个系列有 5 个数据，20% 的类目宽度也就是整个 x 轴宽度的 4%。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [10, 22, 28, 43, 49],
      barWidth: '20%'
    }
  ]
};


另外，还可以设置 barMaxWidth 限制柱条的最大宽度。对于一些特别小的数据，我们也可以为柱条指定最小高度 barMinHeight，当数据对应的柱条高度小于该值时，柱条高度将采用这个最小高度。

柱条间距

柱条间距分为两种，一种是不同系列在同一类目下的距离 barGap，另一种是类目与类目的距离 barCategoryGap。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 18],
      barGap: '20%',
      barCategoryGap: '40%'
    },
    {
      type: 'bar',
      data: [12, 14, 9, 9, 11]
    }
  ]
};


在这个例子中，barGap 被设为 '20%'，这意味着每个类目（比如 A）下的两个柱子之间的距离，相对于柱条宽度的百分比。而 barCategoryGap 是 '40%'，意味着柱条每侧空余的距离，相对于柱条宽度的百分比。

通常而言，设置 barGap 及 barCategoryGap 后，就不需要设置 barWidth 了，这时候的宽度会自动调整。如果有需要的话，可以设置 barMaxWidth 作为柱条宽度的上限，当图表宽度很大的时候，柱条宽度也不会太宽。

在同一坐标系上，此属性会被多个柱状图系列共享。此属性应设置于此坐标系中最后一个柱状图系列上才会生效，并且是对此坐标系中所有柱状图系列生效。

为柱条添加背景色

有时，我们希望能够为柱条添加背景色。从 ECharts 4.7.0 版本开始，这一功能可以简单地用 showBackground 开启，并且可以通过 backgroundStyle 配置。

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)'
      }
    }
  ]
};

---


Title: 堆叠柱状图 - 柱状图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/bar/stacked-bar

柱状图 
基础柱状图
堆叠柱状图
动态排序柱状图
阶梯瀑布图
折线图 
饼图 
散点图 
堆叠柱状图

有时候，我们不仅希望知道不同系列各自的数值，还希望知道它们之和的变化，这时候通常使用堆叠柱状图来表现。顾名思义，堆叠柱状图就是一个系列的数值“堆叠”在另一个系列上，因而从他们的高度总和就能表达总量的变化。

使用 EChart 实现堆叠柱状图的方法非常简单，只需要给一个系列的 stack 值设置一个字符串类型的值，这一个值表示该系列堆叠的类别。也就是说，拥有同样 stack 值的系列将堆叠在一组。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'bar',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'bar',
      stack: 'x'
    }
  ]
};


在这个例子中，第二个系列所在的位置是在第一个系列的位置的基础上，上升了第二个系列数值对应的高度。因此，从第二个系列的位置，就能看出这两者总和的变化趋势。

stack 的取值用来表明哪些系列将被堆叠在一起，理论上只要取值相同即可，具体的取值并没有什么区别。但在实际的应用中，我们建议使用一些有意义的字符串方便阅读。

比如，在一个统计男女人数的图中，有四个系列，“成年男性”和“男孩”系列需要进行堆叠，“成年女性”和“女孩”系列需要堆叠。这时，这两组的的 stack 值就建议分别设为 '男' 和 '女'。虽然使用 'a' 和 'b' 这样没有意义的字符串也能实现同样的效果，但是代码的可阅读性就差了。

---


Title: 动态排序柱状图 - 柱状图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/bar/bar-race

柱状图 
基础柱状图
堆叠柱状图
动态排序柱状图
阶梯瀑布图
折线图 
饼图 
散点图 
animationDuration 设为 0，表示第一份数据不需要从 0 开始动画（如果希望从 0 开始则设为和 animationDurationUpdate 相同的值）
animationDurationUpdate 建议设为 3000 表示每次更新动画时长，这一数值应与调用 setOption 改变数据的频率相同
以 animationDurationUpdate 的频率调用 setInterval，更新数据值，显示下一个时间点对应的柱条排序

完整的例子如下：

var data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}

option = {
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 2 // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 3000,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

function update() {
  var data = option.series[0].data;
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  myChart.setOption(option);
}

setInterval(function() {
  update();
}, 3000);

---


Title: 阶梯瀑布图 - 柱状图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/bar/waterfall

柱状图 
基础柱状图
堆叠柱状图
动态排序柱状图
阶梯瀑布图
折线图 
饼图 
散点图 
阶梯瀑布图

Apache ECharts 中并没有单独的瀑布图类型，但是我们可以使用堆叠的柱状图模拟该效果。

假设数据数组中的值是表示对前一个值的增减：

var data = [900, 345, 393, -108, -154, 135, 178, 286, -119, -361, -203];

也就是第一个数据是 900，第二个数据 345 表示的是在 900 的基础上增加了 345……将这个数据展示为阶梯瀑布图时，我们可以使用三个系列：第一个是不可交互的透明系列，用来实现“悬空”的柱状图效果；第二个系列用来表示正数；第三个系列用来表示负数。

var data = [900, 345, 393, -108, -154, 135, 178, 286, -119, -361, -203];
var help = [];
var positive = [];
var negative = [];
for (var i = 0, sum = 0; i < data.length; ++i) {
  if (data[i] >= 0) {
    positive.push(data[i]);
    negative.push('-');
  } else {
    positive.push('-');
    negative.push(-data[i]);
  }

  if (i === 0) {
    help.push(0);
  } else {
    sum += data[i - 1];
    if (data[i] < 0) {
      help.push(sum + data[i]);
    } else {
      help.push(sum);
    }
  }
}

option = {
  title: {
    text: 'Waterfall'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: { show: false },
    data: (function() {
      var list = [];
      for (var i = 1; i <= 11; i++) {
        list.push('Oct/' + i);
      }
      return list;
    })()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'bar',
      stack: 'all',
      itemStyle: {
        normal: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)'
        },
        emphasis: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)'
        }
      },
      data: help
    },
    {
      name: 'positive',
      type: 'bar',
      stack: 'all',
      data: positive
    },
    {
      name: 'negative',
      type: 'bar',
      stack: 'all',
      data: negative,
      itemStyle: {
        color: '#f33'
      }
    }
  ]
};

---


Title: 基础折线图 - 折线图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/line/basic-line

柱状图 
折线图 
基础折线图
堆叠折线图
区域面积图
平滑曲线图
阶梯线图
饼图 
散点图 
option = {
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150],
      type: 'line'
    }
  ]
};


在这个例子中，我们通过 xAxis 将横坐标设为类目型，并指定了对应的值；通过 type 将 yAxis 的类型设定为数值型。在 series 中，我们将系列类型设为 line，并且通过 data 指定了折线图三个点的取值。这样，就能得到一个最简单的折线图了。

这里 xAxis 和 yAxis 的 type 属性都可以隐去不写。因为坐标轴的默认类型是数值型，而 xAxis 指定了类目型的 data，所以 ECharts 也能识别出这是类目型的坐标轴。为了让大家更容易理解，我们特意写了 type。在实际的应用中，如果是 'value' 类型，也可以省略不写。

笛卡尔坐标系中的折线图

如果我们希望折线图在横坐标和纵坐标上都是连续的，即在笛卡尔坐标系中，应该如何实现呢？答案也很简单，只要把 series 的 data 每个数据用一个包含两个元素的数组表示就行了。

option = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      data: [
        [20, 120],
        [50, 200],
        [40, 50]
      ],
      type: 'line'
    }
  ]
};

折线图样式设置
折线的样式

折线图中折线的样式可以通过 lineStyle 设置。可以为其指定颜色、线宽、折线类型、阴影、不透明度等等，具体的可以参考配置项手册 series.lineStyle 了解。这里，我们以设置颜色（color）、线宽（width）和折线类型（type）为例说明。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      lineStyle: {
        normal: {
          color: 'green',
          width: 4,
          type: 'dashed'
        }
      }
    }
  ]
};


这里设置折线宽度时，数据点描边的宽度是不会跟着改变的，而应该在数据点的配置项中另外设置。

数据点的样式

数据点的样式可以通过 series.itemStyle 指定填充颜色（color）、描边颜色（borderColor）、描边宽度（borderWidth）、描边类型（borderType）、阴影（shadowColor）、不透明度（opacity）等。与折线样式的设置十分相似，这里不再展开说明。

在数据点处显示数值

在系列中，这数据点的标签通过 series.label 属性指定。如果将 label 下的 show 指定为true，则表示该数值默认时就显示；如果为 false，而 series.emphasis.label.show 为 true，则表示只有在鼠标移动到该数据时，才显示数值。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      label: {
        show: true,
        position: 'bottom',
        textStyle: {
          fontSize: 20
        }
      }
    }
  ]
};

空数据

在一个系列中，可能一个横坐标对应的取值是“空”的，将其设为 0 有时并不能满足我们的期望--空数据不应被其左右的数据连接。

在 ECharts 中，我们使用字符串 '-' 表示空数据，这对其他系列的数据也是适用的。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [0, 22, '-', 23, 19],
      type: 'line'
    }
  ]
};


注意区别这个例子中，“空”数据与取值为 0 的数据。

---


Title: 堆叠折线图 - 折线图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/line/stacked-line

柱状图 
折线图 
基础折线图
堆叠折线图
区域面积图
平滑曲线图
阶梯线图
饼图 
散点图 
堆叠折线图

与堆叠柱状图类似，堆叠折线图也是用系列的 stack 设置哪些系列堆叠在一起。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x'
    }
  ]
};


但是不同的是，如果不加说明的话，我们很难判断出这是一个堆叠折线图，还是一个普通的折线图。所以，对于堆叠折线图而言，一般建议使用区域填充色以表明堆叠的情况。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x',
      areaStyle: {}
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x',
      areaStyle: {}
    }
  ]
};

---


Title: 区域面积图 - 折线图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/line/area-line

柱状图 
折线图 
基础折线图
堆叠折线图
区域面积图
平滑曲线图
阶梯线图
饼图 
散点图 
区域面积图

区域面积图将折线到坐标轴的空间设置背景色，用区域面积表达数据。相比普通的折线图，区域面积图的视觉效果更加饱满丰富，在系列不多的场景下尤其适用。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      areaStyle: {}
    },
    {
      data: [25, 14, 23, 35, 10],
      type: 'line',
      areaStyle: {
        color: '#ff0',
        opacity: 0.5
      }
    }
  ]
};


通过 areaStyle 设置折线图的填充区域样式，将其设为为 {} 表示使用默认样式，即使用系列的颜色以半透明的方式填充区域。如果想指定特定的样式，可以通过设置 areaStyle 下的配置项覆盖，如第二个系列将填充区域的颜色设为不透明度为 0.5 的黄色。

---


Title: 平滑曲线图 - 折线图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/line/smooth-line

柱状图 
折线图 
基础折线图
堆叠折线图
区域面积图
平滑曲线图
阶梯线图
饼图 
散点图 
平滑曲线图

平滑曲线图也是折线图的一种变形，这种更柔和的样式也是一种不错的视觉选择。使用时，只需要将折线图系列的 smooth 属性设置为 true 即可。

option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      smooth: true
    }
  ]
};

---


Title: 阶梯线图 - 折线图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/line/step-line

柱状图 
折线图 
基础折线图
堆叠折线图
区域面积图
平滑曲线图
阶梯线图
饼图 
散点图 
阶梯线图

阶梯线图又称方波图，它使用水平和垂直的线来连接两个数据点，而普通折线图则直接将两个点连接起来。阶梯线图能够很好地表达数据的突变。

在 ECharts 中，系列的 step 属性用来表征阶梯线图的连接类型，它共有三种取值：'start'、'middle' 和 'end'，分别表示在当前点，当前点与下个点的中间点，下个点拐弯。

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Step Start',
      type: 'line',
      step: 'start',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Step Middle',
      type: 'line',
      step: 'middle',
      data: [220, 282, 201, 234, 290, 430, 410]
    },
    {
      name: 'Step End',
      type: 'line',
      step: 'end',
      data: [450, 432, 401, 454, 590, 530, 510]
    }
  ]
};


请注意这个例子中不同的 step 取值对应的数据点和连线的区别。

---


Title: 基础饼图 - 饼图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/pie/basic-pie

柱状图 
折线图 
饼图 
基础饼图
圆环图
南丁格尔图（玫瑰图）
散点图 
option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: '直接访问'
        },
        {
          value: 234,
          name: '联盟广告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ]
    }
  ]
};


需要注意的是，这里是 value 不需要是百分比数据，ECharts 会根据所有数据的 value ，按比例分配它们在饼图中对应的弧度。

饼图样式设置
饼图的半径

饼图的半径可以通过 series.radius 设置，可以是诸如 '60%' 这样相对的百分比字符串，或是 200 这样的绝对像素数值。当它是百分比字符串时，它是相对于容器宽高中较小的一条边的。也就是说，如果宽度大于高度，则百分比是相对于高度的，反之则反；当它是数值型时，它表示绝对的像素大小。

option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: '直接访问'
        },
        {
          value: 234,
          name: '联盟广告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ],
      radius: '50%'
    }
  ]
};

如果数据和为 0，不显示饼图

在默认情况下，如果数据值和为 0，会显示平均分割的扇形。比如，如果有 4 个数据项，并且每个数据项都是 0，则每个扇形都是 90°。如果我们希望在这种情况下不显示任何扇形，可以将 series.stillShowZeroSum 设为 false。

option = {
  series: [
    {
      type: 'pie',
      stillShowZeroSum: false,
      data: [
        {
          value: 0,
          name: '直接访问'
        },
        {
          value: 0,
          name: '联盟广告'
        },
        {
          value: 0,
          name: '搜索引擎'
        }
      ]
    }
  ]
};


如果希望扇形对应的标签也不显示，可以将 series.label.show 设为 false。

option = {
  series: [
    {
      type: 'pie',
      stillShowZeroSum: false,
      label: {
        show: false
      },
      data: [
        {
          value: 0,
          name: '直接访问'
        },
        {
          value: 0,
          name: '联盟广告'
        },
        {
          value: 0,
          name: '搜索引擎'
        }
      ]
    }
  ]
};

---


Title: 圆环图 - 饼图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/pie/doughnut

柱状图 
折线图 
饼图 
基础饼图
圆环图
南丁格尔图（玫瑰图）
散点图 
圆环图同样可以用来表示数据占总体的比例，相比于饼图，它中间空余的部分可以用来显示一些额外的文字等信息，因而也是一种常用的图表类型。

基础圆环图

在 ECharts 中，饼图的半径除了上一小节提到的，可以是一个数值或者字符串之外，还可以是一个包含两个元素的数组，每个元素可以为数值或字符串。当它是一个数组时，它的前一项表示内半径，后一项表示外半径，这样就形成了一个圆环图。

从这个角度上来说，可以认为饼图是一个内半径为 0 的圆环图，也就是说，饼图是圆环图的特例。

option = {
  title: {
    text: '圆环图的例子',
    left: 'center',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'A'
        },
        {
          value: 234,
          name: 'B'
        },
        {
          value: 1548,
          name: 'C'
        }
      ],
      radius: ['40%', '70%']
    }
  ]
};


如果半径是数组，其中的两项也可以一项是数值，另一项是百分比形式的字符串。但是这样可能导致在某些分辨率下，内半径小于外半径。ECharts 会自动使用小的一项作为内半径，但是仍应小心这样可能会导致的非预期效果。

在圆环图中间显示高亮扇形对应的文字

上面的例子展现了在圆环图中间显示固定文字的例子，下面我们要介绍，如何在圆环图中间显示鼠标高亮的扇形对应的文字。实现这一效果的思路是，利用系列的 label（默认用扇形颜色显示数据的 name），显示在圆环图中间。在默认情况下不显示系列的 label，在高亮时显示。具体的代码如下：

option = {
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['A', 'B', 'C', 'D', 'E']
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      data: [
        { value: 335, name: 'A' },
        { value: 310, name: 'B' },
        { value: 234, name: 'C' },
        { value: 135, name: 'D' },
        { value: 1548, name: 'E' }
      ]
    }
  ]
};


其中，avoidLabelOverlap 是用来控制是否由 ECharts 调整标签位置以实现防止标签重叠。它的默认值是 true，而在这里，我们不希望标签位置调整到不是中间的位置，因此我们需要将其设为 false。

这样，圆环图中间会显示高亮数据的 name 值。

---


Title: 南丁格尔图（玫瑰图） - 饼图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/pie/rose

柱状图 
折线图 
饼图 
基础饼图
圆环图
南丁格尔图（玫瑰图）
散点图 
南丁格尔图（玫瑰图）

南丁格尔图又称玫瑰图，通常用弧度相同但半径不同的扇形表示各个类目。

ECharts 可以通过将饼图的 series.roseType 值设为 'area' 实现南丁格尔图，其他配置项和饼图是相同的。

option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 100,
          name: 'A'
        },
        {
          value: 200,
          name: 'B'
        },
        {
          value: 300,
          name: 'C'
        },
        {
          value: 400,
          name: 'D'
        },
        {
          value: 500,
          name: 'E'
        }
      ],
      roseType: 'area'
    }
  ]
};

---


Title: 基础散点图 - 散点图 - 常用图表类型 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/chart-types/scatter/basic-scatter

柱状图 
折线图 
饼图 
散点图 
基础散点图
散点图，也是一种常见的图表类型。散点图由许多“点”组成，有时，这些点用来表示数据在坐标系中的位置（比如在笛卡尔坐标系下，表示数据在 x 轴和 y 轴上的坐标；在地图坐标系下，表示数据在地图上的某个位置等）；有时，这些点的大小、颜色等属性也可以映射到数据值，用以表现高维数据。

最简单的散点图

下面是一个横坐标为类目轴、纵坐标为数值轴的最简单的散点图配置：

option = {
  xAxis: {
    data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  yAxis: {},
  series: [
    {
      type: 'scatter',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
};

笛卡尔坐标系下的散点图

在上文的例子中，散点图的横坐标都是离散的类目轴，而纵坐标都是连续的数值轴。而对于散点图而言，另一种常见的场景是，两个坐标轴均为连续的数值轴，也就是笛卡尔坐标系。这时的系列形式略有不同，数据的横坐标和纵坐标一同写在 data 中，而非坐标轴中。

option = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      type: 'scatter',
      data: [
        [10, 5],
        [0, 8],
        [6, 10],
        [2, 12],
        [8, 9]
      ]
    }
  ]
};

散点图样式设置
图形的形状

图形（symbol）指的是散点图中数据“点”的形状。有三类图形可选，一种是 ECharts 内置形状，第二种是图片，第三种是 SVG 的路径。

ECharts 内置形状包括：圆形、矩形、圆角矩形、三角形、菱形、大头针形、箭头形，分别对应'circle'、'rect'、'roundRect'、'triangle'、'diamond'、'pin'、'arrow'。使用内置形状时，只要将 symbol 属性指定为形状名称对应的字符串即可。

如果想要将图形指定为任意的图片，以 'image://' 开头，后面跟图片的绝对或相对地址。形如：'image://http://example.com/xxx.png' 或 'image://./xxx.png'。

除此之外，还支持 SVG 的路径作为矢量图形，将 symbol 设置为以 'path://' 开头的 SVG 路径即可。使用矢量图形的好处是，图片不会因为缩放而产生锯齿或模糊，并且通常而言比图片形式的文件大小更小。路径的查看方法为，打开一个 SVG 文件，找到形如 <path d="M… L…"></path> 的路径，将 d 的值添加在 'path://' 后即可。

下面，我们展示一个将图形设置为矢量爱心形状的方式。

首先，我们需要一个爱心的 SVG 文件，可以使用矢量编辑软件绘制，或者从网上下载到相关资源。其内容如下：

<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 51.997 51.997" style="enable-background:new 0 0 51.997 51.997;" xml:space="preserve">
    <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z"/>
</svg>

在 ECharts 的 symbol 配置项中，我们使用 d 的值作为路径。

option = {
  xAxis: {
    data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  yAxis: {},
  series: [
    {
      type: 'scatter',
      data: [220, 182, 191, 234, 290, 330, 310],
      symbolSize: 20,
      symbol:
        'path://M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z'
    }
  ]
};


这样，就能得到爱心形状的图形作为点的形状了。

图形的大小

图形大小可以使用 series.symbolSize 控制。它既可以是一个表示图形大小的像素值，也可以是一个包含两个 number 元素的数组，分别表示图形的宽和高。

除此之外，它还可以是一个回调函数，其参数格式为：

(value: Array | number, params: Object) => number | Array;

第一个参数为数据值，第二个参数是数据项的其他参数。

在下面的例子中，我们将散点图点的大小设置为与其数据值成正比。

option = {
  xAxis: {
    data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  yAxis: {},
  series: [
    {
      type: 'scatter',
      data: [220, 182, 191, 234, 290, 330, 310],
      symbolSize: function(value) {
        return value / 10;
      }
    }
  ]
};

---


Title: 自定义系列 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/custom-series

自定义系列可以自定义系列中的图形元素渲染，从而能扩展出不同的图表。本文将介绍使用如何开发或使用自定义系列，更详细的内容参见配置项手册。

可注册式自定义系列（新）

从 Apache ECharts v6.0.0 版本起，我们支持了可注册的自定义系列，并且在 echarts-custom-series 中提供了多个可直接通过 NPM 安装的自定义系列。

你可以直接使用该项目中的自定义系列开发图表，或者使用其他人发布的自定义系列，或者自己开发自定义系列（后文将会详细介绍）并通过类似的方式使用。首先，让我们来了解一下最简单的方式——使用官方发布的自定义系列。

使用已发布的自定义系列

下面，我们以范围柱状图为例，介绍如何使用已发布的自定义系列。

范围柱状图的文档在 echarts-custom-series/custom-series/barRange，其中有详细的介绍、API 和示例。

简单来说，我们在使用已发布的自定义系列的时候，首先需要通过 npm install @echarts-x/custom-bar-range 之类的命令下载，然后根据开发环境，选择使用的方式。

例如，你在网页环境中使用，并且没有额外的打包工具，那么最简单的方式是：

<script src="./node_modules/echarts/dist/echarts.js"></script>
<script src="./node_modules/@echarts-x/custom-bar-range/dist/bar-range.auto.js"></script>
<script>
  // 无需调用 echarts.use()，已经自动注册过了
  const chart = echarts.init(...);
  const option = {
    series: [{
      type: 'custom',
      renderItem: 'barRange',
      data: [
        [0, 26.7, 32.5],
        [1, 25.3, 32.4],
        [2, 24.6, 32.7],
        [3, 26.8, 35.8],
        [4, 26.2, 33.1],
        [5, 24.9, 31.4],
        [6, 25.3, 32.9]
      ],
      itemPayload: {
        barWidth: 10,
        borderRadius: 5,
      },
      encode: {
        x: 0,
        y: [1, 2],
        tooltip: [1, 2],
      }
    }]
  };
  chart.setOption(option);
</script>

bar-range.auto.js 中的 auto 指的是加载它的时候自动会将自定义系列注册到 echarts 全局变量上，无需开发者手动注册，只需要在 setOption 的时候通过 type: 'custom' 指定使用自定义系列，并通过 renderItem: 'barRange' 指定使用的自定义系列名称即可。

你通常需要通过 itemPayload 把参数传递给自定义系列。你可以在每个自定义系列的 README 中找到它可配置的参数。

需要注意的是，通常你需要配置 encode 来指定数据映射。你可以在 README 和示例中找到每个自定义系列推荐的使用方式。

开发自己的自定义系列

你可以参考 echarts-custom-series 的源码来了解如何开发自定义系列。推荐 fork 该项目并通过 npm run generate xxx 来生成新的自定义系列框架，并且还提供了编译、文档、示例等脚手架，可以帮助你快速开发新的自定义系列。

主要的开发内容是实现一个 renderItem，文档参见 配置项手册。

如果你开发了一个通用的自定义系列，建议通过 Pull Request 将其提交，从而让更多开发者也可以使用。

非注册式自定义系列

如果你开发的自定义系列是不需要复用的，你也可以直接在 renderItem 中实现自定义系列的渲染算法。你可以在官网自定义系列示例找到很多例子，并在此基础上进行开发。

---
