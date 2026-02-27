<script setup lang="ts">
  import { useDialog } from 'element-hooks';
  import { CircleCloseFilled } from '@element-plus/icons-vue';

  const [Dialog, { open }] = useDialog({
    showClose: false,
    width: 500,
  });
</script>

<template>
  <el-button plain @click="open">
    Open Dialog with customized header
  </el-button>

  <Dialog>
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    This is dialog content.
  </Dialog>
</template>

<style scoped>
  .my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }
</style>
