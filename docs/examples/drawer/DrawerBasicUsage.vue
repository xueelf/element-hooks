<script setup lang="ts">
  import { useDrawer, useMessageBox } from 'element-hooks';
  import { type DrawerProps } from 'element-plus';
  import { ref } from 'vue';

  const direction = ref<DrawerProps['direction']>('rtl');
  const radio1 = ref('Option 1');
  const { confirm } = useMessageBox();

  const handleClose = async (done: () => void) => {
    const isConfirmed = await confirm('Are you sure you want to close this?');

    if (isConfirmed) {
      done();
    }
  };

  const [Drawer, { open, setState }] = useDrawer({
    title: 'I am the title',
    direction: direction.value,
    beforeClose: handleClose,
  });

  const [
    DrawerWithFooter,
    {
      open: openDrawerWithFooter,
      close: closeDrawerWithFooter,
      setState: setDrawerWithFooterState,
    },
  ] = useDrawer({
    direction: direction.value,
  });

  const handleDirectionChange = (value: DrawerProps['direction']) => {
    setState(prev => ({ ...prev, direction: value }));
    setDrawerWithFooterState(prev => ({ ...prev, direction: value }));
  };

  function cancelClick() {
    closeDrawerWithFooter();
  }

  async function confirmClick() {
    const isConfirmed = await confirm(
      `Are you confirm to chose ${radio1.value} ?`,
    );

    if (isConfirmed) {
      closeDrawerWithFooter();
    }
  }
</script>

<template>
  <el-radio-group v-model="direction" @change="handleDirectionChange">
    <el-radio value="ltr">left to right</el-radio>
    <el-radio value="rtl">right to left</el-radio>
    <el-radio value="ttb">top to bottom</el-radio>
    <el-radio value="btt">bottom to top</el-radio>
  </el-radio-group>

  <el-button type="primary" style="margin-left: 16px" @click="open">
    open
  </el-button>
  <el-button
    type="primary"
    style="margin-left: 16px"
    @click="openDrawerWithFooter"
  >
    with footer
  </el-button>

  <Drawer>
    <span>Hi, there!</span>
  </Drawer>

  <DrawerWithFooter>
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <el-radio v-model="radio1" value="Option 1" size="large">
          Option 1
        </el-radio>
        <el-radio v-model="radio1" value="Option 2" size="large">
          Option 2
        </el-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </DrawerWithFooter>
</template>
