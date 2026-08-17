<script setup lang="ts">
  import { useGrid } from 'element-hooks';
  import { onMounted } from 'vue';

  type Row = {
    address: string;
    date: string;
    name: string;
  };

  async function handleLoadRecords() {
    await loadData(async ({ currentPage, pageSize }) => {
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        records: Array.from({ length: pageSize }, (_, index) => ({
          date: '2016-05-03',
          name: `Tom ${index + 1 + (currentPage - 1) * pageSize}`,
          address: 'No. 189, Grove St, Los Angeles',
        })),
        count: 200,
      };
    });
  }

  const [Grid, { loadData }] = useGrid<Row>({
    columns: [
      { prop: 'date', label: 'Date', width: '180' },
      { prop: 'name', label: 'Name', width: '180' },
      { prop: 'address', label: 'Address' },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      layout: 'prev, pager, next',
      props: {
        result: 'records',
        total: 'count',
      },
      onCurrentChange: handleLoadRecords,
      onSizeChange: handleLoadRecords,
    },
  });

  onMounted(handleLoadRecords);
</script>

<template>
  <Grid />
</template>
