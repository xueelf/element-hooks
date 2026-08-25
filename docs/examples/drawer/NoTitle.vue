<script setup lang="ts">
  import { useDrawer } from 'element-hooks';

  const [Drawer, { open }] = useDrawer({
    title: 'I am the title',
    withHeader: false,
  });
</script>

<template>
  <el-button type="primary" @click="open">open</el-button>

  <Drawer>
    <span>Hi there!</span>
  </Drawer>
</template>
