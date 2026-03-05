# useTable

`useTable` 通过配置驱动 `ElTable`，你可以使用列定义数组代替模板中的多层 `el-table-column` 嵌套，并通过控制器统一管理表格状态。

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

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `slot` | 默认插槽名 | `string` |
| `slots` | 具名插槽配置 (`default`, `header`, `filterIcon`, `expand`) | `Record<string, string>` |
| `children` | 子列配置 (用于多级表头) | `TableColumn[]` |

### Controller

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| `setState` | 动态更新表格整体配置 | `(state: Partial<TableOptions>) => void` |
| `setColumns` | 动态更新列定义 | `(columns: TableColumn[]) => void` |
| `setData` | 动态更新表格数据 | `(data: T[]) => void` |
| `getData` | 获取当前数据快照 | `() => T[]` |
| `instance` | 内部 ElTable 实例（可调用排序、选择等原生方法） | `Ref<TableInstance>` |
