# useTable

`useTable` 使用 `columns` 数组定义表格列。
Controller 用于更新表格配置和数据。
生成的 Table 组件仍支持 `ElTable` 的属性、插槽和事件。

这种方式适合列较多或需要动态调整列配置的表格。

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

## 显示溢出工具提示的表格 {#table-with-show-overflow-tooltip}

<ExampleCard>
  <template #example>
    <TableWithShowOverflowTooltip />
  </template>

<<< @/examples/table/TableWithShowOverflowTooltip.vue
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

## 固定表头 {#table-with-fixed-group-header}

<ExampleCard>
  <template #example>
    <TableWithFixedGroupHeader />
  </template>

<<< @/examples/table/TableWithFixedGroupHeader.vue
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

## 可选择的树形数据 {#selectable-tree}

<ExampleCard>
  <template #example>
    <SelectableTree />
  </template>

<<< @/examples/table/SelectableTree.vue
</ExampleCard>

## 表尾合计行 {#summary-row}

<ExampleCard>
  <template #example>
    <SummaryRow />
  </template>

<<< @/examples/table/SummaryRow.vue
</ExampleCard>

## 合并行或列 {#rowspan-and-colspan}

<ExampleCard>
  <template #example>
    <RowspanAndColspan />
  </template>

<<< @/examples/table/RowspanAndColspan.vue
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

## Tooltip 自定义 {#tooltip-formatter}

<ExampleCard>
  <template #example>
    <TooltipFormatter />
  </template>

<<< @/examples/table/TooltipFormatter.vue
</ExampleCard>

## API {#api}

`useTable` 支持 `ElTable` 的属性，并增加以下配置。

- **`columns`** — 用于声明表格列的 `TableColumn<T>[]`。
- **`data`** — 表格数据 `T[]`。

### TableColumn {#table-column}

属性与 `ElTableColumn` 一致，并增加以下配置。

| 字段       | 说明                                                          | 类型                                           |
| ---------- | ------------------------------------------------------------- | ---------------------------------------------- |
| `slot`     | 默认插槽名（`slots.default` 的简写）                          | `string`                                       |
| `slots`    | 具名插槽配置（`default`、`header`、`filterIcon` 和 `expand`） | `Partial<Record<TableColumnSlotName, string>>` |
| `children` | 子列配置（用于多级表头）                                      | `TableColumn<T>[]`                             |
| `render`   | 渲染组件配置                                                  | `RenderOptions<T>`                             |

#### `render.component` {#render-component}

`render.component` 可以使用全局组件名称。
例如，`tag` 可以映射到 `ElTag`。

#### `render.props` {#render-props}

`render.props` 可以是属性对象，也可以是返回属性对象的函数。
函数参数是当前行数据 `row`。
组件会在渲染时执行该函数。
函数中使用的响应式数据变化后，组件属性会自动更新。

事件、格式化器等函数属性会直接传给组件。

```ts
import { useTable } from 'element-hooks';
import { ElTag } from 'element-plus';

const [Table] = useTable({
  columns: [
    {
      prop: 'gender',
      label: '性别',
      render: {
        component: ElTag,
        props: row => ({
          // row 为当前行的数据
          type: row.gender === '男' ? 'primary' : 'danger',
        }),
      },
    },
  ],
});
```

#### `slot` {#slot}

`slot` 是 `slots.default` 的简写形式。当同一个列同时定义了 `slot` 和 `render` 时，插槽优先。

### Controller {#controller}

| 方法         | 说明                                            | 参数                                                    |
| ------------ | ----------------------------------------------- | ------------------------------------------------------- |
| `setState`   | 动态更新表格整体配置                            | `(state: TableOptions<T>) => void`                      |
| `setColumns` | 动态更新列定义                                  | `(columns: TableColumn<T>[]) => void`                   |
| `getColumns` | 获取当前列定义                                  | `() => TableColumn<T>[]`                                |
| `setData`    | 直接或通过函数式更新数据                        | `(data: T[] \| ((prev: T[]) => T[])) => void`           |
| `loadData`   | 执行一次同步或异步数据加载                      | `(loader: TableDataLoader<T>) => void \| Promise<void>` |
| `getData`    | 获取当前数据                                    | `() => T[]`                                             |
| `instance`   | 内部 ElTable 实例（可调用排序、选择等原生方法） | `Ref<TableInstance \| null>`                            |

`loadData` 会调用传入的加载函数，并使用返回结果更新表格数据。
加载函数返回 `PromiseLike`（包括 `Promise`）时会显示 `v-loading`。
错误会继续向调用方抛出。
加载函数结束后，`v-loading` 会自动关闭。
需要串行加载时，调用方应逐次 `await loadData(...)`。

`T` 必须满足 `object` 约束。
默认类型 `Recordable` 是 `Record<string, unknown>`。

`setState` 和 `setColumns` 支持 `(prev) => next` 函数式更新。
