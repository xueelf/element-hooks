# Element Hooks

[![npm downloads](https://img.shields.io/npm/dm/element-hooks?style=flat-square&labelColor=FAFAFA&color=CB3837&logo=npm&logoColor=CB3837)](https://www.npmjs.com/package/element-hooks)
[![license](https://img.shields.io/github/license/xueelf/element-hooks?style=flat-square&labelColor=FAFAFA&color=181717&logo=github&logoColor=181717)](https://github.com/xueelf/element-hooks/blob/master/LICENSE)
[![element-plus](https://img.shields.io/badge/element--plus-%5E2.14.4-409eff?style=flat-square&labelColor=FAFAFA&logo=element&logoColor=409eff)](https://element-plus.org/)
[![typescript](https://img.shields.io/badge/TypeScript-%5E6.0.3-3178c6?style=flat-square&labelColor=FAFAFA&logo=typescript&logoColor=3178c6)](https://www.typescriptlang.org/)

以 Hook 的方式使用 [Element Plus](https://element-plus.org/) 组件。

## ✨ 特性

- **配置驱动** — 使用配置生成表单、表格和对话框。
- **类型安全** — 基于 TypeScript 编写，提供完整的类型推导。
- **原生能力** — 继续使用 Element Plus 的属性、插槽和事件。

## 📦 安装

请确保项目中已经安装 Vue 3 和 Element Plus。

```sh
# npm
npm install element-hooks

# yarn
yarn add element-hooks

# pnpm
pnpm add element-hooks

# bun
bun add element-hooks
```

## 🚀 快速上手

Element Hooks 不仅封装 Element Plus 的原生组件和服务，还可以将多个 Hook 组合成一个组件。
公开 API 按调用方式分为组件 Hook 和命令式 Hook。

### 全局配置

推荐将 `ElementHooks` 注册为 Vue 插件。
注册插件时可以设置全局默认配置。
插件同时会启用 Vue DevTools 支持。

```ts
import ElementHooks from 'element-hooks';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';

import App from './App.vue';
import DictSelect from './components/selector/DictSelect.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ElementHooks, {
  components: {
    'dict-select': DictSelect,
  },
  pagination: {
    layout: 'prev, pager, next',
  },
});

app.mount('#app');
```

全局默认项按组件分别生效。
例如，`form` 会作用于 `useForm` 和 `useGrid`。
单次 Hook 调用的同名配置具有更高优先级。

### 组件 Hook

组件 Hook 返回 `[Component, controller]` 元组。

- **Component** — 可以在模板中使用的 Vue 组件。
- **Controller** — 包含 `setState`、`instance` 等控制方法。

#### useDialog

通过 `open` 和 `close` 命令式控制对话框，无需手动管理 `v-model`：

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

#### useForm

通过 `items` 配置数组声明表单项，使用 `render` 实现自动双向绑定：

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

通过 `columns` 配置数组声明表格列，替代手动编写 `<ElTableColumn>`：

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

### 命令式 Hook

命令式 Hook 不渲染组件，而是直接返回可调用的方法。

#### useMessage

直接返回 `ElMessage`，用法与 `ElMessage` 完全一致：

```vue
<script setup lang="ts">
  import { useMessage } from 'element-hooks';

  const message = useMessage();

  const handleSuccess = () => {
    message({
      message: '操作成功',
      type: 'success',
    });
  };

  const handleWarning = () => {
    message({
      message: '请注意',
      type: 'warning',
    });
  };

  const handleError = () => {
    message.error('操作失败');
  };
</script>
```

#### useMessageBox

`confirm` 取消时返回 `false`，`prompt` 取消时返回 `null`。
两种情况都不会拒绝 `Promise`。

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

## 📖 文档

完整文档和在线示例请访问 [Element Hooks 文档站](https://element-hooks.js.org)。

## 📝 License

[MIT](https://github.com/xueelf/element-hooks/blob/master/LICENSE) License © [Yuki](https://github.com/xueelf)
