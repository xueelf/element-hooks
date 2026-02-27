<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { useMessageBox } from 'element-hooks';

  const messageBox = useMessageBox();

  const open = async () => {
    const isConfirmed = await messageBox.confirm(
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
