# 状态管理

Element Hooks 的状态更新方法参考 React `useState`。
这些方法支持直接设值和函数式更新。

## 认识 React {#react}

在 React 中，`useState` 提供两种状态更新方式。

1. **普通设值（直接覆盖）**
   直接传入新的状态值。

   ```ts
   const [count, setCount] = useState(114);
   setCount(514); // 直接传入新值 514
   ```

2. **函数式更新**
   传入回调函数时，参数是上一个状态。
   回调函数的返回值会成为新状态。

   ```ts
   const [user, setUser] = useState({ name: 'Yuki', age: 16 });
   setUser(prev => ({ ...prev, age: 18 })); // 展开旧值并覆盖 age 属性，返回新对象
   ```

## 不可变性 {#immutability}

Element Hooks 使用 Vue 的 `shallowRef` 存储配置状态。
调用更新方法时，应传入新的顶层引用。

直接修改深层属性不会更新顶层引用。
因此，视图不会重新渲染。

```ts
const options = {
  title: '提示',
  width: 500,
};
const [Dialog, { setState }] = useDialog(options);

// shallowRef 只追踪顶层引用，这不会触发渲染更新
options.title = '新标题';

// 正确方式是调用 setState 传入新的对象引用
setState({ title: '新标题', width: 800 });
```

## 快捷方法 {#shortcuts}

`useDialog` 的 Controller 通过 `setState` 更新全部配置。
它同样支持直接设值和函数式更新。

```ts
const [Dialog, { setState }] = useDialog({
  title: '初始标题',
  fullscreen: false,
});

// 1. 普通传参，全量覆盖（不推荐用于复杂配置）
setState({ title: '新标题', fullscreen: true });

// 2. 函数式更新，只修改 title 并保留其他配置（推荐）
setState(prev => ({ ...prev, title: '新标题' }));
```

大多数 Hook 还提供了常用属性的快捷方法。
例如，`setTitle` 支持两种更新方式。

```ts
// 更新 title，并保留其他配置
setTitle('新标题');

// 函数式更新
setTitle(prevTitle => `${prevTitle} - Subtitle`);
```

## 快捷方法对照表 {#shortcuts-mapping}

下表列出常用快捷方法的状态写入结果。

| Hook        | 快捷方法              | 状态写入结果                                                     |
| ----------- | --------------------- | ---------------------------------------------------------------- |
| `useDialog` | `setTitle(title)`     | `setState(prev => ({ ...prev, title }))`                         |
| `useTable`  | `setColumns(columns)` | `setState(prev => ({ ...prev, columns }))`                       |
| `useTable`  | `setData(data)`       | 写入 `data`                                                      |
| `useForm`   | `setItems(items)`     | `setState(prev => ({ ...prev, items }))`                         |
| `useForm`   | `setModel(model)`     | `setState(prev => ({ ...prev, model }))`                         |
| `useGrid`   | `setItems(items)`     | `setState(prev => ({ ...prev, form: { ...prev.form, items } }))` |
| `useGrid`   | `setModel(model)`     | `setState(prev => ({ ...prev, form: { ...prev.form, model } }))` |
| `useGrid`   | `setColumns(columns)` | `setState(prev => ({ ...prev, columns }))`                       |
| `useGrid`   | `setData(data)`       | 写入 `data`                                                      |

`loadData` 支持同步和异步加载函数。
异步加载函数执行期间会自动管理加载状态。
`useGrid` 的加载函数参数包含表单模型和分页参数。
需要串行加载时，调用方应逐次 `await loadData(...)`。
