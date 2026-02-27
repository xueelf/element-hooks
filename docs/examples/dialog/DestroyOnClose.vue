<script setup lang="ts">
  import { useDialog } from 'element-hooks';

  const [Dialog, { open, close }] = useDialog({
    title: 'Notice',
    width: 500,
    destroyOnClose: true,
    center: true,
  });
</script>

<template>
  <el-button plain @click="open">Click to open Dialog</el-button>

  <Dialog>
    <span>
      Notice: before the dialog is opened for the first time, this node and the
      one below will not be rendered.
    </span>
    <div>
      <strong>Extra content (Not rendered)</strong>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close">Confirm</el-button>
      </div>
    </template>
  </Dialog>
</template>
