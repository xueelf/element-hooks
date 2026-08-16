# 全局配置

## Vue 插件注册 {#vue-plugin}

注册 `ElementHooks` 时，可以传入全局配置。
后续调用 Hook 时会使用对应的全局配置。

```ts
import ElementHooks from 'element-hooks';
import { ElInput, ElSelect } from 'element-plus';
import { createApp } from 'vue';

import App from './App.vue';

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

## 通过方法设置 {#method-setting}

`setOptions` 和 `getOptions` 可以动态读写全局配置。

```ts
import { getOptions, setOptions } from 'element-hooks';
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

全局配置支持以下字段。

- **`components`** — 为 `render.component` 提供全局组件映射。
- **`dialog`** — `useDialog` 的默认配置。
- **`form`** — `useForm` 和 `useGrid` 的表单默认配置。
- **`table`** — `useTable` 和 `useGrid` 的表格默认配置。
- **`pagination`** — `useGrid` 的分页默认配置。

:::tip 合并规则
每次调用 Hook 时，局部配置会与全局配置浅合并。
局部配置的同名属性优先级更高。
局部值为 `undefined` 时，不会覆盖全局默认值。
数组、函数、组件和嵌套对象会替换全局配置中的同名属性。

`useGrid` 始终使用全局 `table` 配置。
只有传入 `form` 或 `pagination` 时，才会使用对应的全局配置。
:::

## TypeScript {#typescript}

可以通过 TypeScript 模块扩展声明全局组件类型。
声明后，`render.component` 会提供对应的代码补全。

```ts
import type { Component } from 'vue';

declare module 'element-hooks' {
  interface GlobalComponents {
    /** 字典选择器 */
    'dict-select': Component;
  }
}
```

这段声明可以放在 `.ts` 或 `.d.ts` 文件中。
请确保 `tsconfig.json` 的 `files` 或 `include` 包含该文件。
