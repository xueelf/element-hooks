<script setup lang="ts">
  import { useGrid } from 'element-hooks';

  const sourceData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ];

  function getPage(currentPage = 1, pageSize = 2) {
    const start = (currentPage - 1) * pageSize;

    return {
      result: sourceData.slice(start, start + pageSize),
      total: sourceData.length,
    };
  }

  function onPaginationChange() {
    const { currentPage, pageSize } = getPagination();

    setData(getPage(currentPage, pageSize));
  }

  const [Grid, { getPagination, setData }] = useGrid({
    data: getPage(),
    columns: [
      { prop: 'date', label: 'Date', width: '180' },
      { prop: 'name', label: 'Name', width: '180' },
      { prop: 'address', label: 'Address' },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 2,
      layout: 'prev, pager, next',
      onCurrentChange: onPaginationChange,
      onSizeChange: onPaginationChange,
    },
  });
</script>

<template>
  <Grid />
</template>
