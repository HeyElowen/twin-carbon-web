# ECharts 使用手册 — 进阶应用篇

> 来源：Apache ECharts 官方使用手册（https://echarts.apache.org/handbook/zh/）
> 整理时间：2026-05-17
> 用途：开发参考，可按需加载到上下文中

---



Title: SVG 底图 - 地理坐标系（Geo） - 常用组件 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/component-types/geo/svg-base-map

地理坐标系（Geo） 
SVG 底图
从 v5.1.0 开始，ECharts 支持在 地理坐标系（geo） 和 地图系列（map series） 中使用 SVG 作为底图。之前只支持 GeoJSON 格式的底图。

有了这个功能，ECharts 能在任一种渲染模式（canvas 渲染模式和 svg 渲染模式）中绘制 SVG 底图，并且能够只用简单的 ECharts 配置项（option）就带来 放大、平移、点选（select）、高亮强调（emphasis）、聚焦-淡出（focus-blur）、标签（label）、标签布局（labelLayout）、提示框（tooltip） 等特性。ECharts 中的所有在 地理坐标系（geo） 中可用系列（如 散点图（scatter）、特效散点图（effectScatter），路径图（lines），自定义系列（custom））也能显示在 SVG 底图上。

这些是使用 SVG 底图的例子：

庖丁解牛 | 内脏数据 | 航班选座 | 地图 | 散点图 | 路径图 | 交通

基本用法

SVG 底图的用法与 GeoJSON 底图的用法相同。

如果在 地理坐标系（geo） 中使用：
$.get('map/organ.svg', function (svg) {
    // 首先向 echarts 注册 SVG 字符串或解析过的 SVG DOM
    echarts.registerMap('organ_diagram', {svg: svg});

    var chart = echarts.init(document.getElementById('main'))。
    chart.setOption({
        geo: [{
            // 引用注册过的底图。
            map: 'organ_diagram',
            ...
        }]
    });
});

如果在 地图系列（map series） 中使用：
$.get('map/beef_cuts.svg', function (svg) {
    // 首先向 echarts 注册 SVG 字符串或解析过的 SVG DOM
    echarts.registerMap('beef_cuts_diagram', {svg: svg})。

    var chart = echarts.init(document.getElementById('main'))。
    chart.setOption({
        series: {
            type: 'map',
            // 引用注册过的底图。
            map: 'beef_cuts_diagram',
            ...
        }
    });
});

缩放和平移

地理坐标系（geo）
option = {
    geo: {
        // 启用缩放和平移。
        roam: true,
        ...
    }
};
地图系列（map series）
option = {
    series: {
        type: 'map',
        // 启用缩放和平移。
        roam: true,
        ...
    }
};

参见例子 roam、SVG 地图。

具名元素

如果要控制 SVG 中的某些元素，或者让某些元素能交互，我们首先要在 SVG 中标记这些元素：在这些元素上添加 name 属性（下文称此类添加过 name 属性的元素为：“具名元素”）。许多功能（如 select、emphasis、focus-blur、label、labelLayout 和 tooltip 这类交互相关的功能）都依赖于对元素的命名。

如下例，我们只在左边的 SVG path 上添加名称属性 name="named_rect"：
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.2" fill-rule="evenodd" xml:space="preserve">
    <path name="named_rect" d="M 0,0 L 0,100 100,100 100,0 Z" fill="#765" />
    <path d="M 150,0 L 150,100 250,100 250,0 Z" fill="#567" />
</svg>
这样，鼠标 hover 时能高亮左边的矩形，但是右边的不行。

我们还可以在 geo.regions 中为具名元素指定一些专属配置项：
option = {
    geo: {
        map: 'some_svg',
        regions: [{
            name: 'element_name_1',
            itemStyle: { ... }
        }, {
            name: 'element_name_2',
            itemStyle: { ... }
        }]
    }
};

注意:

只有这些 SVG 元素可以被命名： rect、circle、line、ellipse、polygon、polyline、path、text、tspan、g。
支持多个元素以相同的名称命名，这样它们能被同时高亮、选中。
自定义样式

虽然 SVG 元素的样式（如颜色、字体、线宽等等）都能直接在 SVG 文件中定义，但 ECharts 也支持在 option 中为具名元素定制样式，这能提供不少便利。

可以在 geo.itemStyle 或 series-map.itemStyle 中设置样式（也包括 emphasis.itemStyle、select.itemStyle、blur.itemStyle、regions[i].itemStyle、regions[i].emphasis.itemStyle、regions[i].select.itemStyle、regions[i].blur.itemStyle）。也能在这里删除一些具名元素的默认样式（例如，设置 emphasis.itemStyle.color: null 后，鼠标 hover 时填充色就不会改变）。

此外，使用 series-map 时，也可以用 visualMap 组件 为具名元素赋予样式。参见例子 庖丁解牛。

注意： 只有这些具名元素可以在 itemStyle 中设置样式： rect、circle、line、ellipse、polygon、polyline、path。

元素的“选中”能力（select）

如果想使具名元素能被“选中”，把 geo.selectedMode 或 series-map.selectedMode 设置为 'single' 或者 'multiple' 即可。元素被选中时的样式可以在 geo.select 或 series-map.select 中设定。

可以通过 geoselectchanged 事件获得所有被选中者的名称，例如：
myChart.on('geoselectchanged', function (params) {
    var selectedNames = params.allSelected[0].name;
    console.log('selected', selectedNames);
});

参见例子 航班选座。

元素的“高亮强调”（emphasis）和“聚焦-淡出”（focus-blur）

具名元素可以自动在鼠标 hover 时有“高亮强调”（emphasis）的能力。

此外，可以把 geo.emphasis.focus 设置为 'self' 来启用 “聚焦-淡出”（focus-blur）功能。也就是，当鼠标 hover 在一个具名元素上时，所有其他元素都会被淡出。

参见例子 Organ Visualization。

提示框（tooltip）

可以在具名元素上启用或禁用提示框（tooltip）功能。
option = {
    // 在 option 根部声明 tooltip 以整体开启 tooltip 功能。
    tooltip: {},
    geo: {
        map: 'some_svg',
        tooltip: {
            // 用 `show` 来启用/禁用 geo 上的 tooltip。
            show: true
        },
        regions: [{
            name: 'some_name1',
            // 如果需要的话，可以对特定具名元素指定 tooltip 参数。
            tooltip: {
                formatter: '一些特殊的提示 1'
            }
        }, {
            name: 'some_name2',
            tooltip: {
                formatter: '一些特殊的提示 2'
            }
        }]
    }
};

如果想单独禁用 geo 上的 tooltip，只需：
option = {
    tooltip: {},
    geo: {
        map: 'some_svg',
        tooltip: {
            show: false
        }
    }
};

参见例子 SVG 地图。

标签（label）

虽然可以直接在 SVG 中定义 <text>/<tspan> 来显示文本标签，但 ECharts 也支持用 geo.label 或 series-map.label 来设置底图上的标签。

标签功能默认在鼠标 hover 时是启用的。如果想禁用标签，只需：
option = {
    geo: {
        map: 'some_svg',
        emphasis: {
            label: {
                show: false
            }
        }
    }
};

当想要多个元素共享一个标签时，我们有两种选择：

将这些元素包裹在一个具名的 <g> 中（如 <g="name_a">）中，这样只会显示一个标签，并且基于 <g> 的 boundingRect 定位。
给这些元素起相同的名字（如 <path name="name_b"/><path name="name_b"/>），这样每个元素都会显示一个标签，并且会根据每个元素自身显示和定位。

例如（将鼠标 hover 到元素上能显示标签）：

注意：只有这些具名元素可以设置 label： rect、circle、line、ellipse、polygon、polyline、path、g。

标签的用法也参见示例 Organ Visualization。

事件

可以用如下方式监听具名元素的鼠标事件或者触摸事件：
// 'name1' 是一个 SVG 元素的名字。
myChart.on('click', { geoIndex: 0, name: 'name1' }, function (params) {
    console.log(params);
});

SVG 底图的布局

在默认情况下，ECharts 会将 SVG 底图放置在画布的中心。如果需要调整的话，一般只调整 layoutCenter/layoutSize，偶尔也可能要调整 <svg viewBox="...">/geo.boundingCoords（它们两个的区别是：是否产生剪裁）。在大多数情况下，用这些已经足够了。

如果要做一些精确的位置定制，那么还得了解下面这些概念。

地理坐标系（geo） 和 地图系列（map series） 的布局规则和选项都是一样的。所以下面我们只讲 地理坐标系（geo）。

上面的例子只有一个 ECharts 画布，其中三个 SVG 展示在六个 地理坐标系（geo） 中。同一列中的两个 地理坐标系（geo） 使用相同的 SVG。

首先，形状的外观是由 SVG 文件本身决定的。也就是说，在上例中，由 <circle> 和 viewBox 属性决定（viewBox 会切割圆形）。可以注意，每一列的形状轮廓都一样（不管它们的位置、大小是否不同和是否被拉伸），因为它们使用的是同一个 SVG。

其次，用户可以用下面任一组选项，指定 地理坐标系（geo） 的视口（view port）的位置和大小（它们的单位都是 echarts 画布的像素，或者百分比值）：

layoutCenter、layoutSize（最常用）。
top、right、bottom、left（在上例中使用的是这组）。

在上例中，六个 geo view port 用六个黑色方块表示。

第三，确定 SVG 的 bounding rect。bounding rect 由以下方法决定（它们的单位都是 SVG 内部元素的度量单位）：

如果设定了 geo.boundingCoords，则用它作 bounding rect。
否则，如果设定了 <svg width="..." height="...">，则用 [0, 0, width, height] 作为 bounding rect。（如果只设定了 width 或 height，则只使用 [0, width] 或 [0, height]）。
否则，如果设定了 <svg viewBox="...">，则用 viewBox 作 bounding rect。
否则，由整个 SVG 所有元素 bounding rect 的并集得到最终 bounding rect。
如果设定了 geo.center 或 geo.zoom，则把上述 1~4 得到的 bounding rect 进行相应的 transform。

bounding rect 确定后，会放置到相应的 geo view port 里：

如果用的是 layoutCenter、layoutSize，bounding rect 会置于 geo view port 的中心，并尽量填满 geo view port（保持长宽比）。
如果用的是 top、right、bottom、left，bounding rect 会被拉伸，完全填充 geo view port。
在 SVG 底图上绘制系列

scatter、effectScatter、lines、custom 这些在 地理坐标系（geo） 中可用的系列都可以在 SVG 底图上定位和显示。

在这种用法中，series.data 的值的单位即为是 SVG 内部元素的度量单位。比如说：
option = {
    geo: {
        map: 'some_svg'
    },
    series: {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        data: [
            // SVG local coords.
            [488.2358421078053, 459.70913833075736],
            [770.3415644319939, 757.9672194986475],
            [1180.0329284196291, 743.6141808346214],
        ]
    }
};

另外，有种简便方法可以获得 SVG 的坐标。
myChart.setOption({
    geo: {
        map: 'some_svg'
    }
});
myChart.getZr().on('click', function (params) {
    var pixelPoint = [params.offsetX, params.offsetY];
    var dataPoint = myChart.convertFromPixel({ geoIndex: 0 }, pixelPoint);
    // 在 SVG 上点击时，坐标会被打印。
    // 这些坐标可以在 `series.data` 里使用。
    console.log(dataPoint);
});

参见示例 SVG Scatter、SVG Lines、SVG Traffic。

暂不支持的 SVG 功能

实现一个完整的 SVG 解析器有点困难。虽然已经支持了常用的 SVG 功能，但至少下面列出的这些还没支持：

翻转（flip）和倾斜（skew）（将在 v5.1.2 支持）：
不支持 transform: skew(...)（包括包含 skew 的 transform: matrix(...)）。
不支持当 transform: scale(x, y) 中 x/y 正负不同且有 rotate（例如，scale: (1, -1), rotate(90)）。
不支持 <style> 标签。
但内联样式是支持的（例如支持 <path style="color:red" />）。
单位：
只支持 px。不支持其他单位如 width="231.65mm"。
不支持百分比值，如不支持 <svg width="30%" height="40%">。
<defs> 标签：
只支持 <linearGradient>、<radialGradient>。
还不支持在 <defs> 中定义其他元素（如 <pattern>、<path>、...）。
<linearGradient>、<radialGradient>：
不支持 fx、fy。
不支持 gradientTransform。
fill:url(..), stroke:utl(..)：
只支持 url(#someId)。
不支持其他 URL 模式，例如不支持：
url(https://example.com/images/myImg.jpg)。
url(data:image/png;base64,iRxVB0...)。
url(myFont.woff)。
<switch> 标签：
<switch> 标签内的所有内容都会显示。不支持“切换”功能。
<text>。
不支持 textPath。
不支持 Addressable character，也就是说：
<!-- 不支持： -->
<tspan x="0 4.94 9.89">abc</tspan>。
<!-- 支持： -->
<tspan x="0">A</tspan>
<tspan x="4.94">b</tspan>
<tspan x="9.89">C</tspan>

---


Title: 服务端渲染 - 跨平台方案 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/cross-platform/server

服务端渲染
微信小程序
百度智能小程序
通常情况下，Apache EChartsTM 会在浏览器中动态的渲染图表，并且根据用户的交互来更新渲染。但是在下面这些比较特殊的场景，我们也需要在服务端中渲染图表并且输出到浏览器中：

需要缩短前端的渲染时间，保证第一时间显示图表
需要在 Markdown, PDF 等不支持动态运行脚本的环境中嵌入图表

在这些场景下，ECharts 也提供了两种服务端渲染（server-side rendering，SSR）的方案：SVG 渲染或 Canvas 渲染。

渲染方案	渲染结果的形式	优点
服务端 SVG 渲染	SVG 字符串	比 Canvas 图片体积更小；
矢量 SVG 图片不会模糊；
支持初始动画
服务端 Canvas 渲染	图片	图片形式适用场景更广泛，对不支持 SVG 的场景可选择

通常情况下，应优先考虑使用服务端 SVG 渲染方案，如果 SVG 不适用，也可以考虑 Canvas 渲染方案。

使用服务端渲染也有一定的局限性，尤其是和交互相关的一些操作无法支持。因此，如果有交互需求，可参考下文的“服务端渲染 Hydration”。

服务端渲染
服务端 SVG 渲染

版本更新：

5.3.0 版本：使用零依赖的服务端 SVG 字符串渲染方案，并支持图表的初始动画
5.5.0 版本：新增客户端轻量运行时，客户端无需加载完整 ECharts 即可实现部分交互

5.3.0 里新引入了零依赖的服务端 SVG 字符串渲染方案：

// 服务端代码
const echarts = require('echarts');

// 在 SSR 模式下第一个参数不需要再传入 DOM 对象
let chart = echarts.init(null, null, {
  renderer: 'svg', // 必须使用 SVG 模式
  ssr: true, // 开启 SSR
  width: 400, // 需要指明高和宽
  height: 300
});

// 像正常使用一样 setOption
chart.setOption({
  //...
});

// 输出字符串
const svgStr = chart.renderToSVGString();

// 如果不再需要图表，调用 dispose 以释放内存
chart.dispose();
chart = null;

整体使用的代码结构跟在浏览器中使用一样，首先是init初始化一个图表实例，然后通过setOption设置图表的配置项。但是init传入的参数会跟在跟浏览器中使用有所不同：

首先因为在服务端会采用字符串拼接的方式来渲染得到 SVG，我们并不需要容器来展示渲染的内容，所以我们可以在init的时候第一个container参数传入null或者undefined。
然后我们在init的第三个参数中，我们需要通过显示指定ssr: true来告诉 ECharts 我们需要开启服务端渲染的模式，该模式下 ECharts 会关闭动画循环的模块以及事件交互的模块。
在服务端渲染中我们也必须要通过width和height显示的指定图表的高和宽，因此如果你的图表是需要根据容器大小自适应的话，可能需要思考一下服务端渲染是否适合你的场景了。一种可能的解决方案是，首屏获取到图表容器大小后，请求服务端渲染图表，然后在客户端渲染图表；当用户交互改变容器大小时，重新请求服务端渲染。

在浏览器中我们在setOption完之后 ECharts 就会自动进行渲染将结果绘制到页面中，后续也会在每一帧判断是否有动画需要进行重绘。Node.js 中我们在设置了ssr: true后则没有这个过程。取而代之我们使用了renderToSVGString，将当前的图表渲染到 SVG 字符串，进一步得再通过 HTTP Response 返回给前端或者缓存到本地。

HTTP Response 返回给前端（这里以 Express.js 为例）：

res.writeHead(200, {
  'Content-Type': 'application/xml'
});
res.write(svgStr); // svgStr 是上面 chart.renderToSVGString() 得到的字符串
res.end();

或者保存到本地：

fs.writeFile('bar.svg', svgStr, 'utf-8');
服务端渲染中的动画效果

上面的例子中可以看到，就算是服务端渲染 ECharts 也可以提供动画效果，这个动画效果是通过在输出的 SVG 字符串中嵌入 CSS 动画实现的。并不需要额外的 JavaScript 再去控制动画。

但是，也因为 CSS 动画的局限性，我们没法在服务端渲染中实现一些更灵活的动画功能，诸如柱状图排序动画，标签动画，路径图的特效动画等。部分系列诸如饼图的动画效果也为服务端渲染做了特殊的优化。

如果你不希望有这个动画效果，可以在setOption的时候通过animation: false关闭动画。

setOption({
  animation: false
});
服务端 Canvas 渲染

如果你希望输出的是一张图片而非 SVG 字符串，或者你还在使用更老的版本，我们会推荐使用 node-canvas 来实现 ECharts 的服务渲染，node-canvas 是在 Node.js 上的一套 Canvas 实现，它提供了跟浏览器中 Canvas 几乎一致的接口。

下面是一个简单的例子

var echarts = require('echarts');
const { createCanvas } = require('canvas');

// 在 5.3.0 之前的版本中，你必须要通过该接口注册 canvas 实例创建方法。
// 从 5.3.0 开始就不需要了
echarts.setCanvasCreator(() => {
  return createCanvas();
});

const canvas = createCanvas(800, 600);
// ECharts 可以直接使用 node-canvas 创建的 Canvas 实例作为容器
let chart = echarts.init(canvas);

// 像正常使用一样 setOption
chart.setOption({
  //...
});

const buffer = canvas.toBuffer('image/png');

// 如果不再需要图表，调用 dispose 以释放内存
chart.dispose();
chart = null;

// 通过 Response 输出 PNG 图片
res.writeHead(200, {
  'Content-Type': 'image/png'
});
res.write(buffer);
res.end();
图片的加载

node-canvas 提供了图片加载的Image实现，如果你在图表中使用了到了图片，我们可以使用5.3.0新增的setPlatformAPI接口来适配。

echarts.setPlatformAPI({
  // 同老版本的 setCanvasCreator
  createCanvas() {
    return createCanvas();
  },
  loadImage(src, onload, onerror) {
    const img = new Image();
    // 必须要绑定 this context.
    img.onload = onload.bind(img);
    img.onerror = onerror.bind(img);
    img.src = src;
    return img;
  }
});

如果你的图片是需要远程获取的，我们建议你通过 http 请求先预取该图片得到base64之后再作为图片的 URL 传入，这样可以保证在 Response 输出的时候图片是加载完成的。

客户端二次渲染
客户端懒加载完整 ECharts

最新版本的 ECharts 服务端 SVG 渲染除了完成图表的渲染外，支持的功能包括：

图表初始动画（例如：柱状图初始化时的柱子上升动画）
高亮样式（例如：鼠标移动到柱状图柱子上时的高亮效果）

但仅使用服务端渲染无法支持的功能包括：

动态改变数据
点击图例切换系列是否显示
移动鼠标显示提示框
其他交互相关的功能

如果有相关需求，可以考虑先使用服务端渲染快速输出首屏图表，然后等待 echarts.js 加载完后，重新在客户端渲染同样的图表（称为 Hydration），这样就可以实现正常的交互效果和动态改变数据了。需要注意的是，在客户端渲染的时候，应开启 tooltip: { show: true } 之类的交互组件，并且用 animation: 0 关闭初始动画（初始动画应由服务端渲染结果的 SVG 动画完成）。

从用户体验的角度，几乎感受不到二次渲染的过程，整个切换效果是非常无缝衔接的。你也可以像上面的例子中一样，在加载 echarts.js 的过程中使用 pace-js 之类的库实现显示加载进度条的效果，来解决 ECharts 尚未完全加载完之前没有交互反馈的问题。

使用服务端渲染 SVG 加上客户端 ECharts 懒加载的方式，其优点是，能够在首屏快速展示图表，而懒加载完成后可以实现所有 ECharts 的功能和交互；而缺点是，懒加载完整的 ECharts 需要一定时间，在加载完成前无法实现除高亮之外的用户交互（在这种情况下，开发者可以通过显示“加载中”来解决无交互反馈带来的困惑）。这个方案也是目前比较推荐的对首屏加载时间敏感，对功能交互完整性要求高的方案。

客户端轻量运行时

方案一给出了实现完整交互的方案，但是有些场景下，我们并不需要很复杂的交互，只是希望在服务端渲染的基础上，能够在客户端进行一些简单的交互，例如：点击图例切换系列是否显示。这种情况下，我们能否不在客户端加载至少需要几百 KB 的 ECharts 代码呢？

从 v5.5.0 版本起，如果图表只需要以下效果和交互，可以通过服务端 SVG 渲染 + 客户端轻量运行时来实现：

图表初始动画（实现原理：服务端渲染的 SVG 带有 CSS 动画）
高亮样式（实现原理：服务端渲染的 SVG 带有 CSS 动画）
动态改变数据（实现原理：轻量运行时请求服务器进行二次渲染）
点击图例切换系列是否显示（实现原理：轻量运行时请求服务器进行二次渲染）
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

服务器端根据客户端传来的每个系列是否显示的信息（isSeriesShown）进行二次渲染，返回新的 SVG 字符串。服务端代码同上文，不再赘述。

关于状态记录：上述这种开发方式和纯客户端渲染的相比，开发者需要记录并维护一些额外的信息（例如这个例子中每个系列是否显示）。这是不可避免的，因为 HTTP 请求本身是无状态的，如果要实现有状态，要么像上面的例子这样由客户端记录状态并传递，要么服务器保留状态（例如通过 session，但需要耗费更多的服务器内存以及更复杂的销毁逻辑所以并不推荐）。

使用服务端 SVG 渲染加上客户端轻量运行时的方式，其优点是，客户端不再需要加载几百 KB 的 ECharts 代码，只需要加载一个不到 4KB 的轻量运行时代码；并且从用户体验的角度牺牲很少（支持初始动画、鼠标高亮）。而缺点是，需要一定的开发成本来维护额外的状态信息，并且无法支持实时性要求高的交互（例如移动鼠标显示提示框）。总体来说，推荐在对代码体积有非常严格要求的环境使用。

使用轻量运行时

客户端轻量运行时通过将服务端渲染的 SVG 图表进行理解，从而赋予图表一定的交互能力。

可以通过以下方式引入客户端轻量运行时：

<!-- 方法一：使用 CDN -->
<script src="https://cdn.jsdelivr.net/npm/echarts/ssr/client/dist/index.min.js"></script>
<!-- 方法二：使用 NPM -->
<script src="node_modules/echarts/ssr/client/dist/index.js"></script>
API

在全局变量 window['echarts-ssr-client'] 中提供了以下 API：

hydrate(dom: HTMLElement, options: ECSSRClientOptions)
dom：图表容器，其内部的内容在调用本方法前应已设为服务端渲染的 SVG 图表
options：配置项
ECSSRClientOptions
on?: {
  mouseover?: (params: ECSSRClientEventParams) => void,
  mouseout?: (params: ECSSRClientEventParams) => void,
  click?: (params: ECSSRClientEventParams) => void
}

和图表鼠标事件一样，这里的时间都是针对图表数据对象的（例如：柱状图的柱子、折线图的数据点等），而不是针对图表容器的。

ECSSRClientEventParams
{
  type: 'mouseover' | 'mouseout' | 'click';
  ssrType: 'legend' | 'chart';
  seriesIndex?: number;
  dataIndex?: number;
  event: Event;
}
type：事件类型
ssrType：事件对象类型，legend 表示图例数据，chart 表示图表数据对象
seriesIndex：系列索引
dataIndex：数据索引
event：原生事件对象

参见上文「客户端轻量运行时」章节。

小结

上面，我们介绍了几种不同的渲染方案，包括：

客户端渲染
服务端 SVG 渲染
服务端 Canvas 渲染
客户端轻量运行时渲染

这四种渲染方式可以结合使用，我们再来总结一下它们各自适用的场景：

渲染方案	加载体积	功能及交互损失	相对开发工作量	推荐场景
客户端渲染	最大	无	最小	首屏加载时间不敏感，对功能交互完整性要求高
客户端渲染（按需引用部分包）	大	大：没有引入的包就无法使用对应功能	小	首屏加载时间不敏感，对代码体积没有严格要求但是希望尽可能小，仅使用 ECharts 的一小部分功能，没有服务器资源
一次性服务端 SVG 渲染	小	大：无法动态改变数据、不支持图例切换系列是否显示、不支持提示框等实时性要求高的交互	中	首屏加载时间敏感，对功能交互完整性要求低
一次性服务端 Canvas 渲染	大	最大：同上且不支持初始动画、图片体积更大、放大会模糊	中	首屏加载时间敏感，对功能交互完整性要求低，平台限制无法使用 SVG
服务端 SVG 渲染加客户端懒加载 ECharts	小，然后大	中：懒加载完成前无法交互	中	首屏加载时间敏感，对功能交互完整性要求高，最好图表不会在加载后立刻需要交互
服务端 SVG 渲染加客户端轻量运行时	小	中：无法实现实时性要求高的交互	大（需要维护图表状态、定义客户端服务端接口协议）	首屏加载时间敏感，对功能交互完整性要求低，对代码体积有非常严格要求，交互实时性要求不严格
服务端 SVG 渲染加客户端懒加载 ECharts，懒加载完成前使用轻量运行时	小，然后大	小：在懒加载完成前无法进行复杂交互	最大	首屏加载时间敏感，对功能交互完整性要求高，有充分的开发时间

当然，还存在一些其他的组合可能性，但最常用的就是以上几种，相信如果你了解了这些渲染方案的特点，就可以根据自己的场景选择合适的方案了。

---


Title: 微信小程序 - 跨平台方案 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/cross-platform/wechat-app

服务端渲染
微信小程序
百度智能小程序
echarts-for-weixin 项目提供了一个小程序组件，用这种方式可以方便地使用 ECharts。

使用方式
下载该项目
如有必要，将 ec-canvas 目录下的 echarts.js 替换为最新版的 ECharts。如果希望减小包体积大小，可以使用自定义构建生成并替换 echarts.js
pages 目录下是使用的示例文件，可以作为参考，或者删除不需要的页面。

更详细的说明请参见 echarts-for-weixin 项目。

注意事项

最新版的 ECharts 微信小程序支持微信 Canvas 2d，当用户的基础库版本 >= 2.9.0 且没有设置 force-use-old-canvas="true" 的情况下，使用新的 Canvas 2d（默认）。

使用新的 Canvas 2d 可以提升渲染性能，解决非同层渲染问题，强烈建议开启。

更详细的说明请参见 Canvas 2d 版本要求。

---


Title: 百度智能小程序 - 跨平台方案 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/cross-platform/baidu-app

服务端渲染
微信小程序
百度智能小程序
baidu-smart-app-echarts-demo 项目是使用该动态库的一个示例工程，可以作为参考，一般情况下不需要引入自己的项目。

如有使用上的问题，可以在 baidu-smart-app-echarts-demo/issues 中咨询。

使用方式

参见百度智能小程序文档 ECharts 图表。

注意事项

百度智能小程序上的 ECharts 以动态库的形式开放，因此开发者的使用方式与在微信小程序中使用 ECharts 不太相同。尤其需要注意的是，前者需要在指定动态库名称的时候确定 ECharts 的版本号，而不能自行更换或使用自定义构建。这一点是由底层框架的技术实现决定的。具体来说，在指定百度智能小程序动态库名称的时候，需要通过 provider 指定动态库名称，具体参见文档的「在项目中引用动态库」章节。

请务必查看文档的「兼容性说明」以了解各功能的实现方式。

---


Title: 动态的异步数据 - 数据处理 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/data/dynamic-data

动态的异步数据
入门示例中的数据是在初始化后setOption中直接填入的，但是很多时候可能数据需要异步加载后再填入。ECharts 中实现异步数据的更新非常简单，在图表初始化后不管任何时候只要通过 jQuery 等工具异步获取数据后通过 setOption 填入数据和配置项就行。

var myChart = echarts.init(document.getElementById('main'));

$.get('data.json').done(function(data) {
  // data 的结构:
  // {
  //     categories: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
  //     values: [5, 20, 36, 10, 10, 20]
  // }
  myChart.setOption({
    title: {
      text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {},
    xAxis: {
      data: data.categories
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: data.values
      }
    ]
  });
});

或者先设置完其它的样式，显示一个空的直角坐标轴，然后获取数据后填入数据。

var myChart = echarts.init(document.getElementById('main'));
// 显示标题，图例和空的坐标轴
myChart.setOption({
  title: {
    text: '异步数据加载示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: []
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: []
    }
  ]
});

// 异步加载数据
$.get('data.json').done(function(data) {
  // 填入数据
  myChart.setOption({
    xAxis: {
      data: data.categories
    },
    series: [
      {
        // 根据名字对应到相应的系列
        name: '销量',
        data: data.data
      }
    ]
  });
});

如下：

ECharts 中在更新数据的时候需要通过name属性对应到相应的系列，上面示例中如果name不存在也可以根据系列的顺序正常更新，但是更多时候推荐更新数据的时候加上系列的name数据。

loading 动画

如果数据加载时间较长，一个空的坐标轴放在画布上也会让用户觉得是不是产生 bug 了，因此需要一个 loading 的动画来提示用户数据正在加载。

ECharts 默认有提供了一个简单的加载动画。只需要调用 showLoading 方法显示。数据加载完成后再调用 hideLoading 方法隐藏加载动画。

myChart.showLoading();
$.get('data.json').done(function (data) {
    myChart.hideLoading();
    myChart.setOption(...);
});

效果如下：

数据的动态更新

ECharts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。

所有数据的更新都通过 setOption实现，你只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了哪些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。

具体可以看下面示例：

---


Title: 富文本标签 - 标签 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/label/rich-text

富文本标签
echarts 提供了丰富的文本标签配置项，包括：

字体基本样式设置：fontStyle、fontWeight、fontSize、fontFamily。
文字颜色：color。
文字描边：textBorderColor、textBorderWidth。
文字阴影：textShadowColor、textShadowBlur、textShadowOffsetX、textShadowOffsetY。
文本块或文本片段大小：lineHeight、width、height、padding。
文本块或文本片段的对齐：align、verticalAlign。
文本块或文本片段的边框、背景（颜色或图片）：backgroundColor、borderColor、borderWidth、borderRadius。
文本块或文本片段的阴影：shadowColor、shadowBlur、shadowOffsetX、shadowOffsetY。
文本块的位置和旋转：position、distance、rotate。

可以在各处的 rich 属性中定义文本片段样式。例如 series-bar.label.rich

例如：

labelOption = {
  // 在文本中，可以对部分文本采用 rich 中定义样式。
  // 这里需要在文本中使用标记符号：
  // `{styleName|text content text content}` 标记样式名。
  // 注意，换行仍是使用 '\n'。
  formatter: [
    '{a|这段文本采用样式a}',
    '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
  ].join('\n'),

  // 这里是文本块的样式设置：
  color: '#333',
  fontSize: 5,
  fontFamily: 'Arial',
  borderWidth: 3,
  backgroundColor: '#984455',
  padding: [3, 10, 10, 5],
  lineHeight: 20,

  // rich 里是文本片段的样式设置：
  rich: {
    a: {
      color: 'red',
      lineHeight: 10
    },
    b: {
      backgroundColor: {
        image: 'xxx/xxx.jpg'
      },
      height: 40
    },
    x: {
      fontSize: 18,
      fontFamily: 'Microsoft YaHei',
      borderColor: '#449933',
      borderRadius: 4
    }
  }
};

注意：如果不定义 rich，不能指定文字块的 width 和 height。

文本、文本框、文本片段的基本样式和装饰

每个文本可以设置基本的字体样式：fontStyle、fontWeight、fontSize、fontFamily。

可以设置文字的颜色 color 和边框的颜色 textBorderColor、textBorderWidth。

文本框可以设置边框和背景的样式：borderColor、borderWidth、backgroundColor、padding。

文本片段也可以设置边框和背景的样式：borderColor、borderWidth、backgroundColor、padding。

例如：

option = {
  series: [
    {
      type: 'scatter',
      symbolSize: 1,
      data: [
        {
          value: [0, 0],
          label: {
            show: true,
            formatter: [
              'Plain text',
              '{textBorder|textBorderColor + textBorderWidth}',
              '{textShadow|textShadowColor + textShadowBlur + textShadowOffsetX + textShadowOffsetY}',
              '{bg|backgroundColor + borderRadius + padding}',
              '{border|borderColor + borderWidth + borderRadius + padding}',
              '{shadow|shadowColor + shadowBlur + shadowOffsetX + shadowOffsetY}'
            ].join('\n'),
            backgroundColor: '#eee',
            borderColor: '#333',
            borderWidth: 2,
            borderRadius: 5,
            padding: 10,
            color: '#000',
            fontSize: 14,
            shadowBlur: 3,
            shadowColor: '#888',
            shadowOffsetX: 0,
            shadowOffsetY: 3,
            lineHeight: 30,
            rich: {
              textBorder: {
                fontSize: 20,
                textBorderColor: '#000',
                textBorderWidth: 3,
                color: '#fff'
              },
              textShadow: {
                fontSize: 16,
                textShadowBlur: 5,
                textShadowColor: '#000',
                textShadowOffsetX: 3,
                textShadowOffsetY: 3,
                color: '#fff'
              },
              bg: {
                backgroundColor: '#339911',
                color: '#fff',
                borderRadius: 15,
                padding: 5
              },
              border: {
                color: '#000',
                borderColor: '#449911',
                borderWidth: 1,
                borderRadius: 3,
                padding: 5
              },
              shadow: {
                backgroundColor: '#992233',
                padding: 5,
                color: '#fff',
                shadowBlur: 5,
                shadowColor: '#336699',
                shadowOffsetX: 6,
                shadowOffsetY: 6
              }
            }
          }
        }
      ]
    }
  ],
  xAxis: {
    show: false,
    min: -1,
    max: 1
  },
  yAxis: {
    show: false,
    min: -1,
    max: 1
  }
};

标签的位置

对于折线图、柱状图、散点图等，均可以使用 label 来设置标签。标签的相对于图形元素的位置，一般使用 label.position、label.distance 来配置。

试试在下面例子中修改position和distance 属性：

option = {
  series: [
    {
      type: 'scatter',
      symbolSize: 160,
      symbol: 'roundRect',
      data: [[1, 1]],
      label: {
        // 修改 position 和 distance 的值试试
        // 支持：'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        position: 'top',
        distance: 10,

        show: true,
        formatter: ['Label Text'].join('\n'),
        backgroundColor: '#eee',
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        shadowBlur: 3,
        shadowColor: '#888',
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        textBorderColor: '#000',
        textBorderWidth: 3,
        color: '#fff'
      }
    }
  ],
  xAxis: {
    max: 2
  },
  yAxis: {
    max: 2
  }
};


注意：position 在不同的图中可取值有所不同。distance 并不是在每个图中都支持。详情请参见 option 文档。

标签的旋转

某些图中，为了能有足够长的空间来显示标签，需要对标签进行旋转。例如：

const labelOption = {
  show: true,
  rotate: 90,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
};

option = {
  xAxis: [
    {
      type: 'category',
      data: ['2012', '2013', '2014', '2015', '2016']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Forest',
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290]
    }
  ]
};


这种场景下，可以结合 align 和 verticalAlign 来调整标签位置。

注意，逻辑是，先使用 align 和 verticalAlign 定位，再旋转。

文本片段的排版和对齐

关于排版方式，每个文本片段，可以想象成 CSS 中的 inline-block，在文档流中按行放置。

每个文本片段的内容盒尺寸（content box size），默认是根据文字大小决定的。但是，也可以设置 width、height 来强制指定，虽然一般不会这么做（参见下文）。文本片段的边框盒尺寸（border box size），由上述本身尺寸，加上文本片段的 padding 来得到。

只有 '\n' 是换行符，能导致换行。

一行内，会有多个文本片段。每行的实际高度，由 lineHeight 最大的文本片段决定。文本片段的 lineHeight 可直接在 rich 中指定，也可以在 rich 的父层级中统一指定而采用到 rich 的所有项中，如果都不指定，则取文本片段的边框盒尺寸（border box size）。

在一行的 lineHeight 被决定后，一行内，文本片段的竖直位置，由文本片段的 verticalAlign 来指定（这里和 CSS 中的规则稍有不同）：

'bottom'：文本片段的盒的底边贴住行底。
'top'：文本片段的盒的顶边贴住行顶。
'middle'：居行中。

文本块的宽度，可以直接由文本块的 width 指定，否则，由最长的行决定。宽度决定后，在一行中进行文本片段的放置。文本片段的 align 决定了文本片段在行中的水平位置：

首先，从左向右连续紧靠放置 align 为 'left' 的文本片段盒。
然后，从右向左连续紧靠放置 align 为 'right' 的文本片段盒。
最后，剩余的没处理的文本片段盒，紧贴着，在中间剩余的区域中居中放置。

关于文字在文本片段盒中的位置：

如果 align 为 'center'，则文字在文本片段盒中是居中的。
如果 align 为 'left'，则文字在文本片段盒中是居左的。
如果 align 为 'right'，则文字在文本片段盒中是居右的。
特殊效果：图标、分割线、标题块、简单表格

看下面的例子：

option = {
  series: [
    {
      type: 'scatter',
      data: [
        {
          value: [0, 0],
          label: {
            formatter: [
              '{tc|Center Title}{titleBg|}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n'),
            rich: {
              titleBg: {
                align: 'right'
              }
            }
          }
        },
        {
          value: [0, 1],
          label: {
            formatter: [
              '{titleBg|Left Title}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n')
          }
        },
        {
          value: [0, 2],
          label: {
            formatter: [
              '{titleBg|Right Title}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n'),
            rich: {
              titleBg: {
                align: 'right'
              }
            }
          }
        }
      ],
      symbolSize: 1,
      label: {
        show: true,
        backgroundColor: '#ddd',
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 5,
        color: '#000',
        fontSize: 14,
        rich: {
          titleBg: {
            backgroundColor: '#000',
            height: 30,
            borderRadius: [5, 5, 0, 0],
            padding: [0, 10, 0, 10],
            width: '100%',
            color: '#eee'
          },
          tc: {
            align: 'center',
            color: '#eee'
          },
          hr: {
            borderColor: '#777',
            width: '100%',
            borderWidth: 0.5,
            height: 0
          },
          sunny: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/sunny_128.png'
            }
          },
          cloudy: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/cloudy_128.png'
            }
          },
          showers: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/showers_128.png'
            }
          }
        }
      }
    }
  ],
  xAxis: {
    show: false,
    min: -1,
    max: 1
  },
  yAxis: {
    show: false,
    min: 0,
    max: 2,
    inverse: true
  }
};


文本片段的 backgroundColor 可以指定为图片后，就可以在文本中使用图标了：

labelOption = {
  rich: {
    Sunny: {
      // 这样设定 backgroundColor 就可以是图片了。
      backgroundColor: {
        image: './data/asset/img/weather/sunny_128.png'
      },
      // 可以只指定图片的高度，从而图片的宽度根据图片的长宽比自动得到。
      height: 30
    }
  }
};

分割线实际是用 border 实现的：

labelOption = {
  rich: {
    hr: {
      borderColor: '#777',
      // 这里把 width 设置为 '100%'，表示分割线的长度充满文本块。
      // 注意，这里是文本块内容盒（content box）的 100%，而不包含 padding。
      // 虽然这和 CSS 相关的定义有所不同，但是在这类场景中更加方便。
      width: '100%',
      borderWidth: 0.5,
      height: 0
    }
  }
};

标题块是使用 backgroundColor 实现的：

labelOption = {
  // 标题文字居左
  formatter: '{titleBg|Left Title}',
  rich: {
    titleBg: {
      backgroundColor: '#000',
      height: 30,
      borderRadius: [5, 5, 0, 0],
      padding: [0, 10, 0, 10],
      width: '100%',
      color: '#eee'
    }
  }
};

// 标题文字居中。
// 这个实现有些 tricky，但是，能够不引入更复杂的排版规则而实现这个效果。
labelOption = {
  formatter: '{tc|Center Title}{titleBg|}',
  rich: {
    titleBg: {
      align: 'right',
      backgroundColor: '#000',
      height: 30,
      borderRadius: [5, 5, 0, 0],
      padding: [0, 10, 0, 10],
      width: '100%',
      color: '#eee'
    }
  }
};

简单表格的设定，其实就是给不同行上纵向对应的文本片段设定同样的宽度就可以了。见 该例子

---


Title: 数据过渡动画 - 动画 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/animation/transition

数据过渡动画
Apache EChartsTM 中使用了平移，缩放，变形等形式的过渡动画让数据的添加更新删除，以及用户的交互变得更加顺滑。通常情况下开发者不需要操心该如何去使用动画，只需要按自己的需求使用setOption更新数据，ECharts 就会找出跟上一次数据之间的区别，然后自动应用最合适的过渡动画。

比如下面例子就是定时更新饼图数据（随机）的过渡动画效果。

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

过渡动画的配置

因为数据添加和数据更新往往会需要不一样的动画效果，比如我们会期望数据更新动画的时长更短，因此 ECharts 区分了这两者的动画配置：

对于新添加的数据，我们会应用入场动画，通过animationDuration, animationEasing, animationDelay三个配置项分别配置动画的时长，缓动以及延时。
对于数据更新，我们会应用更新动画，通过animationDurationUpdate, animationEasingUpdate, animationDelayUpdate三个配置项分别配置动画的时长，缓动以及延时。

可以看到，更新动画配置是入场动画配置加上了Update的后缀。

在 ECharts 中每次 setOption 的更新，数据会跟上一次更新的数据做对比，然后根据对比结果分别为数据执行三种状态：添加，更新以及移除。这个比对是根据数据的name来决定的，例如上一次更新数据有三个name为'A', 'B', 'C'的数据，而新更新的数据变为了'B', 'C', 'D'的数据，则数据'B', 'C'会被执行更新，数据'A'会被移除，而数据'D'会被添加。如果是第一次更新因为没有旧数据，所以所有数据都会被执行添加。根据这三种状态 ECharts 会分别应用相应的入场动画，更新动画以及移除动画。

所有这些配置都可以分别设置在option最顶层对所有系列和组件生效，也可以分别为每个系列配置。

如果我们想要关闭动画，可以直接设置option.animation为false。

动画时长

animationDuration和animationDurationUpdate用于设置动画的时长，单位为ms，设置较长的动画时长可以让用户更清晰的看到过渡动画的效果，但是我们也需要小心过长的时间会让用户再等待的过程中失去耐心。

设置为0会关闭动画，在我们只想要单独关闭入场动画或者更新动画的时候可以通过单独将相应的配置设置为0来实现。

动画缓动

animationEasing和animationEasingUpdate两个配置项用于设置动画的缓动函数，缓动函数是一个输入动画时间，输出动画进度的函数：

(t: number) => number;

在 ECharts 里内置了缓入'cubicIn'，缓出'cubicOut'等常见的动画缓动函数，我们可以直接通过名字来声明使用这些缓动函数。

内置缓动函数：

延时触发

animationDelay和animationDelayUpdate用于设置动画延迟开始的时间，通常我们会使用回调函数将不同数据设置不同的延时来实现交错动画的效果：

var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push('A' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
option = {
  legend: {
    data: ['bar', 'bar2']
  },
  xAxis: {
    data: xAxisData,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [
    {
      name: 'bar',
      type: 'bar',
      data: data1,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function(idx) {
        return idx * 10;
      }
    },
    {
      name: 'bar2',
      type: 'bar',
      data: data2,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function(idx) {
        return idx * 10 + 100;
      }
    }
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function(idx) {
    return idx * 5;
  }
};

动画的性能优化

在数据量特别大的时候，为图形应用动画可能会导致应用的卡顿，这个时候我们可以设置animation: false关闭动画。

对于数据量会动态变化的图表，我们更推荐使用animationThreshold这个配置项，当画布中图形数量超过这个阈值的时候，ECharts 会自动关闭动画来提升绘制性能。这个配置往往是一个经验值，通常 ECharts 的性能足够实时渲染上千个图形的动画（我们默认值也是给了 2000），但是如果你的图表很复杂，或者你的用户环境比较恶劣，页面中又同时会运行很多其它复杂的代码，也可以适当的下调这个值保证整个应用的流畅性。

监听动画结束

有时候我们想要获取当前渲染的结果，如果没有使用动画，我们在setOption之后 ECharts 就会直接执行渲染，我们可以同步的通过getDataURL方法获取渲染得到的结果。

const chart = echarts.init(dom);
chart.setOption({
  animation: false
  //...
});
// 可以直接同步执行
const dataUrl = chart.getDataURL();

但是如果图表中有动画，马上执行getDataURL得到的是动画刚开始的画面，而非最终展示的结果。因此我们需要知道动画结束然后再执行getDataURL得到结果。

假如你确定动画的时长，一种比较简单粗暴的方式是根据动画时长来执行setTimeout延迟执行：

chart.setOption({
  animationDuration: 1000
  //...
});
setTimeout(() => {
  const dataUrl = chart.getDataURL();
}, 1000);

或者我们也可以使用 ECharts 提供的rendered事件来判断 ECharts 已经动画结束停止了渲染

chart.setOption({
  animationDuration: 1000
  //...
});

function onRendered() {
  const dataUrl = chart.getDataURL();
  // ...
  // 后续如果有交互，交互发生重绘也会触发该事件，因此使用完就需要移除
  chart.off('rendered', onRendered);
}
chart.on('rendered', onRendered);

---


Title: 拖拽的实现 - 交互 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/interaction/drag

拖拽的实现
智能指针吸附
这个例子主要做到了这样一件事，用鼠标可以拖拽曲线的点，从而改变曲线的形状。例子很简单，但是有了这个基础我们还可以做更多的事情，比如在图中进行可视化得编辑。所以我们从这个简单的例子开始。

echarts 本身没有提供封装好的“拖拽改变图表”这样比较业务定制的功能。但是这个功能开发者可以通过 API 扩展实现。

实现基本的拖拽功能

在这个例子中，基础的图表是一个 折线图 (series-line)。参见如下配置：

var symbolSize = 20;

// 这个 data 变量在这里单独声明，在后面也会用到。
var data = [
  [15, 0],
  [-50, 10],
  [-56.5, 20],
  [-46.5, 30],
  [-22.1, 40]
];

myChart.setOption({
  xAxis: {
    min: -100,
    max: 80,
    type: 'value',
    axisLine: { onZero: false }
  },
  yAxis: {
    min: -30,
    max: 60,
    type: 'value',
    axisLine: { onZero: false }
  },
  series: [
    {
      id: 'a',
      type: 'line',
      smooth: true,
      symbolSize: symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
      data: data
    }
  ]
});

既然折线中原生的点没有拖拽功能，我们就为它加上拖拽功能：用 graphic 组件，在每个点上面，覆盖一个隐藏的可拖拽的圆点。

myChart.setOption({
  // 声明一个 graphic component，里面有若干个 type 为 'circle' 的 graphic elements。
  // 这里使用了 echarts.util.map 这个帮助方法，其行为和 Array.prototype.map 一样，但是兼容 es5 以下的环境。
  // 用 map 方法遍历 data 的每项，为每项生成一个圆点。
  graphic: echarts.util.map(data, function(dataItem, dataIndex) {
    return {
      // 'circle' 表示这个 graphic element 的类型是圆点。
      type: 'circle',

      shape: {
        // 圆点的半径。
        r: symbolSize / 2
      },
      // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
      // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
      position: myChart.convertToPixel('grid', dataItem),

      // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
      invisible: true,
      // 这个属性让圆点可以被拖拽。
      draggable: true,
      // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
      z: 100,
      // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
      // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
      // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
      ondrag: echarts.util.curry(onPointDragging, dataIndex)
    };
  })
});

上面的代码中，使用 convertToPixel 这个 API，进行了从 data 到“像素坐标”的转换，从而得到了每个圆点应该在的位置，从而能绘制这些圆点。myChart.convertToPixel('grid', dataItem) 这句话中，第一个参数 'grid' 表示 dataItem 在 grid 这个组件中（即直角坐标系）中进行转换。所谓“像素坐标”，就是以 echarts 容器 dom element 的左上角为零点的以像素为单位的坐标系中的坐标。

注意这件事需要在第一次 setOption 后再进行，也就是说，须在坐标系（grid）初始化后才能调用 myChart.convertToPixel('grid', dataItem)。

有了这段代码后，就有了诸个能拖拽的点。接下来要为每个点，加上拖拽响应的事件：

// 拖拽某个圆点的过程中会不断调用此函数。
// 此函数中会根据拖拽后的新位置，改变 data 中的值，并用新的 data 值，重绘折线图，从而使折线图同步于被拖拽的隐藏圆点。
function onPointDragging(dataIndex) {
  // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
  // 这里的 this 就是被拖拽的圆点。this.position 就是圆点当前的位置。
  data[dataIndex] = myChart.convertFromPixel('grid', this.position);
  // 用更新后的 data，重绘折线图。
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data
      }
    ]
  });
}

上面的代码中，使用了 convertFromPixel 这个 API。它是 convertToPixel 的逆向过程。myChart.convertFromPixel('grid', this.position) 表示把当前像素坐标转换成 grid 组件中直角坐标系的 dataItem 值。

最后，为了使 dom 尺寸改变时，图中的元素能自适应得变化，加上这些代码：

window.addEventListener('resize', function() {
  // 对每个拖拽圆点重新计算位置，并用 setOption 更新。
  myChart.setOption({
    graphic: echarts.util.map(data, function(item, dataIndex) {
      return {
        position: myChart.convertToPixel('grid', item)
      };
    })
  });
});
添加 tooltip 组件

到此，拖拽的基本功能就完成了。但是想要更进一步得实时看到拖拽过程中，被拖拽的点的 data 值的变化状况，我们可以使用 tooltip 组件来实时显示这个值。但是，tooltip 有其默认的“显示”“隐藏”触发规则，在我们拖拽的场景中并不适用，所以我们还要手动定制 tooltip 的“显示”“隐藏”行为。

在上述代码中分别添加如下定义：

myChart.setOption({
  // ...,
  tooltip: {
    // 表示不使用默认的“显示”“隐藏”触发规则。
    triggerOn: 'none',
    formatter: function(params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br>Y: ' +
        params.data[1].toFixed(2)
      );
    }
  }
});
myChart.setOption({
  graphic: data.map(function(item, dataIndex) {
    return {
      type: 'circle',
      // ...,
      // 在 mouseover 的时候显示，在 mouseout 的时候隐藏。
      onmousemove: echarts.util.curry(showTooltip, dataIndex),
      onmouseout: echarts.util.curry(hideTooltip, dataIndex)
    };
  })
});

function showTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}

function hideTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'hideTip'
  });
}

这里使用了 dispatchAction 来显示隐藏 tooltip。用到了 showTip、hideTip。

全部代码

总结一下，全部的代码如下：

import echarts from 'echarts';

var symbolSize = 20;
var data = [
  [15, 0],
  [-50, 10],
  [-56.5, 20],
  [-46.5, 30],
  [-22.1, 40]
];
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  tooltip: {
    triggerOn: 'none',
    formatter: function(params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br />Y: ' +
        params.data[1].toFixed(2)
      );
    }
  },
  xAxis: { min: -100, max: 80, type: 'value', axisLine: { onZero: false } },
  yAxis: { min: -30, max: 60, type: 'value', axisLine: { onZero: false } },
  series: [
    { id: 'a', type: 'line', smooth: true, symbolSize: symbolSize, data: data }
  ]
});
myChart.setOption({
  graphic: echarts.util.map(data, function(item, dataIndex) {
    return {
      type: 'circle',
      position: myChart.convertToPixel('grid', item),
      shape: { r: symbolSize / 2 },
      invisible: true,
      draggable: true,
      ondrag: echarts.util.curry(onPointDragging, dataIndex),
      onmousemove: echarts.util.curry(showTooltip, dataIndex),
      onmouseout: echarts.util.curry(hideTooltip, dataIndex),
      z: 100
    };
  })
});
window.addEventListener('resize', function() {
  myChart.setOption({
    graphic: echarts.util.map(data, function(item, dataIndex) {
      return { position: myChart.convertToPixel('grid', item) };
    })
  });
});
function showTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}
function hideTooltip(dataIndex) {
  myChart.dispatchAction({ type: 'hideTip' });
}
function onPointDragging(dataIndex, dx, dy) {
  data[dataIndex] = myChart.convertFromPixel('grid', this.position);
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data
      }
    ]
  });
}

有了这些基础，就可以定制更多的功能了。可以加 dataZoom 组件，可以制作一个直角坐标系上的绘图板等等。可以发挥想象力。

---


Title: 智能指针吸附 - 交互 - 应用篇 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/how-to/interaction/coarse-pointer

拖拽的实现
智能指针吸附
在图表中，部分可交互元素可能比较小，有时候用户不易准确地进行点击等操作，移动端尤其如此。因此，在 Apache EChartsTM 5.4.0 中，我们引入了“智能指针吸附”的概念。

从该版本起，在默认情况下，ECharts 对移动端的图表开启指针吸附，对非移动端的图表关闭。

如果需要对所有平台都开启，则可以通过在 init 的时候将 opt.useCoarsePointer 设置为 true 来实现；设为 false 则对所有平台都关闭。

吸附原理

在鼠标或触摸事件发生时，ECharts 会根据鼠标或触摸的位置，判断是否和某个可交互元素相交。如果是，则认为该元素是交互对象（与优化前的逻辑一致）；如果不是，则在一定范围内找到最接近鼠标或触摸位置的一个元素。

默认的范围是 44px（参见 W3C 标准），开发者可在 init 的时候，通过 opt.pointerSize 设置该值。

更具体地说，ECharts 会在鼠标或触摸位置的周围，依次循环不同角度和不同半径（在 opt.pointerSize 范围内），直到找到一个元素与其相交。如果找到了，则认为该元素是交互对象。

也就是说，如果有元素在鼠标或触摸位置的 opt.pointerSize 半径范围内，则最靠近的可交互元素会被认为是交互对象。

性能分析

在实际算法实现的时候，我们首先将鼠标或触摸位置与所有可交互元素的 AABB 包围盒判断相交性，从而快速剔除了大部分不相交的元素。然后，我们再对剩余的元素进行精确的路径相交判断。因此，从用户体验角度，不会带来可感知的性能损耗。

对于大规模数据的图表系列（也就是开启了 large: true 的柱状图、散点图等），不会开启吸附功能。

---
