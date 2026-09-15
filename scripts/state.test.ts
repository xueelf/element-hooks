import { expect, test } from 'bun:test';

import { createRenderer, defineComponent, h, nextTick, shallowRef } from 'vue';

import { type HookOptions } from '#/devtools';
import { useState } from '#/util';

test('state follows added and removed attrs while preserving setter updates', async () => {
  const output = { text: '' };
  // Only text output is needed to exercise Vue's component update lifecycle.
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
  const attrs = shallowRef<Record<string, string | undefined>>({});
  const [state, setState, initState, getCurrentState] = useState<
    HookOptions & { title: string }
  >({ title: 'initial' });
  const Probe = defineComponent({
    inheritAttrs: false,
    setup() {
      initState();
      return () => h('div', getCurrentState().title);
    },
  });
  const Parent = () => {
    const title = getCurrentState().title;
    return h(Probe, attrs.value, { default: () => title });
  };
  const app = createApp(Parent);

  setState({ title: 'before mount' });
  expect(getCurrentState().title).toBe('before mount');
  app.mount({ text: '' });

  try {
    expect(output.text).toBe('before mount');

    attrs.value = { title: 'added' };
    await nextTick();
    expect(output.text).toBe('added');

    attrs.value = { title: 'changed' };
    await nextTick();
    expect(output.text).toBe('changed');

    setState({ title: 'controller' });
    expect(getCurrentState().title).toBe('changed');

    attrs.value = {};
    await nextTick();
    expect(output.text).toBe('controller');

    attrs.value = { title: 'added again' };
    await nextTick();
    expect(output.text).toBe('added again');

    attrs.value = {};
    await nextTick();
    setState(prev => ({ ...prev, title: 'updated synchronously' }));
    expect(getCurrentState().title).toBe('updated synchronously');
    await nextTick();
    expect(output.text).toBe('updated synchronously');

    attrs.value = { removed: undefined };
    await nextTick();
    attrs.value = { added: undefined };
    await nextTick();
    expect(getCurrentState()).toHaveProperty('added');
    expect(getCurrentState()).not.toHaveProperty('removed');
  } finally {
    app.unmount();
  }

  expect(state.value).toBeNull();
  setState({ title: 'after unmount' });
  expect(getCurrentState().title).toBe('after unmount');
  expect(state.value).toBeNull();

  const remounted = createApp(Parent);
  try {
    remounted.mount({ text: '' });
    expect(output.text).toBe('after unmount');
  } finally {
    remounted.unmount();
  }
});
