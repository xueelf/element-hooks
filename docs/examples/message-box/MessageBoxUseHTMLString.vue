<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';

  const { alert } = useMessageBox();

  const open = () => {
    alert('<strong>proxy is <i>HTML</i> string</strong>', 'HTML String', {
      dangerouslyUseHTMLString: true,
    });
  };
</script>

<template>
  <el-button plain @click="open">Click to open Message Box</el-button>
</template>
