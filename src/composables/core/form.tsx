import {
  type FormInstance,
  type FormItemProps,
  ElForm,
  ElFormItem,
} from 'element-plus';
import {
  type Component,
  type FunctionalComponent,
  defineComponent,
  h,
  ref,
  toRaw,
  watch,
} from 'vue';
import { getComponent, withOptions, type GlobalComponentName } from '@/config';
import { HOOK_METADATA, type HookOptions } from '@/devtools';
import {
  type Camelized,
  type DeepPartial,
  type Recordable,
  createController,
  useState,
  resolveFunctionalProps,
} from '@/util';

export type FormItemSlotName = 'default' | 'label' | 'error';

export type FormItem = Partial<Omit<FormItemProps, 'prop'>> & {
  prop?: string;
  slot?: string;
  slots?: Partial<Record<FormItemSlotName, string>>;
  render?: {
    component:
      | Component
      | FunctionalComponent
      | GlobalComponentName
      | (string & {});
    props?: Recordable;
  };
  raw?: boolean;
};

export type FormOptions<T extends Recordable> = HookOptions &
  Partial<Camelized<Omit<FormInstance['$props'], 'ref' | 'model'>>> & {
    model?: T;
    items?: FormItem[];
  };

export function useForm<T extends Recordable = Recordable>(
  options: FormOptions<T> = {},
) {
  const name = 'Form';

  Reflect.set(options, HOOK_METADATA, {
    name,
    internal: options[HOOK_METADATA]?.internal,
  });

  const [formState, setState, initState] = useState<FormOptions<T>>(
    withOptions(options, 'form'),
  );
  const formModel = ref<T | null>(null);
  const formInstance = ref<FormInstance | null>(null);

  const setItems = (items: FormItem[]) => {
    setState({ items });
  };

  const getItems = (): FormItem[] => {
    return formState.value?.items ?? [];
  };

  const setModel = (model: DeepPartial<T>) => {
    setState({ model });
  };

  const getModel = (): T | null => {
    return toRaw(formModel.value);
  };

  const formController = createController(formInstance, {
    setState,
    setItems,
    getItems,
    setModel,
    getModel,
  });

  const Form = defineComponent<FormOptions<T>>({
    name,
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
        const {
          slot,
          slots: rawItemSlots,
          render,
          raw,
          ...itemProps
        } = itemOptions;
        const itemSlotOptions = { ...rawItemSlots };
        const itemSlots: Recordable = {};

        if (slot) {
          itemSlotOptions.default = slot;
        }
        Object.keys(itemSlotOptions).forEach(key => {
          const slotName: FormItemSlotName = Reflect.get(itemSlotOptions, key);

          if (slots[slotName]) {
            itemSlots[key] = (scope: any) => {
              return (
                <>{slots[slotName]?.({ ...scope, model: formModel.value })}</>
              );
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
                  modelValue: formModel.value[prop],
                  ...resolveFunctionalProps(render.props, formModel.value),
                  'onUpdate:modelValue': (value: unknown) => {
                    Reflect.set(formModel.value!, prop, value);
                  },
                });
              }
              return h(
                renderComponent,
                resolveFunctionalProps(render.props, formModel.value),
              );
            };
          }
        }

        if (raw) {
          return itemSlots.default?.();
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
