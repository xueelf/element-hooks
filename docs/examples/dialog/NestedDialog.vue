<script setup lang="ts">
  import { useDialog } from 'element-hooks';

  const [OuterDialog, { open: openOuter, close: closeOuter }] = useDialog({
    title: 'Outer Dialog',
    width: 800,
  });

  const [InnerDialog, { open: openInner }] = useDialog({
    title: 'Inner Dialog',
    width: 500,
    appendToBody: true,
  });
</script>

<template>
  <el-button plain @click="openOuter">Open the outer Dialog</el-button>

  <OuterDialog>
    <span>This is the outer Dialog</span>
    <InnerDialog>
      <span>This is the inner Dialog</span>
    </InnerDialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeOuter">Cancel</el-button>
        <el-button type="primary" @click="openInner">
          Open the inner Dialog
        </el-button>
      </div>
    </template>
  </OuterDialog>
</template>
