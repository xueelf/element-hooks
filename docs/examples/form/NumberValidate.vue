<script setup lang="ts">
  import { useForm } from 'element-hooks';
  import { ElInput } from 'element-plus';

  const [Form, { instance }] = useForm({
    labelWidth: 'auto',
    model: {
      age: '',
    },
    items: [
      {
        label: 'age',
        prop: 'age',
        rules: [
          { required: true, message: 'age is required' },
          {
            type: 'number',
            message: 'age must be a number',
            transform: (value: string) => Number(value),
          },
        ],
        render: {
          component: ElInput,
          props: {
            type: 'text',
            autocomplete: 'off',
          },
        },
      },
      {
        slot: 'buttons',
      },
    ],
  });

  const submitForm = () => {
    if (!instance.value) {
      return;
    }
    instance.value.validate(valid => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!');
      }
    });
  };

  const resetForm = () => {
    if (!instance.value) {
      return;
    }
    instance.value.resetFields();
  };
</script>

<template>
  <Form style="max-width: 600px" class="demo-ruleForm">
    <template #buttons>
      <el-button type="primary" @click="submitForm">Submit</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </template>
  </Form>
</template>
