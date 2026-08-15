# 全局配置

## Vue 插件注册 {#vue-plugin}

将 `ElementHooks` 注册为 Vue 插件时，可以传入全局配置。
后续的 Hook 调用会继承对应配置。

```ts
import ElementHooks from 'element-hooks';
import { ElInput, ElSelect } from 'element-plus';
import { createApp } from 'vue';

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

- **`components`**：为 `render.component` 提供全局组件映射。
- **`dialog`**：`useDialog` 的默认配置。
- **`form`**：`useForm` 和 `useGrid` 的表单默认配置。
- **`table`**：`useTable` 和 `useGrid` 的表格默认配置。
- **`pagination`**：`useGrid` 的分页默认配置。

:::tip 合并规则
单次 Hook 调用会与全局配置浅合并。
单次调用具有更高优先级。
局部值为 `undefined` 时，继续使用全局默认值。
数组、函数、组件和嵌套对象会整体替换。

`useGrid` 只会合并已启用模块的全局配置。
全局配置不会自动启用表单或分页。
:::

## TypeScript {#typescript}

可以通过 TypeScript 的模块扩展补充全局组件类型。
这会为 `render.component` 提供代码补全。

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
