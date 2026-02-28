<script setup lang="ts">
  import { useMessage } from 'element-hooks';

  const message = useMessage();

  const open1 = () => {
    message({
      showClose: true,
      message: 'This is a info message.',
    });
  };
  const open2 = () => {
    message({
      showClose: true,
      message: 'Congrats, this is a success message.',
      type: 'success',
    });
  };
  const open3 = () => {
    message({
      showClose: true,
      message: 'Warning, this is a warning message.',
      type: 'warning',
    });
  };
  const open4 = () => {
    message({
      showClose: true,
      message: 'Oops, this is a error message.',
      type: 'error',
    });
  };
  const open5 = () => {
    message({
      showClose: true,
      message: 'Oops, this is a message that does not automatically close.',
      duration: 0,
    });
  };
  const open6 = () => {
    message({
      showClose: true,
      message: 'This is a primary message.',
      type: 'primary',
    });
  };
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" :plain="true" @click="open6">Primary</el-button>
    <el-button class="!ml-0" :plain="true" @click="open2">Success</el-button>
    <el-button class="!ml-0" :plain="true" @click="open3">Warning</el-button>
    <el-button class="!ml-0" :plain="true" @click="open1">Info</el-button>
    <el-button class="!ml-0" :plain="true" @click="open4">Error</el-button>
    <el-button class="!ml-0" :plain="true" @click="open5">
      Won't close automatically
    </el-button>
  </div>
</template>
