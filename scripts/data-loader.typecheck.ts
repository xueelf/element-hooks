import { expectTypeOf } from 'bun:test';

import { useGrid } from '#/composables/grid';
import { useTable } from '#/composables/table';

type Row = { id: number };

// Checked by `bun run typecheck`; this function is never executed.
export function checkDataLoaderTypes(
  rows: Row[],
  thenable: PromiseLike<Row[]>,
  mixedLoader: () => Row[] | Promise<Row[]>,
) {
  const [, { loadData }] = useGrid<Row>();

  expectTypeOf(loadData(() => rows)).toEqualTypeOf<void>();
  expectTypeOf(loadData(async () => rows)).toEqualTypeOf<Promise<void>>();
  expectTypeOf(
    loadData(async () => ({ result: rows, total: rows.length })),
  ).toEqualTypeOf<Promise<void>>();
  expectTypeOf(loadData(() => thenable)).toEqualTypeOf<Promise<void>>();
  expectTypeOf(loadData(mixedLoader)).toEqualTypeOf<void | Promise<void>>();

  const [, { loadData: loadFilteredData }] = useGrid<Row, { keyword: string }>({
    form: { model: { keyword: '' } },
  });

  expectTypeOf(
    loadFilteredData(async params => {
      expectTypeOf(params.keyword).toEqualTypeOf<string>();
      expectTypeOf(params.currentPage).toEqualTypeOf<number>();
      expectTypeOf(params.pageSize).toEqualTypeOf<number>();
      return rows;
    }),
  ).toEqualTypeOf<Promise<void>>();

  const [, { loadData: loadTableData }] = useTable<Row>();

  expectTypeOf(loadTableData(() => rows)).toEqualTypeOf<void>();
  expectTypeOf(loadTableData(async () => rows)).toEqualTypeOf<Promise<void>>();
  expectTypeOf(
    loadTableData(mixedLoader),
  ).toEqualTypeOf<void | Promise<void>>();
}
