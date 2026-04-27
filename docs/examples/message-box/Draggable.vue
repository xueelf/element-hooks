<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';
  import { ElMessage } from 'element-plus';

  const messageBox = useMessageBox();

  const open = async () => {
    const isConfirmed = await messageBox.confirm(
      'proxy will permanently delete the file. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        draggable: true,
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

  const open2 = async () => {
    const isConfirmed = await messageBox.confirm(
      'proxy will permanently delete the file. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        draggable: true,
        overflow: true,
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

  const open3 = async () => {
    const isConfirmed = await messageBox.confirm(
      'This message box has custom dragging styles. Try dragging it to see the effects!',
      'Custom Dragging Style',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info',
        draggable: true,
        customClass: 'custom-dragging-message-box',
      },
    );

    if (isConfirmed) {
      ElMessage({
        type: 'success',
        message: 'Action completed',
      });
    } else {
      ElMessage({
        type: 'info',
        message: 'Action canceled',
      });
    }
  };
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" plain @click="open">
      Open a draggable Message Box
    </el-button>
    <el-button class="!ml-0" plain @click="open2">
      Open a overflow draggable Message Box
    </el-button>
    <el-button class="!ml-0" plain @click="open3">
      Open a custom dragging style Message Box
    </el-button>
  </div>
</template>

<style>
  .custom-dragging-message-box.is-dragging {
    border: 2px dashed var(--el-color-primary);
    opacity: 0.65;
  }
</style>
