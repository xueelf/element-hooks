<script setup lang="ts">
  import { Timer } from '@element-plus/icons-vue';
  import { type TableRow, useTable } from 'element-hooks';

  interface User extends TableRow {
    date: string;
    name: string;
    address: string;
  }

  const handleEdit = (index: number, row: User) => {
    console.log(index, row);
  };
  const handleDelete = (index: number, row: User) => {
    console.log(index, row);
  };

  const [Table] = useTable<User>({
    columns: [
      { label: 'Date', width: 180, slot: 'date' },
      { label: 'Name', width: 180, slot: 'name' },
      { label: 'Operations', slot: 'operations' },
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
  });
</script>

<template>
  <Table style="width: 100%">
    <template #date="scope">
      <div style="display: flex; align-items: center">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </div>
    </template>
    <template #name="scope">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
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
