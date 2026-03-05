# 快速上手

## 安装 {#installation}

Element Hooks 基于 [Element Plus](https://element-plus.org/) 构建。开始使用前，请确认项目已满足以下依赖条件：

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

## 基本用法 {#basic-usage}

在页面中，你只需要引入所需的 Hook 并执行它，通常会返回一个由**组件（Component）**与**控制器（Controller）**组成的元组。你可以在 `setup` 中调用控制逻辑，并在 `<template>` 视图声明挂载的组件标签：

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

完整的可用特性与介绍，请参阅后续的 [Hooks 介绍](/hooks/introduce)。

## 下一步 {#next-steps}

了解了基本的应用方式，你可以进一步研究：

- [Hooks 介绍](/hooks/introduce) — 了解 Element Hooks 的 API 边界与分类。
- [全局配置](/guide/global-options) — 设置应用级的统一风格。
