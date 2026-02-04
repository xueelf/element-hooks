<script setup lang="ts">
  import { useTable } from 'element-hooks';

  interface User {
    date: string;
    name: string;
    address: string;
  }

  const [Table] = useTable<User>({
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
    defaultSort: { prop: 'date', order: 'descending' },
    columns: [
      { prop: 'date', label: 'Date', sortable: true, width: 180 },
      { prop: 'name', label: 'Name', width: 180 },
      {
        prop: 'address',
        label: 'Address',
        formatter(row) {
          return row.address;
        },
      },
    ],
  });
</script>

<template>
  <Table style="width: 100%" />
</template>
