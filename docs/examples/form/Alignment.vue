<script setup lang="ts">
  import { type FormItem, useForm } from 'element-hooks';
  import { type FormItemProps, type FormProps, ElInput } from 'element-plus';
  import { ref } from 'vue';

  const labelPosition = ref<FormProps['labelPosition']>('right');
  const itemLabelPosition = ref<FormItemProps['labelPosition']>('');

  const buildItems = (pos: FormItemProps['labelPosition'] = ''): FormItem[] => [
    {
      label: 'Form Align',
      labelPosition: 'right',
      slot: 'formAlign',
    },
    {
      label: 'Form Item Align',
      labelPosition: 'right',
      slot: 'formItemAlign',
    },
    {
      label: 'Name',
      prop: 'name',
      labelPosition: pos || undefined,
      render: { component: ElInput },
    },
    {
      label: 'Activity zone',
      prop: 'region',
      labelPosition: pos || undefined,
      render: { component: ElInput },
    },
    {
      label: 'Activity form',
      prop: 'type',
      labelPosition: pos || undefined,
      render: { component: ElInput },
    },
  ];

  const [Form, { setState, setItems }] = useForm({
    labelPosition: 'right',
    labelWidth: 'auto',
    model: {
      name: '',
      region: '',
      type: '',
    },
    items: buildItems(),
  });
</script>

<template>
  <Form style="max-width: 600px">
    <template #formAlign>
      <el-radio-group
        v-model="labelPosition"
        aria-label="label position"
        @change="setState(prev => ({ ...prev, labelPosition }))"
      >
        <el-radio-button value="left">Left</el-radio-button>
        <el-radio-button value="right">Right</el-radio-button>
        <el-radio-button value="top">Top</el-radio-button>
      </el-radio-group>
    </template>
    <template #formItemAlign>
      <el-radio-group
        v-model="itemLabelPosition"
        aria-label="item label position"
        @change="setItems(buildItems(itemLabelPosition))"
      >
        <el-radio-button value="">Empty</el-radio-button>
        <el-radio-button value="left">Left</el-radio-button>
        <el-radio-button value="right">Right</el-radio-button>
        <el-radio-button value="top">Top</el-radio-button>
      </el-radio-group>
    </template>
  </Form>
</template>
