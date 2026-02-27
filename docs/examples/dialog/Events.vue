<script setup lang="ts">
  import { useDialog } from 'element-hooks';

  const [Dialog, { open, close }] = useDialog({
    modalClass: 'overide-animation',
    async beforeClose(done) {
      console.log('before-close');
      done();
    },
  });
</script>

<template>
  <el-button plain @click="open">Open the event Dialog</el-button>

  <Dialog
    @open="console.log('open')"
    @open-auto-focus="console.log('open-auto-focus')"
    @opened="console.log('opened')"
    @close="console.log('close')"
    @close-auto-focus="console.log('close-auto-focus')"
    @closed="console.log('closed')"
  >
    <span>It's a event Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close">Confirm</el-button>
      </div>
    </template>
  </Dialog>
</template>
