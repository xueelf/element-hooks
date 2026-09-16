import { expect, expectTypeOf, test } from 'bun:test';

import { useTable } from '#/composables/table';

type Row = { id: number };

test('加载返回值区分同步与异步', async () => {
  const [, { loadData, getData }] = useTable<Row>();
  const rows: Row[] = [{ id: 1 }];

  const syncResult = loadData(() => rows);
  expectTypeOf(syncResult).toEqualTypeOf<void>();
  expect(syncResult).toBeUndefined();
  expect(getData()).toEqual(rows);

  const asyncResult = loadData(async () => []);
  expectTypeOf(asyncResult).toEqualTypeOf<Promise<void>>();
  await expect(asyncResult).resolves.toBeUndefined();
  expect(getData()).toEqual([]);
});
