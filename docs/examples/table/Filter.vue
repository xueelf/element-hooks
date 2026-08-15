<script setup lang="ts">
  import { useTable } from 'element-hooks';

  interface User {
    date: string;
    name: string;
    address: string;
    tag: string;
  }

  const tableData: User[] = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      tag: 'Home',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      tag: 'Office',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      tag: 'Home',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      tag: 'Office',
    },
  ];

  const [Table, { instance }] = useTable<User>({
    data: tableData,
    rowKey: 'date',
    columns: [
      {
        prop: 'date',
        label: 'Date',
        sortable: true,
        width: 180,
        columnKey: 'date',
        filters: [
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' },
        ],
        filterMethod(value, row, column) {
          const property = column['property'] as keyof User;
          return row[property] === value;
        },
      },
      { prop: 'name', label: 'Name', width: 180 },
      {
        prop: 'address',
        label: 'Address',
        formatter(row) {
          return row.address;
        },
      },
      {
        prop: 'tag',
        label: 'Tag',
        width: 100,
        filters: [
          { text: 'Home', value: 'Home' },
          { text: 'Office', value: 'Office' },
        ],
        filterMethod(value, row) {
          return row.tag === value;
        },
        filterPlacement: 'bottom-end',
        slot: 'tag',
      },
    ],
  });

  const resetDateFilter = () => {
    instance.value?.clearFilter(['date']);
  };

  const clearAllFilters = () => {
    instance.value?.clearFilter();
  };
</script>

<template>
  <div style="margin-bottom: 20px">
    <el-button @click="resetDateFilter">reset date filter</el-button>
    <el-button @click="clearAllFilters">reset all filters</el-button>
  </div>
  <Table style="width: 100%">
    <template #tag="scope">
      <el-tag
        :type="scope.row.tag === 'Home' ? 'primary' : 'success'"
        disable-transitions
      >
        {{ scope.row.tag }}
      </el-tag>
    </template>
  </Table>
</template>
