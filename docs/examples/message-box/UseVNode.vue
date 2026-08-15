<script setup lang="ts">
  import { useMessageBox } from 'element-hooks';
  import { ElSwitch } from 'element-plus';
  import { h, ref } from 'vue';

  const { alert } = useMessageBox();

  const open = () => {
    alert(
      h('p', null, [
        h('span', null, 'Message can be '),
        h('i', { style: 'color: teal' }, 'VNode'),
      ]),
      'Message',
    );
  };

  const open1 = () => {
    const checked = ref<boolean | string | number>(false);
    alert(
      () =>
        h(ElSwitch, {
          modelValue: checked.value,
          'onUpdate:modelValue': (val: boolean | string | number) => {
            checked.value = val;
          },
        }),
      'Message',
    );
  };
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" plain @click="open">Common VNode</el-button>
    <el-button class="!ml-0" plain @click="open1">Dynamic props</el-button>
  </div>
</template>
