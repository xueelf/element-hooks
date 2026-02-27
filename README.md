# Element Hooks

[![npm downloads](https://img.shields.io/npm/dm/element-hooks?style=flat-square&labelColor=FAFAFA&color=CB3837&logo=npm&logoColor=CB3837)](https://www.npmjs.com/package/element-hooks)
[![license](https://img.shields.io/github/license/xueelf/element-hooks?style=flat-square&labelColor=FAFAFA&color=181717&logo=github&logoColor=181717)](https://github.com/xueelf/element-hooks/blob/master/LICENSE)
[![element-plus](https://img.shields.io/badge/element--plus-%3E%3D2.11-409eff?style=flat-square&labelColor=FAFAFA&logo=element&logoColor=409eff)](https://element-plus.org/)
[![typescript](https://img.shields.io/badge/TypeScript-%3E%3D5.0-3178c6?style=flat-square&labelColor=FAFAFA&logo=typescript&logoColor=3178c6)](https://www.typescriptlang.org/)

以 Hooks 的方式使用 [Element Plus](https://element-plus.org/) 组件。

## ✨ 特性

- **配置驱动** — 通过声明式配置生成表单、表格、对话框等组件，减少模板代码，提升开发效率。
- **类型安全** — 基于 TypeScript 编写，提供完整的类型推导与提示，在开发时即可捕获潜在错误。
- **无缝集成** — 基于 Element Plus 封装，保留所有原始 Props、Slots 和事件，零学习成本迁移。

## 📦 安装

请确保你的项目中已经安装了 Vue 3 和 Element Plus。

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

每个 Hook 返回一个元组 `[Component, controller]`：

- **Component** — 可以直接在模板中使用的 Vue 组件，支持原始的 Props 和 Slots。
- **controller** — 提供命令式操作的控制器对象，包含 `setProps`、`instance` 等，可在任意逻辑中调用。

### useTable

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

### useForm

通过 `items` 配置数组声明表单项，使用 `render` 实现自动双向绑定：

```vue
<script setup lang="ts">
  import { useForm } from 'element-hooks';
  import { ElInput } from 'element-plus';

  const [Form, { getModel }] = useForm({
    labelWidth: 'auto',
    model: { name: '', desc: '' },
    items: [
      { label: '名称', prop: 'name', render: { component: ElInput } },
      { label: '描述', prop: 'desc', render: { component: ElInput, props: { type: 'textarea' } } },
    ],
  });
</script>

<template>
  <Form />
</template>
```

### useDialog

通过 `open` / `close` 命令式控制对话框，无需手动管理 `v-model`：

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

### useMessageBox

封装 `ElMessageBox`，简化 `confirm` / `prompt` 的异步处理，不再需要 `try/catch`：

```vue
<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';

  const messageBox = useMessageBox();

  const handleDelete = async () => {
    const confirmed = await messageBox.confirm('确定要删除吗？', '提示');
    if (confirmed) {
      // 执行删除
    }
  };
</script>
```

## 📖 文档

完整文档和在线示例请访问：[element-hooks 文档站](https://xueelf.github.io/element-hooks/)

## 📝 License

[MIT](https://github.com/xueelf/element-hooks/blob/master/LICENSE) License © [Yuki](https://github.com/xueelf)