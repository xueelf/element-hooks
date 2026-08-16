# 快速上手

## 安装 {#installation}

Element Hooks 基于 [Element Plus](https://element-plus.org/) 构建。
开始使用前，请确认项目满足以下依赖条件。

- [Vue](https://vuejs.org/) `^3.3.7`
- [Element Plus](https://element-plus.org/) `^2.14.4`
- [TypeScript](https://www.typescriptlang.org/) `^6.0.3`

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

## 引入插件 {#plugin-registration}

推荐将 Element Hooks 注册为 Vue 插件。
注册插件时可以传入 [全局配置](/guide/global-options)。
插件同时会启用 Vue DevTools 支持。

```ts {9}
import ElementHooks from 'element-hooks';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ElementHooks);

app.mount('#app');
```

## 基本用法 {#basic-usage}

组件 Hook 返回 `[Component, controller]` 元组。
在 `<script setup>` 中调用控制方法。
在 `<template>` 中渲染返回的组件。

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

完整的功能说明请参阅 [Hook 介绍](/hooks/introduce)。

## 自动导入 {#auto-import}

项目可以使用 [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) 自动导入 Hook。
`element-hooks/composables` 的默认导出包含全部 Hook。
将该对象的键名添加到 `imports` 配置即可。

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

完成基本配置后，可以继续阅读以下内容。

- [Hook 介绍](/hooks/introduce) — 了解 Element Hooks 的 API 边界和分类。
- [全局配置](/guide/global-options) — 设置 Hook 的全局默认配置。
