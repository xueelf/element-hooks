<script setup lang="ts">
  import { useGrid } from 'element-hooks';
  import { onMounted } from 'vue';

  type Row = {
    address: string;
    date: string;
    name: string;
  };

  const delay = (duration: number) =>
    new Promise<void>(resolve => window.setTimeout(resolve, duration));

  async function load() {
    await setData(async ({ currentPage = 1, pageSize = 10 }) => {
      await delay(500);

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

  const [Grid, { setData }] = useGrid<Row>({
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
      onCurrentChange: load,
      onSizeChange: load,
    },
  });

  onMounted(load);
</script>

<template>
  <Grid />
</template>
