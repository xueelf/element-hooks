import { afterEach, expect, test } from 'bun:test';

import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus';
import {
  type VNode,
  createRenderer,
  createSSRApp,
  defineComponent,
  h,
  nextTick,
  shallowRef,
} from 'vue';
import { renderToString } from 'vue/server-renderer';

import {
  useDialog,
  useDrawer,
  useForm,
  useGrid,
  useTable,
} from '#/composables';
import { getOptions, setOptions, withOptions } from '#/config';
import { type HookOptions } from '#/devtools';
import { mergeOptions, useState } from '#/util';

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
  const app = createSSRApp(
    defineComponent({
      setup() {
        const content = setup();
        return () => content;
      },
    }),
  );
  app.provide(ID_INJECTION_KEY, { prefix: 1, current: 0 });
  app.provide(ZINDEX_INJECTION_KEY, { current: 0 });
  app.mixin({
    created() {
      if (this.$options.name) {
        props.set(this.$options.name, { ...this.$props });
      }
    },
  });
  return { props, html: await renderToString(app) };
}

for (const mode of ['inherit', 'override', 'omit', 'undefined', 'updater']) {
  test(`core hooks keep global defaults separate from local options: ${mode}`, async () => {
    setOptions({
      form: { disabled: true },
      table: { stripe: true },
      dialog: { draggable: true },
      drawer: { resizable: true },
    });
    const { props } = await renderProps(() => {
      const [Form, { setState: setForm }] = useForm({ model: {} });
      const [Table, { setState: setTable }] = useTable();
      const [Dialog, { setState: setDialog }] = useDialog();
      const [Drawer, { setState: setDrawer }] = useDrawer();

      if (mode === 'updater') {
        setForm(prev => {
          expect(prev).not.toHaveProperty('disabled');
          return prev;
        });
        setTable(prev => {
          expect(prev).not.toHaveProperty('stripe');
          return prev;
        });
        setDialog(prev => {
          expect(prev).not.toHaveProperty('draggable');
          return prev;
        });
        setDrawer(prev => {
          expect(prev).not.toHaveProperty('resizable');
          return prev;
        });
      } else if (mode !== 'inherit') {
        const value = mode === 'override' ? false : undefined;
        setForm(
          mode === 'omit' ? { model: {} } : { model: {}, disabled: value },
        );
        setTable(mode === 'omit' ? {} : { stripe: value });
        setDialog(mode === 'omit' ? {} : { draggable: value });
        setDrawer(mode === 'omit' ? {} : { resizable: value });
      }
      return h('div', [h(Form), h(Table), h(Dialog), h(Drawer)]);
    });

    const expected = mode !== 'override';
    expect(props.get('ElForm')?.disabled).toBe(expected);
    expect(props.get('ElTable')?.stripe).toBe(expected);
    expect(props.get('ElDialog')?.draggable).toBe(expected);
    expect(props.get('ElDrawer')?.resizable).toBe(expected);
  });
}

test('title updaters use the effective title from the creation-time defaults', async () => {
  setOptions({ dialog: { title: 'created' }, drawer: { title: 'created' } });
  const { props } = await renderProps(() => {
    const [Dialog, { setState: setDialog, setTitle: setDialogTitle }] =
      useDialog();
    const [Drawer, { setState: setDrawer, setTitle: setDrawerTitle }] =
      useDrawer();
    setOptions({ dialog: { title: 'later' }, drawer: { title: 'later' } });
    setDialog({});
    setDrawer({});
    const updateTitle = (title: string | undefined) => {
      expect(title).toBe('created');
      return `${title} updated`;
    };
    setDialogTitle(updateTitle);
    setDrawerTitle(updateTitle);
    return h('div', [h(Dialog), h(Drawer)]);
  });
  expect(props.get('ElDialog')?.title).toBe('created updated');
  expect(props.get('ElDrawer')?.title).toBe('created updated');
});

test('grid uses the same effective defaults for layout, rendering and load params', async () => {
  setOptions({
    form: { size: 'small', disabled: true },
    table: { stripe: true, height: 480, maxHeight: 700 },
    pagination: {
      currentPage: 3,
      pageSize: 20,
      layout: 'prev, pager, next',
      props: { result: 'rows', total: 'count' },
    },
  });
  const { props, html } = await renderProps(() => {
    const response = { rows: [{ id: 1 }], count: 120 };
    const local = {
      form: { model: { query: 'search' } },
      pagination: {},
      data: response,
    };
    const [Grid, { setState, getPagination, getData, loadData }] =
      useGrid(local);
    setState(prev => {
      expect(prev).not.toHaveProperty('height');
      expect(prev.form).not.toHaveProperty('size');
      expect(prev.pagination).not.toHaveProperty('pageSize');
      return local;
    });
    expect(getPagination()).toEqual({ currentPage: 3, pageSize: 20 });
    loadData(params => {
      expect(params).toEqual({ query: 'search', currentPage: 3, pageSize: 20 });
      return response;
    });
    expect(getData()).toEqual(response.rows);
    return h(Grid);
  });

  expect(props.get('ElForm')).toMatchObject({ size: 'small', disabled: true });
  expect(props.get('ElTable')).toMatchObject({
    stripe: true,
    height: '100%',
    maxHeight: '100%',
    data: [{ id: 1 }],
  });
  expect(props.get('ElPagination')).toMatchObject({
    currentPage: 3,
    pageSize: 20,
    total: 120,
  });
  expect(html).toContain('height:480px');
  expect(html).toContain('max-height:700px');
  expect(html).toContain('el-form-item--small');
});

test('grid applies module defaults when form and pagination come from attrs', async () => {
  setOptions({
    form: { size: 'small', disabled: true },
    pagination: { currentPage: 2, pageSize: 20, layout: 'prev, pager, next' },
  });
  const { props } = await renderProps(() => {
    const [Grid, { getModel, getPagination }] = useGrid();
    expect(getModel()).toBeNull();
    expect(getPagination()).toEqual({ currentPage: 1, pageSize: 10 });
    const attrs: Record<string, unknown> = {
      form: { model: { query: 'attrs' } },
      pagination: {},
      data: [{ id: 1 }],
    };
    return h(Grid, attrs);
  });
  expect(props.get('ElForm')).toMatchObject({
    model: { query: 'attrs' },
    size: 'small',
    disabled: true,
  });
  expect(props.get('ElPagination')).toMatchObject({
    currentPage: 2,
    pageSize: 20,
    total: 1,
  });
});

test('mounted state resolves defaults again after replacing local options', async () => {
  setOptions({ dialog: { title: 'global' } });
  const output = { text: '' };
  const { createApp } = createRenderer<{ text: string }, { text: string }>({
    createElement: () => output,
    createText: text => ({ text }),
    createComment: text => ({ text }),
    setText: (node, text) => {
      node.text = text;
    },
    setElementText: (node, text) => {
      node.text = text;
    },
    parentNode: () => null,
    nextSibling: () => null,
    insert: () => undefined,
    remove: () => undefined,
    patchProp: () => undefined,
  });
  const defaults = withOptions({}, 'dialog');
  const attrs = shallowRef<Record<string, string>>({});
  const [, setState, initState, getCurrentState] = useState<
    HookOptions & { title?: string; nested?: object }
  >({}, local => ({ ...mergeOptions(local, defaults), nested: {} }));
  const Probe = defineComponent({
    inheritAttrs: false,
    setup() {
      initState();
      return () => h('div', getCurrentState().title);
    },
  });
  const app = createApp(() => {
    const title = getCurrentState().title;
    return h(Probe, attrs.value, { default: () => title });
  });

  expect(getCurrentState().title).toBe('global');
  try {
    app.mount(output);
    expect(output.text).toBe('global');
    setState(prev => {
      expect(prev).not.toHaveProperty('title');
      return { title: 'local' };
    });
    await nextTick();
    expect(output.text).toBe('local');
    for (const next of [{}, { title: undefined }]) {
      setState(next);
      expect(getCurrentState().title).toBe('global');
      await nextTick();
      expect(output.text).toBe('global');
    }
    attrs.value = { title: 'component' };
    await nextTick();
    expect(output.text).toBe('component');
    attrs.value = {};
    await nextTick();
    expect(output.text).toBe('global');
  } finally {
    app.unmount();
  }
});
