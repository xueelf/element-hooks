<script setup lang="ts">
  import { useTable } from 'element-hooks';
  import { ref } from 'vue';

  interface User {
    date: string;
    name: string;
    address: string;
  }

  const tableData: User[] = [
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
  ];

  const currentRow = ref<User | null>(null);

  const [Table, { instance }] = useTable({
    data: tableData,
    highlightCurrentRow: true,
    columns: [
      { type: 'index', width: 50 },
      { prop: 'date', label: 'Date', width: 120 },
      { prop: 'name', label: 'Name', width: 120 },
      { prop: 'address', label: 'Address' },
    ],
    onCurrentChange(val: User | null) {
      currentRow.value = val;
    },
  });

  const setCurrent = (row?: User) => {
    instance.value?.setCurrentRow(row);
  };
</script>

<template>
  <Table style="width: 100%" />
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(tableData[1])"> Select second row </el-button>
    <el-button @click="setCurrent()"> Clear selection </el-button>
  </div>
</template>
