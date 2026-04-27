<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';
  import { type Action, ElMessage } from 'element-plus';

  const messageBox = useMessageBox();

  const open = () => {
    messageBox.alert('This is a message', 'Title', {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: 'OK',
      callback: (action: Action) => {
        ElMessage({
          type: 'info',
          message: `action: ${action}`,
        });
      },
    });
  };
</script>

<template>
  <el-button plain @click="open">Click to open the Message Box</el-button>
</template>
