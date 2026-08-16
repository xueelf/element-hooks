# Hook 介绍

Element Hooks 为 Element Plus 提供 Vue 组合式 API 风格的 Hook。
组件 Hook 返回可渲染的组件和 Controller。
命令式 Hook 直接返回可调用的方法。

按照能力来源，Hook 分为 Core Hooks 和 Composite Hooks。

## 设计模式 {#design-pattern}

Hook 配置应使用普通对象。
不要将 `ref` 或 `reactive` 作为配置对象。

初始化后，应通过 Controller 读取或更新状态。

```ts
// 错误示范：传入响应式对象
const options = reactive({
  title: '标题',
});
const [Dialog] = useDialog(options);

options.title = '';
```

```ts
// 正确示范：传递普通对象，通过 Controller 更新状态
const [Dialog, { setTitle }] = useDialog({
  title: '标题',
});

setTitle('');
```

## 响应式配置的问题 {#side-effects-and-principles}

Element Hooks 使用 `watchEffect` 同步 Hook 配置和组件属性。
传入响应式对象时，`watchEffect` 仍可能追踪其中的字段。
这种写法虽然可以更新视图，但状态不再只由 Controller 修改。

## Hook 分类 {#hook-categories}

### Core Hooks {#core-hook-categories}

Core Hooks 直接对应 Element Plus 的组件或服务。

- **组件 Hook** — 返回可渲染的组件和 Controller。
- **命令式 Hook** — 直接返回 `ElMessage` 等服务的方法。

### Composite Hooks {#composite-hook-categories}

组合 Hook 将多个 Core Hook 集成到同一个组件中。
这类 Hook 直接使用组件名称，例如 `useGrid`，不增加 `useEx*` 前缀。

例如，`useGrid` 将 `useForm`、`useTable` 和 `ElPagination` 组合为列表组件。
数据请求仍由调用方管理。

## Hook 索引 {#hooks-index}

以下列出当前公开的 Hook。

### Core Hooks {#core-hook-index}

- [**useDialog**](/hooks/core/dialog) — 提供 `open` 和 `close` 方法。
- [**useForm**](/hooks/core/form) — 使用 `items` 数组描述表单项。
- [**useTable**](/hooks/core/table) — 使用 `columns` 数组描述表格列。
- [**useMessage**](/hooks/core/message) — 以 Hook 形式返回 `ElMessage`。
- [**useMessageBox**](/hooks/core/message-box) — 为确认、取消和关闭操作返回明确结果。

### Composite Hooks {#composite-hook-index}

- [**useGrid**](/hooks/composite/grid) — 组合搜索表单、表格和分页。
