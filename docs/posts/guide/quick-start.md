# 快速上手

## 安装 {#installation}

Element Hooks 基于 [Element Plus](https://element-plus.org/) 构建。开始使用前，请确认项目已满足以下依赖条件：

- [Vue](https://vuejs.org/) >= 3.0
- [Element Plus](https://element-plus.org/) >= 2.11
- [TypeScript](https://www.typescriptlang.org/) >= 5.0（推荐，非必需）

::: code-group

```sh [npm]
npm install element-hooks
```

```sh [yarn]
yarn add element-hooks
```

```sh [pnpm]
pnpm add element-hooks
```

```sh [bun]
bun add element-hooks
```

:::

## 基本用法 {#basic-usage}

### 全局配置

你可以将 `ElementHooks` 作为 Vue 插件安装，并传入全局默认配置：

```ts
import { createApp } from 'vue'
import ElementHooks, { type GlobalOptions } from 'element-hooks'
import { ElInput, ElSelect } from 'element-plus'

const app = createApp(App)

const options: GlobalOptions = {
  components: {
    input: ElInput,
    select: ElSelect,
  },
  pagination: {
    layout: 'prev, pager, next',
  },
}

app.use(ElementHooks, options)
```

全局 options 支持以下字段：

- `components`：给 `useForm` 的 `render.component`（字符串）提供全局组件映射（如 `input -> ElInput`）。
- `dialog`：`useDialog` 默认 options。
- `form`：`ElForm` 默认 options（对 `useForm` 与 `useExTable` 内部表单都生效）。
- `table`：`ElTable` 默认 options（对 `useTable` 与 `useExTable` 内部表格都生效）。
- `pagination`：`useExTable` 中 `ElPagination` 的全局默认 options。

当单次 Hook 调用传入了同名 options（例如 `pagination`）时，会与全局同名配置执行合并。

Element Hooks 提供两类常见用法：

- **核心功能 Hook (Core)**：对 Element Plus 基础组件或命令式 API 做轻量封装，以 Hook 化风格接管调用差异，保留原生 Props、Slots 与事件。
- **进阶组合 Hook (Extra)**：对复数核心组件进行协同增强，解决中后台复杂业务页面的样板代码积压。

### 核心功能 Hook (Core)

包含对组件的抽象（`useDialog`、`useForm`、`useTable`）或者纯命令式 API 的一致性封装（`useMessage`、`useMessageBox`）。

以对话框举例，它返回元组 `[Component, controller]`。你可以在 `<template>` 视图模板中渲染组件节点，并通过 `controller` 在业务逻辑中进行无缝状态控制：

```vue
<script setup lang="ts">
  import { useDialog } from 'element-hooks';
  
  const [Dialog, { open, close }] = useDialog({
    title: '提示',
    width: 500,
  });
</script>

<template>
  <el-button @click="open">打开对话框</el-button>
  <Dialog>
    <p>这是一段内容。</p>
    <template #footer>
      <el-button @click="close">关闭</el-button>
    </template>
  </Dialog>
</template>
```

### 进阶组合 Hook (Extra)

进阶组合 Hook（如 `useExTable`）通过底层桥接机制组合 `ElTable`、`ElForm` 与 `ElPagination`，极大减少 CRUD 列表页的样板代码：

```ts
import { useExTable } from 'element-hooks'

const [ExTable, controller] = useExTable({
  columns: [],
  data: [],
  pagination: { currentPage: 1, pageSize: 10 },
})
```

## 下一步 {#next-steps}

你可以继续阅读各 Hook 文档，了解更完整的配置项与实战示例：

**核心功能 (Core)：**

- [useDialog](/guide/core/dialog) — 对话框
- [useForm](/guide/core/form) — 表单
- [useTable](/guide/core/table) — 表格
- [useMessage](/guide/core/message) — 消息提示
- [useMessageBox](/guide/core/message-box) — 消息弹框

**进阶组合 (Extra)：**

- [useExTable](/guide/extra/table) — 列表场景组合增强
