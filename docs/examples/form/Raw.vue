<script setup lang="ts">
  import { ElAlert, ElDivider, ElInput } from 'element-plus';
  import { h } from 'vue';

  import { useForm } from 'element-hooks';

  const [Form] = useForm({
    labelWidth: '100px',
    model: {
      username: '',
      password: '',
    },
    items: [
      {
        raw: true,
        render: {
          component: () =>
            h(ElAlert, {
              title: 'Warning alert',
              type: 'warning',
              style: 'margin-bottom: 18px;',
            }),
        },
      },
      {
        label: '用户名',
        prop: 'username',
        render: { component: ElInput },
      },
      {
        label: '密码',
        prop: 'password',
        render: { component: ElInput, props: { type: 'password' } },
      },
      {
        raw: true,
        render: { component: ElDivider },
      },
      {
        slot: 'footer',
      },
    ],
  });
</script>

<template>
  <Form>
    <template #footer>
      <el-button type="primary">Login</el-button>
    </template>
  </Form>
</template>
