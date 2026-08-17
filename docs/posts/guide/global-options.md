# 全局配置

全局配置会作为 Hook Options 的默认值。每次创建 Hook 时，传入的局部配置会覆盖对应的全局配置。

## Vue 插件 {#vue-plugin}

将 `ElementHooks` 注册为 Vue 插件时，可以直接传入全局配置。

```ts
import ElementHooks from 'element-hooks';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.use(ElementHooks, {
  dialog: {
    destroyOnClose: true,
  },
  pagination: {
    layout: 'prev, pager, next',
  },
});
```

### 与 Element Plus 配合 {#element-plus}

Element Plus 的 [全局配置](https://element-plus.org/zh-CN/guide/quickstart.html#全局配置) 与 Element Hooks 的全局配置分别生效。Element Plus 的配置为原生组件提供默认值，Element Hooks 的配置只作用于通过 Hook 创建的组件。

```ts
import ElementHooks from 'element-hooks';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus, {
  size: 'small',
});

app.use(ElementHooks, {
  form: {
    size: 'large',
  },
});
```

在这个示例中，直接使用的 `ElForm` 默认使用 `small`，`useForm` 创建的表单以及 `useGrid` 中启用的表单默认使用 `large`。如果调用 `useForm` 时再次传入 `size`，则以本次 Hook Options 为准；如果在返回的 `Form` 组件上设置 `size`，则以组件 Props 为准。

同名原生 Props 的优先级从高到低依次是组件 Props、Hook Options、Element Hooks 全局配置和 Element Plus 全局配置。两种插件的注册顺序不会改变该优先级。

## setOptions {#set-options}

不注册 Vue 插件时，也可以通过 `setOptions` 设置全局配置。请在创建 Hook 前调用该方法，新的配置不会同步到已经创建的 Hook。`getOptions` 用于获取当前的全局配置。

```ts
import { getOptions, setOptions } from 'element-hooks';

setOptions({
  dialog: {
    destroyOnClose: true,
  },
});

const globalOptions = getOptions();
```

## 配置项 {#options}

全局配置支持以下字段。

- **`components`** — 为 `render.component` 提供全局组件映射。
- **`dialog`** — `useDialog` 的默认配置。
- **`form`** — `useForm` 和 `useGrid` 的表单默认配置。
- **`table`** — `useTable` 和 `useGrid` 的表格默认配置。
- **`pagination`** — `useGrid` 的分页默认配置。

## 合并规则 {#merging}

每次调用 Hook 时，局部配置会与全局配置浅合并。局部配置的同名属性优先级更高。局部值为 `undefined` 时，不会覆盖全局默认值。数组、函数、组件和嵌套对象会替换全局配置中的同名属性。

`useGrid` 始终使用全局 `table` 配置。只有传入 `form` 或 `pagination` 时，才会使用对应的全局配置。

## TypeScript {#typescript}

可以通过 TypeScript 模块扩展声明全局组件类型。声明后，`render.component` 会提供对应的代码补全。

```ts
import type { Component } from 'vue';

declare module 'element-hooks' {
  interface GlobalComponents {
    /** 字典选择器 */
    'dict-select': Component;
  }
}
```

这段声明可以放在 `.ts` 或 `.d.ts` 文件中。请确保 `tsconfig.json` 的 `files` 或 `include` 包含该文件。
