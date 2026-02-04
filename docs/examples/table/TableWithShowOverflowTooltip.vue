<script setup lang="ts">
  import { useTable } from 'element-hooks';

  interface User {
    date: string;
    name: string;
    address: string;
  }
  const [Table] = useTable<User>({
    columns: [
      { type: 'selection', width: 55 },
      { prop: 'date', label: 'Date', width: 120, slot: 'date' },
      { property: 'name', label: 'Name', width: 120 },
      {
        property: 'address',
        label: 'use show-overflow-tooltip',
        width: 240,
        showOverflowTooltip: true,
      },
      { property: 'address', label: 'Address' },
    ],
    data: [
      {
        date: '2016-05-04',
        name: 'Aleyna Kutzner',
        address: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
      },
      {
        date: '2016-05-03',
        name: 'Helen Jacobi',
        address: '760 A Street, South Frankfield, Illinois',
      },
      {
        date: '2016-05-02',
        name: 'Brandon Deckert',
        address: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
      },
      {
        date: '2016-05-01',
        name: 'Margie Smith',
        address: '23618 Windsor Drive, West Ricardoview, Idaho',
      },
    ],
  });
</script>

<template>
  <Table style="width: 100%">
    <template #date="scope">{{ scope.row.date }}</template>
  </Table>
</template>
