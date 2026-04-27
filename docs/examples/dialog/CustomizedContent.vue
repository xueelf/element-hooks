<script setup lang="ts">
  import { useDialog, useForm, useTable } from 'element-hooks';
  import { ElInput, ElSelect } from 'element-plus';

  const gridData = [
    {
      date: '2016-05-02',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
      date: '2016-05-04',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
      date: '2016-05-01',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
      date: '2016-05-03',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
  ];

  const formLabelWidth = '140px';

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
        label: 'Promotion name',
        labelWidth: formLabelWidth,
        prop: 'name',
        render: {
          component: ElInput,
          props: { autocomplete: 'off' },
        },
      },
      {
        label: 'Zones',
        labelWidth: formLabelWidth,
        prop: 'region',
        render: {
          component: ElSelect,
          props: {
            placeholder: 'Please select a zone',
            options: [
              { label: 'Zone No.1', value: 'shanghai' },
              { label: 'Zone No.2', value: 'beijing' },
            ],
          },
        },
      },
    ],
  });

  const [TableDialog, { open: openTableDialog }] = useDialog({
    title: 'Shipping address',
    width: 800,
  });

  const [FormDialog, { open: openFormDialog, close: closeFormDialog }] =
    useDialog({
      title: 'Shipping address',
      width: 500,
    });
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" plain @click="openTableDialog">
      Open a Table nested Dialog
    </el-button>

    <el-button class="!ml-0" plain @click="openFormDialog">
      Open a Form nested Dialog
    </el-button>
  </div>

  <TableDialog>
    <Table />
  </TableDialog>

  <FormDialog>
    <Form />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeFormDialog">Cancel</el-button>
        <el-button type="primary" @click="closeFormDialog"> Confirm </el-button>
      </div>
    </template>
  </FormDialog>
</template>
