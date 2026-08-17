<script setup lang="ts">
  import { useForm } from 'element-hooks';
  import {
    ElCheckboxGroup,
    ElInput,
    ElRadioGroup,
    ElSelect,
    ElSwitch,
  } from 'element-plus';

  const [Form] = useForm({
    labelWidth: 'auto',
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
        label: 'Instant delivery',
        prop: 'delivery',
        render: { component: ElSwitch },
      },
      {
        label: 'Activity type',
        prop: 'type',
        render: {
          component: ElCheckboxGroup,
          props: {
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
              {
                label: 'Offline activities',
                value: 'Offline activities',
                name: 'type',
              },
              {
                label: 'Simple brand exposure',
                value: 'Simple brand exposure',
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
              { label: 'Sponsor', value: 'Sponsor' },
              { label: 'Venue', value: 'Venue' },
            ],
          },
        },
      },
      {
        label: 'Activity form',
        prop: 'desc',
        render: { component: ElInput, props: { type: 'textarea' } },
      },
      {
        slot: 'actions',
      },
    ],
  });

  const onSubmit = () => {
    console.log('submit!');
  };
</script>

<template>
  <Form style="max-width: 600px">
    <template #activityTime="{ model }">
      <el-col :span="11">
        <el-date-picker
          v-model="model.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="model.date2"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </template>
    <template #actions>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </template>
  </Form>
</template>
