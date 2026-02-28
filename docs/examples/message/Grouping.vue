<script setup lang="ts">
  import { useMessage } from 'element-hooks';

  const message = useMessage();

  const open = () => {
    message({
      message: 'This is a message.',
      grouping: true,
      type: 'success',
    });
  };
</script>

<template>
  <el-button :plain="true" @click="open">Show message</el-button>
</template>
