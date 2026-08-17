# Hook 介绍

Element Hooks 提供了一套组合式 API，让开发者以 Hook 方式使用 Element Plus。

Hook 分为 Core Hooks 和 Composite Hooks。

## 配置对象 {#options}

Hook Options 用于设置组件的初始状态。请传入普通对象，不要将 `ref` 或 `reactive` 作为配置对象。Hook 创建后，原配置对象的变化不会自动同步，后续状态应通过 Controller 更新。

```ts
// 错误示范：传入响应式对象
const options = reactive({
  title: '标题',
});
const [Dialog] = useDialog(options);

options.title = '';
```

```ts
// 正确示范：传递普通对象，通过 setTitle 更新标题
const [Dialog, { setTitle }] = useDialog({
  title: '标题',
});

setTitle('');
```

## Hook 分类 {#hook-categories}

### Core Hooks {#core-hook-categories}

Core Hooks 直接对应一个 Element Plus 组件或方法。组件类 Hook 返回的组件保留原生 Props、Slots 和事件，组件 Props 可直接写入 Hook Options，无需额外嵌套在 `props` 字段中。方法类 Hook 的调用参数与原生方法保持一致。

### Composite Hooks {#composite-hook-categories}

Composite Hooks 在一个 Hook 中协调多个组件的状态和交互。例如，`useGrid` 将 `useForm`、`useTable` 和 `ElPagination` 组成带有查询表单和分页功能的表格。数据请求仍由调用方负责，分页变化后需要调用 `setData` 或 `loadData` 更新数据。

## Hook 索引 {#hooks-index}

以下列出当前公开的 Hook。

### Core Hooks {#core-hook-index}

- [**useDialog**](/hooks/core/dialog) — 提供 `open` 和 `close` 方法。
- [**useForm**](/hooks/core/form) — 在 `items` 数组中设置表单项。
- [**useTable**](/hooks/core/table) — 在 `columns` 数组中设置表格列。
- [**useMessage**](/hooks/core/message) — 返回 `$message` 全局方法。
- [**useMessageBox**](/hooks/core/message-box) — 为确认、取消和关闭操作返回明确结果。

### Composite Hooks {#composite-hook-index}

- [**useGrid**](/hooks/composite/grid) — 组合查询表单、表格和分页。
