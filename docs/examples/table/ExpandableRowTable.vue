<script setup lang="ts">
  import { ref } from 'vue';
  import { useTable } from 'element-hooks';

  const parentBorder = ref(false);
  const childBorder = ref(false);
  const preserveExpanded = ref(false);
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'San Francisco',
      address: '3650 21st St, San Francisco',
      zip: 'CA 94114',
      family: [
        {
          name: 'Jerry',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Spike',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Tyke',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
      ],
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'San Francisco',
      address: '3650 21st St, San Francisco',
      zip: 'CA 94114',
      family: [
        {
          name: 'Jerry',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Spike',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Tyke',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
      ],
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'San Francisco',
      address: '3650 21st St, San Francisco',
      zip: 'CA 94114',
      family: [
        {
          name: 'Jerry',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Spike',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Tyke',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
      ],
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'San Francisco',
      address: '3650 21st St, San Francisco',
      zip: 'CA 94114',
      family: [
        {
          name: 'Jerry',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Spike',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Tyke',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
      ],
    },
    {
      date: '2016-05-08',
      name: 'Tom',
      state: 'California',
      city: 'San Francisco',
      address: '3650 21st St, San Francisco',
      zip: 'CA 94114',
      family: [
        {
          name: 'Jerry',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Spike',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Tyke',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
      ],
    },
    {
      date: '2016-05-06',
      name: 'Tom',
      state: 'California',
      city: 'San Francisco',
      address: '3650 21st St, San Francisco',
      zip: 'CA 94114',
      family: [
        {
          name: 'Jerry',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Spike',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Tyke',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
      ],
    },
    {
      date: '2016-05-07',
      name: 'Tom',
      state: 'California',
      city: 'San Francisco',
      address: '3650 21st St, San Francisco',
      zip: 'CA 94114',
      family: [
        {
          name: 'Jerry',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Spike',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
        {
          name: 'Tyke',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
        },
      ],
    },
  ];

  const [Table] = useTable({
    data: tableData,
    columns: [
      { type: 'expand', slot: 'expand' },
      { label: 'Date', prop: 'date' },
      { label: 'Name', prop: 'name' },
    ],
  });
  const [ChildTable] = useTable({
    columns: [
      { label: 'Name', prop: 'name' },
      { label: 'State', prop: 'state' },
      { label: 'City', prop: 'city' },
      { label: 'Address', prop: 'address' },
      { label: 'Zip', prop: 'zip' },
    ],
  });
</script>

<template>
  <div style="margin-bottom: 20px">
    switch parent border: <el-switch v-model="parentBorder" /> switch child
    border: <el-switch v-model="childBorder" /> preserve expanded:
    <el-switch v-model="preserveExpanded" />
  </div>
  <Table
    :border="parentBorder"
    :preserve-expanded-content="preserveExpanded"
    style="width: 100%"
  >
    <template #expand="props">
      <div style="padding: 20px">
        <p>State: {{ props.row.state }}</p>
        <p>City: {{ props.row.city }}</p>
        <p>Address: {{ props.row.address }}</p>
        <p>Zip: {{ props.row.zip }}</p>
        <h3>Family</h3>
        <ChildTable :data="props.row.family" :border="childBorder" />
      </div>
    </template>
  </Table>
</template>
