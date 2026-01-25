<script setup lang="ts">
  import { useTable } from 'element-hooks';

  const [Table] = useTable({
    height: 250,
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
      {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
  });
</script>

<template>
  <Table style="width: 100%" />
</template>
