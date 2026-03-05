# 简介

## 什么是 Element Hooks？ {#what-is-element-hooks}

Element Hooks 是一个基于 [Element Plus](https://element-plus.org/) 的 Vue 3 组合式 API 增强库，支持以**配置驱动**与**状态接管**的方式使用各类组件。

在传统的 Element Plus 使用场景中，通常需要在 `<template>` 视图模板中编写大量组件标签、属性与插槽声明。Element Hooks 引入了控制器模式，将原本的声明式渲染转变为相对灵活的脚本配置。它通过 Hook 返回 **Vue 组件（Component）**与**操作控制器（Controller）**，让你能以更加集中的逻辑结构来组织页面代码。

## 核心特性 {#features}

- **配置驱动** — 使用 JSON 对象配置生成 Table 列、Form 字段等视图结构，所有的响应式状态管理均由 Hook 内部闭包与控制器接管，彻底告别在 options 中传入并追踪响应式对象的历史负担。
- **逻辑与视图分离** — 将弹窗状态、表格分页等数据移至控制器内，精简组件模板代码。
- **友好的 TypeScript 支持** — 利用泛型与函数重载，在编写配置项时提供精准的属性与事件的自动补全。
- **原生能力** — 保留 Element Plus 组件的 Props、Slots 与 Events，支持在 `<template>` 按需传入属性，且该属性拥有最高优先级。
- **轻量封装** — 完全基于 Element Plus 现有能力和 Vue 的原生逻辑组合，不引入任何额外的独立依赖包。

## 设计理念 {#design-philosophy}

### 逻辑集中管理

以 `useTable` 为例，传统写法需要在 `<template>` 视图模板中逐个声明 `<el-table-column>`。当涉及权限判断或状态交互时，通常需要嵌套大量的 `v-if` 或 `v-else` 指令，这极大增加了模板代码的阅读负担。使用 Element Hooks 后，你可以仅传入初始的 `columns` 配置数组，并在代码逻辑中通过控制器暴露的 `setColumns` 等方法来灵活变更列配置：

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

Element Hooks 的定位是提供一种轻量的上层提效手段。组件 Hook 返回的实例本质上仍是常规的 Element Plus 组件。

在使用时，写在 `<template>` 视图的组件属性具有等同于原生的行为与更高的优先级。你既可以在 Hook 配置参数中统一设定基础选项，也可以在模板中按需覆盖独立属性与事件：

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

- **中后台系统**：适用于包含大量增删改查（CRUD）列表、搜索表单以及相对标准弹窗交互的常见业务页面。
- **复杂交互场景**：需要跨组件层级传递状态，或希望集中管理多个组件联动逻辑的视图。
- **配置化开发体验**：倾向于使用脚本进行声明与属性设置，消解由于组件层级嵌套累积的模板杂乱感。

更深入的设计分类及 Hooks 列表请阅读 [Hooks 介绍](/hooks/introduce)。
