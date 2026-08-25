<script setup lang="ts">
  import { CircleCloseFilled } from '@element-plus/icons-vue';
  import { useDrawer } from 'element-hooks';

  const [Drawer, { open }] = useDrawer({
    showClose: false,
  });
</script>

<template>
  <el-button @click="open">Open Drawer with customized header</el-button>

  <Drawer>
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        Close
      </el-button>
    </template>
    This is drawer content.
  </Drawer>
</template>
