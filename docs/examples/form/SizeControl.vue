<script setup lang="ts">
  import { ref } from 'vue';
  import { useForm } from 'element-hooks';
  import {
    ElInput,
    ElSelect,
    ElCheckboxGroup,
    ElRadioGroup,
  } from 'element-plus';
  import type { ComponentSize, FormProps } from 'element-plus';

  const [Form, { setState }] = useForm({
    labelWidth: 'auto',
    labelPosition: 'right',
    size: 'default',
    model: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    },
    items: [
      {
        label: 'Activity name',
        prop: 'name',
        render: { component: ElInput },
      },
      {
        label: 'Activity zone',
        prop: 'region',
        render: {
          component: ElSelect,
          props: {
            placeholder: 'please select your zone',
            options: [
              { label: 'Zone one', value: 'shanghai' },
              { label: 'Zone two', value: 'beijing' },
            ],
          },
        },
      },
      {
        label: 'Activity time',
        slot: 'activityTime',
      },
      {
        label: 'Activity type',
        prop: 'type',
        render: {
          component: ElCheckboxGroup,
          props: {
            type: 'button',
            options: [
              {
                label: 'Online activities',
                value: 'Online activities',
                name: 'type',
              },
              {
                label: 'Promotion activities',
                value: 'Promotion activities',
                name: 'type',
              },
            ],
          },
        },
      },
      {
        label: 'Resources',
        prop: 'resource',
        render: {
          component: ElRadioGroup,
          props: {
            options: [
              { label: 'Sponsor', value: 'Sponsor', border: true },
              { label: 'Venue', value: 'Venue', border: true },
            ],
          },
        },
      },
      {
        slot: 'buttons',
      },
    ],
  });

  const size = ref<ComponentSize>('default');
  const labelPosition = ref<FormProps['labelPosition']>('right');

  const onSizeChange = (val: string | number | boolean | undefined) => {
    size.value = val as ComponentSize;
    setState({ size: val as ComponentSize });
  };

  const onLabelPositionChange = (
    val: string | number | boolean | undefined,
  ) => {
    labelPosition.value = val as FormProps['labelPosition'];
    setState({ labelPosition: val as FormProps['labelPosition'] });
  };

  const onSubmit = () => {
    console.log('submit!');
  };
</script>

<template>
  <div>
    <el-radio-group
      :model-value="size"
      aria-label="size control"
      @update:model-value="onSizeChange"
    >
      <el-radio-button value="large">large</el-radio-button>
      <el-radio-button value="default">default</el-radio-button>
      <el-radio-button value="small">small</el-radio-button>
    </el-radio-group>
    <el-radio-group
      :model-value="labelPosition"
      aria-label="position control"
      @update:model-value="onLabelPositionChange"
    >
      <el-radio-button value="left">Left</el-radio-button>
      <el-radio-button value="right">Right</el-radio-button>
      <el-radio-button value="top">Top</el-radio-button>
    </el-radio-group>
  </div>
  <br />
  <Form style="max-width: 600px">
    <template #activityTime="{ model }">
      <el-col :span="11">
        <el-date-picker
          v-model="model.date1"
          type="date"
          aria-label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col class="text-center" :span="1" style="margin: 0 0.5rem">
        -
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="model.date2"
          aria-label="Pick a time"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </template>
    <template #buttons>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </template>
  </Form>
</template>

<style>
  .el-radio-group {
    margin-right: 12px;
  }
</style>
