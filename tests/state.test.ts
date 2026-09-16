import { expect, test } from 'bun:test';

import { createRenderer, defineComponent, h, nextTick, shallowRef } from 'vue';

import { mergeOptions, useState } from '#/util';

type TestNode = { text: string };

const { createApp } = createRenderer<TestNode, TestNode>({
  createElement: () => ({ text: '' }),
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

test('新增属性生效，移除后回退', async () => {
  const attrs = shallowRef<Record<string, string>>({});
  const [, setState, initState, getCurrentState] = useState<{ title?: string }>(
    { title: 'local' },
    local => mergeOptions(local, { title: 'global' }),
  );
  let rendered: string | undefined;
  const Probe = defineComponent({
    inheritAttrs: false,
    setup() {
      initState();
      return () => {
        rendered = getCurrentState().title;
        return h('div', rendered);
      };
    },
  });
  const app = createApp(() => {
    const title = getCurrentState().title;
    return h(Probe, attrs.value, { default: () => title });
  });

  try {
    app.mount({ text: '' });
    expect(rendered).toBe('local');

    attrs.value = { title: 'component' };
    await nextTick();
    expect(rendered).toBe('component');

    setState(prev => {
      expect(prev).toEqual({ title: 'local' });
      return { title: '' };
    });
    expect(getCurrentState().title).toBe('component');

    attrs.value = {};
    await nextTick();
    expect(rendered).toBe('');

    for (const local of [{}, { title: undefined }]) {
      setState(local);
      expect(getCurrentState().title).toBe('global');
      await nextTick();
      expect(rendered).toBe('global');
    }
  } finally {
    app.unmount();
  }
});
