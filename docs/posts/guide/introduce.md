# 简介

## 什么是 Element Hooks？ {#what-is-element-hooks}

Element Hooks 是基于 Vue 3 组合式 API 的 Element Plus Hook 库。
它基于 [Element Plus](https://element-plus.org/) 构建。
组件 Hook 使用配置描述组件结构，并通过 Controller 读写状态。

使用 Element Plus 时，表单项和表格列通常直接写在 `<template>` 中。
Element Hooks 可以将这些重复结构移到 TypeScript 配置中。

## 核心特性 {#features}

- **配置驱动** — 使用对象配置生成表格列和表单项。
- **逻辑与视图分离** — 模板负责渲染，Controller 负责读写状态。
- **TypeScript 支持** — 通过泛型和函数重载提供类型推导。
- **原生能力** — 保留 Element Plus 的属性、插槽和事件。
- **轻量封装** — 复用 Element Plus 和 Vue，不重复实现底层组件。

## 设计理念 {#design-philosophy}

### 逻辑集中管理 {#centralized-logic-management}

`useTable` 可以用 `columns` 配置声明表格列。
调用方可以使用 `setColumns` 更新列配置。

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

### 保留原生能力 {#native-capabilities}

Hook 生成的组件仍支持对应 Element Plus 组件的属性、插槽和事件。

`<template>` 中传入的属性优先于 Hook 的初始配置。

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
  <Dialog draggable @opened="() => console.log('opened')">
    <p>这是一段内容。</p>
    <template #footer>
      <el-button @click="close">关闭</el-button>
    </template>
  </Dialog>
</template>
```

## 适用场景 {#when-to-use}

- **中后台系统** — 包含列表、搜索表单和弹窗的页面。
- **复杂交互场景** — 需要集中管理组件状态和交互的页面。
- **减少模板重复** — 希望用 TypeScript 配置描述表单和表格的项目。

详细分类和 Hook 列表请阅读 [Hook 介绍](/hooks/introduce)。
