# 全局配置

## Vue 插件注册 {#vue-plugin}

你可以将 `ElementHooks` 作为 Vue 插件安装，并传入全局默认配置。这样在后续使用任何 Hook 时，都会优先继承相关的全局配置，从而统一站内组件的基础交互和表单排版风格。

```ts
import { createApp } from 'vue';
import ElementHooks from 'element-hooks';
import { ElInput, ElSelect } from 'element-plus';

const app = createApp(App);

app.use(ElementHooks, {
  components: {
    input: ElInput,
    select: ElSelect,
  },
  pagination: {
    layout: 'prev, pager, next',
  },
});
```

## 方法动态设置 {#method-setting}

Element Hooks 也提供了暴露在外的 `setOptions` 与 `getOptions` 方法用于命令式地读写全局配置：

```ts
import { setOptions, getOptions } from 'element-hooks';
import { ElInput } from 'element-plus';

setOptions({
  components: {
    input: ElInput,
  },
  dialog: {
    destroyOnClose: true,
  },
});

const globalOptions = getOptions();
```

## 配置项 {#config}

全局 `options` 支持以下字段：

- **components** — 给 `useForm` 的 `render.component` 提供全局组件映射（例如自动将 `"input"` 字符串映射至 `ElInput` 组件）。
- **dialog** — `useDialog` 默认的基础 options。
- **form** — `useForm` 与 `useExTable` 内部表单的默认 options。
- **table** — `useTable` 与 `useExTable` 内部表格的默认 options。
- **pagination** — `useExTable` 中 `ElPagination` 模块的全局默认 options。

:::tip 合并规则
在单次 Hook 调用时传入的同名 options，会使用**深合并**（Deep Merge）机制与全局配置合并，且单次调用的参数具有更高优先级。
:::

## TypeScript {#typescript}

为了在使用全局注册的组件（如 `useForm` 中的 `render.component`）时能够自动获得代码补全，你可以通过 TypeScript 的模块扩展（Module Augmentation）向 `GlobalComponents` 接口注入你的全局组件名称：

```ts
import { Component } from 'vue';

declare module 'element-hooks' {
  interface GlobalComponents {
    /** 字典选择器 */
    'dict-select': Component;
  }
}
```

这段代码可以直接添加到你的任何 `.ts` 文件中，例如 `config.ts`，也可以添加到一个 `.d.ts` 文件中。确保这个文件包含在项目的 `tsconfig.json` 中的 "file" 或 "include" 字段内。
