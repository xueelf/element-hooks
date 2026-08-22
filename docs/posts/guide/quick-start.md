# 快速上手

## 安装 {#installation}

安装前，请确认项目已经安装以下依赖。

- [Vue](https://vuejs.org/) `^3.5.41`
- [Element Plus](https://element-plus.org/) `^2.14.5`

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

可以直接从 `element-hooks` 按需导入 Hook，无需先注册 Vue 插件。在 `<script setup>` 中调用 `useDialog` 后，返回的 `Dialog` 可以直接在 `<template>` 中使用。

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

## 注册插件 {#plugin-registration}

将 Element Hooks 注册为 Vue 插件后，可以设置 [全局配置](/guide/global-options)，并启用 Vue DevTools 支持。如果只需要按需使用 Hook，也可以不注册插件。

```ts {10}
import ElementHooks from 'element-hooks';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ElementHooks);

app.mount('#app');
```

## 自动导入 {#auto-import}

如果项目已经使用 [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)，可以添加以下配置，自动导入 Element Hooks 提供的全部 Hook。

```ts [vite.config.ts]
import ElementHooksComposables from 'element-hooks/composables';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        'vue',
        {
          'element-hooks': Object.keys(ElementHooksComposables),
        },
      ],
    }),
  ],
});
```

## 下一步 {#next-steps}

接下来可以继续阅读以下内容。

- [Hook 介绍](/hooks/introduction) — 查看 Core Hooks 和 Composite Hooks 的分类。
- [全局配置](/guide/global-options) — 设置 Hook 的全局默认配置。
- [状态管理](/guide/state-management) — 了解 `setState` 和快捷方法的使用方式。
