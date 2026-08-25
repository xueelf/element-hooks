<script setup lang="ts">
  import { useDrawer } from 'element-hooks';

  const [Drawer, { open, close }] = useDrawer({
    modal: false,
    modalPenetrable: true,
  });
</script>

<template>
  <el-button plain @click="open">Open the modal Drawer</el-button>

  <Drawer>
    <span>It's a modal Drawer</span>
    <template #footer>
      <div class="drawer-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close">Confirm</el-button>
      </div>
    </template>
  </Drawer>
</template>
