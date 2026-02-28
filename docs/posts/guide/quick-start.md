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

### 组件 Hook

组件 Hook（`useDialog`、`useForm`、`useTable`）返回一个元组 `[Component, controller]`，你可以在模板中渲染组件，并通过 controller 动态控制它：

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

## 下一步

准备好了吗？前往各个 Hook 的文档了解更多用法：

**组件 Hook：**

- [useDialog](/guide/hooks/dialog) — 对话框
- [useForm](/guide/hooks/form) — 表单
- [useTable](/guide/hooks/table) — 表格

**命令式 Hook：**

- [useMessage](/guide/hooks/message) — 消息提示
- [useMessageBox](/guide/hooks/message-box) — 消息弹框
