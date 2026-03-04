<script setup lang="ts">
  import { useDialog } from 'element-hooks';

  const [Dialog, { open, close }] = useDialog({
    title: 'Warning',
    width: 500,
    center: true,
  });
</script>

<template>
  <el-button plain @click="open">Click to open the Dialog</el-button>

  <Dialog>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close">Confirm</el-button>
      </div>
    </template>
  </Dialog>
</template>
