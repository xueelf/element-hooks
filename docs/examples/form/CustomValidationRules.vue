<script setup lang="ts">
  import { useForm } from 'element-hooks';
  import { type FormRules, ElInput } from 'element-plus';

  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password'));
    } else {
      const model = getModel();
      if (model?.checkPass !== '') {
        if (!instance.value) return;
        instance.value.validateField('checkPass');
      }
      callback();
    }
  };

  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password again'));
    } else {
      const model = getModel();
      if (value !== model?.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    }
  };

  const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('Please input the age'));
    }
    setTimeout(() => {
      const num = Number(value);
      if (!Number.isInteger(num)) {
        callback(new Error('Please input digits'));
      } else {
        if (num < 18) {
          callback(new Error('Age must be greater than 18'));
        } else {
          callback();
        }
      }
    }, 1000);
  };

  const rules: FormRules = {
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }],
  };

  const [Form, { instance, getModel }] = useForm({
    labelWidth: 'auto',
    statusIcon: true,
    model: {
      pass: '',
      checkPass: '',
      age: '',
    },
    rules,
    items: [
      {
        label: 'Password',
        prop: 'pass',
        render: {
          component: ElInput,
          props: { type: 'password', autocomplete: 'off' },
        },
      },
      {
        label: 'Confirm',
        prop: 'checkPass',
        render: {
          component: ElInput,
          props: { type: 'password', autocomplete: 'off' },
        },
      },
      {
        label: 'Age',
        prop: 'age',
        render: {
          component: ElInput,
        },
      },
      {
        slot: 'buttons',
      },
    ],
  });

  const submitForm = () => {
    if (!instance.value) return;
    instance.value.validate(valid => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!');
      }
    });
  };

  const resetForm = () => {
    if (!instance.value) return;
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
