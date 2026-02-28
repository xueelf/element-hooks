<script setup lang="ts">
  import { useMessage } from 'element-hooks';

  const message = useMessage();

  const open1 = () => {
    message('This is a info message.');
  };
  const open2 = () => {
    message({
      message: 'Congrats, this is a success message.',
      type: 'success',
    });
  };
  const open3 = () => {
    message({
      message: 'Warning, this is a warning message.',
      type: 'warning',
    });
  };
  const open4 = () => {
    message.error('Oops, this is a error message.');
  };
  const open5 = () => {
    message.primary('This is a primary message.');
  };
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" :plain="true" @click="open5">Primary</el-button>
    <el-button class="!ml-0" :plain="true" @click="open2">Success</el-button>
    <el-button class="!ml-0" :plain="true" @click="open3">Warning</el-button>
    <el-button class="!ml-0" :plain="true" @click="open1">Info</el-button>
    <el-button class="!ml-0" :plain="true" @click="open4">Error</el-button>
  </div>
</template>
