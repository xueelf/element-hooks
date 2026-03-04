<script setup lang="ts">
  import { useExTable } from 'element-hooks';
  import { ElInput, ElSelect } from 'element-plus';

  const [ExTable, controller] = useExTable({
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
    ],
    columns: [
      { prop: 'date', label: 'Date', width: '180' },
      { prop: 'name', label: 'Name', width: '180' },
      { prop: 'address', label: 'Address' },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      layout: 'prev, pager, next',
    },
  });

  const onSearch = () => {
    console.log('search!', controller.getModel());
  };

  const onReset = () => {
    controller.instance.value?.form?.resetFields();
  };
</script>

<template>
  <ExTable>
    <template #operations>
      <el-button type="primary" @click="onSearch">Query</el-button>
      <el-button @click="onReset">Reset</el-button>
    </template>
  </ExTable>
</template>
