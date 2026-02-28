<script setup lang="ts">
  import { useMessage } from 'element-hooks';

  const message = useMessage();

  const open1 = () => {
    message({
      message: 'Congrats, this is a success message.',
      type: 'success',
      plain: true,
    });
  };
  const open2 = () => {
    message({
      message: 'Warning, this is a warning message.',
      type: 'warning',
      plain: true,
    });
  };
  const open3 = () => {
    message({
      message: 'This is a info message.',
      type: 'info',
      plain: true,
    });
  };
  const open4 = () => {
    message({
      message: 'Oops, this is a error message.',
      type: 'error',
      plain: true,
    });
  };
  const open5 = () => {
    message({
      message: 'This is a primary message.',
      type: 'primary',
      plain: true,
    });
  };
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" :plain="true" @click="open5">Primary</el-button>
    <el-button class="!ml-0" :plain="true" @click="open1">Success</el-button>
    <el-button class="!ml-0" :plain="true" @click="open2">Warning</el-button>
    <el-button class="!ml-0" :plain="true" @click="open3">Info</el-button>
    <el-button class="!ml-0" :plain="true" @click="open4">Error</el-button>
  </div>
</template>
