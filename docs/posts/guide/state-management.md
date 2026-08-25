# 状态管理

Element Hooks 的状态管理借鉴了 React Hooks 的设计思路。组件状态由 Hook 维护，并通过 Controller 提供的方法更新。

## 认识 React {#react}

在 Vue 中，`ref()` 返回的响应式值通过 `.value` 读取和修改。React 不会直接修改状态变量，而是调用 Hook 返回的方法更新状态。以 `useState()` 为例，它会返回当前状态和对应的 `set` 函数。调用 `set` 函数时，可以传入下一个状态，也可以传入更新函数。

1. **传入下一个状态** — 使用新值替换当前状态。

   ```ts
   const [count, setCount] = useState(114);

   setCount(514);
   ```

2. **传入更新函数** — 根据当前状态计算并返回下一个状态。

   ```ts
   const [user, setUser] = useState({ name: 'Yuki', age: 16 });

   setUser(prev => ({ ...prev, age: prev.age + 1 }));
   ```

## 不可变性 {#immutability}

Element Hooks 使用 Vue 的 `shallowRef()` 保存配置。`shallowRef()` 只追踪 `.value` 的变化，不会追踪对象内部属性的修改。因此，更新对象或数组时，需要返回一个新的对象或数组。

```ts
const [Dialog, { setState }] = useDialog({
  title: '提示',
  width: 500,
});

// 错误：修改原对象后仍然返回它
setState(options => {
  options.title = '新标题';
  return options;
});

// 正确：创建并返回一个新对象
setState(options => ({
  ...options,
  title: '新标题',
}));
```

## 快捷方法 {#shortcuts}

`setState` 用于更新 Hook 的全部配置。你可以传入一份完整的新配置，也可以通过更新函数在当前配置的基础上创建新配置。

```ts
const [Dialog, { setState }] = useDialog({
  title: '初始标题',
  fullscreen: false,
});

// 使用新配置替换当前配置
setState({ title: '新标题', fullscreen: true });

// 根据当前配置创建新配置
setState(prev => ({ ...prev, title: '新标题' }));
```

对于经常单独更新的配置，Controller 提供了对应的快捷方法。快捷方法与 `setState` 的用法相同。以 `setTitle` 为例，可以传入新标题，也可以根据当前标题生成新值。

```ts
// 传入新标题
setTitle('新标题');

// 根据当前标题生成新标题
setTitle(title => `${title}（已更新）`);
```

## 快捷方法一览 {#shortcut-methods}

各组件 Hook 提供的快捷方法如下。

- **`useDialog`**
  - `setTitle` — 更新对话框标题。
- **`useDrawer`**
  - `setTitle` — 更新抽屉标题。
- **`useTable`**
  - `setColumns` — 更新表格列配置。
  - `setData` — 更新表格数据。
- **`useForm`**
  - `setItems` — 更新表单项配置。
  - `setModel` — 更新表单数据。
- **`useGrid`**
  - `setItems` — 更新查询表单项配置。
  - `setModel` — 更新查询表单的数据。
  - `setColumns` — 更新表格列配置。
  - `setData` — 更新表格数据。
