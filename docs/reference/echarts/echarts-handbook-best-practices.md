# ECharts 使用手册 — 最佳实践篇

> 来源：Apache ECharts 官方使用手册（https://echarts.apache.org/handbook/zh/）
> 整理时间：2026-05-17
> 用途：开发参考，可按需加载到上下文中

---



Title: Canvas vs. SVG - 最佳实践 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/best-practices/canvas-vs-svg

浏览器端图表库大多会选择 SVG 或者 Canvas 进行渲染。对于绘制图表来说，这两种技术往往是可替换的，效果相近。但是在一些场景中，他们的表现和能力又有一定差异。于是，对它们的选择取舍，就成为了一个一直存在的不易有标准答案的话题。

ECharts 从初始一直使用 Canvas 绘制图表。而 ECharts v4.0 发布了 SVG 渲染器，从而提供了一种新的选择。在初始化图表实例时，只需设置 renderer 参数 为 'canvas' 或 'svg' 即可指定渲染器，比较方便。

SVG 和 Canvas 这两种使用方式差异很大的技术，能够做到同时被透明支持，主要归功于 ECharts 底层库 ZRender 的抽象和实现，形成可互换的 SVG 渲染器和 Canvas 渲染器。

选择哪种渲染器

一般来说，Canvas 更适合绘制图形元素数量较多（这一般是由数据量大导致）的图表（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等），也利于实现某些视觉 特效。但是，在不少场景中，SVG 具有重要的优势：它的内存占用更低（这对移动端尤其重要）、并且用户使用浏览器内置的缩放功能时不会模糊。

选择哪种渲染器，我们可以根据软硬件环境、数据量、功能需求综合考虑。

在软硬件环境较好，数据量不大的场景下，两种渲染器都可以适用，并不需要太多纠结。
在环境较差，出现性能问题需要优化的场景下，可以通过试验来确定使用哪种渲染器。比如有这些经验：
在需要创建很多 ECharts 实例且浏览器易崩溃的情况下（可能是因为 Canvas 数量多导致内存占用超出手机承受能力），可以使用 SVG 渲染器来进行改善。大略的说，如果图表运行在低端安卓机，或者我们在使用一些特定图表如 水球图 等，SVG 渲染器可能效果更好。
数据量较大（经验判断 > 1k）、较多交互时，建议选择 Canvas 渲染器。

我们强烈欢迎开发者们反馈给我们使用的体验和场景，帮助我们更好的做优化。

注：当前某些特殊的渲染依然需要依赖 Canvas：如炫光尾迹特效、带有混合效果的热力图等。

我们在 v5.3.0 中使用虚拟 DOM 技术对 SVG 渲染器进行了重构，从而使其渲染性能提升了 2~10 倍，在某些特殊场景中甚至能有数十倍的提升！参见 #836。

如何使用渲染器

如果是用如下的方式完整引入echarts，代码中已经包含了 SVG 渲染器和 Canvas 渲染器

import * as echarts from 'echarts';

如果你是按照 在项目中引入 Apache ECharts 一文中的介绍使用按需引入，则需要手动引入需要的渲染器

import * as echarts from 'echarts/core';
// 可以根据需要选用只用到的渲染器
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';

echarts.use([SVGRenderer, CanvasRenderer]);

然后，我们就可以在代码中，初始化图表实例时，传入参数 选择渲染器类型：

// 使用 Canvas 渲染器（默认）
var chart = echarts.init(containerDom, null, { renderer: 'canvas' });
// 等价于：
var chart = echarts.init(containerDom);

// 使用 SVG 渲染器
var chart = echarts.init(containerDom, null, { renderer: 'svg' });

---


Title: 无障碍访问 - 最佳实践 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/best-practices/aria

W3C 制定了无障碍富互联网应用规范集（WAI-ARIA，the Accessible Rich Internet Applications Suite），致力于使得网页内容和网页应用能够被更多残障人士访问。

Apache ECharts 4 遵从这一规范，支持自动根据图表配置项智能生成描述，使得盲人可以在朗读设备的帮助下了解图表内容，让图表可以被更多人群访问。Apache ECharts 5 新增了贴花功能，让图表数据除了可以用颜色区分之外，还能用贴花图案区分，提供了更好的无障碍访问体验。

无障碍访问功能默认关闭，需要通过将 aria.show 设置为 true 开启。

导入 AriaComponent

从 ECharts 5 开始, aria 组件不再默认导入。在使用无障碍访问特性之前，你需要先导入和注册 AriaComponent 组件：

import { AriaComponent } from 'echarts/components';
echarts.use(AriaComponent);

或者如果你在使用 CommonJS 模块：

require('echarts/lib/component/aria');

如果未导入 AriaComponent 组件，设置 aria.show: true 不会生效。

图表描述

在导入 AriaComponent 组件并开启 aria.show 后，会根据图表、数据、标题等情况，自动智能生成关于图表的描述，用户也可以通过配置项修改描述。

对于配置项：

option = {
  aria: {
    show: true
  },
  title: {
    text: '某站点用户访问来源',
    x: 'center'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  ]
};

生成的图表 DOM 上，会有一个 aria-label 属性，在朗读设备的帮助下，盲人能够了解图表的内容。其值为：

这是一个关于“某站点用户访问来源”的图表。图表类型是饼图，表示访问来源。其数据是——直接访问的数据是335，邮件营销的数据是310，联盟广告的数据是234，视频广告的数据是135，搜索引擎的数据是1548。


默认语言会根据语言包（默认中文）选择，也可以使用配置项自定义模板。

整体修改描述

对于有些图表，默认生成的数据点的描述并不足以表现整体的信息。比如下图的散点图，默认生成的描述可以包含数据点的坐标值，但是知道几百几千个点的坐标并不能帮助我们有效地理解图表表达的信息。

这时候，用户可以通过 aria.description 配置项指定图表的整体描述。

定制模板描述

除了整体性修改描述之外，我们还提供了生成描述的模板，可以方便地进行细粒度的修改。

生成描述的基本流程为，如果 aria.show 设置为 true，则生成无障碍访问描述，否则不生成。如果定义了 aria.description，则将其作为图表的完整描述，否则根据模板拼接生成描述。我们提供了默认的生成描述的算法，仅当生成的描述不太合适时，才需要修改这些模板，甚至使用 aria.description 完全覆盖。

使用模板拼接时，先根据是否存在标题 title.text 决定使用 aria.general.withTitle 还是 aria.general.withoutTitle 作为整体性描述。其中，aria.general.withTitle 配置项包括模板变量 '{title}'，将会被替换成图表标题。也就是说，如果 aria.general.withTitle 被设置为 '图表的标题是：{title}。'，则如果包含标题 '价格分布图'，这部分的描述为 '图表的标题是：价格分布图。'。

拼接完标题之后，会依次拼接系列的描述（aria.series），和每个系列的数据的描述（aria.data）。同样，每个模板都有可能包括模板变量，用以替换实际的值。

完整的描述生成流程请参见 ARIA 文档。

贴花图案

除此之外，Apache ECharts 5 新增支持贴花纹理，作为颜色的辅助表达，进一步用以区分数据。在 aria.enabled 为 true 的前提下，将 aria.decal.show 设为 true 即可采用默认的贴花样式。

如果需要自定义贴花图案，可以使用 aria.decal.decals 配置出灵活多变的图案。

更具体的信息请参见 ARIA 文档。

---


Title: 安全指南 - 最佳实践 - 使用手册 - Apache ECharts
URL: https://echarts.apache.org/handbook/zh/best-practices/security

ECharts 旨在提供丰富而灵活的可视化能力。虽然其绝大多数 API 不需要额外的安全考虑，但有几个例外。例如，tooltip.formatter 允许输入 HTML 字符串，从而完全控制组件的内容与布局；title.link 直接使用输入的 URL 字符串而不进行自动的净化处理（sanitization）。这种灵活性虽然强大，但当输入来自“不受信任”的来源时，可能带来安全风险。本文档列出了这些 API，并提供了如何安全使用这些特性的建议。

任何潜在安全问题，可依照 ASF 安全 中的渠道进行报告。

注：本文档面向 ECharts API 调用者。而另有一文档 代码贡献者的安全检查清单 用于 ECharts 贡献者提交 Pull Request 前的检查，并非面向 ECharts API 调用者，但如有兴趣也可参阅。

安全模型与检查清单

ECharts 专注于可视化逻辑，一般假定输入内容都是来自“可信任”的来源，不会自动对输入进行净化（sanitization）处理。这和多数前端 UI 库的原则类似。其实 ECharts 自身也不知如何合适地对“不受信任”的内容做净化处理，因为不知哪些输入是“不受信任”的，且不存在适用于所有使用场景的通用净化规则。然而，ECharts 应该明确哪些 API（尤其是 ECharts options）在哪些场景下须在输入前进行安全相关的处理或考量。由于 ECharts options 数量庞大，对所有输入在任何场景下都进行安全处理不现实也无必要。

ECharts 通过 Canvas 或 SVG 渲染，只有几个特殊组件例外，允许 HTML 渲染（例如，tooltip 和 dataView）。ECharts API 的输入可被分类为“JS 函数”或者“非 JS 函数”。“JS 函数输入”本意就须允许执行。而大多数“非 JS 函数输入”（例如仅用于渲染的纯文本）并无被执行的可能，因此通常无需防范恶意代码注入。然而例外是，某些 API 允许在页面中嵌入不安全内容（如 HTML 或 URL 文本）。这些 API 能带来丰富的定制能力，但当输入来自“不受信任”的来源时，容易遭受 XSS （跨站脚本攻击）或相关攻击。

一般而言，如果输入的内容都是可被信任的，就不会出现这些注入漏洞。 “不受信任”（untrusted）的内容指，内容来自于无法完全控制的来源，或者内容可能被用户或外部系统修改或注入。开发者应该总是假定直接在 HTML、CSS、JS 中使用这些内容会不安全。例如，用户生成的数据或来自浏览器/客户端的输入都应被认为是“不受信任”的。但在许多情况下，处理用户生成的内容不可避免。例如，从数据库获取用户生成的数据，并组装成 HTML 输入 tooltip.formatter 来渲染。于是须要额外处理保正渲染正确和安全，通常首先依靠 HTML 转义（HTML escaping）；但如果无法被转义的部分也来自“不受信任”的来源，则需要净化处理（sanitization）。

在部署图表之前，请根据以下检查清单确认使用是否安全：

APIs	潜在风险与建议
option tooltip.formatter
· formatter 允许 HTML 文本或 DOM 元素传入，并后续直接渲染到 tooltip 内部，于是需要考虑 XSS 风险。
（例外）：如果 formatter 被直接设置成一个字符串，则认为是一个内部实现的简单模版，后续能内部填入数据。tooltip.renderMode: 'richText' 是另一种内部实现的模版，用于定制样式。他们都不涉及 HTML，从而安全。

option toolbox.feature.dataView.optionToContent
option toolbox.feature.dataView.title
option toolbox.feature.dataView.lang
· tooltip.dataView 面板完全以 HTML 渲染，这些 API 可自定义 HTML 文本中的部分内容，于是需要考虑 XSS 风险。	需要考虑 XSS 风险。一般情况下，仅需 HTML 转义即可。但如果一些不能转义的部分来自“不受信任”的来源，则须更多处理（如净化处理（sanitization）或沙盒隔离）。

详细描述见 “传入 HTML 时的安全考虑”。
option tooltip.extraCssText
· extraCssText 接受一个原始 CSS style 字符串，并接下来直接拼接进 tooltipEl.style.cssText。
（例外）：tooltip.renderMode: 'richText' 时此 extraCssText 无效。	若输入来自可信来源，则一般无安全问题，否则需要仔细评估风险。

详细描述见 “传入内联 CSS 时的安全考虑”。
option title.link
option title.sublink
option series-treemap.data.link
option series-sunburst.data.link
· 这些 option 直接接受原始 URL 字符串。	若输入来自可信来源，则一般无安全问题，否则须要考虑 XSS 风险。

详细描述见 "传入 URL 时的安全考虑"。
option toolbox.feature.saveAsImage.name
option toolbox.feature.saveAsImage.type
option title[0].text
· saveAsImage 功能的下载文件名由 {name}.{type} 拼装而成，并未做额外校验或净化（sanitization）处理。如果 name 没有指定，则使用 title[0].text 替代，尽管这种用法并不推荐。	详细描述见 “传入下载文件名时的安全考虑”。
option dataset.transform 中 type: 'filter' 的 config.reg
· filter 变换的 config 支持 reg 键，接受字符串或 RegExp，用于按正则匹配筛选数据行。字符串会直接被编译为 RegExp，并对每一行数据执行匹配，未对正则复杂度或长度做校验。	若 config（含 reg）来自不受信任来源，存在 ReDoS（正则表达式拒绝服务）风险，可能导致浏览器标签页卡死或服务端渲染阻塞。

详细描述见 “Dataset 筛选变换中正则（reg）的安全考虑”。
所有“JS 函数”输入（回调）	通常无安全问题，除非存在特殊使用场景（例如需要执行不可信来源的函数）。

详细描述见 “传入 JS 函数时的安全考虑”。
传入 HTML 时的安全考虑

在 “安全模型与检查清单” 一节中已列出会接受原始 HTML 的 API。“不受信任”的 HTML 可能导致 XSS 等攻击，因此在传入 ECharts 前应进行处理。常见的处理方式包括 HTML 转义（HTML Escaping）、净化（Sanitization）、沙盒。大多数情况下，仅进行 HTML 转义即可，除非那些不能被转义的部分来自于“不受信任”的来源。

HTML 转义（HTML Escaping）

数据组装成 HTML 字符串前总需要进行 HTML 转义。这不仅是安全需要，也是正确显示的前提。

最简单和常见的 HTML 转义是这些字符串转换：

'&' => '&amp;'
'<' => '&lt;'
'>' => '&gt;'
'"' => '&quot;'
"'" => '&#39;


转换后，这些字符的功能被去除了，只能显示，从而也无法通过他们进行注入攻击（如 <script>...</script>）。

例如：
// 功能不正确也不安全。
formatter: params => {
    const { name, value } = params;
    // 如果 name 或 value 中含有功能性字符，如 '<' '>' 等，则可能渲染不正确。
    // 同时，如果 name 或 value 的值来自于“非受信任”的来源，则可能被注入恶意代码并运行。
    return `${name}, <b>${value}<b/>`;
}
// 功能正确且安全。
formatter: params => {
    const { name, value } = params;
    return `${echarts.format.encodeHTML(name)}, <b>${echarts.format.encodeHTML(value)}</b>`;
}

使用 DOM API（如 .textContent = ）也能实现转义。

在大多数场景中，“不受信任”的内容（如用户输入的文本）仅用于显示，而有功能的部分（如 HTML 标签或属性）完全由应用开发者控制且可信。在这种情况下，HTML 转义本身就足以防御 XSS，只要所有“不受信任”的内容都被正确转义。

净化（Sanitization）

有些场景中，需要有功能的部分（如 HTML 标签或属性）也来自“不受信任”的来源。例如，数据库里取出的文本中包含有 <em>、<a> 等标签，并且想要它们被当做 HTML 标记解释运行，而不是原样显示。又例如，允许用户或者“不受信任”的来源提供 HTML 模板，用于定义布局与样式，继而和数据结合形成最终可被渲染的 HTML 传给 ECharts 。

这些场景需要承受相对更高的安全风险，可通过净化（sanitization）机制缓解。净化器（sanitizer）一般基于白名单过滤 HTML 内容，例如移除所有 <script>、<style>、<link>、内联 CSS、事件属性（如 onclick）以及 javascript:/data: 协议的 URL。推荐使用维护良好、社区广泛采用的库，而非用自己写的正则或字符串处理来做这件事。

净化可在前端（指 client）、后端（指 server）或两者同时进行，取决于实际场景和安全需求。例如，对于生成于前端的内容（例如前端提交给后端的内容），仅依赖前端净化不够，攻击者可直接伪造请求绕过前端。比如，一个在线编辑器允许用户以所见即所得（WYSIWYG）的方式创建内容，其中，用户可选择使用内置的几个 HTML 模板或 JS 函数（如 tooltip.formatter 或 label.formatter）。如果这些选好的或者生成的 HTML 文本或 JS 函数文本被传输到后端，并且不做处理直接存于数据库，则攻击者可在这个阶段注入恶意代码。后续它们被从数据库中取出，并传给 chart.setOption() 时，恶意代码会被执行。所以建议在这类场景中：

仅存储内置模板/函数的引用 ID，而不存储原始代码。
若为了更高的定制能力而允许自定义模板，则可考虑是否引入安全的第三方模板引擎，从而避免注入。
若必须允许用户自定义 HTML，须要严格的后端净化（sanitization）或校验（如过滤掉所有 JS、CSS 和其他可能有安全隐患的内容），并依据实际情况考虑是否在沙盒中渲染以降低潜在的风险。

通过净化达到足够的安全性有时并不容易。它需要有仔细和合理的配置，并不断随着浏览器/客户端更新，并常需结合其他防御机制从而达到“绝大多数情况下足够安全”。HTML 在能力上本身非常复杂和多变，在“不受信任”的内容上支持的功能越丰富，可攻击的渠道就越多。

沙盒

若必须执行“不受信任”的代码，或其他措施扔不足以达到足够的安全性，可使用“沙盒 iframe”（sandboxed iframe）进行隔离，提供相对更高安全防护，如 JSFiddle、CodePen 等代码执行平台所采用的机制。

传入内联 CSS 时的安全考虑

HTML 的安全（见 “传入 HTML 时的安全考虑” 一节）已经包括了 CSS 相关安全问题，而本节主要讨论那些仅接受内联 CSS 字符串的 API（即通过 .style.cssText = 修改 style 属性的情形）。在 “安全模型与检查清单” 一节中列出了这些 API。

若内联 CSS 完全来自“可信任”的来源（例如应用自身），则几乎无需担心安全问题，这也是最常见的情况。

否则，“不受信任”的 CSS 可能有安全隐患。一些 HTML 净化库支持 CSS 净化（CSS sanitization），但默认行为可能是删除所有 CSS，毕竟做到理想的 CSS 净化难度很大。因此，若必须运行“不受信任”的 CSS，应结合具体场景谨慎评估实现方式。

传入 URL 时的安全考虑

HTML 的安全（见 “传入 HTML 时的安全考虑” 一节）已经包括了 URL 相关安全问题，而本节专门针对那些仅接受 URL 输入的 API。在 “安全模型与检查清单” 一节中列出了这些 API。

若 URL 完全来自“可信任”的来源（例如应用自身），则几乎无需担心安全问题。

否则，“不受信任”的 URL 可能有安全问题，例如利用 javascript: 或 data: 协议执行恶意代码。因此，在传入 ECharts 前，应进行校验或净化，通常会依据白名单仅允许安全的协议。

传入下载文件名时的安全考虑

目前，仅 SaveAsImage 功能需要传入文件名。若该输入来自“可信任”的来源、长度合规且仅包含 ASCII 字母数字（可含-、_、.），则安全。

否则，虽然现代浏览器已显著改进了文件名的自动转义和净化处理（如去除 ../ 之类试图访问上级目录的路径、正确处理特殊字符等），但也存在一些风险，例如不同系统对保留字符的处理有差异，长度限制也不同。此外，旧浏览器或客户端的行为不够明确且不足够可信赖。因此，对这些“不受信任”的文件名仍应在输入前净化处理。

Dataset 筛选变换中正则（reg）的安全考虑

dataset 的 filter 变换 的 config 支持 reg 键，用于按正则表达式匹配某一维度的值以筛选数据行。reg 可接受字符串或 RegExp；字符串会直接被编译为 RegExp，并对每一行数据执行 test()，且未对正则模式的复杂度、长度或执行时间做任何校验或限制。该设计便于从 JSON/API 等可序列化配置中传入正则（如 reg: '^asdf$'），但当 config 来自“不受信任”的来源时，会引入 ReDoS（Regular Expression Denial of Service，正则表达式拒绝服务） 风险。

风险说明

若攻击者能控制或影响图表配置（例如看板、分析平台中用户可保存的图表配置），可构造带有灾难性回溯（catastrophic backtracking）的正则模式（例如嵌套量词 ^(a+)+$），并配合不匹配的长字符串数据。此时单次 test() 即可导致 CPU 呈指数级消耗：

客户端：渲染该图表的浏览器标签页会卡死，需强制关闭。
服务端：若使用 ECharts 的服务端渲染（SSR），单次恶意请求会阻塞 Node.js 事件循环，影响所有并发用户。
持久化场景：若恶意配置被存入数据库，每次有用户打开该看板或报表都会触发 DoS。

此类问题不涉及数据泄露或篡改，主要影响可用性。

建议
若 dataset.transform 的 config（含 reg）完全来自可信任来源（如应用自身或受控后台），则无需额外措施。
若 config 可能来自不受信任来源（如用户输入、外部 API、未校验的数据库内容）：
在传入 ECharts 前，对 reg 字符串做长度上限与复杂度校验（例如拒绝包含嵌套量词等已知易引发灾难性回溯的写法），或仅允许白名单内的简单模式。
或考虑使用具备线性时间保证的正则引擎（如服务端使用 RE2）或为匹配过程增加超时（如将耗时逻辑放入 Web Worker 并设上限），以降低 ReDoS 风险。
若业务上不需要由不可信方指定正则，可禁止从外部配置中传入 reg，仅允许写死在代码中的安全模式。
传入 JS 函数时的安全考虑

ECharts 的 option（即 chart.setOption() 的输入）主要是声明式的，但部分 option 可接受 JS 函数（回调）输入以增强表达能力和灵活性，如 label.formatter、axisTick.interval 等。在大多数情况下，这些函数是 app 源代码的一部分于是完全可信任，因此不会引入风险。

但若某些产品允许这些 JS 函数来自于“不受信任”的来源，如用户提供函数，则风险与维护成本显著增加。这种场景实质上与执行“不受信任”的 HTML 代码风险相当，可参考 “传入 HTML 时的安全考虑” 中的讨论。

---
