# 简介

## 什么是 Element Hooks？

Element Hooks 是一个基于 [Element Plus](https://element-plus.org/) 的 Hooks 封装库，它允许你以**配置驱动**的方式使用 Element Plus 中的常用组件。

在传统的 Element Plus 使用方式中，你需要在模板中编写大量的组件标签和属性。而 Element Hooks 将这些组件的创建和控制逻辑收归到 `setup` 中，通过 Hooks 返回**动态组件**和**控制器**，让你的代码更加简洁和灵活。

## 设计理念

### 配置驱动

以 `useTable` 为例，传统写法需要在模板中逐个声明 `<el-table-column>`，而使用 Element Hooks 后只需传入一个 `columns` 配置数组：

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

Element Hooks 的初衷不是成为 Element Plus 的替代品，而是轻量级增强以应对不同的使用场景。Hooks 本质上还是对应的 Element Plus 功能项，例如组件 Hook，其返回的 Component 所有 Props、Slots 和事件都可以直接在模板上使用。你可以选择在 Hook 的 options 中统一配置，也可以在模板上逐个传递，两者可以自由混用——模板上的属性会与 options 合并，且**优先级更高**。

以 `useDialog` 为例，`title` 和 `width` 通过 options 传入，而 `draggable` 和 `@opened` 直接写在模板上：

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

## Hook 分类

Element Hooks 提供两类 Hook：**组件 Hook** 和 **命令式 Hook**。

### 组件 Hook

组件 Hook 用于封装 Element Plus 的 UI 组件（如对话框、表单、表格），返回一个元组 `[Component, controller]`：

- **Component** — 可以直接在模板中使用的 Vue 组件，支持原始的 Props 和 Slots。
- **controller** — 提供命令式操作的控制器对象，包含 `setOptions`、`instance` 等，可在任意逻辑中调用。其中 `instance` 是对内部 Element Plus 组件实例的 ref 引用，可以通过它直接调用原始组件上的方法，组件未挂载时值为 `null`。

```vue
<script setup lang="ts">
  import { useDialog } from 'element-hooks';
  
  const [Dialog, { open, close, setTitle }] = useDialog({
    title: '提示',
  });
  
  const handleOpen = () => {
    setTitle('新标题');
    open();
  };
</script>

<template>
  <button @click="handleOpen">打开</button>
  <Dialog>
    <p>对话框内容</p>
    <template #footer>
      <button @click="close">关闭</button>
    </template>
  </Dialog>
</template>
```

### 命令式 Hook

命令式 Hook 用于封装 Element Plus 的命令式 API（如 `ElMessage`、`ElMessageBox`），不涉及模板渲染，直接返回可调用的方法或对象。

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

## 目前提供的 Hooks

### 组件 Hook

| Hook | 说明 |
| --- | --- |
| [useDialog](/guide/hooks/dialog) | 对话框，支持命令式 `open` / `close` |
| [useForm](/guide/hooks/form) | 表单，支持配置驱动的表单项与双向绑定 |
| [useTable](/guide/hooks/table) | 表格，支持配置驱动的列定义与多级表头 |

### 命令式 Hook

| Hook | 说明 |
| --- | --- |
| [useMessage](/guide/hooks/message) | 消息提示，hooks 风格的 `ElMessage` |
| [useMessageBox](/guide/hooks/message-box) | 消息弹框，简化 `confirm` / `prompt` 的异步处理 |
