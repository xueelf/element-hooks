<script setup lang="ts">
  import { h } from 'vue';
  import { useMessage } from 'element-hooks';

  const message = useMessage();

  const open = () => {
    message('This is a message.');
  };

  const openVn = () => {
    message({
      message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
        h('span', null, 'Message can be '),
        h('i', { style: 'color: teal' }, 'VNode'),
      ]),
    });
  };
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" :plain="true" @click="open">
      Show message
    </el-button>
    <el-button class="!ml-0" :plain="true" @click="openVn">VNode</el-button>
  </div>
</template>
