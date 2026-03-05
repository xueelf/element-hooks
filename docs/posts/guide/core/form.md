# useForm

`useForm` 为 `ElForm` 提供了声明式配置能力。通过 `items` 数组即可描述表单结构，并配合控制器完成模型更新与实例访问，显著减少模板层重复代码。

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

## API {#api}

### Options

`useForm` 的配置项继承自 Element Plus `ElForm` 的 Props，并额外支持以下字段：

- **`items`**: `FormItem[]` —— 核心配置，用于声明表单项。
- **`model`**: `Recordable` —— 表单数据模型（使用 `setModel` 更新）。

#### FormItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `slot` | 默认插槽名（`slots.default` 的简写） | `string` |
| `slots` | 精细化插槽配置 | `Record<string, string>` |
| `render` | 渲染组件配置 | `{ component: Component \| string, props?: Recordable }` |

当 `render.component` 为字符串时，会从 `app.use(ElementHooks, { components })` 传入的全局组件映射中查找并渲染对应组件（例如 `components: { input: ElInput }` 对应 `render.component = 'input'`）。

> [!NOTE]
> `slot` 是 `slots.default` 的简写形式。当同一个表单项同时定义了 `slot` 和 `render` 时，插槽优先。

### Controller

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| `setState` | 动态更新整体配置 | `(state: Partial<FormOptions>) => void` |
| `setItems` | 动态更新表单项 | `(items: FormItem[]) => void` |
| `setModel` | 动态更新模型数据 | `(model: Recordable) => void` |
| `getModel` | 获取当前模型快照 | `() => Recordable` |
| `instance` | 内部 ElForm 实例（可调用 `validate` 等原生方法） | `Ref<FormInstance>` |
