# 状态管理

Element Hooks 受到 React 启发，在状态管理的表现行为上严格遵守 React Hooks 的设计理念规范。这使得开发者能够在 Vue 中也像使用 React 一样，以高度可预测、单向数据流的方式构建复杂的视图组件，有效降低业务代码复杂度与后期维护成本。

## 认识 React {#react}

在 React 中，我们通过使用 `useState` 函数来管理组件状态。它提供了两种更新状态的传参方式：

1. **普通设值（直接覆盖）**
   直接传入一个新状态值。React 会将当前状态直接更新为你传入的数值。

   ```ts
   const [count, setCount] = useState(114);
   setCount(514); // 直接传入新值 514
   ```

2. **函数式更新**
   传入一个回调函数。这个函数会接收到前一个状态（`prev`）作为参数，并将其返回值作为新状态。当你新的状态依赖于旧的状态，或者状态是一个结构复杂的对象且你只想做**增量更新**时，这个方式最为安全和推荐。
   ```ts
   const [user, setUser] = useState({ name: 'Yuki', age: 16 });
   setUser(prev => ({ ...prev, age: 18 })); // 展开旧值并覆盖 age 属性，返回新对象
   ```

## 不可变性 {#immutability}

Element Hooks 中的状态管理（即各个 hook 控制器上的变更方法）在底层均使用了 Vue 的 `shallowRef` 进行数据存储。因此，它严格继承了状态的**不可变性特征（Immutability）**概念。

如果你直接修改内部深层对象的属性，因为该对象的顶层引用没有发生变化，**将不会触发视图的重新渲染**。

```ts
const options = {
  title: '提示',
  width: 500,
};
const [Dialog, { setState }] = useDialog(options);

// 由于 shallowRef 浅层对比的特性，这不会触发 render 更新
options.title = '新标题';

// 正确方式是调用 setState 传入新的对象引用
setState({ title: '新标题', width: 800 });
```

## 快捷方法 {#shortcuts}

以 `useDialog` 为例，控制器（Controller）提供的核心状态变更方法就是 `setState`，使用方式与 `useState` 所暴露的方法完全一致：

```ts
const [Dialog, { setState }] = useDialog({
  title: '初始标题',
  fullscreen: false,
});

// 1. 普通传参，全量覆盖（不推荐用于复杂配置）
setState({ title: '新标题', fullscreen: true });

// 2. 函数式更新，实现针对性修改并合并历史（推荐）
setState(prev => ({ ...prev, title: '新标题' }));
```

由于每次都手写 `prev => ({ ...prev, something })` 不免繁琐且容易遗漏，绝大部分 Hook 还向开发者暴露了常用属性的**快捷方法**。比如 `useDialog` 下的 `setTitle`，它同样支持**普通设值**与**函数式更新**两种方式：

```ts
// 等价于 setState(prev => ({...prev, title: '新标题'}))
setTitle('新标题');

// 函数式更新
setTitle(prevTitle => `${prevTitle} - Subtitle`);
```

## 快捷方法对照表 {#shortcuts-mapping}

下列为常用 Hook 的快捷方法及其对应的 `setState` 底层逻辑：

| Hook         | 快捷方法              | 等价更新逻辑                                                     |
| ------------ | --------------------- | ---------------------------------------------------------------- |
| `useDialog`  | `setTitle(title)`     | `setState(prev => ({ ...prev, title }))`                         |
| `useTable`   | `setColumns(columns)` | `setState(prev => ({ ...prev, columns }))`                       |
| `useTable`   | `setData(data)`       | `setState(prev => ({ ...prev, data }))`                          |
| `useForm`    | `setItems(items)`     | `setState(prev => ({ ...prev, items }))`                         |
| `useForm`    | `setModel(model)`     | `setState(prev => ({ ...prev, model }))`                         |
| `useExTable` | `setItems(items)`     | `setState(prev => ({ ...prev, form: { ...prev.form, items } }))` |
| `useExTable` | `setModel(model)`     | `setState(prev => ({ ...prev, form: { ...prev.form, model } }))` |
| `useExTable` | `setColumns(columns)` | `setState(prev => ({ ...prev, columns }))`                       |
| `useExTable` | `setData(data)`       | `setState(prev => ({ ...prev, data }))`                          |
