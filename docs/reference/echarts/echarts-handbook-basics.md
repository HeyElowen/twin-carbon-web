# ECharts 使用手册 — 入门基础篇

> 来源：Apache ECharts 官方使用手册（https://echarts.apache.org/handbook/zh/）
> 整理时间：2026-05-17
> 用途：开发参考，可按需加载到上下文中

---



Title: 快速上手 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/get-started

Apache ECharts 支持多种下载方式，可以在下一篇教程安装中查看所有方式。这里，我们以从 jsDelivr CDN 上获取为例，介绍如何快速安装。

在 https://www.jsdelivr.com/package/npm/echarts 选择 dist/echarts.js，点击并保存为 echarts.js 文件。

关于这些文件的介绍，可以在下一篇教程安装中了解更多信息。

引入 Apache ECharts

在刚才保存 echarts.js 的目录新建一个 index.html 文件，内容如下：

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- 引入刚刚下载的 ECharts 文件 -->
    <script src="echarts.js"></script>
  </head>
</html>

打开这个 index.html，你会看到一片空白。但是不要担心，打开控制台确认没有报错信息，就可以进行下一步。

绘制一个简单的图表

在绘图前我们需要为 ECharts 准备一个定义了高宽的 DOM 容器。在刚才的例子 </head> 之后，添加：

<body>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div id="main" style="width: 600px;height:400px;"></div>
</body>

然后就可以通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图，下面是完整代码。

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ECharts</title>
    <!-- 引入刚刚下载的 ECharts 文件 -->
    <script src="echarts.js"></script>
  </head>
  <body>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    </script>
  </body>
</html>

这样你的第一个图表就诞生了！

---


Title: 获取 ECharts - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/download

npm install echarts

详见在项目中引入 Apache ECharts。

从 CDN 获取

可以从以下免费 CDN 中获取和引用 ECharts。

jsDelivr
unpkg
cdnjs
从 GitHub 获取

apache/echarts 项目的 release 页面可以找到各个版本的链接。点击下载页面下方 Assets 中的 Source code，解压后 dist 目录下的 echarts.js 即为包含完整 ECharts 功能的文件。

在线定制

如果只想引入部分模块以减少包体积，可以使用 ECharts 在线定制功能。

---


Title: 在项目中引入 ECharts - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/import

假如你的开发环境使用了 npm 或者 yarn 等包管理工具，并且使用 webpack 等打包工具进行构建，本文将会介绍如何引入 Apache EChartsTM 并通过 tree-shaking 特性只打包需要的模块以减少包体积。

NPM 安装 ECharts

你可以使用如下命令通过 npm 安装 ECharts

npm install echarts --save
引入 ECharts
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
按需引入 ECharts 图表和组件

上面的代码会引入 ECharts 中所有的图表和组件，如果你不想引入所有组件，也可以使用 ECharts 提供的按需引入的接口来打包必须的组件。

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

// 接下来的使用就跟之前一样，初始化图表，设置配置项
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  // ...
});

需要注意的是为了保证打包的体积是最小的，ECharts 按需引入的时候不再提供任何渲染器，所以需要选择引入 CanvasRenderer 或者 SVGRenderer 作为渲染器。这样的好处是假如你只需要使用 svg 渲染模式，打包的结果中就不会再包含无需使用的 CanvasRenderer 模块。

我们在示例编辑页的“完整代码”标签提供了非常方便的生成按需引入代码的功能。这个功能会根据当前的配置项动态生成最小的按需引入的代码。你可以直接在你的项目中使用。

v5.5.0 版本开始使用 ESM 作为默认的模块规范，查看可能的 Breaking Changes 以及 Pull Request。

在 TypeScript 中按需引入

对于使用了 TypeScript 来开发 ECharts 的开发者，我们提供了类型接口来组合出最小的 EChartsOption 类型。这个更严格的类型可以有效帮助你检查出是否少加载了组件或者图表。

import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components';
import type {
  ComposeOption,
} from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const option: ECOption = {
  // ...
};

---


Title: 寻求帮助 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/help

ECharts 有非常大量的用户，所以你遇到过的问题很可能别人在此之前也遇到并解决了。通过查看文档以及使用搜索引擎搜索关键字，可以帮助你自助地在第一时间解决问题，而不需要依赖社区的帮助。

因此，在做其他操作前，请确保现有文档等资料无法解决你的问题。可以尝试查看或搜索的资料包括：

API
配置项手册：可以尝试使用搜索功能
本手册的文章
常见问题
在 GitHub issue 中搜索关键字
使用搜索引擎搜索关键字
创建一个最简单可复现的例子

使用官方编辑器、CodePen、CodeSandbox 或 JSFiddle 创建一个例子，这将使得他人更方便地复现你的问题。

例子应尽可能以最简单的方式复现你的问题，去除不必要的配置项和数据，可以让帮助你的人更快速地定位问题，从而让你的问题更快得到解决。更详细的介绍请参见 如何创建一个最小的可复现代码示例。

判断是否是 bug
报告 bug 或请求新功能

如果不符合文档描述或你的预期效果，这很有可能是 bug。如果是 bug，或者你有一个想请求实现的功能，请使用 issue 模板 新建一个 issue 并按照提示详细描述。

咨询类问题

如果不是 bug，而是不知道如何实现某种效果，可以尝试在 stackoverflow.com、开源中国 或 SegmentFault 思否 等问答平台上提问。

如果没能得到答复，也可以发送邮件至邮件组 dev@echarts.apache.org。为了让更多人理解你的问题，并且在将来搜索的时候得到帮助，强烈建议使用英文发送邮件。

非技术类问题

其他问题可以发送英文邮件至邮件组 dev@echarts.apache.org。

---


Title: ECharts 6 特性介绍 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/v6-feature

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
从最初的图表工具，到如今成长为支撑百万级开发者的可视化巨擘；从单一的前端图表库，演进为支持移动端、大屏、服务端渲染等全场景的技术体系。这 12 年间，我们见证了 ECharts 在技术方面的持续突破，更欣喜地看到全球开发者用 ECharts 创造出无数惊艳的数据故事。

现在，Apache ECharts 6.0 正式发布，我们呈上诚意满满的 12 项升级，只为百尺竿头，更进一步。

功能概览

12 年的沉淀，只为更极致的可视化表达。Apache ECharts 的核心力量，始终源于对开发者真实挑战的深刻理解。当我们为 6.0 定义方向时，问题很清晰：如何让复杂数据的呈现既足够强大，又足够优雅？

这驱使我们围绕三个核心维度进行深度进化：

更专业的可视化呈现：从精心打磨的默认主题，到响应系统深色的智能切换，确保图表具备专业质感，无缝融入现代应用体验。

拓展数据表达的边界：新增更多图表类型与功能，构建完整复杂场景应对体系，实现深度数据的直觉化表达。

释放组合编排的自由：从革命性的矩阵坐标系，到可复用的自定义系列生态，再到坐标轴标签优化——赋予开发者更自由编排的能力，将创意映射为无拘束的可视化作品。

我们在这三个核心维度上做了 12 项升级。这些升级并非简单的功能叠加，而是为构建下一代数据驱动应用，铺设的坚实能力基座。它们共同指向一个目标：让 ECharts 强大、可靠、稳定地服务于后台，把舞台和聚光灯留给你的创造性表达。

下文将针对这十二项升级分别展开介绍：

更专业的可视化呈现
1. 全新默认主题：采用更符合现代审美的设计语言，以专业设计赋能数据表达
2. 动态主题切换：支持运行时无缝切换主题，适配多主题场景
3. 深色模式响应：自动适配系统深色/浅色模式，提升用户体验
拓展数据表达的边界
4. 新增和弦图：拓展复杂关系与分布数据的呈现方式
5. 新增蜂群图：通过动态分布算法，将重叠数据点智能展开为蜂窝状排列
6. 新增抖动散点图：通过增加散点图分布范围，增强高密度数据的可读性
7. 新增断轴：表达数据断层，轻松呈现量级悬殊的数据对比
8. 升级股市交易类图表：增强标签能力，更多开箱即用的交易类图表
释放组合编排的自由
9. 新增矩阵坐标系：各种图表类型和组件像表格一样自由组合，灵活布局
10. 升级自定义系列：支持 npm 发布与动态注册使用，实现自定义系列代码复用
11. 新增多款自定义图表：小提琴图、轮廓图、阶段图、范围柱状图、范围折线图
12. 坐标轴标签优化：新版智能优化坐标标签布局，默认防溢出防重叠

我们希望通过 Apache ECharts 6.0 的全新升级，帮助用户更灵活方便地创建更多图表，实现真正的“前图无量”！

功能介绍
1. 全新默认主题

在 ECharts 6.0 的开发过程中，我们深入分析了用户的真实使用场景，发现超过七成的开发者直接采用默认主题。这让我们意识到：一个优秀的默认主题不仅要具备美学价值，更要符合各个业务场景的通用需求。

新版主题系统内部使用了设计令牌（design token）对颜色、距离等设计元素进行重构，使得不同图表类型和组件之间更和谐一致。

虽然 6.0 的主题在 5.x 版本上有非常大的调整，但是我们提供了一个 v5.js 主题文件，对于希望使用新版本功能但保留原有样式的开发者，可以实现快速迁移。

2. 动态主题切换

在之前的版本中，如果想要改变一个图表的主题，就必须注销图表实例后重新初始化，二次的初始动画可能对用户体验带来负面影响。在新版本中，我们实现了主题的动态切换能力（参见），显著地提升用户体验。

3. 深色模式响应

在实现主题的动态注册和切换之后，一个典型场景是监听系统是否使用深色模式，并动态调整图表的深色与浅色主题。

这对于支持深色模式的业务场景至关重要，可以确保应用界面与系统主题风格一致，显著提升用户体验的流畅性和专业性。

以下是一个监听系统深色模式并改变图表主题的方式：

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function updateDarkMode() {
    const isDarkMode = darkModeMediaQuery.matches;
    for (const chart of charts) {
        chart.setTheme(isDarkMode ? 'dark' : 'default');
    }
}
darkModeMediaQuery.addEventListener('change', () => {
    updateDarkMode();
});
4. 新增和弦图

和弦图直观展现复杂关系网络中的流量与权重，特别适合金融交易、社交网络等场景的多维度关系分析。ECharts 创新性地支持使用出节点和入节点的渐变色作为边的颜色，呈现独特的视觉美感。参见 series-chord。

5. 新增蜂群图

传统的散点图在类目轴下如果数据过于密集，蜂群图（Beeswarm）通过将数据在非数值维度上的偏移，在保持数值轴准确性的前提下，实现散点图的无重叠分布。将 jitter 设置为非 0 值，将 jitterOverlap 设置为 false 来实现蜂群图。

6. 新增抖动散点图

抖动散点图（Scatter Jittering）采用随机扰动策略，在非数据维度上添加固定范围的随机偏移，解决数据过于密集的问题。

从下图我们可以看到，在未使用抖动的情况下，如果数据过于密集，很难看清数据的分布情况。

而在开启了数据抖动之后，可以更清楚地看到数据分布最密集的范围是 6-8 之间。并且，相比蜂群图，抖动散点图具有更高的处理性能。

将 jitter 设置为非 0 值，将 jitterOverlap 设置为 true 来实现抖动散点图。

7. 新增断轴

断轴（Broken Axis）是一种通过坐标轴断层展现悬殊量级数据的可视化手段。在 ECharts 6.0 中，我们创新性地实现了模拟撕纸效果的断轴，使得断轴的含义能被更直观地传递，并且支持点击展开的效果，还原到真实数据比例。

8. 升级股市交易类图表

ECharts 6.0 针对金融交易场景深度优化，增强了标签针对坐标系的相对定位能力，助力开发者快速构建专业级行情分析工具。

下图展示了一个使用 ECharts 实现的股市交易图的综合应用场景，结合了分时图、MACD、成交量、买卖盘口、深度图：

这些实例可以帮助开发者快速实现金融交易场景的需求。其中，在图表的四个角落显示数字可以使用 relativeTo 实现。

9. 新增矩阵坐标系

上述例子也用到了 ECharts 6.0 新增的矩阵坐标系，它的功能十分强大。不仅可以用来做协方差矩阵图：

元素周期表：

作为一种布局，它还允许开发者将各种图表类型和组件结合，创造出灵活复杂的可视化作品：

10. 升级自定义系列

过去，使用 ECharts 自定义系列意味着开发者必须从零手写 renderItem 复杂逻辑，即使是复用，也只是复制粘贴代码。现在，ECharts 6.0 带来标准化可复用方案：

自定义系列的注册机制：和主题注册类似，自定义系列也可以动态注册和使用，使用方式和内置图表系列一样简单方便，参见 series-custom.renderItem
官方自定义系列项目：官方在 https://github.com/apache/echarts-custom-series 发布了多个自定义系列，在正式版本发布后，开发者可以通过 npm 等方便地获取
发布自己的自定义系列：可以向上述项目提 Pull Request 或发布到自己的仓库，实现自定义系列的复用
11. 新增多款自定义图表

本次发布，自定义系列项目提供了 6 款实用的图表，使用方法和完整文档参见 echarts-custom-series 项目。包括小提琴图：

轮廓图：

睡眠阶段图：

分段环形图：

范围柱状图：

范围折线图：

发挥你的创意，快来和我们一起创造更多自定义图表吧！

12. 坐标轴标签优化

在之前的版本中，直角坐标系的 axisLabel 和 axisName 在数据比较长时容易超出屏幕，以及重叠。数据变化时使用者并不总能准确预估空间来完全避免它们。在这个版本中我们优化了防止超出屏幕以及防止重叠的策略，并成为默认。

升级方法

请参见完整的版本更新内容和升级指南。

---


Title: v5 升级 v6 指南 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/v6-upgrade-guide

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
本指南面向那些希望将 echarts 5.x（以下简称 v5）升级到 echarts 6.x（以下简称 v6）的用户。大家可以在 ECharts 6 新特性 中了解这次v6带来了哪些值得升级的新特性。在绝大多数情况下，开发者用不着为这个升级做什么额外的事，因为 echarts 一直尽可能地保持 API 的稳定和向后兼容。但是，v6 仍然带来了一些非兼容改动，需要特别关注。此外，在一些情况下，v6 提供了更好的 API 用来取代之前的 API，这些被取代的 API 将不再被推荐使用（当然，我们尽量兼容了这些改动）。我们会在这篇文档里尽量详尽得解释这些改动。

升级方式

在官网下载页可以下载最新版的源码和编译产物。如果使用 npm 安装，升级方式为：

npm install echarts@6
非兼容性改变
默认主题（theme）

首先是默认主题的改动，v6 在配色等主题设计上做了很多的优化来达到更好的视觉效果。如果大家依旧想保留旧版本的颜色，可以使用 echarts/theme/v5.js 主题文件，并通过以下方式初始化图表：

import 'echarts/theme/v5';
const chart = echarts.init(document.getElementById('container'), 'v5');

需要注意的事，v6 的新样式不仅改变了主题色，也优化调整了部分组件的默认位置和尺寸（例如，默认图例 legend 的位置现在改为在画布底部）。使用 echarts/theme/v5.js 后可以恢复到之前的组件默认位置和尺寸。

如果不在意其他的变动，但是想只把默认图表配色恢复到 v5 的默认配色，可以创建一个只定义了 v5 默认配色的主题：

const colorPaletteV5 = [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
];
echarts.registerTheme('myTheme', { color: colorPaletteV5 });
const chart = echarts.init(document.getElementById('container'), 'myTheme');

另外，v5 版本中的 echarts/src/theme/light.ts 已迁移至 echarts/theme/rainbow.js。

标签位置

在直角坐标系中 (grid 组件)，如果之前坐标轴名称 (axisName) 或标签 (axisLabel) 溢出画布或发生重叠，升级之后的坐标轴的位置可能会相对之前而言略微偏移，因为默认启用了防止溢出和防止坐标轴名称与标签重叠的机制。在大多数情况下，这些变化肉眼难以察觉。但如果出现不合理的变化，可以通过设置 grid.outerBoundsMode: 'none' 选项关闭防溢出机制，或设置 xAxis/yAxis.nameMoveOverlap: false 选项关闭防重叠机制。

富文本

v6 中 富文本标签 (label.rich / textStyle.rich) 的这些样式 fontStyle、fontWeight、fontSize、fontFamily、textShadowColor、textShadowBlur、textShadowOffsetX、textShadowOffsetY 会改为继承 普通标签 (label / textStyle) 中的同名样式。如需恢复旧行为，可以在 ECharts option 的根级别或 label / textStyle option 中设置 richInheritPlainLabel: false。

例如：
option = {
    richInheritPlainLabel: false, // 一般设此即可。
    xxx1: {
        // 也可以在此处设置，只控制此 label 。
        label: {
            richInheritPlainLabel: false,
            rich: {/* ... */},
        }
    },
    xxx2: {
        textStyle: {
            richInheritPlainLabel: false,
            rich: {/* ... */},
        }
    }
}

---


Title: 5.0 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/v5-feature

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
数据可视化在过去的几年中得到了长足的发展。开发者对于可视化产品的期待不再是简单的图表创建工具，而在交互、性能、数据处理等方面有了更高级的需求。

Apache ECharts 始终致力于让开发者以更方便的方式创造灵活丰富的可视化作品。在最新推出的 Apache ECharts 5，我们着力加强了图表的叙事能力，让开发者可以以更简单的方式，讲述数据背后的故事。

“表·达”是 Apache ECharts 5 的核心，通过五大模块、十五项特性的全面升级，围绕可视化作品的叙事表达能力，让图“表”更能传“达”数据背后的故事，帮助开发者更轻松地创造满足各种场景需求的可视化作品。

动态叙事

动画对于人类认知的重要性不言而喻。在之前的作品中，我们会通过初始化动画和过渡动画帮助用户理解数据变换之间的联系，让图表的出现和变换显得不那么生硬。这次，我们更是大幅度增强了我们的动画叙事能力，希望能够进一步发挥动画对于用户认知的帮助作用，借助图表的动态叙事功能，帮助用户更容易理解图表背后表达的故事。

动态排序图

Apache ECharts 5 新增支持动态排序柱状图（bar-racing）以及动态排序折线图（line-racing），帮助开发者方便地创建带有时序性的图表，展现数据随着时间维度上的变化，讲述数据的演变过程。

动态排序图展现了不同的类目随着时间在排名上的衍变。而开发者只需要通过几行简单的配置项就可以在 ECharts 中开启这样的效果。

自定义系列动画

除了动态排序图，Apache ECharts 5 在自定义系列中提供了更加丰富强大的动画效果，支持标签数值文本的插值动画，图形的形变（morph）、分裂（separate）、合并（combine）等效果的过渡动画。

想象一下，用这些动态效果，你可以创造出多么令人称奇的可视化作品！

视觉设计

视觉设计的作用并不仅仅是为了让图表更好看，更重要的是，符合可视化原理的设计可以帮用户更快速地理解图表想表达的内容，并且尽可能消除不良设计带来的误解。

默认设计

我们发现，有很大一部分开发者使用了 ECharts 默认的主题样式，因而设计优雅、符合可视化原理的默认主题设计是非常重要的。在 Apache ECharts 5 中，我们重新设计了默认的主题样式，针对不同的系列和组件分别做了优化调整。以主题色为例，我们考量了颜色之间的区分度、与背景色的对比度、相邻颜色的和谐度等因素，并且确保色觉辨识障碍人士也能清楚地区分数据。

我们以最常用的柱状图为例，来看看新版本浅色主题和深色主题的样式：

对于折线图，我们做了比较直观的一个改变就是去掉了直角坐标系最左侧数据轴Y轴的默认显示。左侧��原本默认的折线图的样式，其实通过中间的几条数据分割线，我们就已经可以定位折线图的每个数据值。因此我们希望通过减少不必要的图形元素，来达到更清晰地传递信息的目的。

对于数据区域缩放，时间轴等交互组件，我们也设计了全新的样式并且提供了更好的交互体验：


标签是图表中的核心元素之一，清晰而明确的标签可以帮助用户对数据有更准确的理解。Apache ECharts 5 提供了多种新的标签功能，让密集的标签能清晰显示、准确表意。

Apache ECharts 5 可以通过一个配置项开启自动隐藏重叠的标签。对于超出显示区域的标签，可以选择自动截断或者换行。密集的饼图标签，现在有了更美观的自动排布。

这些功能可以帮助避免文字过于密集影响可读性。并且，无需开发者编写额外的代码就能默认生效，大大简化了开发者的开发成本。

我们也提供了多个配置项来让开发者主动控制标签的布局策略，例如标签拖动、整体显示在画布边缘，用引导线和图形元素连接，并且仍可联动高亮表达关联关系。

新的标签功能可以让你在移动端这样局限的空间内也可以有很优雅的标签展示：

时间轴

Apache ECharts 5 带来了适于表达时间标签刻度的时间轴。时间轴的默认设计更突出重要的信息，并且提供了更灵活的定制化能力，让开发者根据不同的需求定制时间轴的标签内容。

首先，时间轴不再如之前般绝对平均分割，而是选取年、月、日、整点这类更有意义的点来展示，并且能同时显示不同层级的刻度。标签的 formatter 支持了时间模版（例如 {yyyy}-{MM}-{dd}），并且可以为不同时间粒度的标签指定不同的 formatter，结合已有的富文本标签，可以定制出醒目而多样的时间效果。

不同的 dataZoom 粒度下时间刻度的显示：

提示框

提示框（Tooltip）是一种最常用的可视化组件，可以帮助用户交互式地了解数据的详细信息。在 Apache ECharts 5 中，我们对提示框的样式进行了优化，通过对字体样式，颜色的调整，指向图形的箭头，跟随图形颜色的边框色等功能，让提示框的默认展示优雅又清晰。并且改进了富文本的渲染逻辑，确保显示效果与 HTML 方式一致，让用户在不同场景下可以选择不同的技术方案实现同样的效果。

除此之外，我们这次也加上了提示框内的列表按照数值大小或者类目顺序排序的功能。

仪表盘

我们看到社区用户创建了很多酷炫的仪表盘图表，但是他们的配置方式往往比较复杂而取巧。因此，我们对仪表盘的功能作了全面升级，支持了图片或者矢量路径绘制指针、也支持了锚点（anchor）配置项、进度条（progress）、圆角效果等等配置项。

不同样式的仪表盘指针：

这些升级，不仅可以让开发者用更简单的配置项实现酷炫的效果，而且带来了更丰富的定制能力。

扇形圆角

圆角可以带来更美观而柔和的视觉，也能够赋予更多的创造力。Apache ECharts 5 支持了饼图、旭日图、矩形树图的扇形圆角。可不要小看了简单的圆角配置项，合理地搭配其他的效果，就可以形成更具个性的的可视化作品。

交互能力

可视化作品的交互能力帮助用户探索了解作品，加深对于图表主旨的理解。

状态管理

在 ECharts 4 中有高亮（emphasis）和普通（normal）两个交互的状态，在鼠标移到图形上的时候会进入高亮状态以区分该数据，开发者可以分别设置这两个状态的颜色，阴影等样式。

这次在 Apache ECharts 5 中，我们在原先的鼠标 hover 高亮的基础上，新增加了淡出其它非相关元素的效果，从而可以达到聚焦目标数据的目的。

比如在这个柱状图的例子中，鼠标移到一个系列上的时候，其它非相关的系列就会淡出，从而可以更清晰的突出聚焦系列中数据的对比。在关系图，树图，旭日图，桑基等更复杂数据结构的图上，也可以通过淡出非相关元素来观察数据之间的联系。而且颜色，阴影等在高亮（emphasis）中可以设置的样式，现在也可以在淡出（blur）状态中设置了。

除此之外，我们为所有系列还添加了点击选中这个之前只有在饼图、地图等少数系列中才能开启的交互，开发者可以设置为单选或多选模式，并且通过监听 selectchanged 事件获取到选中的所有图形然后进行更进一步的处理。与高亮和淡出一样，选中的样式也可以在 select 中配置。

性能提升
脏矩形渲染

Apache ECharts 5 新支持了脏矩形渲染，解决只有局部变化的场景下的性能瓶颈。在使用 Canvas 渲染器时，脏矩形渲染技术探测并只更新视图变化的部分，而不是任何变动都引起画布完全重绘。这能在一些特殊场景下帮助提高渲染帧率，例如在图形很多时候，鼠标频繁触发一些图形高亮的场景。以往这类场景，会使用额外的 Canvas 层以优化性能，但是这种方式不是所有场景都通用，而且对于复杂的样式的效果并不理想。脏矩形渲染很好地同时满足了性能和显示正确。

脏矩形的可视化演示，红色框选部分为该帧重绘区域：

大家在新的示例页面选择开启脏矩形优化就可以看到该效果。

实时时序数据的折线图性能优化

除此之外，海量数据下折线图的性能也有了大幅度的性能提升。我们经常碰到大量的实时时序数据的高性能绘制的需求，这些数据可能需要几百或者几十毫秒更新一次。

Apache ECharts 5 对这些场景下的 CPU 消耗、内存占用、初始化时间都进行了深度的优化，使得百万量级的数据也能做到实时的更新（每次更新耗时少于 30ms），甚至对于千万级的数据，也可以在 1s 内渲染完，并且保持很小的内存占用以及流畅的提示框（tooltip）等交互。

开发体验

我们希望如此强大的可视化工具可以被更多开发者以更简单的方式使用，因而开发者的开发体验也是我们非常关注的方面。


ECharts 5 加强了数据集的数据转换能力，让开发者可以使用简单的方式实现常用的数据处理，如：数据过滤（filter）、排序（sort）、聚合（aggregate）、直方图（histogram）、简单聚类（clustering）、回归线计算（regression）等。开发者可以用统一的声明式方式来使用这些功能，可以方便地实现常用的数据操作。

国际化

ECharts 原有的国际化方案，采用的是根据不同的语言参数打包出不同的部署文件的形式。​ 这种方式，使动态的语言和静态的代码包绑定在一起，使用的时候只能通过重新加载不同语言版本的 ECharts 代码来达到切换语言的目的。

因此，从 Apache ECharts 5 开始，动态的语言包和静态的代码包分离开。切换语言的时候，只需要加载相应语言包 ​，通过类似挂载主题的方式，使用 registerLocale 函数挂载语言包对象 ​，重新初始化后就完成了语言的切换 ​。

// import the lang object and set when init​
echarts.registerLocale('DE', lang);​
echarts.init(DomElement, null, {​
   locale: 'DE'​
});
TypeScript 重构

在近 8 年的时间里，Apache ECharts 已经发展成一个非常复杂的可视化库了，为了可以更安全高效的进行重构和新功能的开发，我们在 Apache ECharts 5 的开发之初，使用 TypeScript 对代码进行了重写，TypeScript 所带来的强类型让我们更有信心地在 ECharts 5 开发的时候对代码进行大刀阔斧的重构以实现更多令人激动人心的特性。

对于开发者，我们也可以从 TypeScript 代码直接生成更好更符合代码的DTS类型描述文件。在此之前，ECharts 的类型描述文件一直是由社区开发者帮我们维护并发布到 DefinitelyTyped，这个有着不小的工作量，非常感谢大家的贡献。

除此之外，如果开发者的组件是按需引入的，我们还提供了一个 ComposeOption 类型方法，可以组合出一个只包含了引入组件的配置项类型，可以带来更严格的类型检查，帮助你提前检测到未引入的组件类型。

可访问性

Apache ECharts 一直非常重视无障碍设计，我们希望让视觉障碍人士也能平等了解图表传递的信息。并且也希望图表的开发者能以极低的开发成本实现这一点，因而有利于让开发者更愿意为视觉障碍人士提供支持。

在上一个大版本中，我们支持了根据不同的图表类型和数据自动一键智能生成图表描述的功能，帮助开发者非常方便地支持图表的 DOM 描述信息。在 ECharts 5 中，我们也做了更多提高可访问性的设计，帮助视觉障碍人士更好地理解图表内容。

主题配色

我们在设计新版默认主题样式的时候，将无障碍设计作为一个重要的考量依据，对颜色的明度和色值都进行反复测试，帮助视觉辨识障碍用户清楚地识别图表数据。​

并且，针对有更进一步无障碍需求的开发者，我们还提供了特殊的高对比度主题，以更高对比度颜色的主题将数据作进一步区分。

贴花图案

ECharts 5 还新增提供了贴花的功能，用图案辅助颜色表达，进一步帮助用户区分数据。

此外，贴花图案还能在一些其他的场景下提供帮助，比如：在报纸、书籍之类只有单色或者非常少的颜色的印刷品中，帮助更好地区分数据；用图形元素方便用户对数据产生更直观的理解等。

小结

除了以上介绍的功能，Apache ECharts 还在非常多的细节中做了改进，帮助开发者更轻松地创建默认好用、配置灵活的图表，用图表讲述数据背后的故事。

感谢所有使用过 ECharts，甚至参与过社区贡献的开发者，正是你们才使得 Apache ECharts 5 成为可能。我们会以更大的热情投入到未来的开发中，Apache ECharts 也会以更大的诚意和大家在 6 相见！

---


Title: v4 升级 v5 指南 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/v5-upgrade-guide

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
本指南面向那些希望将 echarts 4.x（以下简称 v4）升级到 echarts 5.x（以下简称 v5）的用户。大家可以在 ECharts 5 新特性 中了解这次v5带来了哪些值得升级的新特性。在绝大多数情况下，开发者用不着为这个升级做什么额外的事，因为 echarts 一直尽可能地保持 API 的稳定和向后兼容。但是，v5 仍然带来了一些非兼容改动，需要特别关注。此外，在一些情况下，v5 提供了更好的 API 用来取代之前的 API，这些被取代的 API 将不再被推荐使用（当然，我们尽量兼容了这些改动）。我们会在这篇文档里尽量详尽得解释这些改动。

非兼容性改变
默认主题（theme）

首先是默认主题的改动，v5 在配色等主题设计上做了很多的优化来达到更好的视觉效果。如果大家依旧想保留旧版本的颜色，可以手动声明颜色，如下：

chart.setOption({
  color: [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
  ]
  // ...
});

或者，做一个简单的 v4 主题：

var themeEC4 = {
  color: [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
  ]
};
var chart = echarts.init(dom, themeEC4);
chart.setOption(/* ... */);
引用 ECharts
去除 default exports 的支持

如果使用者在 v4 中这样引用了 echarts：

import echarts from 'echarts';
// 或者按需引入
import echarts from 'echarts/lib/echarts';

这两种方式，v5 中不再支持了。

使用者需要如下更改代码解决这个问题：

import * as echarts from 'echarts';
// 按需引入
import * as echarts from 'echarts/lib/echarts';
按需引入

在 5.0.1 中，我们引入了新的按需引入接口

import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
// 注意，新的接口中默认不再包含 Canvas 渲染器，需要显示引入，如果需要使用 SVG 渲染模式则使用 SVGRenderer
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, GridComponent, CanvasRenderer]);

如果之前是使用import 'echarts/lib/chart/bar'引入，新的接口对应的是import {BarChart} from 'echarts/charts';

为了方便大家了解自己的配置项需要引入哪些模块，我们新的示例编辑页面添加了生成按需引入代码的功能，大家可以在示例编辑页的完整代码标签下选中按需引入后查看需要引入的模块以及相关代码。

在大部分情况下，我们都推荐大家尽可能用这套新的按需引入接口，它可以最大程度的利用打包工具 tree-shaking 的能力，并且可以有效解决命名空间冲突的问题而且防止了内部结构的暴露。如果你依旧在使用 CommonJS 的模块写法，之前的方式我们也依旧是支持的：

const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/grid');

其次，因为我们的源代码已使用 TypeScript 重写，v5 将不再支持从 echarts/src 引用文件，需要改为从echarts/lib引入。

依赖调整

注意：该部分只针对为了保证较小的打包体积而是用按需引入接口的开发者，如果是全量引入的不需要关注

为了保证 tree-shaking 后的体积足够小，我们去除了一些之前会默认被打包进来的依赖。比如前面提到的在使用新的按需引入接口的时候，CanvasRenderer将不再被默认引入，这样可以保证只需要使用 SVG 渲染模式的时候不会把不需要的 Canvas 渲染代码也一起打包进来，除此之外，还有下面这些依赖的改动：

在使用折线图，柱状图中不再默认引入直角坐标系组件，因此之前使用下面的引入方式
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');

需要再单独引入grid组件

require('echarts/lib/component/grid');

参考 issue：#14080, #13764

默认不再引入aria组件，如果需要的话可以手动引入。
import { AriaComponent } from 'echarts/components';
echarts.use(AriaComponent);

或者：

require('echarts/lib/component/aria');
去除内置的 geoJSON

v5 移除了内置的 geoJSON（原先在 echarts/map 文件夹下）。这些 geoJSON 文件本就一直来源于第三方。如果使用者仍然需要他们，可以去从老版本中得到，或者自己寻找更合适的数据然后通过 registerMap 接口注册到 ECharts 中。

浏览器兼容性

v5 不再支持 IE8 浏览器。我们不再继续维护和升级之前的 VML 渲染器 来实现 IE8 的兼容。如果使用者确实有很强的需求，那么欢迎提 pull request 来升级 VML 渲染器，或者单独维护一个第三方 VML 渲染器，我们从 v5.0.1 开始支持注册独立的渲染器了。

配置项调整
Y 轴默认不显示轴线和刻度线

v5 去掉了直角坐标系最左侧数据轴 Y 轴的默认显示。如果仍希望展示轴线和刻度线，需要显式配置：

yAxis: {
  type: 'value',
  // 显式设置 `axisLine.show` 和 `axisTick.show` 为 `true`
  axisLine: {
    show: true
  },
  axisTick: {
    show: true
  }
}
视觉样式设置的优先级改变

v5 对调了 visualMap 组件 和 itemStyle | lineStyle | areaStyle 的视觉样式优先级。

具体来说，v4 中，visualMap 组件 中生成的视觉样式（如，颜色、图形类型、图形尺寸等）的优先级，比开发者在 itemStyle | lineStyle | areaStyle 中设置的样式的优先级高，也就是说如果他们同时设置的话，前者会生效而后者不会生效。这带来了些麻烦：假如使用者在使用 visualMap 组件 时，又想针对某个数据项对应的图形，设置 itemStyle 样式，则做不到。v5 中于是提高了 itemStyle | lineStyle | areaStyle 的优先级，使他们能生效。

在绝大多处情况下，这个变化并不会带来什么影响。但是为保险起见，使用者在升级 v4 到 v5 时，还是可以检查下，是否有同时使用 visualMap 和 itemStyle | lineStyle | areaStyle 的情况。

富文本的 padding

v5 调整了 rich.?.padding 的格式使其更符合 CSS 的规范。v4 里，例如 rich.?.padding: [11, 22, 33, 44] 表示 padding-top 是 33 且 padding-bottom 是 11。在 v5 中调整了上下的位置，rich.?.padding: [11, 22, 33, 44] 表示 padding-top 是 11 且 padding-bottom 是 33。

如果使用者有在使用 rich.?.padding，需要注意调整下这个顺序。

扩展的兼容

如果想要升级到 v5 ，下面这些扩展需要升级到最新的版本实现兼容。

echarts-gl
echarts-wordcloud
echarts-liquidfill
不再推荐使用的 API

一些 API（包括接口调用，事件监听和配置项）在 v5 中不再推荐使用。当然，使用者仍然可以用他们，只是会在 dev 模式下，在 console 中打印一些 warning，并不会影响功能。但是从长远维护考虑，我们还是推荐升级成新的 API。

下面是不再推荐使用的 API 以及推荐的新 API：

图形元素 transform 相关的属性被改变了：
变更点：
position: [number, number] 改为 x: number / y: number。
scale: [number, number] 改为 scaleX: number / scaleY: number。
origin: [number, number] 改为 originX: number / originY: number。
position、scale 和 origin 仍然支持，但已不推荐使用。
它影响到这些地方：
在graphic组件中：每个元素的声明。
在 custom series 中：renderItem 返回的每个元素的声明。
直接使用 zrender 图形元素时。
Text 相关的属性被改变：
变更点：
图形元素附带的文本的声明方式被改变：
除了 Text 元素之外，其他元素中的属性 style.text 都不推荐使用了。取而代之的是新属性 textContent 和 textConfig，他们能带来更丰富的功能。
其中，下面左边部分的这些属性已不推荐使用或废弃。请使用下面的右边部分的属性：
textPosition => textConfig.position
textOffset => textConfig.offset
textRotation => textConfig.rotation
textDistance => textConfig.distance
下面左边部分的属性在 style 和 style.rich.? 中已不推荐使用或废弃。请使用下面右边的属性：
textFill => fill
textStroke => stroke
textFont => font
textStrokeWidth => lineWidth
textAlign => align
textVerticalAlign => verticalAlign
textLineHeight => lineHeight
textWidth => width
textHeight => hight
textBackgroundColor => backgroundColor
textPadding => padding
textBorderColor => borderColor
textBorderWidth => borderWidth
textBorderRadius => borderRadius
textBoxShadowColor => shadowColor
textBoxShadowBlur => shadowBlur
textBoxShadowOffsetX => shadowOffsetX
textBoxShadowOffsetY => shadowOffsetY
注：这些属性并没有变化：
textShadowColor
textShadowBlur
textShadowOffsetX
textShadowOffsetY
它影响到这些地方：
在 graphic 组件中：每个元素的声明。（原来的写法仍兼容，但在一些很复杂的情况下，可能效果不完全一致。）
在自定义系列（custom series）中：renderItem 返回中的每个元素的声明。（原来的写法仍兼容，但在一些很复杂的情况下，可能效果不完全一致。）
直接使用 zrender API 创建图形元素。（不再兼容，原写法被废弃。）
图表实例上的 API：
chart.one(...) 已不推荐使用。
label。
属性 color、textBorderColor、backgroundColor、borderColor 中，值 auto 已不推荐使用，而推荐使用 'inherit' 代替。
hoverAnimation:
选项 series.hoverAnimation 已不推荐使用，使用 series.emphasis.scale 代替之。
折线图（line series）：
选项 series.clipOverflow 已不推荐使用，使用 series.clip 代替之。
自定义系列（custom series）。
在 renderItem 中，api.style(...) 和 api.styleEmphasis(...) 已不推荐使用。因为这两个接口其实并不真正必要，也很难保证向后兼容。用户可以通过 api.visual(...) 获取系统自动分配的视觉信息。
旭日图（sunburst）：
动作类型 sunburstHighlight 已被弃用，请使用 highlight 代替。
动作类型 sunburstUnhighlight 已被弃用，请使用 downplay 代替。
选项 series.downplay 已被弃用，请使用 series.blur 代替。
选项 series.highlightPolicy 已不适用，请使用 series.emphasis.focus 代替。
饼图（pie）：
下面左边部分的 action 名已经不推荐使用。请使用右边的 action 名。
pieToggleSelect => toggleSelect。
pieSelect => select。
pieUnSelect => unselect。
下面左边部分的事件名已经不推荐使用。请使用右边的事件名。
pieselectchanged => selectchanged。
pieselected => selected。
pieunselected => unselected。
选项 series.label.margin 已经不推荐使用。使用 series.label.edgeDistance 代替。
选项 series.clockWise 已经不推荐使用。使用 series.clockwise 代替。
选项 series.hoverOffset 已经不推荐使用。使用 series.emphasis.scaleSize 代替。
地图（map series）：
下文左边部分的 action 名已经不推荐使用。请使用右边的 action 名。
mapToggleSelect => toggleSelect。
mapSelect => select。
mapUnSelect => unselect。
下面左边部分的事件名已经不推荐使用。请使用右边的事件名。
mapselectchanged => selectchanged。
mapselected => selected。
mapunselected => unselected。
选项 series.mapType 已经不推荐使用。使用 series.map 代替。
选项 series.mapLocation 已经不推荐使用。
关系图（graph series）：
选项 series.focusNodeAdjacency 已经不推荐使用。使用 series.emphasis: { focus: 'adjacency'} 代替。
仪表盘（gauge series）：
选项 series.clockWise 已经不推荐使用。使用 series.clockwise 代替。
选项 series.hoverOffset 已经不推荐使用。使用 series.emphasis.scaleSize 代替。
dataZoom 组件：
选项 dataZoom.handleIcon 如果使用 SVGPath，需要前缀 path://。
雷达图（radar）：
选项 radar.name 已经不推荐使用。使用 radar.axisName 代替。
选项 radar.nameGap 已经不推荐使用。使用 radar.axisNameGap 代替。
Parse and format：
echarts.format.formatTime 已经不推荐使用。使用 echarts.time.format 代替。
echarts.number.parseDate 已经不推荐使用。使用 echarts.time.parse 代替。
echarts.format.getTextRect 已经不推荐使用。

---


Title: 5.2 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/5-2-0

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
在 Apache ECharts 中我们一直把自然流畅的过渡动画作为一个重要特性。通过避免数据带来的突变，不仅仅可以改善视觉效果，更为表达数据的关联和演变提供了可能。因此，在 5.2.0 中，我们进一步将过渡动画从表现系列内部数据的变化，泛化到全局能力。接下来，我们会看到这种全局过渡动画 Universal Transition是如何为图表增加表现力和叙事能力的。

在之前的版本中，过渡动画有一定的局限性：只能用于相同类型的图形的位置、尺寸、形状，而且只能作用在相同类型的系列上。比如，下面例子就是通过饼图中扇区形状的变化反映了数据分布的变化：

function makeRandomData() {
  return [
    {
      value: Math.random(),
      name: 'A'
    },
    {
      value: Math.random(),
      name: 'B'
    },
    {
      value: Math.random(),
      name: 'C'
    }
  ];
}
option = {
  series: [
    {
      type: 'pie',
      radius: [0, '50%'],
      data: makeRandomData()
    }
  ]
};

setInterval(() => {
  myChart.setOption({
    series: {
      data: makeRandomData()
    }
  });
}, 2000);


而从 5.2.0 开始，我们引入了更强大的全局过渡动画能力，让过渡动画不再局限于相同类型的系列之间。现在，我们可以使用这种跨系列的形变，为任意类型的系列和任意类型的图形做形变动画。

这会有多酷呢？我们一起来感受一下！

跨系列的形变动画

在设置universalTransition: true开启全局过渡动画后，从饼图切换成柱状图，或者从柱状图切换成散点图，甚至旭日图和矩形树图这类复杂的图表之间，都可以通过形变的方式自然的进行动画过渡。

如下，饼图和柱状图之间的切换：

const dataset = {
  dimensions: ['name', 'score'],
  source: [
    ['Hannah Krause', 314],
    ['Zhao Qian', 351],
    ['Jasmin Krause ', 287],
    ['Li Lei', 219],
    ['Karle Neumann', 253],
    ['Mia Neumann', 165],
    ['Böhm Fuchs', 318],
    ['Han Meimei', 366]
  ]
};
const pieOption = {
  dataset: [dataset],
  series: [
    {
      type: 'pie',
      // 通过 id 关联需要过渡动画的系列
      id: 'Score',
      radius: [0, '50%'],
      universalTransition: true,
      animationDurationUpdate: 1000
    }
  ]
};
const barOption = {
  dataset: [dataset],
  xAxis: {
    type: 'category'
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      // 通过 id 关联需要过渡动画的系列
      id: 'Score',
      // 每个数据都是用不同的颜色
      colorBy: 'data',
      encode: { x: 'name', y: 'score' },
      universalTransition: true,
      animationDurationUpdate: 1000
    }
  ]
};

option = barOption;

setInterval(() => {
  option = option === pieOption ? barOption : pieOption;
  // 使用 notMerge 的形式可以移除坐标轴
  myChart.setOption(option, true);
}, 2000);


更多的常见基础图表之间的过渡：

这样的动画过渡不再仅仅局限于基础的折、柱、饼中，在柱状图和地图之间:

或者旭日图和矩形树图之间，甚至非常灵活的自定义系列之间都可以进行动画的过渡。

注意需要配置系列的 id 来保证需要动画过渡的系列之间能够一一对应。

按需引入的代码需要单独引入该特性

import { UniversalTransition } from 'echarts/features';
echarts.use([UniversalTransition]);

数据的分裂和合并动画

除了常见的数据值的更新，有时候我们还会碰到数据的聚合、下钻等交互后的更新，这个时候我们就不能直接应用一对一的动画过渡，而需要使用更多像分裂、合并这样的动画效果，来通过正确的图形动画表达出数据的变换。

为了能够表达数据之间可能存在的多对多联系，在 5.2.0 中我们新引入了一个数据组groupId的概念，我们可以通过 series.dataGroupId 设置整个系列所属的组，或者更细粒度的通过 series.data.groupId 设置每个数据所属的组。如果你使用了dataset管理数据则更方便了，可以使用encode.itemGroupId来指定一个维度编码成groupId。

比如我们要实现一个柱状图下钻的动画，可以将下钻后的整个系列的数据都设置同一个groupId，然后跟下钻前的数据对应起来：

option = {
  xAxis: {
    data: ['Animals', 'Fruits', 'Cars']
  },
  yAxis: {},
  dataGroupId: '',
  animationDurationUpdate: 500,
  series: {
    type: 'bar',
    id: 'sales',
    data: [
      {
        value: 5,
        groupId: 'animals'
      },
      {
        value: 2,
        groupId: 'fruits'
      },
      {
        value: 4,
        groupId: 'cars'
      }
    ],
    universalTransition: {
      enabled: true,
      divideShape: 'clone'
    }
  }
};

const drilldownData = [
  {
    dataGroupId: 'animals',
    data: [
      ['Cats', 4],
      ['Dogs', 2],
      ['Cows', 1],
      ['Sheep', 2],
      ['Pigs', 1]
    ]
  },
  {
    dataGroupId: 'fruits',
    data: [
      ['Apples', 4],
      ['Oranges', 2]
    ]
  },
  {
    dataGroupId: 'cars',
    data: [
      ['Toyota', 4],
      ['Opel', 2],
      ['Volkswagen', 2]
    ]
  }
];

myChart.on('click', event => {
  if (event.data) {
    const subData = drilldownData.find(data => {
      return data.dataGroupId === event.data.groupId;
    });
    if (!subData) {
      return;
    }
    myChart.setOption({
      xAxis: {
        data: subData.data.map(item => {
          return item[0];
        })
      },
      series: {
        type: 'bar',
        id: 'sales',
        dataGroupId: subData.dataGroupId,
        data: subData.data.map(item => {
          return item[1];
        }),
        universalTransition: {
          enabled: true,
          divideShape: 'clone'
        }
      },
      graphic: [
        {
          type: 'text',
          left: 50,
          top: 20,
          style: {
            text: 'Back',
            fontSize: 18
          },
          onclick: function() {
            myChart.setOption(option, true);
          }
        }
      ]
    });
  }
});


通过groupId，我们还可以实现更丰富的聚合，下钻动画。

数据的聚合：

单系列下钻成两个系列：

全局过渡动画使得数据的关系和演变的表达能力走上新的台阶，为你的可视化创作灵感插上翅膀。

看到这里，我们知道你已经跃跃欲试了。但是别急，5.2.0 还有更多值得一看的新功能。

调色盘的取色策略

在上面全局过渡动画的示例中，大家可能有注意到我们使用了一个之前版本没有的colorBy配置项，这个配置项也是我们这个版本新增加的一个特性，用来给系列配置不同粒度的调色盘取色。这个配置目前支持两种策略：

'series' 按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色。
'data' 按照数据项分配调色盘中的颜色，每个数据项都使用不同的颜色。

在之前我们是按照系列的类型固定了这个策略，比如柱状图就是固定'series'的策略，而饼图则是固定'data'的策略。

而现在新增这个配置项后，我们可以在柱状图中给每个数据项都分配不同的颜色：

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
      colorBy: 'data'
    }
  ]
};


或者在饼图中统一使用一个颜色：

option = {
  series: {
    type: 'pie',
    colorBy: 'series',
    radius: [0, '50%'],
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 1
    },
    data: [
      {
        value: 335,
        name: 'Direct Visit'
      },
      {
        value: 234,
        name: 'Union Ad'
      },
      {
        value: 1548,
        name: 'Search Engine'
      }
    ]
  }
};


这一配置项可以让我们避免了去找调色盘颜色然后去一一设置的麻烦，可能在特定的场景需求中提供便捷。后续我们会对这个配置项做进一步的增强，提供更多的调色盘取色的策略。

极坐标柱状图的标签

这个版本中我们实现了极坐标上的柱状图的标签，并且支持丰富的标签定位配置。下面是一个最常见的标签显示在端点的进度图：

option = {
  angleAxis: {
    show: false,
    max: 10
  },
  radiusAxis: {
    show: false,
    type: 'category',
    data: ['AAA', 'BBB', 'CCC', 'DDD']
  },
  polar: {},
  series: [
    {
      type: 'bar',
      data: [3, 4, 5, 6],
      colorBy: 'data',
      roundCap: true,
      label: {
        show: true,
        // 试试改成 'insideStart'
        position: 'start',
        formatter: '{b}'
      },
      coordinateSystem: 'polar'
    }
  ]
};


更多标签位置的配置：

这一灵活的标签位置配置项大大丰富了极坐标柱状图的表达能力，让文字清晰地匹配对应的数据。

空数据的饼图样式

在之前的版本中，如果饼图没有数据，画面中可能就是完全空白的。因为没有任何的视觉元素，所以用户会疑惑是不是出现了 bug 导致图中没有内容。

为了解决这个问题，这个版本我们会默认在无可显示数据的时候显示一个灰色的占位圆以防止画面中完全空白。我们可以通过emptyCircleStyle配置这个占位圆的样式。

option = {
  series: [
    {
      type: 'pie',
      data: [],
      // showEmptyCircle: false,
      emptyCircleStyle: {
        // 将样式改为空心圆
        color: 'transparent',
        borderColor: '#ddd',
        borderWidth: 1
      }
    }
  ]
};


如果不想要显示这个灰色的圆，也可以设置showEmptyCircle: false关闭。

高维数据的性能增强

我们从 4.0 开始引入了 dataset 用来管理图表的数据，通常情况下dataset提供了更方便的数据管理方式而且跟传统的方式不会有什么性能上的差别。但是在一些极端的特别高维（>100）数据的场景下，我们还是会碰到一些性能急剧下降的问题，比如下面这种通过一千个系列去可视化千维数据的场景（#11907），甚至可能会卡住。

const indices = Array.from(Array(1000), (_, i) => {
  return `index${i}`;
});
const option = {
  xAxis: { type: 'category' },
  yAxis: {},
  dataset: {
    // dimension: ['date', ...indices],
    source: Array.from(Array(10), (_, i) => {
      return {
        date: i,
        ...indices.reduce((item, next) => {
          item[next] = Math.random() * 100;
          return item;
        }, {})
      };
    })
  },
  series: indices.map(index => {
    return { type: 'line', name: index };
  })
};

产生这个性能问题是因为我们在底层每个系列都会按照其需要处理一遍这个 dataset，然后保存一份处理过后的数据以及维度等元信息。这意味着刚才那个例子中需要处理并保存1000 x 1000个维度的信息，这带来了巨大的内存和垃圾回收的压力，从而导致了高维度的性能的急剧下降。

在新版本中我们对这个问题做了优化，所有系列都尽可能共享 dataset 的数据（能否共享取决于系列怎么使用这份数据）存储而非每个系列都处理并存储一次，并且只处理和存储了使用到的维度。这些优化保证了内存不会随着 dataset 维度和系列的增长而爆炸，大幅度的提升了极端场景下的初始化性能。刚才例子的渲染耗时也从卡住降低到了可接受的 300 毫秒以下。

这次优化带来收益的还不只是这种高维的场景，在使用维度不高但是数据量很大的 dataset 的时候，因为数据的共享所以多个系列只处理了一遍数据，因此也可以带来显著的性能提升。

自定义系列的类型优化

自定义系列提供了非常灵活的创建系列图形的方式，相对于其它系列，自定义系列的学习曲线可能有些陡峭，而且容易出错。因此在这个版本中，我们进一步的优化了自定义系列中的核心方法renderItem的类型，对于renderItem的参数和返回值类型做了更精确的推断，从而可以根据返回的图形类型推断出可以设置该图形的哪些属性：

series = {
  type: 'custom',
  renderItem(params) {
    return {
      type: 'group',
      // group 类型使用 children 存储其它类型的子元素
      children: [
        {
          type: 'circle',
          // circle 拥有下面这些可以配置的 shape 属性
          shape: { r: 10, cx: 0, cy: 0 },
          // 可以配置的样式
          style: { fill: 'red' }
        },
        {
          type: 'rect',
          // rect 拥有下面这些可以配置的 shape 属性
          shape: { x: 0, y: 0, width: 100, height: 100 }
        },
        {
          type: 'path',
          // 自定义路径图形
          shape: { d: '...' }
        }
      ]
    };
  }
};
小结

以上我们介绍了 5.2.0 中的新特性以及优化，如果你对其中的一些特性感兴趣，不妨更新到最新版本的 Apache ECharts 亲自体验一下。

如果你对 Apache ECharts 接下来的计划感兴趣，也可以在 GitHub Milestone 关注我们的开发计划。也非常欢迎加入我们的贡献者行列（在 Wiki 中了解更多）。

完整更新记录

查看版本更新

---


Title: 5.3 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/5-3-0

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
Apache ECharts 5.3.0 在动画表达力、渲染性能、服务端渲染上做了大幅度的增强，同时也新增了多坐标轴刻度自动对齐、tooltip 数值格式化、地图投影等社区中期盼已久的特性。

关键帧动画

在之前 ECharts 的动画集中在图形添加、更新以及移除的过渡动画上，过渡动画往往只有开始状态和结束状态。为了表达更复杂的动画效果，我们 5.3.0 中为自定义系列和图形组件引入了全新的关键帧动画。

下面是一个简单的通过关键帧动画实现的呼吸动画的效果。

option = {
  graphic: {
    type: 'circle',
    shape: { r: 100 },
    left: 'center',
    top: 'center',
    keyframeAnimation: [
      {
        duration: 3000,
        loop: true,
        keyframes: [
          {
            percent: 0.5,
            easing: 'sinusoidalInOut',
            scaleX: 0.1,
            scaleY: 0.1
          },
          {
            percent: 1,
            easing: 'sinusoidalInOut',
            scaleX: 1,
            scaleY: 1
          }
        ]
      }
    ]
  }
};


在关键帧动画中，你可以配置动画时长、缓动、是否循环、每个关键帧的位置、缓动以及图形属性等。而且每个图形可以同时设置多个不同配置的关键帧动画。灵活的配置让我们可以实现非常复杂的动画效果，下面列举几个可以应用关键帧动画的场景。

自定义加载动画

ECharts 默认内置了一个加载动画，可以调用showLoading显示。开发者经常会提需求需要更多的加载动画效果。现在有了关键帧动画后，我们可以通过图形（graphic）组件配合关键帧动画实现任何想要的加载动画效果。

比如文本描边动画：

option = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'Apache ECharts',
          fontSize: 40,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#000',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'black'
              }
            }
          ]
        }
      }
    ]
  }
};


或者柱状图形状的加载动画：

const columns = [];
for (let i = 0; i < 7; i++) {
  columns.push({
    type: 'rect',
    x: i * 20,
    shape: {
      x: 0,
      y: -40,
      width: 10,
      height: 80
    },
    style: {
      fill: '#5470c6'
    },
    keyframeAnimation: {
      duration: 1000,
      delay: i * 200,
      loop: true,
      keyframes: [
        {
          percent: 0.5,
          scaleY: 0.1,
          easing: 'cubicIn'
        },
        {
          percent: 1,
          scaleY: 1,
          easing: 'cubicOut'
        }
      ]
    }
  });
}
option = {
  graphic: {
    elements: [
      {
        type: 'group',
        left: 'center',
        top: 'center',
        children: columns
      }
    ]
  }
};

扩展更丰富的散点图动画特效

带有特效动画的散点图一直以来是 ECharts 的特色功能。开发者可以使用 effectScatter 系列来实现带有涟漪特效的动态散点图，这种特效动画除了让作品更有趣，也起到了高亮提示用户的效果。跟加载动画一样，开发者也常常提出需要更多动画效果的需求。现在我们可以在自定义系列中通过使用关键帧动画来实现更复杂的特效。

比如下面例子在 SVG 地图上给自定义系列绘制的图钉加上了跳动的动画效果，同时配上了涟漪动画。

fetch(
  'https://echarts.apache.org/examples/data/asset/geo/Map_of_Iceland.svg'
)
  .then(response => response.text())
  .then(svg => {
    echarts.registerMap('iceland_svg', { svg: svg });
    option = {
      geo: {
        map: 'iceland_svg',
        left: 0,
        right: 0
      },
      series: {
        type: 'custom',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 1,
        data: [
          [488, 459, 100],
          [770, 757, 30],
          [1180, 743, 80],
          [894, 1188, 61],
          [1372, 477, 70],
          [1378, 935, 81]
        ],
        renderItem(params, api) {
          const coord = api.coord([
            api.value(0, params.dataIndex),
            api.value(1, params.dataIndex)
          ]);

          const circles = [];
          for (let i = 0; i < 5; i++) {
            circles.push({
              type: 'circle',
              shape: {
                cx: 0,
                cy: 0,
                r: 30
              },
              style: {
                stroke: 'red',
                fill: 'none',
                lineWidth: 2
              },
              // Ripple animation
              keyframeAnimation: {
                duration: 4000,
                loop: true,
                delay: (-i / 4) * 4000,
                keyframes: [
                  {
                    percent: 0,
                    scaleX: 0,
                    scaleY: 0,
                    style: {
                      opacity: 1
                    }
                  },
                  {
                    percent: 1,
                    scaleX: 1,
                    scaleY: 0.4,
                    style: {
                      opacity: 0
                    }
                  }
                ]
              }
            });
          }
          return {
            type: 'group',
            x: coord[0],
            y: coord[1],
            children: [
              ...circles,
              {
                type: 'path',
                shape: {
                  d:
                    'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
                  x: -10,
                  y: -35,
                  width: 20,
                  height: 40
                },
                style: {
                  fill: 'red'
                },
                // Jump animation.
                keyframeAnimation: {
                  duration: 1000,
                  loop: true,
                  delay: Math.random() * 1000,
                  keyframes: [
                    {
                      y: -10,
                      percent: 0.5,
                      easing: 'cubicOut'
                    },
                    {
                      y: 0,
                      percent: 1,
                      easing: 'bounceOut'
                    }
                  ]
                }
              }
            ]
          };
        }
      }
    };

    myChart.setOption(option);
  });

加载 Lottie 动画

为了充分发掘出新的关键帧动画的能力，ECharts 团队的沈毅写了一个 Lottie 动画的解析库，可以将 Lottie 动画文件解析成 ECharts 的图形格式进行渲染。结合 Lottie 的表达力我们可以进一步的在我们的项目中绘制出细腻的动画。

图形组件过渡动画

我们在 5.0 里为自定义系列中返回的图形提供了更灵活的过渡动画配置。可以通过transition, enterFrom, leaveTo三个配置项来配置每个图形哪些属性会拥有过渡动画，当图形创建和被移除的时候该执行怎么样的动画。例如：

function renderItem() {
  //...
  return {
    //...
    x: 100,
    // 'style', 'x', 'y' 会被动画
    transition: ['style', 'x', 'y'],
    enterFrom: {
      style: {
        // 淡入
        opacity: 0
      },
      //从左侧飞入
      x: 0
    },
    leaveTo: {
      // 淡出
      opacity: 0
    },
    // 向右侧飞出
    x: 200
  };
}

在 5.3.0 中我们把这些过渡动画的配置扩展到了图形（graphic）组件中，并且做了更多的增强：

如果你不想一一写出每个要动画的属性，现在你可以直接配置transition: 'all'为所有属性都加上动画过渡。

与此同时我们还新增了enterAnimation、updateAnimation、leaveAnimation分别配置每个图形入场、更新、出场动画的时长（duration）、延迟（delay）和缓动（easing）。除此之外，渐变色现在也支持动画了。

全新的 SVG 渲染器

在 5.3.0 中我们重构了我们的 SVG 渲染器，新的 SVG 渲染器能够带来 2x ~ 10x 的性能提升，在某些特殊场景中甚至能有数十倍的提升。

之前的 SVG 渲染器我们直接从渲染队列更新到 DOM。但是因为 zrender 的图形属性跟 DOM 并不是一一对应的，因此中间需要实现非常复杂的 Diff 逻辑，容易出错而且在某些场景下性能并不能做到最好。在这个版本我们重构成先全量渲染到 VDOM，然后再将 VDOM patch 到 DOM 完成渲染。全量渲染可以避免复杂的 Diff 逻辑带来的潜在 Bug。而 VDOM 和 DOM 的一一对应可以保证在 patch 的时候保证更新是最少的，从而带来巨大的性能提升。

这个例子 可以给大家带来比较直观的性能提升的感受。新的版本在 SVG 模式下拖动的交互上比之前版本流畅非常多。

5.2.2 (Before)	5.3.0 (After)

	

除了性能的提升，我们还可以使用中间全量渲染得到的 VDom 做更多的事情，比如下面会介绍的服务端渲染。

零依赖的服务端渲染

在之前的版本 ECharts 也可以实现服务端的渲染，但是必须得依赖 node-canvas，如果是使用 SVG 模式则需要依赖 JSDOM 来模拟 DOM 环境。这些依赖一是带来了额外的体积和使用要求，二是也会有更多的性能损耗。

这次新的 SVG 渲染器可以让我们从中间的 VDOM 渲染得到字符串，带来了完全零依赖的服务端渲染，输出更精简并且带有 CSS 动画的 SVG 字符串。

const echarts = require('echarts');

// 在 SSR 模式下第一个参数不需要再传入 DOM 对象
const chart = echarts.init(null, null, {
  renderer: 'svg', // 必须使用 SVG 模式
  ssr: true, // 开启 SSR
  width: 400, // 需要指明高和宽
  height: 300
});

// 像正常使用一样 setOption
chart.setOption({
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
      type: 'bar'
    }
  ]
});

// 输出字符串
const svgStr = chart.renderToSVGString();

在此基础上，我们优化了输出的 SVG 字符串，使其在诸如 PowerPoint 等更多的平台上有更好的显示效果。

自定义地图投影

地图一直是 ECharts 中使用非常广泛的组件。一般地图组件会使用存储了经纬度的 GeoJSON 格式的数据。而 ECharts 则计算出合适的显示区域然后把经纬度线性映射到这个区域。这是一种最简单的地图投影方式。但是简单的线性投影并无法满足某些复杂的地图场景，例如使用 Albers 投影解决线性投影中面积失真的问题，或者在世界地图中让太平洋显示在中间等等。

因此在 5.3.0 里中我们引入了自定义的地图投影，可以通过project和unproject两个方法告诉 ECharts 如何投影坐标，以及如何根据投影后坐标计算经纬度。下面是简单的使用墨卡托投影的例子：

series = {
  type: 'map',
  projection: {
    project: point => [
      (point[0] / 180) * Math.PI,
      -Math.log(Math.tan((Math.PI / 2 + (point[1] / 180) * Math.PI) / 2))
    ],
    unproject: point => [
      (point[0] * 180) / Math.PI,
      ((2 * 180) / Math.PI) * Math.atan(Math.exp(point[1])) - 90
    ]
  }
};

除了我们自己实现投影公式，我们也可以使用 d3-geo 等第三方库提供的现成的投影实现：

const projection = d3.geoConicEqualArea();
// ...
series = {
  type: 'map',
  projection: {
    project: point => projection(point),
    unproject: point => projection.invert(point)
  }
};

配合在 5.2 里新增的全局过渡动画特性，我们可以实现不同投影效果之间的动画过渡：

除了地图的投影之外，我们在这个版本对于地图还做了下面两个增强：

对 GeoJSON 数据提供了'LineString'和'MultiLineString'的支持。
将默认标签位置的计算从包围盒中心改为最大区域的重心坐标，计算结果更加准确。
多坐标轴的刻度对齐

多坐标轴的刻度对齐是社区中提了很久的一个需求，我们在网上也可以看到很多开发者写的如何在 ECharts 中实现坐标轴对齐的文章，通常都会比较麻烦而且会有比较多的局限性。

在 5.3.0 中我们终于引入了数值轴坐标轴刻度对齐的功能。可以在需要对齐刻度的坐标轴中配置alignTicks: true。该坐标轴就会根据第一个坐标轴的刻度划分去调整自己的刻度，实现自动对齐。

option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      alignTicks: true,
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      // prettier-ignore
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: 'Precipitation',
      type: 'bar',
      // prettier-ignore
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};

支持高亮和选中状态的关闭

ECharts 中高亮状态可以在鼠标移到图形上的时候给用户提供反馈，但是在图表中有海量图形的时候，高亮的动画也可能带来交互上的性能问题。特别在 tooltip 或者图例组件联动触发的高亮会同时高亮多个图形。

因此在这个版本中我们新增了emphasis.disabled配置项。如果不需要高亮的反馈，又对交互性能非常在意的话，可以通过这个配置项来关闭高亮状态。

与此同时，对于选中状态，我们也新增了select.disabled。该配置项可以用于细粒度配置部分数据不可选。

支持整个系列的选中

在 5.3.0 中我们支持将selectedMode配置为'series'以实现系列所有数据的选中。

tooltip 中的数值格式化

tooltip 可以在用户移到图形上的时候通过提示框显示更详细的相关信息，ECharts 也提供了formatter回调函数可以让开发者更灵活的自定义提示框的内容。

但是我们发现大部分时候开发者只是需要格式化提示框中的数字部分，例如固定精度，加上$前缀等等，而之前为了格式化数字开发者只能通过formatter重写整个提示框的内容。特别是在 5.0 后 ECharts 的提示框结构更复杂，样式更美观了，重写变得成本很大而且很难达到默认的效果。

因此在这个版本我们为 tooltip 新增了valueFormatter配置项用于数值部分的格式化。

还是刚才那个坐标轴对齐的例子，我们可以为提示框中的数值部分加上 °C 和 ml 的后缀。

option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      alignTicks: true,
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      tooltip: {
        valueFormatter: value => value + ' ml'
      },
      // prettier-ignore
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: 'Precipitation',
      type: 'bar',
      tooltip: {
        valueFormatter: value => value + ' ml'
      },
      // prettier-ignore
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: value => value + ' °C'
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};


每个系列都可以根据自己的数值格式配置自己的valueFormatter。

更灵活的扇区圆角

在 5.0 中我们为扇区新增了圆角的配置，可以让饼图，旭日图变得更有趣。之前圆角的配置只支持内半径和外半径分开配置，这次我们更进一步，支持扇区的四个角都配置成不同的圆角大小，带来更灵活的呈现。

option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['30%', '70%'],
      roseType: 'angle',
      itemStyle: {
        borderRadius: [20, 5, 5, 10],
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      data: [
        { value: 800, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 400, name: 'Video Ads' }
      ]
    }
  ]
};

饼图的复杂标签优化

饼图一直是 ECharts 中标签呈现最复杂的图表之一，我们从 5.0 开始就一直在饼图的标签布局、显示上做了很多的优化。

这次我们针对使用了换行，背景色，富文本等格式比较复杂的饼图标签做了深度的优化。在宽度的自适应、超出容器、引导线的计算上比之前有了更好的效果：

5.2.2 (Before)	5.3.0 (After)

	


	
柱状图 large 模式优化

在数据量很多（> 2k）的时候，我们支持柱状图通过开启 large 模式来加速渲染，提升交互性能，但是之前 large 模式下对柱状图布局比较简单，不支持多系列堆叠后的布局。在 5.3.0 中我们对 large 模式的布局进行了优化，跟普通模式保持了一致性。我们可以在更多的场景中通过开启 large 来优化柱状图的性能。

除此之外，优化后的柱状图布局也修复了在对数轴这样的非线性轴上堆叠效果不正确的 bug。

非兼容改动
registerMap 和 getMap 方法需要在引入地图组件后才能使用

为了减少最小打包的体积，我们从核心模块中移除了地图数据管理的方法getMap和registerMap。

如果你是按需引入 ECharts 组件的话，需要保证先引入了GeoComponent或者MapChart之后，才能使用registerMap注册地图数据。

import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';

echarts.use([MapChart]);

// 必须在使用 use 方法注册了 MapChart 后才能使用 registerMap 注册地图
echarts.registerMap('world', worldJSON);

如果你是使用import * as echarts from 'echarts'全量引入，这次改动不会对你产生任何影响。

折线图移除默认高亮加粗的效果

我们在 5.0 里对折线图引入了默认高亮加粗的效果，但是社区反馈这个在很多场景效果并不好，所以在这个版本我们将这个效果从默认开启改为默认关闭，如果需要使用高亮加粗，则可以显式配置：

series = {
  type: 'line',
  //...
  emphasis: {
    lineStyle: {
      width: 'bolder'
    }
  }
};
完整更新记录

查看版本更新

---


Title: 5.4 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/5-4-0

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
在图表中，部分可交互元素可能比较小，有时候用户不易准确地进行点击等操作，移动端尤其如此。因此，在 Apache ECharts 5.4.0 中，我们引入了“智能指针吸附”的概念。

具体请参见智能指针吸附。

在更多坐标系中使用饼图

Apache ECharts 一个很强大的功能就是各种图表类型、坐标系、组件的组合。在这个版本中，我们为饼图增加了坐标系的配置项。

于是，饼图可以出现在直角坐标系：

日历坐标系：

地理坐标系：

等等各种坐标系中，甚至可以和百度地图扩展联动，在地图上显示饼图：

这大大扩展了饼图的灵活性，让开发者可以使用 Apache ECharts 创作出更多图表的组合效果。

新增乌克兰语翻译

在这个版本中，我们支持了乌克兰语。目前 Apache ECharts 已支持 17 种语言！

如果需要使用除中英文以外的语言，需要在初始化图表前，先调用 echarts.registerLocale 初始化，然后在 init 时候传入 opts.locale 修改图表语言。

仪表盘文字旋转

在这个版本中，我们支持了仪表盘的文字旋转。

axisLabel.rotate 可以设为 'tangential' | 'radial' | number。如果是 number 类型，则表示标签的旋转角，从 -90 度到 90 度，正值是逆时针。除此之外，还可以是字符串 'radial' 表示径向旋转、'tangential' 表示切向旋转。

完整更新记录

查看版本更新

---


Title: 5.5 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/5-5-0

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
以前，ECharts 只在 npm（npm 包的 lib 目录中）导出 *.esm 文件。虽然这在 bundlers 环境表现良好，但 Node.js 环境和一些基于 Node.js 的测试框架（如 vitest 和 jest）中的表现并不理想。

有了这个新功能，我们做了几个改变以改善这个问题：

在 package.json 中添加了 "type": "module"
在 package.json 中添加了 "exports": {...}
在子目录中添加了一些只包含 "type": "commonjs" 的 package.json 文件

这些改变意味着，像 echarts/core.js 这样的文件现在可以在像纯 Node.js、vitest、jest 和 create-react-app 这样的环境中解析为 ESM。

我们还确保了这个新功能与各种环境兼容，包括运行时（Node.js/vitest/jest（create-react-app）/ssr/…）和打包器（webpack/rollup/vite/esbuild/…）。

我们非常期待这一新功能，并相信它将极大地改善开发者的体验。

服务端渲染 ＋ 客户端轻量运行时

Apache ECharts 功能强大，相应地，包体积也比较大。我们在之前的版本中也做了各种努力来改进这一点。开发者可以使用 TreeShaking 按需加载部分代码，以减少加载的代码量。从 Apache ECharts 5.3 版本起，我们支持了零依赖的服务端 SVG 字符串渲染方案，并支持图表的初始动画。这样，使用服务端渲染的结果作为首屏渲染的画面，可以大大减少首屏加载时间。

服务端渲染虽然是一种很有效减少包体积的解决方案，但如果需要在客户端实现一些交互，那么不得不仍旧加载 echarts.js，这可能会增加更多的加载时间。对于一些对页面加载速度要求较高的场景，这可能不是一个理想的选择。

在 5.5.0 版本中，我们新增了客户端轻量运行时，客户端无需加载完整 ECharts 即可实现部分交互。这样，我们可以在服务端渲染图表，然后在客户端加载轻量运行时，实现一些常见的交互。这意味着，只需要加载 4KB 的轻量运行时（gzip 后 1KB），即可实现带初始动画和部分常用交互形式的图表。这一改进将极大地提升页面加载速度，特别是对于移动端的体验。

以这个带标题的饼图为例，如果按客户端仅打包饼图和标题组件的方案，gzip 后需要 135KB；如果按服务端渲染的方案，渲染结果 SVG gzip 后 1 KB、客户端运行时 gzip 后 1KB，仅为前者体积的 1.5%。交互方面，后者也可以做到初始动画、鼠标移动到图表元素后的高亮，并且获取到点击事件，能够满足大部分的常见交互需求。

如需使用这一方案，服务端代码和之前一样，但需要保证 ECharts 版本号在 5.5.0 以上。

// 服务端代码
const echarts = require('echarts');

// 在 SSR 模式下第一个参数不需要再传入 DOM 对象
let chart = echarts.init(null, null, {
  renderer: 'svg', // 必须使用 SVG 模式
  ssr: true, // 开启 SSR
  width: 400, // 需要指明高和宽，如果是根据客户端容器大小动态的，该值需要从客户端得到
  height: 300
});

// 像正常使用一样 setOption
chart.setOption({
  //...
});

// 输出字符串
const svgStr = chart.renderToSVGString();

// 调用 dispose 以释放内存
chart.dispose();
chart = null;

// 通过 HTTP Response 返回 svgStr 给前端或者缓存到本地（这里以 Express.js 为例）：
res.writeHead(200, {
  'Content-Type': 'application/xml'
});
res.write(svgStr);
res.end();

客户端将得到的 SVG 字符串添加到容器中，并绑定轻量运行时：

<div id="chart-container" style="width:800px;height:600px"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts/ssr/client/dist/index.min.js"></script>
<script>
const ssrClient = window['echarts-ssr-client'];

const isSeriesShown = {
  a: true,
  b: true
};

function updateChart(svgStr) {
  const container = document.getElementById('chart-container');
  container.innerHTML = svgStr;

  // 使用轻量运行时赋予图表交互能力
  ssrClient.hydrate(container, {
    on: {
      click: (params) => {
        if (params.ssrType === 'legend') {
          // 点击图例元素，请求服务器进行二次渲染
          isSeriesShown[params.seriesName] = !isSeriesShown[params.seriesName];
          fetch('...?series=' + JSON.stringify(isSeriesShown))
            .then(res => res.text())
            .then(svgStr => {
              updateChart(svgStr);
            });
        }
      }
    }
  });
}

// 通过 AJAX 请求获取服务端渲染的 SVG 字符串
fetch('...')
  .then(res => res.text())
  .then(svgStr => {
    updateChart(svgStr);
  });
</script>

客户端轻量运行时必须配合 SVG 形式的服务端渲染结果使用，支持以下交互：

图表初始动画（实现原理：服务端渲染的 SVG 带有 CSS 动画）
高亮样式（实现原理：服务端渲染的 SVG 带有 CSS 动画）
动态改变数据（实现原理：轻量运行时请求服务器进行二次渲染）
点击图例切换系列是否显示（实现原理：轻量运行时请求服务器进行二次渲染）

可以发现，这能够满足大部分的交互场景需求。如果需要更复杂的交互，则客户端需要加载 echarts.js 实现完整功能。完整的介绍请参见服务端渲染 ECharts 图表。

数据下钻支持过渡动画

在 5.5.0 版本中，我们新增了 childGroupId 配置项，可以实现数据下钻的过渡动画功能。

在之前的版本中，我们已经支持使用 groupId，用以表示当前数据所属的组别。而这次新增的 childGroupId 则可以用来表明当前数据本身的组别，与 groupId 配合使用后形成一个“父-子-孙”的关系链条。当用户点击图表中的数据元素时，图表会以过渡动画的形式展示下钻的数据。

开发者只需要指定 groupId 和 childGroupId，ECharts 就会自动处理层级关系，实现过渡动画。

饼图支持扇区之间的间隔

通过设置饼图扇区之间的间隔，可以让饼图的数据块之间更加清晰，并且形成独特的视觉效果。参见（series-pie.padAngle）。

饼图和极坐标系支持结束角度

结束角度的配置项使得我们可以制作半圆形等不完整的饼图。参见（series-pie.endAngle）。

极坐标系也同样支持了结束角度，可以制作出更加丰富的极坐标图表。参见（angleAxis.endAngle）。

新增 min-max 采样方式

ECharts 的 sampling 配置项允许设置折线图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率。在 5.5.0 版本中，我们新增了 min-max 采样方式，可以在保留数据的整体趋势的同时，更加精确的展示数据的极值。

新增两种语言：阿拉伯语和荷兰语

在 5.5.0 版本中，我们新增了阿拉伯语（AR）和荷兰语（NL）两种语言的支持。开发者可以通过 echarts.registerLocale 方法注册新的语言包。

提示框支持指定容器

在之前的版本中，提示框（Tooltip）只能插入到图表容器或者 document.body 中。现在，可以通过 tooltip.appendTo 指定容器，从而能更灵活地控制提示框的位置。

坐标轴最大、最小标签的对齐方式

在 5.5.0 版本中，我们新增了 axisLabel.alignMinLabel 和 axisLabel.alignMaxLabel 配置项，可以控制坐标轴最大、最小标签的对齐方式。如果图表绘图区域比较大，不希望坐标轴标签溢出，可以将最大、最小标签分别对齐到右和左。

象形柱图支持裁剪

象形柱图可能存在超过绘图区域的情况，如果希望避免这种情况，可以通过 series-pictorialBar.clip 配置项进行裁剪。

提示框 valueFormatter 增加 dataIndex 参数

valueFormatter 可以用来自定义提示框内容中数值的部分，现在新增了 dataIndex 参数，可以用来获取当前数据的索引。

完整更新记录

查看版本更新

---


Title: 5.6 - 版本特性 - 入门篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/basics/release-note/5-6-0

ECharts 6 特性介绍
v5 升级 v6 指南
5.0
v4 升级 v5 指南
5.2
5.3
5.4
5.5
5.6
ECharts 地图使用 GeoJson 格式定义数据。理论上出于“数据、样式分离的原则”，GeoJson 只负责定义数据，样式应该在 ECharts 中定义。但有些情况下，样式本身也是数据的一种表达（例如：对于争议国界使用虚线表示，这时候“虚线”是一种样式，但是它实际上表达的是数据的概念，所以在 GeoJson 中定义样式是合理的）。

在 ECharts 5.6.0 中，我们支持在原始 GeoJson 数据中定义区域样式，通过指定 features[].properties.echartsStyle 来定义样式，和 data 一样，支持配置 itemStyle、label、tooltip 等属性。示例：

geoJSON.features[0].properties.echartsStyle = {
    itemStyle: {
        areaColor: 'green'
    }
}

geoJSON.features[1].properties.echartsStyle = {
    selected: true,
    label: {
        formatter: 'Default Selected:\n{b}'
    }
}

geoJSON.features[2].properties.echartsStyle = {
    itemStyle: {
        borderType: 'dotted',
        borderColor: 'blue'
    }
}

geoJSON.features[11].properties.echartsStyle = {
    itemStyle: {
        // This region will be overridden as `cyan` by the data item option
        areaColor: 'black'
    },
    tooltip: {
        formatter: function (params) {
            return 'This is a custom tooltip from GeoJSON: ' + params.name;
        }
    }
}
坐标轴标签支持提示框

在有些情况下，坐标轴标签过长，或我们希望在坐标轴标签上显示更多信息，在 ECharts 5.6.0 中，我们支持在坐标轴标签上添加提示框。使用方法和 tooltip 的配置项一致，具体可以参考 axis.tooltip 文档。

旭日图支持聚焦所有子孙和祖先节点

在之前版本的旭日图中，emphasis.focus 支持以下几种值：

'none' 不淡出其它图形，默认使用该配置。
'self' 只聚焦（不淡出）当前高亮的数据的图形。
'series' 聚焦当前高亮的数据所在的系列的所有图形。
'adjacency' 聚焦关系图中的邻接点和边的图形。

在 ECharts 5.6.0 中，我们新增了 'relative' ，表示聚焦所有子孙和祖先节点。

新增两种语言支持

在这个版本中，新增了瑞典语和波斯语的支持。至此，ECharts 已经支持 22 种语言。

折线图性能优化

在这个版本中，我们优化了折线图的渲染性能，解决了折线图内存随时间增长的问题。

完整更新记录

查看版本更新

下一个大版本 Apache ECharts 6.0.0 正在火热开发中，预计于 2025 年一季度末发布，敬请期待。

---
