<script setup lang="ts">
  import { useDrawer, useForm, useMessageBox, useTable } from 'element-hooks';
  import { ElInput, ElSelect } from 'element-plus';
  import { ref } from 'vue';

  const formLabelWidth = '80px';
  let timer: ReturnType<typeof setTimeout> | undefined;

  const loading = ref(false);
  const { confirm } = useMessageBox();

  const gridData = [
    {
      date: '2016-05-02',
      name: 'Peter Parker',
      address: 'Queens, New York City',
    },
    {
      date: '2016-05-04',
      name: 'Peter Parker',
      address: 'Queens, New York City',
    },
    {
      date: '2016-05-01',
      name: 'Peter Parker',
      address: 'Queens, New York City',
    },
    {
      date: '2016-05-03',
      name: 'Peter Parker',
      address: 'Queens, New York City',
    },
  ];

  const [Table] = useTable({
    data: gridData,
    columns: [
      { prop: 'date', label: 'Date', width: 150 },
      { prop: 'name', label: 'Name', width: 200 },
      { prop: 'address', label: 'Address' },
    ],
  });

  const [Form] = useForm({
    model: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    },
    items: [
      {
        label: 'Name',
        labelWidth: formLabelWidth,
        prop: 'name',
        render: {
          component: ElInput,
          props: { autocomplete: 'off' },
        },
      },
      {
        label: 'Area',
        labelWidth: formLabelWidth,
        prop: 'region',
        render: {
          component: ElSelect,
          props: {
            placeholder: 'Please select activity area',
            options: [
              { label: 'Area1', value: 'shanghai' },
              { label: 'Area2', value: 'beijing' },
            ],
          },
        },
      },
    ],
  });

  const [TableDrawer, { open: openTableDrawer }] = useDrawer({
    title: 'I have a nested table inside!',
    direction: 'rtl',
    size: '50%',
  });

  const handleClose = async (done: () => void) => {
    if (loading.value) {
      return;
    }
    const isConfirmed = await confirm('Do you want to submit?');

    if (isConfirmed) {
      loading.value = true;
      timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false;
        }, 400);
      }, 2000);
    }
  };

  const [FormDrawer, { open: openFormDrawer, close: closeFormDrawer }] =
    useDrawer({
      title: 'I have a nested form inside!',
      beforeClose: handleClose,
      direction: 'ltr',
      class: 'demo-drawer',
    });

  const handleSubmit = () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      closeFormDrawer();
    }, 400);
  };

  const cancelForm = () => {
    loading.value = false;
    closeFormDrawer();
    clearTimeout(timer);
  };
</script>

<template>
  <el-button text @click="openTableDrawer">
    Open Drawer with nested table
  </el-button>
  <el-button text @click="openFormDrawer">
    Open Drawer with nested form
  </el-button>

  <TableDrawer>
    <Table />
  </TableDrawer>

  <FormDrawer>
    <div class="demo-drawer__content">
      <Form />
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">Cancel</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          {{ loading ? 'Submitting ...' : 'Submit' }}
        </el-button>
      </div>
    </div>
  </FormDrawer>
</template>
