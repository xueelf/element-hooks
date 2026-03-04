# useTable

`useTable` 的 options 与 `ElTable` 的 props 基本保持一致，但额外增加了 `columns` 属性，用于通过配置化的方式声明表格列，替代在模板中手动编写 `<ElTableColumn>` 的方式。

每个 column 配置项的属性与 `ElTableColumn` 的 props 一致，同时额外支持以下字段：

- **`slot`**：指定该列默认插槽的名称，可在 `<Table>` 组件上通过对应的具名插槽自定义列内容。
- **`slots`**：一个对象，可分别为 `default`、`header`、`filterIcon`、`expand` 指定插槽名称，实现更精细的插槽控制。
- **`children`**：用于声明多级表头，嵌套的子列同样支持以上所有配置。

> [!NOTE]
> `slot` 是 `slots.default` 的简写形式。

`useTable` 返回一个元组 `[Table, controller]`，其中 `controller` 提供了以下方法：

- **`setState`**：动态更新表格的属性配置。
- **`setColumns`**：动态更新表格的列配置。
- **`setData`**：动态更新表格的数据。
- **`getData`**：获取当前表格数据的深拷贝。
- **`instance`**：对内部 `ElTable` 实例的 ref 引用，可以通过它直接调用 `ElTable` 上的原生方法（如 `clearSelection`、`sort` 等），组件未挂载时值为 `null`。

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

## 固定多级表头 {#table-with-fixed-group-header}

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
