# 简介

## 什么是 Element Hooks？ {#what-is-element-hooks}

Element Hooks 将 [Element Plus](https://element-plus.org/) 的组件和方法封装为 Vue 3 Composition API 风格的 Hook。调用组件 Hook 时，传入配置即可得到一个能在模板中直接使用的组件。组件 Hook 还会返回 Controller，用于读取和更新组件状态。

## 使用方式 {#usage}

### 示例 {#example}

下面以 `useTable` 为例。`columns` 用于定义表格列，`data` 用于设置初始数据，Hook 返回的 `Table` 可以直接在模板中使用。

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

### Controller {#controller}

组件 Hook 返回一个由组件和 Controller 组成的 `[Component, Controller]` 元组。Hook Options 用于设置初始状态，Controller 则用于读取或更新组件运行期间的状态。

```ts
import { useTable } from 'element-hooks';

const [Table, { getData, setData }] = useTable({
  columns: [{ prop: 'name', label: '姓名' }],
  data: [],
});

setData([{ name: 'Tom' }]);

const currentData = getData();
```

上面的示例通过 `setData` 更新表格数据，并通过 `getData` 获取当前数据。Controller 保持扁平，使用时只需解构当前需要的方法。完整列表请参阅 [useTable Controller](/hooks/core/table#controller)。

## 核心特性 {#features}

- **配置驱动** — 使用配置项定义组件结构，减少重复的模板代码。
- **状态管理** — 通过 Hook Controller 集中维护组件状态，避免逻辑分散。
- **原生兼容** — 原生组件的 Props、Slots 和事件可直接用于 Hook Options，简单易上手。
- **聚合扩展** — Composite Hooks 通过聚合多个组件，轻松处理跨组件交互。
