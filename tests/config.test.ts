import { afterEach, expect, test } from 'bun:test';

import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus';
import { type VNode, createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';

import { useDialog, useDrawer, useForm, useTable } from '#/composables';
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

test('替换局部配置保留全局默认值', async () => {
  setOptions({
    form: { disabled: true },
    table: { stripe: true },
    dialog: { title: 'global' },
    drawer: { title: 'global' },
  });
  const props = await renderProps(() => {
    const [Form, { setState: setForm }] = useForm({
      model: {},
      disabled: false,
    });
    const [Table, { setState: setTable }] = useTable({ stripe: false });
    const [Dialog, { setState: setDialog, setTitle: setDialogTitle }] =
      useDialog({ title: 'local' });
    const [Drawer, { setState: setDrawer, setTitle: setDrawerTitle }] =
      useDrawer({ title: 'local' });

    setOptions({ dialog: { title: 'later' }, drawer: { title: 'later' } });
    setForm({ model: {} });
    setTable({});
    setDialog({});
    setDrawer({});
    setDialogTitle(title => `${title} updated`);
    setDrawerTitle(title => `${title} updated`);
    return h('div', [h(Form), h(Table), h(Dialog), h(Drawer)]);
  });

  expect(props.get('ElForm')?.disabled).toBe(true);
  expect(props.get('ElTable')?.stripe).toBe(true);
  expect(props.get('ElDialog')?.title).toBe('global updated');
  expect(props.get('ElDrawer')?.title).toBe('global updated');
});
