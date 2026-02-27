<script setup lang="ts">
  import { useDialog } from 'element-hooks';

  const [Dialog, { open, close }] = useDialog({
    modal: false,
    modalPenetrable: true,
  });
</script>

<template>
  <el-button plain @click="open">Open the modal Dialog</el-button>

  <Dialog>
    <span>It's a modal Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close">Confirm</el-button>
      </div>
    </template>
  </Dialog>
</template>
