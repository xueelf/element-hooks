# useGrid

`useGrid` 将 `useForm`、`useTable` 和 `ElPagination` 组合为列表组件。
它管理布局、表格数据、分页和加载状态，数据请求仍由调用方管理。

## 基础用法 {#basic-usage}

配置 `columns`、`data` 和 `pagination` 即可启用分页。
分页变化只会更新内部状态并触发事件。
调用方需在事件中使用 `loadData` 加载数据。

<ExampleCard>
  <template #example>
    <GridBasicUsage />
  </template>

<<< @/examples/grid/GridBasicUsage.vue
</ExampleCard>

## 搜索表单 {#with-search-form}

传入 `form` 配置即可显示搜索表单。
调用加载函数时，`loadData` 会传入表单模型和分页参数。
加载函数返回 `PromiseLike`（包括 `Promise`）时，`useGrid` 会自动管理加载状态。

表单插槽会接收 `loading` 参数。
调用方可以使用该参数控制自定义按钮。
加载状态不会遮挡表单区域。

<ExampleCard>
  <template #example>
    <WithSearchForm />
  </template>

<<< @/examples/grid/WithSearchForm.vue
</ExampleCard>

## 自定义数据映射 {#custom-data-map}

默认数据字段是 `result` 和 `total`。
`pagination.props` 可以将其他响应字段映射为这两个字段。

<ExampleCard>
  <template #example>
    <CustomDataMap />
  </template>

<<< @/examples/grid/CustomDataMap.vue
</ExampleCard>

## 数据更新 {#data-updates}

`setData` 直接写入数据，也支持函数式更新。
`loadData` 调用同步或异步加载函数，并将返回值写入数据。

```ts
setData(rows);

setData(previousRows => [...previousRows, row]);

loadData(params => getRows(params));

await loadData(async params => {
  const response = await getRows(params);
  return response;
});
```

每次调用 `loadData` 时，传入的加载函数只会执行一次。
分页变化不会自动重新执行之前的加载函数。
传入 `form` 时，加载函数的参数包含表单模型和分页参数。
未传入 `form` 时，参数只包含 `currentPage` 和 `pageSize`。
声明模型泛型 `M` 时，必须同时传入包含 `model` 的 `form` 配置。
分页字段会覆盖表单中的同名字段。
`currentPage` 和 `pageSize` 未配置时采用 `ElPagination` 的默认值。

`GridData<D>` 也可以接收对象形式的响应。
响应对象可以使用 `interface` 或 `type` 定义，无需声明字符串索引签名。

加载函数结束后，加载状态会自动关闭。
需要串行加载时，调用方应逐次 `await loadData(...)`。

:::tip 加载范围
加载函数返回 `PromiseLike`（包括 `Promise`）时，页面才会显示加载状态。
加载状态仅覆盖表格区域，并在加载期间禁用分页。
错误会继续向调用方抛出。
`useGrid` 不负责消息提示或重试。
:::

## API {#api}

### Options {#options}

| 参数         | 说明                                       | 类型                                   | 默认值 |
| ------------ | ------------------------------------------ | -------------------------------------- | ------ |
| `data`       | 表格数据，可以是数组或包含结果及总数的对象 | `GridData<D>`                          | -      |
| `columns`    | 表格列配置                                 | `TableColumn<D>[]`                     | `[]`   |
| `form`       | 表单配置，参考 `useForm`                   | `SetRequired<FormOptions<M>, 'model'>` | -      |
| `pagination` | 分页配置，参考 `ElPagination`              | `PaginationOptions`                    | -      |

可以通过 `app.use(ElementHooks, { pagination })` 设置全局分页默认项。

:::tip
传入 `pagination` 时，局部分页配置会与全局 `pagination` 配置合并。
:::

### Controller {#controller}

| 方法            | 说明                         | 参数                                                                  |
| --------------- | ---------------------------- | --------------------------------------------------------------------- |
| `setState`      | 更新 `Grid` 的整体状态       | `(state: GridOptions<D, M>) => void`                                  |
| `setData`       | 直接或通过函数式更新数据     | `(data: GridData<D> \| ((prev: GridData<D>) => GridData<D>)) => void` |
| `loadData`      | 执行一次同步或异步数据加载   | `(loader: GridDataLoader<D, M>) => void \| Promise<void>`             |
| `setModel`      | 更新或初始化表单模型数据     | `(model: M) => void`                                                  |
| `getModel`      | 获取当前表单数据             | `() => M \| null`                                                     |
| `setItems`      | 更新表单项配置               | `(items: FormItem<M>[]) => void`                                      |
| `setColumns`    | 更新表格列配置               | `(columns: TableColumn<D>[]) => void`                                 |
| `getData`       | 获取当前表格渲染的数据       | `() => D[]`                                                           |
| `getPagination` | 获取当前页码和每页条数       | `() => GridPaginationParams`                                          |
| `instance`      | 获取内部表单、表格和分页实例 | `Ref<GridInstance \| null>`                                           |

`setState`、`setModel`、`setItems` 和 `setColumns` 支持函数式更新。
模型尚未初始化时，`setModel` 只能直接传入模型对象。
