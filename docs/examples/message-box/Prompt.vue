<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';
  import { ElMessage } from 'element-plus';

  const { prompt } = useMessageBox();

  const open = async () => {
    const value = await prompt('Please input your e-mail', 'Tip', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: 'Invalid Email',
    });

    if (value !== null) {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`,
      });
    } else {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      });
    }
  };
</script>

<template>
  <el-button plain @click="open">Click to open Message Box</el-button>
</template>
