<script setup lang="ts">
  import { useForm } from 'element-hooks';
  import { ElInput, ElSelect, ElDatePicker } from 'element-plus';

  const [Form] = useForm({
    inline: true,
    model: {
      user: '',
      region: '',
      date: '',
    },
    items: [
      {
        label: 'Approved by',
        prop: 'user',
        render: {
          component: ElInput,
          props: {
            placeholder: 'Approved by',
            clearable: true,
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
            clearable: true,
            options: [
              { label: 'Zone one', value: 'shanghai' },
              { label: 'Zone two', value: 'beijing' },
            ],
          },
        },
      },
      {
        label: 'Activity time',
        prop: 'date',
        render: {
          component: ElDatePicker,
          props: {
            type: 'date',
            placeholder: 'Pick a date',
            clearable: true,
          },
        },
      },
      {
        slot: 'operations',
      },
    ],
  });

  const onSubmit = () => {
    console.log('submit!');
  };
</script>

<template>
  <Form class="demo-form-inline">
    <template #operations>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </template>
  </Form>
</template>

<style>
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }

  .demo-form-inline .el-select {
    --el-select-width: 220px;
  }
</style>
