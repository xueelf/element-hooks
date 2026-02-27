<script setup lang="ts">
  import { useDialog } from 'element-hooks';

  const [Dialog, { open, close }] = useDialog({
    title: 'Tips',
    width: 500,
    draggable: true,
  });

  const [OverflowDialog, { open: openOverflow, close: closeOverflow }] =
    useDialog({
      title: 'Tips',
      width: 500,
      draggable: true,
      overflow: true,
    });

  const [
    CustomDraggingDialog,
    { open: openCustomDragging, close: closeCustomDragging },
  ] = useDialog({
    title: 'Custom Dragging Style',
    width: 500,
    draggable: true,
    class: 'custom-dragging-style',
  });
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" plain @click="open">
      Open a draggable Dialog
    </el-button>
    <el-button class="!ml-0" plain @click="openOverflow">
      Open a overflow draggable Dialog
    </el-button>
    <el-button class="!ml-0" plain @click="openCustomDragging">
      Open a custom dragging style Dialog
    </el-button>
  </div>

  <Dialog>
    <span>It's a draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close">Confirm</el-button>
      </div>
    </template>
  </Dialog>

  <OverflowDialog>
    <span>It's a overflow draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeOverflow">Cancel</el-button>
        <el-button type="primary" @click="closeOverflow">Confirm</el-button>
      </div>
    </template>
  </OverflowDialog>

  <CustomDraggingDialog>
    <span>
      This dialog has custom dragging styles. Try dragging it to see the
      effects!
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeCustomDragging">Cancel</el-button>
        <el-button type="primary" @click="closeCustomDragging">
          Confirm
        </el-button>
      </div>
    </template>
  </CustomDraggingDialog>
</template>

<style>
  .custom-dragging-style.is-dragging {
    border: 2px dashed var(--el-color-primary);
    opacity: 0.65;
  }
</style>
