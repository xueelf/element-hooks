import { expect, test } from 'bun:test';

import { ID_INJECTION_KEY } from 'element-plus';
import { createRenderer, h, nextTick } from 'vue';

import { useForm } from '#/composables/form';

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

type InputProps = {
  modelValue: string;
  'onUpdate:modelValue': (value: string) => void;
};

const paths = [
  { name: '点分路径', prop: 'fields.0.value' },
  { name: '数组路径', prop: ['fields', '0', 'value'] },
  { name: '括号路径', prop: 'fields[0].value' },
];
for (const { name, prop } of paths) {
  test(`按${name}读写字段`, async () => {
    let input!: InputProps;
    let validatedValue: unknown;
    const [Form, { getModel, instance }] = useForm({
      model: { fields: [{ value: 'initial' }] },
      items: [
        {
          prop,
          rules: {
            validator: (_rule, value, callback) => {
              validatedValue = value;
              callback();
            },
          },
          render: {
            component: (props: InputProps) => {
              input = props;
              return null;
            },
          },
        },
      ],
    });
    const app = createApp(() => h(Form));
    app.provide(ID_INJECTION_KEY, { prefix: 1, current: 0 });

    try {
      app.mount({ text: '' });
      expect(input.modelValue).toBe('initial');

      input['onUpdate:modelValue']('edited');
      await nextTick();
      expect(input.modelValue).toBe('edited');
      expect(getModel()).toEqual({ fields: [{ value: 'edited' }] });

      if (prop === 'fields[0].value') {
        expect(await instance.value!.validate()).toBe(true);
        expect(validatedValue).toBe('edited');
        instance.value!.resetFields();
        await nextTick();
        expect(input.modelValue).toBe('initial');
      }
    } finally {
      app.unmount();
    }
  });
}
