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

Element Hooks 提供三类常见用法：

- **组件 Hook**：对 Element Plus 组件做轻量封装，保留原始 Props、Slots 与事件。
- **命令式 Hook**：对命令式 API 做 Hook 化封装，直接在逻辑中调用。
- **进阶扩展 Hook（`Ex`）**：对多个组件进行组合增强，解决常见业务页面场景。

### 组件 Hook

组件 Hook（`useDialog`、`useForm`、`useTable`）返回元组 `[Component, controller]`。你可以在模板中渲染组件，并通过 `controller` 在业务逻辑中进行状态控制：

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

### 命令式 Hook

命令式 Hook（`useMessage`、`useMessageBox`）用于封装 Element Plus 的命令式 API，不涉及模板渲染，直接返回可调用的方法或对象：

```vue
<script setup lang="ts">
  import { useMessage, useMessageBox } from 'element-hooks';

  const message = useMessage();
  const messageBox = useMessageBox();

  const handleDelete = async () => {
    const confirmed = await messageBox.confirm('确定要删除吗？', '提示');
    if (confirmed) {
      message.success('删除成功');
    }
  };
</script>
```

### 进阶扩展 Hook（`Ex`）

进阶扩展 Hook（如 `useExTable`）通过组合 `ElTable`、`ElForm` 与 `ElPagination`，减少列表页样板代码。

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

**组件 Hook：**

- [useDialog](/guide/basic/dialog) — 对话框
- [useForm](/guide/basic/form) — 表单
- [useTable](/guide/basic/table) — 表格

**命令式 Hook：**

- [useMessage](/guide/basic/message) — 消息提示
- [useMessageBox](/guide/basic/message-box) — 消息弹框

**进阶扩展 Hook：**

- [useExTable](/guide/extras/table) — 列表场景组合增强
