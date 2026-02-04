<script setup lang="ts">
  import { useTable } from 'element-hooks';

  const [Table] = useTable({
    height: '250',
    columns: [
      { prop: 'date', label: 'Date', width: 150, fixed: true },
      {
        label: 'Delivery Info',
        children: [
          { prop: 'name', label: 'Name', width: 120 },
          {
            label: 'Address Info',
            children: [
              { prop: 'state', label: 'State', width: 120 },
              { prop: 'city', label: 'City', width: 120 },
              { prop: 'address', label: 'Address', width: 600 },
              { prop: 'zip', label: 'Zip', width: 120 },
            ],
          },
        ],
      },
    ],
    data: [
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
    ],
  });
</script>

<template>
  <Table style="width: 100%" />
</template>
