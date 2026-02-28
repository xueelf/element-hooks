<script setup lang="ts">
  import { useMessage } from 'element-hooks';

  const message = useMessage();

  const openHTML = () => {
    message({
      dangerouslyUseHTMLString: true,
      message: '<strong>This is <i>HTML</i> string</strong>',
    });
  };
</script>

<template>
  <el-button :plain="true" @click="openHTML">Use HTML string</el-button>
</template>
