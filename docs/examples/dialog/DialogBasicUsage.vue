<script setup lang="ts">
  import { useDialog, useMessageBox } from 'element-hooks';

  const messageBox = useMessageBox();
  const [Dialog, { open, close }] = useDialog({
    width: 500,
    title: 'Tips',
    async beforeClose(done) {
      const isConfirmed = await messageBox.confirm(
        'Are you sure to close this dialog?',
      );
      if (isConfirmed) {
        done();
      }
    },
  });
</script>

<template>
  <el-button plain @click="open">Click to open the Dialog</el-button>
  <Dialog>
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close">Confirm</el-button>
      </div>
    </template>
  </Dialog>
</template>
