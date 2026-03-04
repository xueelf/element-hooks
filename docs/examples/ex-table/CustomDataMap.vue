<script setup lang="ts">
  import { useExTable } from 'element-hooks';

  const [ExTable] = useExTable({
    data: {
      records: [
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
      ],
      count: 200,
    },
    columns: [
      { prop: 'date', label: 'Date', width: '180' },
      { prop: 'name', label: 'Name', width: '180' },
      { prop: 'address', label: 'Address' },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      layout: 'prev, pager, next',
      props: {
        result: 'records',
        total: 'count',
      },
    },
  });
</script>

<template>
  <ExTable />
</template>
