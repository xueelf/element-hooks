# 简介

## 什么是 Element Hooks？ {#what-is-element-hooks}

Element Hooks 是一个基于 [Element Plus](https://element-plus.org/) 的 Hooks 封装库，支持你以**配置驱动**的方式使用常见组件能力。

在传统的 Element Plus 使用方式中，通常需要在 `<template>` 视图模板中编写大量组件标签与属性。Element Hooks 将组件创建与控制逻辑统一提取到 `setup` 脚本中，通过 Hook 返回**动态组件**与**控制器**，让代码结构更清晰、扩展更自然。

## 设计理念 {#design-philosophy}

### 配置驱动

以 `useTable` 为例，传统写法需要在 `<template>` 视图模板中逐个声明 `<el-table-column>`，而使用 Element Hooks 后只需传入一个 `columns` 配置数组：

```vue
<script setup lang="ts">
  import { useTable } from 'element-hooks';
  
  const [Table] = useTable({
    columns: [
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄' },
    ],
    data: [
      { name: 'Tom', age: 18 },
      { name: 'Jerry', age: 20 },
    ],
  });
</script>

<template>
  <Table />
</template>
```

### 保留原始能力

Element Hooks 的定位不是替代 Element Plus，而是对常见开发场景做轻量增强。Hook 本质上仍映射到对应的 Element Plus 能力：以组件 Hook 为例，返回组件的 Props、Slots 与事件均可直接使用。你既可以在 Hook 的 options 中集中配置，也可以通过组件 `attrs` 按需覆盖，两者可混合使用——且 **attrs 优先级更高**。

以 `useDialog` 为例，`title` 和 `width` 通过 options 传入，而 `draggable` 和 `@opened` 直接写在 `<template>` 视图模板上：

```vue
<script setup lang="ts">
  import { useDialog } from 'element-hooks';

  const [Dialog, { open, close }] = useDialog({
    title: '提示',
    width: 500,
  });

  const handleOpened = () => {
    console.log('对话框已打开');
  };
</script>

<template>
  <el-button @click="open">打开对话框</el-button>
  <Dialog draggable @opened="handleOpened">
    <p>这是一段内容。</p>
    <template #footer>
      <el-button @click="close">关闭</el-button>
    </template>
  </Dialog>
</template>
```

## Hook 分类 {#hook-categories}

Element Hooks 的分类可以直接理解为两部分核心体系：

- **核心功能 (Core)** — 对 Element Plus 基础能力的细粒度封装，保持 100% 的原生体验支持。
  - **组件类 Hook** — 返回可渲染的组件与控制器，抽离 `<template>` 视图模板中大量且冗长的节点标签与属性声明。
  - **命令式 Hook** — 封装如 `ElMessage`、`ElMessageBox` 等纯命令式 API，以 Hook 化风格接管调用差异，并提供更好的 TypeScript 推导能力。
- **进阶组合 (Extra)** — 结合多种基础组件的高级场景，适用于中后台高频业务页面，对外导出的 Hook 均以 `useEx` 作为前缀。

## 目前提供的 Hooks {#currently-available-hooks}

### 核心功能 (Core)

| Hook | 说明 |
| --- | --- |
| [useDialog](/guide/core/dialog) | 对话框，支持命令式 `open` / `close` |
| [useForm](/guide/core/form) | 表单，支持配置驱动的表单项与双向绑定 |
| [useTable](/guide/core/table) | 表格，支持配置驱动的列定义与多级表头 |
| [useMessage](/guide/core/message) | 消息提示，hooks 风格的 `ElMessage` |
| [useMessageBox](/guide/core/message-box) | 消息弹框，简化 `confirm` / `prompt` 的异步处理 |

### 进阶组合 (Extra)

| Hook | 说明 |
| --- | --- |
| [useExTable](/guide/extra/table) | 表格、表单、分页的进阶扩展组合 |
