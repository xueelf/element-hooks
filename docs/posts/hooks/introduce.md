# Hook 介绍

Element Hooks 提供 Element Plus 的组合式封装。
组件 Hook 通过对象配置生成组件。
命令式 Hook 用于处理交互提示。

根据能力来源和组合关系，所有 Hook 分为两类。

## 设计模式 {#design-pattern}

Hook 配置应使用普通对象。
不要将 `ref` 或 `reactive` 作为配置对象。

后续状态变化由控制器管理。
调用方应使用控制器的读取和更新方法。

```ts
// 错误示范：传入响应式对象
const options = reactive({
  title: '标题',
});
const [Dialog] = useDialog(options);

options.title = '';
```

```ts
// 正确示范：传递普通对象，通过控制器接管状态
const [Dialog, { setTitle }] = useDialog({
  title: '标题',
});

setTitle('');
```

## 副作用与原理说明 {#side-effects-and-principles}

Element Hooks 内部使用 `shallowRef` 和 `watchEffect`。
因此，响应式配置可能仍会触发视图更新。

这是 Vue 依赖收集产生的副作用。
该写法绕过了控制器，不符合 Hook 的状态约定。

## Hook 分类 {#hook-categories}

### Element Plus 原生能力（Core Hooks）

该分类封装 Element Plus 的原生组件或服务。

- **组件 Hook**：返回可渲染的组件和控制器。
- **命令式 Hook**：封装 `ElMessage` 等命令式 API。

### Element Hooks 组合能力（Composite Hooks）

该分类组合多个 Core Hook，形成更高层能力。

- **组合 Hook**：以领域能力命名并组合 Core Hook。

`useGrid` 组合 `ElForm`、`ElTable` 和 `ElPagination`。
它不接管业务请求。

## Hook 索引 {#hooks-index}

以下列出当前公开的 Hook。

### Element Plus 原生能力（Core Hooks）

- [**useDialog**](/hooks/core/dialog)：提供 `open` 和 `close` 方法。
- [**useForm**](/hooks/core/form)：提供配置驱动的表单。
- [**useTable**](/hooks/core/table)：提供配置驱动的表格。
- [**useMessage**](/hooks/core/message)：统一 `ElMessage` 的 Hook API。
- [**useMessageBox**](/hooks/core/message-box)：统一处理确认和取消结果。

### Element Hooks 组合能力（Composite Hooks）

- [**useGrid**](/hooks/composite/grid)：组合搜索表单、表格和分页。
