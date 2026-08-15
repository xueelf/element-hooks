<script setup lang="ts">
  import { useTable } from 'element-hooks';
  import { ref } from 'vue';

  interface User {
    id: number;
    date: string;
    name: string;
    address: string;
  }

  const tableData: User[] = [
    {
      id: 1,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 2,
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 3,
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 4,
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 5,
      date: '2016-05-08',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 6,
      date: '2016-05-06',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 7,
      date: '2016-05-07',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ];

  const multipleSelection = ref<User[]>([]);

  const selectable = (row: User) => ![1, 2].includes(row.id);

  const [Table, { instance }] = useTable<User>({
    data: tableData,
    rowKey: 'id',
    columns: [
      { type: 'selection', selectable, width: 55 },
      { label: 'Date', width: 120, slot: 'date' },
      { prop: 'name', label: 'Name', width: 120 },
      { prop: 'address', label: 'Address' },
    ],
    onSelectionChange: (val: User[]) => {
      multipleSelection.value = val;
    },
  });

  const toggleSelection = (rows?: User[], ignoreSelectable?: boolean) => {
    if (rows) {
      rows.forEach(row => {
        instance.value?.toggleRowSelection(row, undefined, ignoreSelectable);
      });
    } else {
      instance.value?.clearSelection();
    }
  };
</script>

<template>
  <Table style="width: 100%">
    <template #date="scope">{{ scope.row.date }}</template>
  </Table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1]!, tableData[2]!])">
      Toggle selection status of second and third rows
    </el-button>
    <el-button @click="toggleSelection([tableData[1]!, tableData[2]!], false)">
      Toggle selection status based on selectable
    </el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
</template>
