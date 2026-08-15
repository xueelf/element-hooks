<script setup lang="ts">
  import { type TableRow, useTable } from 'element-hooks';

  interface User extends TableRow {
    id: number;
    date: string;
    name: string;
    address: string;
    hasChildren?: boolean;
    children?: User[];
  }

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

  const tableDataLazy: User[] = [
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
      hasChildren: true,
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 4,
      date: '2016-05-03',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ];

  const load = (
    _row: User,
    _treeNode: unknown,
    resolve: (data: User[]) => void,
  ) => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 1000);
  };

  const [Table] = useTable<User>({
    data: tableData,
    rowKey: 'id',
    border: true,
    defaultExpandAll: true,
    columns: [
      { prop: 'date', label: 'Date', sortable: true },
      { prop: 'name', label: 'Name', sortable: true },
      { prop: 'address', label: 'Address', sortable: true },
    ],
  });

  const [LazyTable] = useTable<User>({
    data: tableDataLazy,
    rowKey: 'id',
    border: true,
    lazy: true,
    load,
    treeProps: { children: 'children', hasChildren: 'hasChildren' },
    columns: [
      { prop: 'date', label: 'Date' },
      { prop: 'name', label: 'Name' },
      { prop: 'address', label: 'Address' },
    ],
  });
</script>

<template>
  <div>
    <Table style="width: 100%; margin-bottom: 20px" />
    <LazyTable style="width: 100%" />
  </div>
</template>
