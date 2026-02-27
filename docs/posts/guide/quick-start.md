# 快速上手

## 安装

Element Hooks 基于 [Element Plus](https://element-plus.org/) 构建，请确保你的项目中已经安装了以下依赖：

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

## 基本用法

安装完成后，你可以在组件中直接导入并使用任意 Hook：

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

除 `useMessageBox` 外，每个 Hook 都返回一个元组 `[Component, controller]`，你可以通过 controller 在逻辑代码中动态控制组件：

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

## 下一步

准备好了吗？前往各个 Hook 的文档了解更多用法：

- [useDialog](/guide/hooks/dialog) — 对话框
- [useForm](/guide/hooks/form) — 表单
- [useTable](/guide/hooks/table) — 表格
- [useMessageBox](/guide/hooks/message-box) — 消息弹框