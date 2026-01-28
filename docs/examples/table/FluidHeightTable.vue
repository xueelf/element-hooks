<script setup lang="ts">
  import { ref } from 'vue';
  import { useTable } from 'element-hooks';
  import dayjs from 'dayjs';

  const now = new Date();

  const tableData = ref([
    {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
  ]);

  const deleteRow = (index: number) => {
    tableData.value.splice(index, 1);
  };

  const onAddItem = () => {
    now.setDate(now.getDate() + 1);
    tableData.value.push({
      date: dayjs(now).format('YYYY-MM-DD'),
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    });
  };

  const [Table] = useTable({
    maxHeight: 250,
    data: tableData.value,
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
  });
</script>

<template>
  <Table style="width: 100%">
    <template #operations="scope">
      <el-button
        link
        type="primary"
        size="small"
        @click.prevent="deleteRow(scope.$index)"
      >
        Remove
      </el-button>
    </template>
  </Table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem">
    Add Item
  </el-button>
</template>
