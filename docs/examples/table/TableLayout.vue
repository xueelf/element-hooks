<script setup lang="ts">
  import { ref } from 'vue';
  import { useTable } from 'element-hooks';

  const tableLayout = ref<'fixed' | 'auto'>('fixed');

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
      { prop: 'date', label: 'Date' },
      { prop: 'name', label: 'Name' },
      { prop: 'address', label: 'Address' },
    ],
  });
</script>

<template>
  <div style="margin-bottom: 20px">
    <el-radio-group v-model="tableLayout">
      <el-radio-button value="fixed">fixed</el-radio-button>
      <el-radio-button value="auto">auto</el-radio-button>
    </el-radio-group>
  </div>
  <Table :table-layout="tableLayout" style="width: 100%" />
</template>
