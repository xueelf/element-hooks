# Element Hooks

[![npm downloads](https://img.shields.io/npm/dm/element-hooks?style=flat-square&labelColor=FAFAFA&color=CB3837&logo=npm&logoColor=CB3837)](https://www.npmjs.com/package/element-hooks)
[![license](https://img.shields.io/github/license/xueelf/element-hooks?style=flat-square&labelColor=FAFAFA&color=181717&logo=github&logoColor=181717)](https://github.com/xueelf/element-hooks/blob/master/LICENSE)
[![element-plus](https://img.shields.io/badge/element--plus-%5E2.14.5-409eff?style=flat-square&labelColor=FAFAFA&logo=element&logoColor=409eff)](https://element-plus.org/)
[![typescript](https://img.shields.io/badge/TypeScript-%5E6.0.3-3178c6?style=flat-square&labelColor=FAFAFA&logo=typescript&logoColor=3178c6)](https://www.typescriptlang.org/)

Element Hooks 提供了一套组合式 API，让开发者以 Hook 方式使用 [Element Plus](https://element-plus.org/)，通过配置驱动组件、统一管理状态，减少重复模板代码。

## 目录

- [特性](#-特性)
- [安装](#-安装)
- [快速上手](#-快速上手)
  - [Core Hooks](#core-hooks)
  - [Composite Hooks](#composite-hooks)
- [全局配置](#全局配置)
- [API 概览](#api-概览)
- [文档](#-文档)
- [License](#-license)

## ✨ 特性

- **配置驱动**：使用配置项定义组件结构，减少重复的模板代码。
- **状态管理**：通过 Hook Controller 集中维护组件状态，避免逻辑分散。
- **原生兼容**：原生组件的 Props、Slots 和事件可直接用于 Hook Options，简单易上手。
- **聚合扩展**：Composite Hooks 通过聚合多个组件，轻松处理跨组件交互。

## 📦 安装

在开始前，请确保你的项目中已经安装 Vue 3 和 Element Plus。

```sh
npm install element-hooks
```

### 前置依赖

- Vue ≥ 3.5.41
- Element Plus ≥ 2.14.5

## 🚀 快速上手

Element Hooks 提供了两类 Hook：Core Hooks 和 Composite Hooks。

### Core Hooks

Core Hooks 以 Hook 形式封装 Element Plus 的单个组件或方法。返回的组件保留原生 Props、Slots 和事件，组件的 Props 可直接写入 Hook Options，无需额外嵌套在 `props` 字段中。

#### useDialog

通过 `open` 和 `close` 控制对话框，无需手动维护 `v-model`。

```vue
<script setup lang="ts">
  import { useDialog } from 'element-hooks';

  const [Dialog, { open, close }] = useDialog({
    width: 500,
    title: '提示',
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

#### useDrawer

通过 `open` 和 `close` 控制抽屉，无需手动维护 `v-model`。`direction` 和 `size` 等配置与 `ElDrawer` 保持一致。

```vue
<script setup lang="ts">
  import { useDrawer } from 'element-hooks';

  const [Drawer, { open, close }] = useDrawer({
    title: '详情',
    direction: 'rtl',
    size: '40%',
  });
</script>

<template>
  <el-button @click="open">打开抽屉</el-button>
  <Drawer>
    <p>这是一段内容。</p>
    <template #footer>
      <el-button @click="close">关闭</el-button>
    </template>
  </Drawer>
</template>
```

#### useForm

通过 `items` 配置数组声明表单项，使用 `prop` 可自动完成双向绑定，`render` 用来自定义渲染组件。

```vue
<script setup lang="ts">
  import { useForm } from 'element-hooks';
  import { ElInput } from 'element-plus';

  const [Form] = useForm({
    labelWidth: 'auto',
    model: { name: '', desc: '' },
    items: [
      { label: '名称', prop: 'name', render: { component: ElInput } },
      {
        label: '描述',
        prop: 'desc',
        render: { component: ElInput, props: { type: 'textarea' } },
      },
    ],
  });
</script>

<template>
  <Form />
</template>
```

#### useTable

通过 `columns` 配置数组声明表格列，替代手动编写 `<ElTableColumn>`。

```vue
<script setup lang="ts">
  import { useTable } from 'element-hooks';

  const [Table] = useTable({
    columns: [
      { prop: 'name', label: '姓名', width: 180 },
      { prop: 'age', label: '年龄', width: 100 },
      { prop: 'address', label: '地址' },
    ],
    data: [
      { name: 'Tom', age: 18, address: 'No. 189, Grove St, Los Angeles' },
      { name: 'Jerry', age: 20, address: 'No. 189, Grove St, Los Angeles' },
    ],
  });
</script>

<template>
  <Table style="width: 100%" />
</template>
```

#### useMessage

返回 `$message` 全局方法，用法与 `ElMessage` 完全一致。

```vue
<script setup lang="ts">
  import { useMessage } from 'element-hooks';

  const message = useMessage();

  const handleShowMessage = () => {
    message.success('操作成功');
  };
</script>

<template>
  <el-button @click="handleShowMessage">显示消息</el-button>
</template>
```

#### useMessageBox

原生 `ElMessageBox.confirm` 和 `ElMessageBox.prompt` 在取消或关闭时会 `reject` 并抛出异常，通常需要额外编写 `catch` 逻辑。`useMessageBox` 已统一处理这两种情况，因此可以直接使用 `await` 进行管理。其他异常仍会向调用方抛出。

- `confirm`：确认时返回 `true`，取消或关闭时返回 `false`。
- `prompt`：确认时返回输入内容，取消或关闭时返回 `null`。

`confirm` 和 `prompt` 通过 Promise 返回结果，因此不支持 `callback` 选项。`alert` 与原生方法保持一致。

```vue
<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';

  const { confirm } = useMessageBox();

  const handleDelete = async () => {
    const confirmed = await confirm('确定要删除吗？', '提示');

    if (confirmed) {
      // 执行删除
    }
  };
</script>
```

### Composite Hooks

Composite Hooks 将 Core Hooks 与原生组件聚合在一起，并通过统一的 Controller 管理跨组件状态和交互。

#### useGrid

`useGrid` 聚合 `ElForm`、`ElTable` 和 `ElPagination`，通过一个 Controller 管理查询条件、表格数据和分页状态。异步加载数据时，会自动处理 Loading。

```vue
<script setup lang="ts">
  import { useGrid } from 'element-hooks';
  import { ElInput } from 'element-plus';
  import { onMounted } from 'vue';

  const [Grid, { loadData }] = useGrid({
    columns: [{ prop: 'name', label: '姓名' }],
    form: {
      model: { keyword: '' },
      items: [
        { prop: 'keyword', label: '关键字', render: { component: ElInput } },
        { slot: 'operations' },
      ],
    },
    pagination: {
      pageSize: 10,
    },
  });

  const handleSearch = async () =>
    await loadData(async params => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      return response.json();
    });

  onMounted(async () => {
    await handleSearch();
  });
</script>

<template>
  <Grid>
    <template #operations="{ loading }">
      <el-button type="primary" :loading="loading" @click="handleSearch">
        查询
      </el-button>
    </template>
  </Grid>
</template>
```

### 全局配置

将 `ElementHooks` 注册为 Vue 插件后，可以设置全局默认配置，并启用 Vue DevTools 支持。

```ts
import ElementHooks from 'element-hooks';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ElementHooks, {
  pagination: {
    layout: 'prev, pager, next',
  },
});

app.mount('#app');
```

传入 `app.use(ElementHooks, options)` 的全局配置，会作为对应 Hook 的默认选项。例如，`form` 配置会同时作用于 `useForm` 和启用了表单的 `useGrid`。`pagination` 配置会作为 `useGrid` 分页的默认值。单次调用 Hook 时传入的配置优先级更高，会覆盖对应的全局默认值。

## 📖 文档

完整文档和在线示例请访问 [Element Hooks 文档站](https://element-hooks.js.org)。

## 📝 License

[MIT](https://github.com/xueelf/element-hooks/blob/master/LICENSE) License © [Yuki](https://github.com/xueelf)
