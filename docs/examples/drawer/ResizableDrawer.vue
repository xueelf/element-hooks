<script setup lang="ts">
  import { useDrawer } from 'element-hooks';
  import { type DrawerProps } from 'element-plus';
  import { ref } from 'vue';

  const direction = ref<DrawerProps['direction']>();

  const [Drawer, { open, setState }] = useDrawer({
    resizable: true,
  });

  const handleDirectionChange = (value: DrawerProps['direction']) => {
    setState(prev => ({ ...prev, direction: value }));
    open();
  };
</script>

<template>
  <el-radio-group v-model="direction" @change="handleDirectionChange">
    <el-radio-button value="ttb">top</el-radio-button>
    <el-radio-button value="rtl">right</el-radio-button>
    <el-radio-button value="btt">bottom</el-radio-button>
    <el-radio-button value="ltr">left</el-radio-button>
  </el-radio-group>

  <Drawer>This is drawer content.</Drawer>
</template>
