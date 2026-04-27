<script setup lang="ts">
  import { useTable } from 'element-hooks';
  import { reactive } from 'vue';

  interface User {
    id: number;
    date: string;
    name: string;
    address: string;
    hasChildren?: boolean;
    children?: User[];
  }

  const treeProps = reactive({
    checkStrictly: false,
  });

  const selectable = (row: User) => ![1, 31].includes(row.id);

  const tableData: User[] = [
    {
      id: 1,
      date: '2016-05-02',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 2,
      date: '2016-05-04',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 3,
      date: '2016-05-01',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
      children: [
        {
          id: 31,
          date: '2016-05-01',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          id: 32,
          date: '2016-05-01',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
    {
      id: 4,
      date: '2016-05-03',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ];

  const [Table] = useTable({
    data: tableData,
    rowKey: 'id',
    defaultExpandAll: true,
    columns: [
      { type: 'selection', width: 55, selectable },
      { prop: 'date', label: 'Date' },
      { prop: 'name', label: 'Name' },
      { prop: 'address', label: 'Address' },
    ],
  });
</script>

<template>
  <div style="margin-bottom: 20px">
    <el-radio-group v-model="treeProps.checkStrictly">
      <el-radio-button :value="true">true</el-radio-button>
      <el-radio-button :value="false">false</el-radio-button>
    </el-radio-group>
  </div>
  <Table :tree-props="treeProps" style="width: 100%" />
</template>
