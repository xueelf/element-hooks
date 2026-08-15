<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';
  import { type Action, ElMessage } from 'element-plus';

  const { confirm } = useMessageBox();

  const open = () =>
    confirm('You have unsaved changes, save and proceed?', 'Confirm', {
      distinguishCancelAndClose: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Discard Changes',
      callback: (action: Action) => {
        ElMessage({
          type: 'info',
          message:
            action === 'confirm'
              ? 'Changes saved. Proceeding to a new route.'
              : action === 'cancel'
                ? 'Changes discarded. Proceeding to a new route.'
                : 'Stay in the current route',
        });
      },
    });
</script>

<template>
  <el-button plain @click="open">Click to open Message Box</el-button>
</template>
