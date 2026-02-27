<script setup lang="ts">
  import { markRaw } from 'vue';
  import { ElMessage } from 'element-plus';
  import { Delete } from '@element-plus/icons-vue';
  import { useMessageBox } from 'element-hooks';

  const messageBox = useMessageBox();

  const open = async () => {
    const isConfirmed = await messageBox.confirm(
      'It will permanently delete the file. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        icon: markRaw(Delete),
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
  <el-button plain @click="open">Click to open Message Box</el-button>
</template>
