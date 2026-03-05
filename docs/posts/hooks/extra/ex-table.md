# useExTable

`useExTable` 是一个进阶扩展 Hook，通过统一的声明式配置组合 `ElTable`、`ElForm` 与 `ElPagination`。

它适用于中后台列表页场景，可在同一配置入口下完成表格展示、条件检索与分页联动，减少页面样板代码并提升可维护性。

## 基础用法 {#basic-usage}

配置 `columns`、`data` 以及 `pagination` 即可生成带分页的表格。

<ExampleCard>
  <template #example>
    <TableExtraBasicUsage />
  </template>

<<< @/examples/ex-table/TableExtraBasicUsage.vue
</ExampleCard>

## 搜索表单 {#with-search-form}

通过 `form` 配置项，可以快速集成搜索表单。

<ExampleCard>
  <template #example>
    <WithSearchForm />
  </template>

<<< @/examples/ex-table/WithSearchForm.vue
</ExampleCard>

## 自定义数据映射 {#custom-data-map}

当后端返回的数据结构不是默认的 `{ result: [], total: 0 }` 时，可以通过 `pagination.props` 进行映射。

<ExampleCard>
  <template #example>
    <CustomDataMap />
  </template>

<<< @/examples/ex-table/CustomDataMap.vue
</ExampleCard>

## API {#api}

### Options

| 参数         | 说明                                         | 类型                | 默认值 |
| ------------ | -------------------------------------------- | ------------------- | ------ |
| `data`       | 表格数据，可以是数组或包含结果及总数的对象   | `T[] \| Recordable` | -      |
| `columns`    | 表格列配置                                   | `TableColumn<T>[]`  | `[]`   |
| `form`       | 表单配置项，参考 `useForm` 的 options        | `FormOptions`       | -      |
| `pagination` | 分页配置项，参数参考 `ElPagination` 的 props | `PaginationOptions` | -      |

支持通过 `app.use(ElementHooks, { pagination })` 配置全局分页默认项。

> [!NOTE]
> 当 `useExTable` 调用时传入了 `pagination`，会与全局 `pagination` 执行合并。

### Controller

| 方法             | 说明                       | 参数                                       |
| ---------------- | -------------------------- | ------------------------------------------ |
| `setState`       | 更新 ExTable 的整体状态    | `(state: Partial<ExTableOptions>) => void` |
| `setData`        | 更新表格数据               | `(data: ExTableData) => void`              |
| `setModel`       | 更新表单模型数据           | `(model: Recordable) => void`              |
| `getModel`       | 获取当前的表单数据         | `() => Recordable`                         |
| `setItems`       | 更新表单项配置             | `(items: FormItem[]) => void`              |
| `setColumns`     | 更新表格列配置             | `(columns: TableColumn[]) => void`         |
| `getData`        | 获取当前表格渲染的数组数据 | `() => T[]`                                |
| `getCurrentPage` | 获取当前页码               | `() => number`                             |
