# 简介

## 什么是 Element Hooks？ {#what-is-element-hooks}

Element Hooks 是 Vue 3 组合式 API 库。
它基于 [Element Plus](https://element-plus.org/) 构建。
它支持通过配置生成组件，并通过控制器管理状态。

Element Plus 通常在 `<template>` 中声明组件。
Element Hooks 提供配置式表达，减少重复的模板结构。
Hook 返回 Vue 组件和操作控制器。

## 核心特性 {#features}

- **配置驱动**：使用对象配置生成表格列和表单项。
- **逻辑与视图分离**：通过控制器集中管理组件状态。
- **TypeScript 支持**：通过泛型和函数重载提供类型推导。
- **原生能力**：保留 Element Plus 的属性、插槽和事件。
- **轻量封装**：基于 Element Plus 和 Vue 的现有能力组合。

## 设计理念 {#design-philosophy}

### 逻辑集中管理

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

### 保留原生能力

Element Hooks 是 Element Plus 的上层封装。
Hook 返回的组件仍保留原生能力。

`<template>` 中的属性具有更高优先级。
因此，模板可以覆盖 Hook 的初始配置。

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

- **中后台系统**：包含列表、搜索表单和弹窗的页面。
- **复杂交互场景**：需要集中管理多个组件的视图。
- **配置化开发**：倾向使用脚本配置组件的项目。

详细分类和 Hook 列表请阅读 [Hook 介绍](/hooks/introduce)。
