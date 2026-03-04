<script setup lang="ts">
  import { useExTable } from 'element-hooks';

  const [ExTable] = useExTable({
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
    columns: [
      { prop: 'date', label: 'Date', width: '180' },
      { prop: 'name', label: 'Name', width: '180' },
      { prop: 'address', label: 'Address' },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 2,
      layout: 'prev, pager, next',
    },
  });
</script>

<template>
  <ExTable />
</template>
