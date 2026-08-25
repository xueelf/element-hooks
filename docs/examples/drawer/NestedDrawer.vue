<script setup lang="ts">
  import { useDrawer, useMessageBox } from 'element-hooks';

  const { confirm } = useMessageBox();

  const handleClose = async (done: () => void) => {
    const isConfirmed = await confirm('You still have unsaved data, proceed?');

    if (isConfirmed) {
      done();
    }
  };

  const [OuterDrawer, { open: openOuterDrawer }] = useDrawer({
    title: "I'm outer Drawer",
    size: '50%',
  });

  const [InnerDrawer, { open: openInnerDrawer }] = useDrawer({
    title: "I'm inner Drawer",
    appendToBody: true,
    beforeClose: handleClose,
  });
</script>

<template>
  <el-button type="primary" @click="openOuterDrawer">open</el-button>

  <OuterDrawer>
    <div>
      <el-button @click="openInnerDrawer">Click me!</el-button>
      <InnerDrawer>
        <p>_(:зゝ∠)_</p>
      </InnerDrawer>
    </div>
  </OuterDrawer>
</template>
