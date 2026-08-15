<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';
  import { ElButton, ElMessage } from 'element-plus';
  import { h } from 'vue';

  const { confirm } = useMessageBox();

  const open = async () => {
    const isConfirmed = await confirm(
      ({ confirm, cancel, close }) =>
        h('div', [
          h(
            'p',
            { style: 'margin-bottom: 8px' },
            'Custom buttons with MessageBox action handlers',
          ),
          h(
            ElButton,
            {
              type: 'primary',
              onClick: () => {
                confirm();
              },
            },
            () => 'Resolve',
          ),
          h(
            ElButton,
            {
              type: 'danger',
              onClick: () => {
                cancel();
              },
            },
            () => 'Reject',
          ),
          h(
            ElButton,
            {
              onClick: () => {
                close();
              },
            },
            () => 'Close',
          ),
        ]),
      {
        title: 'Message',
        showConfirmButton: false,
        showCancelButton: false,
        distinguishCancelAndClose: true,
      },
    );

    ElMessage({
      type: isConfirmed ? 'success' : 'error',
      message: isConfirmed ? 'resolved: confirm' : 'rejected: cancel or close',
    });
  };
</script>

<template>
  <el-button plain @click="open">Click to open Message Box</el-button>
</template>
