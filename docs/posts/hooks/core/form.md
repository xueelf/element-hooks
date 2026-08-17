# useForm

`useForm` 使用 `items` 数组描述表单项。
Controller 用于更新模型和访问 `ElForm` 实例。

`useForm` 保留校验、重置和清空校验等原生能力。

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

`raw: true` 用于渲染不带 `el-form-item` 的节点。
该配置适用于提示文字和分割线。

<ExampleCard>
  <template #example>
    <Raw />
  </template>

<<< @/examples/form/Raw.vue
</ExampleCard>

## API {#api}

`useForm` 支持 `ElForm` 的属性，并增加以下配置。
调用 `useForm(options)` 时，`FormOptions<T>` 必须包含 `model`。

- **`items`** — 用于声明表单项的 `FormItem<T>[]`。
- **`model`** — 初始表单模型 `T`。调用 `useForm(options)` 时必填。无参调用 `useForm()` 时，`getModel()` 返回 `null`。

无参调用时，`T` 默认使用 `object`。需要通过 `getModel()` 访问模型字段时，应为 `useForm` 指定泛型。

### FormItem {#form-item}

| 字段     | 说明                                      | 类型                                        |
| -------- | ----------------------------------------- | ------------------------------------------- |
| `raw`    | 是否为纯元素节点（不包裹 `el-form-item`） | `boolean`                                   |
| `slot`   | 默认插槽名（`slots.default` 的简写）      | `string`                                    |
| `slots`  | 具名插槽配置                              | `Partial<Record<FormItemSlotName, string>>` |
| `render` | 渲染组件配置                              | `RenderOptions<T>`                          |

#### `render.component` {#render-component}

`render.component` 可以使用全局组件名称。
例如，`input` 可以映射到 `ElInput`。

#### `render.props` {#render-props}

`render.props` 可以是属性对象，也可以是返回属性对象的函数。
函数参数是当前表单模型 `model`。
组件会在渲染时执行该函数。
函数中使用的响应式数据变化后，组件属性会自动更新。

事件、格式化器等函数属性会直接传给组件。

```ts
import { useForm } from 'element-hooks';
import { ElSelect } from 'element-plus';
import { ref } from 'vue';

const selectOptions = ref([]);
const [Form] = useForm({
  model: { status: 'active' },
  items: [
    {
      render: {
        component: ElSelect,
        props: model => ({
          options: selectOptions.value,
          // model 为当前表单数据
          disabled: model.status !== 'active',
        }),
      },
    },
  ],
});
```

#### `slot` {#slot}

`slot` 是 `slots.default` 的简写形式。当同一个表单项同时定义了 `slot` 和 `render` 时，插槽优先。

### Controller {#controller}

| 方法       | 说明                                             | 参数                              |
| ---------- | ------------------------------------------------ | --------------------------------- |
| `setState` | 动态更新整体配置                                 | `(state: FormOptions<T>) => void` |
| `setItems` | 动态更新表单项                                   | `(items: FormItem<T>[]) => void`  |
| `getItems` | 获取当前表单项                                   | `() => FormItem<T>[]`             |
| `setModel` | 动态更新或初始化模型数据                         | `(model: T) => void`              |
| `getModel` | 获取当前模型数据                                 | `() => T \| null`                 |
| `instance` | 内部 ElForm 实例（可调用 `validate` 等原生方法） | `Ref<FormInstance \| null>`       |

`setState`、`setItems` 和 `setModel` 支持 `(prev) => next` 更新。
模型尚未初始化时，应先通过 `setModel` 传入模型对象。
