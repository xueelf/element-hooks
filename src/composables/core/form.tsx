import {
  type FormInstance,
  type FormItemProps,
  ElForm,
  ElFormItem,
} from 'element-plus';
import { type Component, defineComponent, h, ref, toRaw, watch } from 'vue';
import { getComponent, withOptions } from '../../config';
import {
  type Camelized,
  type Recordable,
  createController,
  useState,
} from '../../util';

export type FormItemSlotName = 'default' | 'label' | 'error';

export type FormItem = Partial<Omit<FormItemProps, 'prop'>> & {
  prop?: string;
  slot?: string;
  slots?: Partial<Record<FormItemSlotName, string>>;
  render?: {
    component: Component | string;
    props?: Recordable;
  };
};

export type FormOptions<T extends Recordable> = Camelized<
  Omit<FormInstance['$props'], 'ref'>
> & {
  model?: T;
  items?: FormItem[];
};

export function useForm<T extends Recordable = Recordable>(
  options: FormOptions<T> = {},
) {
  const [formState, setState, initState] = useState<FormOptions<T>>(
    withOptions(options, 'form'),
  );

  const formModel = ref<T | null>(null);
  const formInstance = ref<FormInstance | null>(null);

  const setItems = (items: FormItem[]) => {
    setState({ items });
  };

  const setModel = (model: T) => {
    setState({ model });
  };

  const getModel = () => {
    return toRaw(formModel.value);
  };

  const formController = createController(formInstance, {
    setState,
    setItems,
    setModel,
    getModel,
  });

  const Form = defineComponent<FormOptions<T>>({
    name: 'Form',
    inheritAttrs: false,
    setup(_, { slots }) {
      initState();
      formModel.value = formState.value?.model ?? null;

      watch(
        () => formState.value?.model,
        model => {
          if (model && model !== toRaw(formModel.value)) {
            formModel.value = model;
          }
        },
      );

      const Item = (itemOptions: FormItem) => {
        const { slot, slots: rawItemSlots, render, ...itemProps } = itemOptions;
        const itemSlotOptions = { ...rawItemSlots };
        const itemSlots: Recordable = {};

        if (slot) {
          itemSlotOptions.default = slot;
        }
        Object.keys(itemSlotOptions).forEach(key => {
          const slotName: FormItemSlotName = Reflect.get(itemSlotOptions, key);

          if (slots[slotName]) {
            itemSlots[key] = (scope: any) => {
              const model = formState.value?.model;
              return <>{slots[slotName]?.({ ...scope, model })}</>;
            };
          }
        });

        if (render) {
          if (itemSlots.default) {
            console.warn(
              `[useForm] FormItem "${itemProps.prop ?? slot}" has both a slot and render defined. The slot will take priority.`,
            );
          } else {
            itemSlots.default = () => {
              const { component } = render;
              const { prop } = itemProps;
              const renderComponent =
                typeof component === 'string'
                  ? getComponent(component)
                  : component;

              if (!renderComponent) {
                console.warn(
                  `[useForm] Global component "${String(component)}" is not registered.`,
                );
                return null;
              }

              if (formModel.value && prop) {
                return h(renderComponent, {
                  ...render.props,
                  modelValue: formModel.value[prop],
                  'onUpdate:modelValue': (value: unknown) => {
                    Reflect.set(formModel.value!, prop, value);
                  },
                });
              }
              return h(renderComponent, render.props);
            };
          }
        }
        return <ElFormItem {...itemProps}>{itemSlots}</ElFormItem>;
      };

      return () => {
        if (!formState.value) {
          return null;
        }
        const { items = [], ...formProps } = formState.value;

        return (
          <ElForm ref={formInstance} {...formProps} model={formModel.value}>
            {{
              default: () => items.map((item: FormItem) => <Item {...item} />),
              ...slots,
            }}
          </ElForm>
        );
      };
    },
  });

  return [Form, formController] as const;
}
