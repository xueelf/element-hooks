<script setup lang="ts">
  import { useTable } from 'element-hooks';

  const handleClick = () => {
    console.log('click');
  };

  const [Table] = useTable({
    columns: [
      { fixed: true, prop: 'date', label: 'Date', width: 150 },
      { prop: 'name', label: 'Name', width: 120 },
      { prop: 'state', label: 'State', width: 120 },
      { prop: 'city', label: 'City', width: 120 },
      { prop: 'address', label: 'Address', width: 600 },
      { prop: 'zip', label: 'Zip', width: 120 },
      {
        fixed: 'right',
        label: 'Operations',
        minWidth: 120,
        slot: 'operations',
      },
    ],
    data: [
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
      },
    ],
  });
</script>

<template>
  <Table style="width: 100%">
    <template #operations>
      <el-button link type="primary" size="small" @click="handleClick">
        Detail
      </el-button>
      <el-button link type="primary" size="small">Edit</el-button>
    </template>
  </Table>
</template>
