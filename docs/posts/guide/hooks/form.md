# useForm

`useForm` 的 options 与 `ElForm` 的 props 基本保持一致，但额外增加了 `items` 属性，用于通过配置化的方式声明表单项，替代在模板中手动编写 `<ElFormItem>` 的方式。

每个 item 配置项的属性与 `ElFormItem` 的 props 一致，同时额外支持以下字段：

- **`slot`**：指定该表单项默认插槽的名称，可在 `<Form>` 组件上通过对应的具名插槽自定义表单项内容。插槽作用域中会注入 `model`，方便直接访问表单数据。
- **`slots`**：一个对象，可分别为 `default`、`label`、`error` 指定插槽名称，实现更精细的插槽控制。
- **`render`**：通过 `{ component, props }` 的形式声明渲染组件，会自动与 `model` 中对应 `prop` 的值进行双向绑定，无需手动处理 `v-model`。

> [!NOTE]
> `slot` 是 `slots.default` 的简写形式。当同一个表单项同时定义了 `slot`（或 `slots.default`）和 `render` 时，插槽优先，`render` 将被忽略。

`useForm` 返回一个元组 `[Form, controller]`，其中 `controller` 提供了以下方法：

- **`setState`**：动态更新表单的属性配置。
- **`setItems`**：动态更新表单项配置。
- **`setModel`**：动态更新表单的数据模型。
- **`getModel`**：获取当前表单数据模型的深拷贝。
- **`instance`**：对内部 `ElForm` 实例的 ref 引用，可以通过它直接调用 `ElForm` 上的原生方法（如 `validate`、`resetFields`、`clearValidate` 等），组件未挂载时值为 `null`。

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
