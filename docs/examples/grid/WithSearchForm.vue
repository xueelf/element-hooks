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

  async function handleSearch() {
    await loadData(async params => {
      await new Promise(resolve => setTimeout(resolve, 500));

      const { currentPage, pageSize, region, user } = params;
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

  function handleReset() {
    instance.value?.form?.resetFields();
    return handleSearch();
  }

  const [Grid, { instance, loadData }] = useGrid<Row, SearchModel>({
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
      onCurrentChange: handleSearch,
      onSizeChange: handleSearch,
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
        @click="handleSearch"
      >
        Query
      </el-button>
      <el-button :disabled="loading" @click="handleReset">Reset</el-button>
    </template>
  </Grid>
</template>
