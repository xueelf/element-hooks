<script setup lang="ts">
  import { useGrid } from 'element-hooks';
  import { ElInput, ElSelect } from 'element-plus';

  type Row = {
    address: string;
    date: string;
    name: string;
    region: string;
  };

  type SearchModel = {
    region: string;
    user: string;
  };

  const sourceData: Row[] = [
    {
      date: '2016-05-03',
      name: 'Tom',
      region: 'shanghai',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Jack',
      region: 'beijing',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      region: 'beijing',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Alice',
      region: 'shanghai',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ];

  const delay = (duration: number) =>
    new Promise<void>(resolve => window.setTimeout(resolve, duration));

  async function load() {
    await setData(async payload => {
      await delay(500);

      const { currentPage = 1, pageSize = 2, region, user } = payload;
      const filtered = sourceData.filter(row => {
        return (
          (!user || row.name.includes(user)) &&
          (!region || row.region === region)
        );
      });
      const start = (currentPage - 1) * pageSize;

      return {
        result: filtered.slice(start, start + pageSize),
        total: filtered.length,
      };
    });
  }

  function onReset() {
    instance.value?.form?.resetFields();
    return load();
  }

  const [Grid, { instance, setData }] = useGrid<Row, SearchModel>({
    form: {
      model: { user: '', region: '' },
      inline: true,
      items: [
        {
          label: 'Approved by',
          prop: 'user',
          render: {
            component: ElInput,
            props: {
              placeholder: 'Approved by',
              style: '--el-input-width: 190px',
            },
          },
        },
        {
          label: 'Activity zone',
          prop: 'region',
          render: {
            component: ElSelect,
            props: {
              placeholder: 'Activity zone',
              options: [
                { label: 'Zone one', value: 'shanghai' },
                { label: 'Zone two', value: 'beijing' },
              ],
              style: '--el-select-width: 190px',
            },
          },
        },
        {
          slot: 'operations',
        },
      ],
    },
    data: {
      result: sourceData.slice(0, 2),
      total: sourceData.length,
    },
    columns: [
      { prop: 'date', label: 'Date', width: '180' },
      { prop: 'name', label: 'Name', width: '180' },
      { prop: 'address', label: 'Address' },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 2,
      layout: 'prev, pager, next',
      onCurrentChange: load,
      onSizeChange: load,
    },
  });
</script>

<template>
  <Grid>
    <template #operations="{ loading }">
      <el-button
        type="primary"
        :loading="loading"
        :disabled="loading"
        @click="load"
      >
        Query
      </el-button>
      <el-button :disabled="loading" @click="onReset">Reset</el-button>
    </template>
  </Grid>
</template>
