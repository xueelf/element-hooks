import { expect, test } from 'bun:test';

import { ID_INJECTION_KEY } from 'element-plus';
import { createRenderer, defineComponent, h, nextTick } from 'vue';

import { useForm } from '#/composables/form';

type Model = { fields?: { value: string }[] };

const paths: (string | string[])[] = [
  'fields.0.value',
  ['fields', '0', 'value'],
  'fields[0].value',
];

for (const prop of paths) {
  test(`form reads, updates and resets the same field for ${JSON.stringify(prop)}`, async () => {
    let inputValue: string | undefined;
    let updateInput!: (value: string) => void;
    let controller!: ReturnType<typeof useForm<Model>>[1];
    let validatedValue: unknown;
    const updates: string[] = [];
    const original: Model = { fields: [{ value: 'initial' }] };
    const Input = defineComponent({
      props: { modelValue: String },
      emits: ['update:modelValue'],
      setup(props, { emit }) {
        updateInput = value => emit('update:modelValue', value);
        return () => {
          inputValue = props.modelValue;
          return h('input', { value: props.modelValue });
        };
      },
    });
    // Form and FormItem are real components; only their DOM host is omitted.
    const { createApp } = createRenderer<{ text: string }, { text: string }>({
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
    const app = createApp(
      defineComponent({
        setup() {
          const [Form, methods] = useForm<Model>({
            model: original,
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
                  component: Input,
                  props: {
                    'onUpdate:modelValue': (value: string) => {
                      updates.push(value);
                    },
                  },
                },
              },
            ],
          });
          controller = methods;
          return () => h(Form);
        },
      }),
    );
    app.provide(ID_INJECTION_KEY, { prefix: 1, current: 0 });

    try {
      app.mount({ text: '' });
      expect(inputValue).toBe('initial');

      updateInput('edited');
      await nextTick();
      expect(inputValue).toBe('edited');
      expect(controller.getModel()).toEqual({ fields: [{ value: 'edited' }] });
      expect(updates).toEqual(['edited']);
      expect(await controller.instance.value?.validate()).toBe(true);
      expect(validatedValue).toBe('edited');

      controller.instance.value?.resetFields();
      await nextTick();
      expect(inputValue).toBe('initial');
      expect(controller.getModel()).toEqual({ fields: [{ value: 'initial' }] });

      controller.setModel({ fields: [{ value: 'replacement' }] });
      await nextTick();
      expect(inputValue).toBe('replacement');
      updateInput('after replacement');
      await nextTick();
      expect(controller.getModel()).toEqual({
        fields: [{ value: 'after replacement' }],
      });
      expect(original).toEqual({ fields: [{ value: 'initial' }] });
      expect(updates).toEqual(['edited', 'after replacement']);

      controller.setModel({});
      await nextTick();
      updateInput('created');
      await nextTick();
      expect(controller.getModel()).toEqual({ fields: [{ value: 'created' }] });
    } finally {
      app.unmount();
    }
  });
}
