<script setup lang="ts">
  import { useTable } from 'element-hooks';

  const [Table] = useTable({
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
      {
        type: 'index',
        index(index: number) {
          return index * 2;
        },
      },
      { prop: 'date', label: 'Date', width: 180 },
      { prop: 'name', label: 'Name', width: 180 },
      { prop: 'address', label: 'Address' },
    ],
  });
</script>

<template>
  <Table style="width: 100%" />
</template>
