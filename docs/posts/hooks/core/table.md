# useTable

`useTable` 通过配置驱动 `ElTable`，你可以使用列定义数组代替 `<template>` 视图模板中的多层 `el-table-column` 嵌套，并通过控制器统一管理表格状态。

这种方式在列较多、交互复杂或需要动态切换列配置的场景中更具可维护性。

## 基础表格 {#basic-table}

<ExampleCard>
  <template #example>
    <BasicTable />
  </template>

<<< @/examples/table/BasicTable.vue
</ExampleCard>

## 带斑马纹表格 {#striped-table}

<ExampleCard>
  <template #example>
    <StripedTable />
  </template>

<<< @/examples/table/StripedTable.vue
</ExampleCard>

## 带边框表格 {#table-with-border}

<ExampleCard>
  <template #example>
    <TableWithBorder />
  </template>

<<< @/examples/table/TableWithBorder.vue
</ExampleCard>

## 带状态表格 {#table-with-status}

<ExampleCard>
  <template #example>
    <TableWithStatus />
  </template>

<<< @/examples/table/TableWithStatus.vue
</ExampleCard>

## 固定表头 {#table-with-fixed-header}

<ExampleCard>
  <template #example>
    <TableWithFixedHeader />
  </template>

<<< @/examples/table/TableWithFixedHeader.vue
</ExampleCard>

## 固定列 {#table-with-fixed-column}

<ExampleCard>
  <template #example>
    <TableWithFixedColumn />
  </template>

<<< @/examples/table/TableWithFixedColumn.vue
</ExampleCard>

## 固定列和表头 {#table-with-fixed-columns-and-header}

<ExampleCard>
  <template #example>
    <TableWithFixedColumnsAndHeader />
  </template>

<<< @/examples/table/TableWithFixedColumnsAndHeader.vue
</ExampleCard>

## 流体高度 {#fluid-height-table-with-fixed-header-and-columns}

<ExampleCard>
  <template #example>
    <FluidHeightTableWithFixedHeaderAndColumns />
  </template>

<<< @/examples/table/FluidHeightTableWithFixedHeaderAndColumns.vue
</ExampleCard>

## 多级表头 {#grouping-table-head}

<ExampleCard>
  <template #example>
    <GroupingTableHead />
  </template>

<<< @/examples/table/GroupingTableHead.vue
</ExampleCard>

## 单选 {#single-select}

<ExampleCard>
  <template #example>
    <SingleSelect />
  </template>

<<< @/examples/table/SingleSelect.vue
</ExampleCard>

## 多选 {#multiple-select}

<ExampleCard>
  <template #example>
    <MultipleSelect />
  </template>

<<< @/examples/table/MultipleSelect.vue
</ExampleCard>

## 排序 {#sorting}

<ExampleCard>
  <template #example>
    <Sorting />
  </template>

<<< @/examples/table/Sorting.vue
</ExampleCard>

## 筛选 {#filter}

<ExampleCard>
  <template #example>
    <Filter />
  </template>

<<< @/examples/table/Filter.vue
</ExampleCard>

## 自定义列模板 {#custom-column-template}

<ExampleCard>
  <template #example>
    <CustomColumnTemplate />
  </template>

<<< @/examples/table/CustomColumnTemplate.vue
</ExampleCard>

## 自定义表头 {#table-with-custom-header}

<ExampleCard>
  <template #example>
    <TableWithCustomHeader />
  </template>

<<< @/examples/table/TableWithCustomHeader.vue
</ExampleCard>

## 展开行 {#expandable-row}

<ExampleCard>
  <template #example>
    <ExpandableRow />
  </template>

<<< @/examples/table/ExpandableRow.vue
</ExampleCard>

## 树形数据与懒加载 {#tree-data-and-lazy-mode}

<ExampleCard>
  <template #example>
    <TreeDataAndLazyMode />
  </template>

<<< @/examples/table/TreeDataAndLazyMode.vue
</ExampleCard>

## 自定义索引 {#custom-index}

<ExampleCard>
  <template #example>
    <CustomIndex />
  </template>

<<< @/examples/table/CustomIndex.vue
</ExampleCard>

## 表格布局 {#table-layout}

<ExampleCard>
  <template #example>
    <TableLayout />
  </template>

<<< @/examples/table/TableLayout.vue
</ExampleCard>

## 合并列或行 {#rowspan-and-colspan}

<ExampleCard>
  <template #example>
    <RowspanAndColspan />
  </template>

<<< @/examples/table/RowspanAndColspan.vue
</ExampleCard>

## 自定义悬浮提示 {#tooltip-formatter}

<ExampleCard>
  <template #example>
    <TooltipFormatter />
  </template>

<<< @/examples/table/TooltipFormatter.vue
</ExampleCard>

## 始终显示悬浮提示 {#table-with-show-overflow-tooltip}

<ExampleCard>
  <template #example>
    <TableWithShowOverflowTooltip />
  </template>

<<< @/examples/table/TableWithShowOverflowTooltip.vue
</ExampleCard>

## 尾部合计行 {#summary-row}

<ExampleCard>
  <template #example>
    <SummaryRow />
  </template>

<<< @/examples/table/SummaryRow.vue
</ExampleCard>

## API {#api}

### Options

`useTable` 的配置项继承自 Element Plus `ElTable` 的 Props，并额外增加以下字段：

- **`columns`**: `TableColumn[]` —— 核心配置，用于声明表格列。
- **`data`**: `T[]` —— 表格数据。

#### TableColumn

属性与 `ElTableColumn` 的 props 一致，同时额外支持：

| 字段       | 说明                                                       | 类型                                                     |
| ---------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| `slot`     | 默认插槽名（`slots.default` 的简写）                       | `string`                                                 |
| `slots`    | 具名插槽配置 (`default`, `header`, `filterIcon`, `expand`) | `Record<string, string>`                                 |
| `children` | 子列配置 (用于多级表头)                                    | `TableColumn[]`                                          |
| `render`   | 渲染组件配置                                               | `{ component: Component \| string, props?: Recordable }` |

##### `render.component`

当 `render.component` 为字符串时，会从 `app.use(ElementHooks, { components })` 传入的全局组件映射中查找并渲染对应组件（例如 `components: { tag: ElTag }` 对应 `render.component = 'tag'`）。

##### `render.props`

在 `render.props` 中，如果你需要使用**响应式变量**来给组件传参，或者需要根据当前行的数据动态传参，可以将其写为一个函数。组件会在渲染时自动执行该函数（**函数的默认参数为当前行的数据 `row`**）并追踪依赖。

这意味着当你的响应式数据或当前行数据发生改变时，组件 Props 也会自动重新渲染，从而实现**动态传参**，无需再手动调用 `setState` 或 `setColumns` 刷新整个列表项配置。

> [!WARNING] 注意事项
> 动态传参的特性会过滤掉以 `on` 开头的事件属性。例如 `onClick` 或 `onChange` 等事件监听器，即使为函数也不会被自动执行。

```ts
import { ElTag } from 'element-plus';

const [Table] = useTable({
  columns: [
    {
      prop: 'gender',
      label: '性别',
      render: {
        component: ElTag,
        props: {
          // row 为当前行的数据
          type: row => (row.gender === '男' ? 'primary' : 'danger'),
        },
      },
    },
  ],
});
```

##### `render.slot`

`slot` 是 `slots.default` 的简写形式。当同一个列同时定义了 `slot` 和 `render` 时，插槽优先。

### Controller

| 方法         | 说明                                            | 参数                                     |
| ------------ | ----------------------------------------------- | ---------------------------------------- |
| `setState`   | 动态更新表格整体配置                            | `(state: Partial<TableOptions>) => void` |
| `setColumns` | 动态更新列定义                                  | `(columns: TableColumn[]) => void`       |
| `setData`    | 动态更新表格数据                                | `(data: T[]) => void`                    |
| `getData`    | 获取当前数据快照                                | `() => T[]`                              |
| `instance`   | 内部 ElTable 实例（可调用排序、选择等原生方法） | `Ref<TableInstance>`                     |
