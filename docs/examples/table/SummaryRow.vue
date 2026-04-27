<script setup lang="ts">
  import { useTable } from 'element-hooks';
  import { type TableColumnCtx } from 'element-plus';
  import { type VNode, h } from 'vue';

  interface Product {
    id: string;
    name: string;
    amount1: string;
    amount2: string;
    amount3: number;
  }

  interface SummaryMethodProps<T extends Record<string, any> = Product> {
    columns: TableColumnCtx<T>[];
    data: T[];
  }

  const tableData: Product[] = [
    {
      id: '12987122',
      name: 'Tom',
      amount1: '234',
      amount2: '3.2',
      amount3: 10,
    },
    {
      id: '12987123',
      name: 'Tom',
      amount1: '165',
      amount2: '4.43',
      amount3: 12,
    },
    {
      id: '12987124',
      name: 'Tom',
      amount1: '324',
      amount2: '1.9',
      amount3: 9,
    },
    {
      id: '12987125',
      name: 'Tom',
      amount1: '621',
      amount2: '2.2',
      amount3: 17,
    },
    {
      id: '12987126',
      name: 'Tom',
      amount1: '539',
      amount2: '4.1',
      amount3: 15,
    },
  ];

  const [Table] = useTable({
    data: tableData,
    border: true,
    showSummary: true,
    columns: [
      { prop: 'id', label: 'ID', width: 180 },
      { prop: 'name', label: 'Name' },
      { prop: 'amount1', sortable: true, label: 'Amount 1' },
      { prop: 'amount2', sortable: true, label: 'Amount 2' },
      { prop: 'amount3', sortable: true, label: 'Amount 3' },
    ],
  });

  const [CustomSummaryTable] = useTable({
    data: tableData,
    border: true,
    height: 200,
    summaryMethod(param: SummaryMethodProps) {
      const { columns, data } = param;
      const sums: (string | VNode)[] = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = h('div', { style: { textDecoration: 'underline' } }, [
            'Total Cost',
          ]);
          return;
        }
        const values = data.map(item =>
          Number(item[column.property as keyof Product]),
        );

        if (!values.every(value => Number.isNaN(value))) {
          sums[index] = `$ ${values.reduce((prev, curr) => {
            const value = Number(curr);

            if (!Number.isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0)}`;
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
    showSummary: true,
    columns: [
      { prop: 'id', label: 'ID', width: 180 },
      { prop: 'name', label: 'Name' },
      { prop: 'amount1', label: 'Cost 1 ($)' },
      { prop: 'amount2', label: 'Cost 2 ($)' },
      { prop: 'amount3', label: 'Cost 3 ($)' },
    ],
  });
</script>

<template>
  <Table style="width: 100%" />
  <CustomSummaryTable style="width: 100%; margin-top: 20px" />
</template>
