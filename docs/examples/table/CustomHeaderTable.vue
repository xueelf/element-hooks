<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useTable } from 'element-hooks';

  interface User {
    date: string;
    name: string;
    address: string;
  }

  const search = ref('');
  const tableData: User[] = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'John',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ];

  const handleEdit = (index: number, row: User) => {
    console.log(index, row);
  };
  const handleDelete = (index: number, row: User) => {
    console.log(index, row);
  };

  const [Table, { setData }] = useTable({
    data: tableData,
    columns: [
      { label: 'Date', prop: 'date' },
      { label: 'Name', prop: 'name' },
      {
        align: 'right',
        slots: { header: 'operationsHeader', default: 'operations' },
      },
    ],
  });

  watch(search, val => {
    const filtered = tableData.filter(
      data => !val || data.name.toLowerCase().includes(val.toLowerCase()),
    );
    setData(filtered);
  });
</script>

<template>
  <Table style="width: 100%">
    <template #operationsHeader>
      <el-input v-model="search" size="small" placeholder="Type to search" />
    </template>
    <template #operations="scope">
      <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
        Edit
      </el-button>
      <el-button
        size="small"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)"
      >
        Delete
      </el-button>
    </template>
  </Table>
</template>
