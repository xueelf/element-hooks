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

### 组件 + 控制器

每个 Hook 返回一个元组 `[Component, controller]`：

- **Component** — 可以直接在模板中使用的 Vue 组件，支持原始的 Props 和 Slots。
- **controller** — 提供命令式操作的控制器对象，包含 `setProps`、`instance` 等，可在任意逻辑中调用。其中 `instance` 是对内部 Element Plus 组件实例的 ref 引用，可以通过它直接调用原始组件上的方法，组件未挂载时值为 `null`。

> [!NOTE]
> `useMessage` 和 `useMessageBox` 是例外，它们不返回元组。`useMessage` 直接返回 `ElMessage`，详见 [useMessage](/guide/hooks/message)；`useMessageBox` 返回一个包含 `alert`、`confirm`、`prompt` 方法的对象，详见 [useMessageBox](/guide/hooks/message-box)。

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

### 保留原始能力

Element Hooks 不是对 Element Plus 的二次封装替代品，而是一层薄薄的增强。所有 Element Plus 组件原本支持的 Props、Slots 和事件都可以照常使用，你可以在配置中声明，也可以直接写在模板上。

## 目前提供的 Hooks

| Hook | 说明 |
| --- | --- |
| [useDialog](/guide/hooks/dialog) | 对话框，支持命令式 `open` / `close` |
| [useForm](/guide/hooks/form) | 表单，支持配置驱动的表单项与双向绑定 |
| [useTable](/guide/hooks/table) | 表格，支持配置驱动的列定义与多级表头 |
| [useMessage](/guide/hooks/message) | 消息提示，hooks 风格的 `ElMessage` |
| [useMessageBox](/guide/hooks/message-box) | 消息弹框，简化 `confirm` / `prompt` 的异步处理 |