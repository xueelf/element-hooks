import { afterEach, expect, expectTypeOf, test } from 'bun:test';

import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus';
import { type VNode, createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';

import { useGrid } from '#/composables/grid';
import { getOptions, setOptions } from '#/config';

const originalOptions = { ...getOptions() };
afterEach(() => {
  setOptions({
    dialog: undefined,
    drawer: undefined,
    form: undefined,
    table: undefined,
    pagination: undefined,
    ...originalOptions,
  });
});

async function renderProps(setup: () => VNode) {
  const props = new Map<string, Record<string, unknown>>();
  const app = createSSRApp({
    setup() {
      const content = setup();
      return () => content;
    },
  });
  app.provide(ID_INJECTION_KEY, { prefix: 1, current: 0 });
  app.provide(ZINDEX_INJECTION_KEY, { current: 0 });
  app.mixin({
    created() {
      if (this.$options.name) {
        props.set(this.$options.name, { ...this.$props });
      }
    },
  });
  await renderToString(app);
  return props;
}

test('渲染与加载共用全局默认值', async () => {
  setOptions({
    form: { disabled: true },
    table: { stripe: true },
    pagination: {
      currentPage: 3,
      pageSize: 20,
      layout: 'prev, pager, next',
      props: { result: 'rows', total: 'count' },
    },
  });
  const model = { query: 'search' };
  const response = { rows: [{ id: 1 }], count: 120 };
  const [Grid, { getModel, getPagination, getData, loadData }] = useGrid({
    data: response,
  });
  expect(getModel()).toBeNull();

  const props = await renderProps(() => {
    const attrs: Record<string, unknown> = {
      form: { model },
      pagination: {},
    };
    return h(Grid, attrs);
  });
  const pagination = { currentPage: 3, pageSize: 20 };
  expect(getPagination()).toEqual(pagination);
  const loaded = { rows: [{ id: 2 }], count: 80 };
  loadData(params => {
    expect(params).toEqual({ ...model, ...pagination });
    return loaded;
  });
  expect(getData()).toEqual(loaded.rows);
  expect(props.get('ElForm')).toMatchObject({
    model,
    disabled: true,
  });
  expect(props.get('ElTable')).toMatchObject({
    stripe: true,
    data: response.rows,
  });
  expect(props.get('ElPagination')).toMatchObject({
    ...pagination,
    total: 120,
  });
});

type Row = { id: number };

test('加载返回值区分同步与异步', async () => {
  const rows: Row[] = [{ id: 1 }];
  const [, { loadData, getData }] = useGrid<Row>();

  const syncResult = loadData(() => rows);
  expectTypeOf(syncResult).toEqualTypeOf<void>();
  expect(syncResult).toBeUndefined();
  expect(getData()).toEqual(rows);

  const asyncRows: Row[] = [{ id: 2 }];
  const asyncResult = loadData(async () => ({ result: asyncRows, total: 1 }));
  expectTypeOf(asyncResult).toEqualTypeOf<Promise<void>>();
  await expect(asyncResult).resolves.toBeUndefined();
  expect(getData()).toEqual(asyncRows);

  const mixedResult = loadData((): Row[] | PromiseLike<Row[]> =>
    Promise.resolve(rows),
  );
  expectTypeOf(mixedResult).toEqualTypeOf<void | Promise<void>>();
  expect(await mixedResult).toBeUndefined();
  expect(getData()).toEqual(rows);
});
