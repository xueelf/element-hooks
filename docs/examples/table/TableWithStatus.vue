<script setup lang="ts">
  import { useTable } from 'element-hooks';

  interface User {
    date: string;
    name: string;
    address: string;
  }

  const [Table] = useTable<User>({
    columns: [
      { prop: 'date', label: 'Date', width: 180 },
      { prop: 'name', label: 'Name', width: 180 },
      { prop: 'address', label: 'Address' },
    ],
    data: [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
    rowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
  });
</script>

<template>
  <Table style="width: 100%" />
</template>

<style>
  .el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
  }
  .el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
</style>
