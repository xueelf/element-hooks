# Hooks 介绍

Element Hooks 包含一系列基于 Element Plus 的组合式封装，你既可以提供 JavaScript 对象配置来快速生成复杂的组件实例，也可以用命令式的风格处理常见的交互提示逻辑。

根据对 Element Plus 原生能力的封装深度与侧重点的不同，所有的 Hook 被划分为两大核心体系。

## 设计模式 {#design-pattern}

在 Element Hooks 中，关于 Options 传参有一个极其关键的设计原则：**Hook 永远不应该接收 `ref` 或 `reactive` 等响应式对象作为属性配置**。

无论是 `props` 的覆盖还是状态的管理，全部交由 Hook 返回的**控制器**接管。你应当始终传递普通的初始值或函数参数，在后续遇到状态或配置更变时，通过控制器暴露的 getter/setter 等对应方法来执行。

```ts
// 错误示范：传入响应式对象
const options = reactive({
  title: '标题',
});
const [Dialog] = useDialog(options);

options.title = '';
```

```ts
// 正确示范：传递普通对象，通过控制器接管状态
const [Dialog, { setTitle }] = useDialog({
  title: '标题',
});

setTitle();
```

## 副作用与原理说明 {#side-effects-and-principles}

尽管 Element Hooks 在设计理念上**不提倡**直接传入响应式对象，但在实际的框架底层机制下，内部采用了 `shallowRef` 搭配 `watchEffect` 与对象展开语法进行构建。这意味着，如果你强行传入了一个响应式对象，Vue 依然能够收集到你对其内部属性变更的依赖，因此在某些场景下，视图也能够「碰巧」正常触发更新。

但这仅仅是响应式对象自身的依赖收集产生的副作用效果。绕过控制器直接更新对象会打破「唯一状态流转出口」的原则，并不符合 Hook 的设计逻辑规范，因此在业务开发中应尽力避免这种写法。

## Hook 分类 {#hook-categories}

### 核心功能 (Core)

对 Element Plus 基础能力的 Hook 封装，同时保持对原生 Props 的最高支持与兼容：

- **组件化 Hook** — 返回一个可渲染的组件与控制器元组。主要目的是将原本散落的配置和状态集中进行逻辑管理，提高代码可读性与可维护性，例如 `useDialog`、`useForm` 等。
- **命令式 Hook** — 封装以 `ElMessage` 为首的命令式 API，提供更好的上下文行为一致性，并补足原有 API 的部分 TypeScript 推导能力，如 `useMessage`。

### 扩展组合 (Extra)

当应用复杂度升高，针对多个核心组件或特定业务模式的扩展场景：

- **扩展型 Hook** — 在原生组件的能力基础上，增加了一系列中后台页面常用的扩展功能，这类 Hook 方法均包含 `useEx` 的前缀命名约束以作区分。例如 `useExTable`，它在原生表格上内置了对 `ElForm`（查询）与 `ElPagination`（分页）的联动。

## Hooks 索引 {#hooks-index}

以下为目前正式内置的 Hooks 列表，点击对应名称查看详细的类型定义、调用文档及代码示例。

### 核心功能 (Core)

- [**useDialog**](/hooks/core/dialog) — 对话框。提供命令式的 `open` 与 `close` 动作。
- [**useForm**](/hooks/core/form) — 表单。支持基于 JSON Schema 风格的配置驱动渲染。
- [**useTable**](/hooks/core/table) — 表格。利用配置项映射所有插槽及多级表头定义。
- [**useMessage**](/hooks/core/message) — 消息提示。更贴近 Vue 生态周期的提示控制器。
- [**useMessageBox**](/hooks/core/message-box) — 消息弹框。针对基于 Promise 的模态确认进行了合理重构。

### 扩展组合 (Extra)

- [**useExTable**](/hooks/extra/ex-table) — 联动表格。集成了搜索表单生成、分页联动及容器自适应功能，简化常规的中后台表单表格操作流。
