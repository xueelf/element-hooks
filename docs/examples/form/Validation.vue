<script setup lang="ts">
  import { useForm } from 'element-hooks';
  import {
    ElInput,
    ElSelect,
    ElSelectV2,
    ElSwitch,
    ElCheckboxGroup,
    ElRadioGroup,
    ElSegmented,
  } from 'element-plus';
  import type { FormRules } from 'element-plus';

  interface RuleForm {
    name: string;
    region: string;
    count: string;
    date1: string;
    date2: string;
    delivery: boolean;
    location: string;
    type: string[];
    resource: string;
    desc: string;
  }

  const rules: FormRules<RuleForm> = {
    name: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change',
      },
    ],
    count: [
      {
        required: true,
        message: 'Please select Activity count',
        trigger: 'change',
      },
    ],
    date1: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change',
      },
    ],
    date2: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a time',
        trigger: 'change',
      },
    ],
    location: [
      {
        required: true,
        message: 'Please select a location',
        trigger: 'change',
      },
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
      },
    ],
    resource: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change',
      },
    ],
    desc: [
      {
        required: true,
        message: 'Please input activity form',
        trigger: 'blur',
      },
    ],
  };

  const locationOptions = ['Home', 'Company', 'School'];

  const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
  }));

  const [Form, { instance }] = useForm({
    labelWidth: 'auto',
    model: {
      name: 'Hello',
      region: '',
      count: '',
      date1: '',
      date2: '',
      delivery: false,
      location: '',
      type: [],
      resource: '',
      desc: '',
    },
    rules,
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
            placeholder: 'Activity zone',
            options: [
              { label: 'Zone one', value: 'shanghai' },
              { label: 'Zone two', value: 'beijing' },
            ],
          },
        },
      },
      {
        label: 'Activity count',
        prop: 'count',
        render: {
          component: ElSelectV2,
          props: {
            placeholder: 'Activity count',
            options,
          },
        },
      },
      {
        label: 'Activity time',
        required: true,
        slot: 'activityTime',
      },
      {
        label: 'Instant delivery',
        prop: 'delivery',
        render: { component: ElSwitch },
      },
      {
        label: 'Activity location',
        prop: 'location',
        render: {
          component: ElSegmented,
          props: {
            options: locationOptions,
          },
        },
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
              { label: 'Sponsorship', value: 'Sponsorship' },
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
        slot: 'buttons',
      },
    ],
  });

  const submitForm = async () => {
    if (!instance.value) return;
    await instance.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  const resetForm = () => {
    if (!instance.value) return;
    instance.value.resetFields();
  };
</script>

<template>
  <Form style="max-width: 600px">
    <template #activityTime="{ model }">
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="model.date1"
            type="date"
            aria-label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            v-model="model.date2"
            aria-label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </template>
    <template #buttons>
      <el-button type="primary" @click="submitForm"> Create </el-button>
      <el-button @click="resetForm">Reset</el-button>
    </template>
  </Form>
</template>
