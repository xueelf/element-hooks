# 简介

## 什么是 Element Hooks？ {#what-is-element-hooks}

Element Hooks 是一个基于 [Element Plus](https://element-plus.org/) 的 Hooks 封装库，支持你以**配置驱动**的方式使用常见组件能力。

在传统的 Element Plus 使用方式中，通常需要在模板中编写大量组件标签与属性。Element Hooks 将组件创建与控制逻辑收敛到 `setup` 中，通过 Hook 返回**动态组件**与**控制器**，让代码结构更清晰、扩展更自然。

## 设计理念 {#design-philosophy}

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

Element Hooks 的定位不是替代 Element Plus，而是对常见开发场景做轻量增强。Hook 本质上仍映射到对应的 Element Plus 能力：以组件 Hook 为例，返回组件的 Props、Slots 与事件均可直接使用。你既可以在 Hook 的 options 中集中配置，也可以通过组件 `attrs` 按需覆盖，两者可混合使用——且 **attrs 优先级更高**。

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

## Hook 分类 {#hook-categories}

Element Hooks 的分类可以直接理解为三类：

- **组件 Hook**：返回可渲染组件与控制器。
- **命令式 Hook**：返回可直接调用的方法对象。
- **进阶扩展 Hook**：基于多个 Element Plus 组件做组合增强，命名以 `Ex` 开头。

### 组件 Hook

组件 Hook 用于封装 Element Plus 的 UI 组件（如对话框、表单、表格），返回元组 `[Component, controller]`：

- **Component** — 可以直接在模板中使用的 Vue 组件，支持原始的 Props 和 Slots。
- **controller** — 提供命令式操作的控制器对象，包含 `setState`、`instance` 等，可在任意逻辑中调用。其中 `instance` 是内部 Element Plus 组件实例的 ref 引用，可直接访问原生实例方法；组件未挂载时值为 `null`。

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

### 进阶扩展 Hook

进阶扩展 Hook 在保留 Element Plus 原始能力的基础上，对多个组件进行组合封装，适用于中后台常见业务场景。

该类 Hook 使用 `Ex` 表示扩展能力，命名形态为 `useExXxx`，例如 `useExTable`。

## 目前提供的 Hooks {#currently-available-hooks}

### 组件 Hook

| Hook | 说明 |
| --- | --- |
| [useDialog](/guide/basic/dialog) | 对话框，支持命令式 `open` / `close` |
| [useForm](/guide/basic/form) | 表单，支持配置驱动的表单项与双向绑定 |
| [useTable](/guide/basic/table) | 表格，支持配置驱动的列定义与多级表头 |

### 命令式 Hook

| Hook | 说明 |
| --- | --- |
| [useMessage](/guide/basic/message) | 消息提示，hooks 风格的 `ElMessage` |
| [useMessageBox](/guide/basic/message-box) | 消息弹框，简化 `confirm` / `prompt` 的异步处理 |

### 进阶扩展 Hook

| Hook | 说明 |
| --- | --- |
| [useExTable](/guide/extras/table) | 表格、表单、分页的进阶扩展 Hook |
