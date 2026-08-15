<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';
  import { ElMessage } from 'element-plus';
  import { h } from 'vue';

  const { confirm } = useMessageBox();

  const open = async () => {
    const isConfirmed = await confirm(
      h('p', null, [
        h('span', null, 'Message can be '),
        h('i', { style: 'color: teal' }, 'VNode'),
      ]),
      'Message',
      {
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = 'Loading...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      },
    );

    ElMessage({
      type: 'info',
      message: `action: ${isConfirmed ? 'confirm' : 'cancel'}`,
    });
  };
</script>

<template>
  <el-button plain @click="open">Click to open Message Box</el-button>
</template>
