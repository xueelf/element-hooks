# useGrid

`useGrid` 组合 `ElTable`、`ElForm` 和 `ElPagination`。
请求逻辑仍由调用方管理。

`useGrid` 适用于中后台列表页。
它管理布局、表格数据、分页和加载状态。

## 基础用法 {#basic-usage}

配置 `columns`、`data` 和 `pagination` 即可启用分页。
分页变化只会更新内部状态并触发事件。
调用方需在事件中使用 `setData` 更新数据。

<ExampleCard>
  <template #example>
    <GridBasicUsage />
  </template>

<<< @/examples/grid/GridBasicUsage.vue
</ExampleCard>

## 搜索表单 {#with-search-form}

通过 `form` 配置集成搜索表单。
`setData(callback)` 会传入表单模型和分页参数。
回调函数返回 Promise 时会自动管理加载状态。

表单插槽的作用域中包含 `loading`。
调用方可以用它控制自定义按钮。
加载状态不会遮挡表单区域。

<ExampleCard>
  <template #example>
    <WithSearchForm />
  </template>

<<< @/examples/grid/WithSearchForm.vue
</ExampleCard>

## 自定义数据映射 {#custom-data-map}

默认数据字段是 `result` 和 `total`。
`pagination.props` 可以映射其他字段名。

<ExampleCard>
  <template #example>
    <CustomDataMap />
  </template>

<<< @/examples/grid/CustomDataMap.vue
</ExampleCard>

## 数据更新 {#data-updates}

`setData` 支持直接数据、同步回调和异步回调。

```ts
setData(rows);

setData(payload => getRows(payload));

await setData(async payload => {
  const response = await getRows(payload);
  return response;
});
```

回调函数只会执行一次。
`useGrid` 不会保存或在分页变化时重放它。
回调参数是表单模型和分页参数的浅拷贝。
分页字段会覆盖表单中的同名字段。

对象响应必须满足 `GridResponse` 约束。
`GridResponse` 等于 `Record<string, unknown>`。
`interface` 可以显式继承 `GridResponse`。

并发调用只会提交最近一次结果。
所有回调完成后，加载状态才会结束。
直接传入数据会使之前的回调结果失效。
该操作不会改变当前加载状态。

:::tip 加载范围
回调返回 Promise 时，才会产生可见的加载状态。
加载状态仅覆盖表格区域，并在期间禁用分页。
错误会继续向调用方抛出。
`useGrid` 不负责消息提示或重试。
:::

## API {#api}

### Options

| 参数         | 说明                                       | 类型                | 默认值 |
| ------------ | ------------------------------------------ | ------------------- | ------ |
| `data`       | 表格数据，可以是数组或包含结果及总数的对象 | `GridData<D>`       | -      |
| `columns`    | 表格列配置                                 | `TableColumn<D>[]`  | `[]`   |
| `form`       | 表单配置，参考 `useForm`                   | `FormOptions<M>`    | -      |
| `pagination` | 分页配置，参考 `ElPagination`              | `PaginationOptions` | -      |

支持通过 `app.use(ElementHooks, { pagination })` 配置全局分页默认项。

:::tip
当 `useGrid` 传入 `pagination` 时，会与全局 `pagination` 配置合并。
:::

### Controller

| 方法            | 说明                             | 参数                                                                     |
| --------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `setState`      | 更新 `Grid` 的整体状态           | `(state: GridOptions<D, M>) => void`                                     |
| `setData`       | 更新数据，支持同步和异步回调函数 | `(data: GridData<D> \| GridDataCallback<D, M>) => void \| Promise<void>` |
| `setModel`      | 更新或初始化表单模型数据         | `(model: M) => void`                                                     |
| `getModel`      | 获取当前表单数据                 | `() => M \| null`                                                        |
| `setItems`      | 更新表单项配置                   | `(items: FormItem<M>[]) => void`                                         |
| `setColumns`    | 更新表格列配置                   | `(columns: TableColumn<D>[]) => void`                                    |
| `getData`       | 获取当前表格渲染的数据           | `() => D[]`                                                              |
| `getPagination` | 只读获取当前页码与每页条数       | `() => { currentPage?: number; pageSize?: number }`                      |
| `instance`      | 获取内部表单、表格和分页实例     | `Ref<GridInstance \| null>`                                              |

`setState`、`setModel`、`setItems` 和 `setColumns` 支持函数式更新。
模型尚未初始化时，`setModel` 只能直接传入模型对象。
