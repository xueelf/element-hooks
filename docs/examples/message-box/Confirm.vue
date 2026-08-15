<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';
  import { ElMessage } from 'element-plus';

  const { confirm } = useMessageBox();

  const open = async () => {
    const isConfirmed = await confirm(
      'proxy will permanently delete the file. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    );

    if (isConfirmed) {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      });
    } else {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    }
  };
</script>

<template>
  <el-button plain @click="open">Click to open the Message Box</el-button>
</template>
