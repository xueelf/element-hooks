# useForm

`useForm` 为 `ElForm` 提供了声明式配置能力。通过 `items` 数组即可描述表单结构，并配合控制器完成模型更新与实例访问，显著减少 `<template>` 视图模板中的重复代码。

在保留原始表单能力（校验、重置、清空校验等）的同时，`useForm` 更适合在中后台页面中快速构建可维护的表单模块。

## 典型表单 {#basic-form}

<ExampleCard>
  <template #example>
    <BasicForm />
  </template>

<<< @/examples/form/BasicForm.vue
</ExampleCard>

## 行内表单 {#inline-form}

<ExampleCard>
  <template #example>
    <InlineForm />
  </template>

<<< @/examples/form/InlineForm.vue
</ExampleCard>

## 对齐方式 {#alignment}

<ExampleCard>
  <template #example>
    <Alignment />
  </template>

<<< @/examples/form/Alignment.vue
</ExampleCard>

## 表单校验 {#validation}

<ExampleCard>
  <template #example>
    <Validation />
  </template>

<<< @/examples/form/Validation.vue
</ExampleCard>

## 自定义校验规则 {#custom-validation-rules}

<ExampleCard>
  <template #example>
    <CustomValidationRules />
  </template>

<<< @/examples/form/CustomValidationRules.vue
</ExampleCard>

## 添加/删除表单项 {#add-delete-form-item}

<ExampleCard>
  <template #example>
    <AddDeleteFormItem />
  </template>

<<< @/examples/form/AddDeleteFormItem.vue
</ExampleCard>

## 数字类型验证 {#number-validate}

<ExampleCard>
  <template #example>
    <NumberValidate />
  </template>

<<< @/examples/form/NumberValidate.vue
</ExampleCard>

## 尺寸控制 {#size-control}

<ExampleCard>
  <template #example>
    <SizeControl />
  </template>

<<< @/examples/form/SizeControl.vue
</ExampleCard>

## 无障碍 {#accessibility}

<ExampleCard>
  <template #example>
    <Accessibility />
  </template>

<<< @/examples/form/Accessibility.vue
</ExampleCard>

## 纯元素节点 {#raw}

有时我们只想在表单流里面渲染一段独立的提示文字或者分割线，而不希望它被 `el-form-item` 默认的间距和样式包裹。此时可以通过给表单项配置 `raw: true` 来移除外层 `el-form-item`，实现纯粹的节点渲染。

<ExampleCard>
  <template #example>
    <Raw />
  </template>

<<< @/examples/form/Raw.vue
</ExampleCard>

## API {#api}

### Options

`useForm` 的配置项继承自 Element Plus `ElForm` 的 Props，并额外支持以下字段：

- **`items`**: `FormItem[]` —— 核心配置，用于声明表单项。
- **`model`**: `Recordable` —— 表单数据模型（使用 `setModel` 更新）。

#### FormItem

| 字段     | 说明                                      | 类型                                                     |
| -------- | ----------------------------------------- | -------------------------------------------------------- |
| `raw`    | 是否为纯元素节点（不包裹 `el-form-item`） | `boolean`                                                |
| `slot`   | 默认插槽名（`slots.default` 的简写）      | `string`                                                 |
| `slots`  | 精细化插槽配置                            | `Record<string, string>`                                 |
| `render` | 渲染组件配置                              | `{ component: Component \| string, props?: Recordable }` |

##### `render.component`

当 `render.component` 为字符串时，会从 `app.use(ElementHooks, { components })` 传入的全局组件映射中查找并渲染对应组件（例如 `components: { input: ElInput }` 对应 `render.component = 'input'`）。

##### `render.props`

在 `render.props` 中，如果你需要使用**响应式变量**来给组件传参，可以将其写为一个函数。组件会在渲染时，自动执行该函数并追踪依赖。

这意味着当你的响应式数据发生改变时，组件 Props 也会自动重新渲染，从而实现**动态传参**，无需再手动调用 `setState` 或 `setItems` 刷新整个表单项。

> [!WARNING] 注意事项
> 动态传参的特性会过滤掉以 `on` 开头的事件属性。例如 `onClick` 或 `onChange` 等事件监听器，即使为函数也不会被自动执行。

```ts
const options = ref([]);
const [Form] = useForm({
  items: [
    {
      render: {
        component: ElSelect,
        props: {
          options: () => options.value,
        },
      },
    },
  ],
});
```

##### `render.slot`

`slot` 是 `slots.default` 的简写形式。当同一个表单项同时定义了 `slot` 和 `render` 时，插槽优先。

### Controller

| 方法       | 说明                                             | 参数                                    |
| ---------- | ------------------------------------------------ | --------------------------------------- |
| `setState` | 动态更新整体配置                                 | `(state: Partial<FormOptions>) => void` |
| `setItems` | 动态更新表单项                                   | `(items: FormItem[]) => void`           |
| `setModel` | 动态更新模型数据                                 | `(model: Recordable) => void`           |
| `getModel` | 获取当前模型快照                                 | `() => Recordable`                      |
| `instance` | 内部 ElForm 实例（可调用 `validate` 等原生方法） | `Ref<FormInstance>`                     |
