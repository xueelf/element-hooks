import {
  type FormInstance,
  type FormItemProps,
  ElForm,
  ElFormItem,
} from 'element-plus';
import {
  type Component,
  computed,
  defineComponent,
  h,
  isReactive,
  reactive,
  ref,
  shallowRef,
} from 'vue';
import {
  type Camelized,
  type Recordable,
  createController,
  createSetOptions,
} from './util';

export type FormItemSlotName = 'default' | 'label' | 'error';

export type FormItem = Partial<Omit<FormItemProps, 'prop'>> & {
  prop?: string;
  slot?: string;
  slots?: Partial<Record<FormItemSlotName, string>>;
  render?: {
    component: Component;
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
  if (options.model && !isReactive(options.model)) {
    options.model = reactive(options.model);
  }
  const formInstance = ref<FormInstance | null>(null);
  const formOptions = shallowRef<FormOptions<T>>(options);

  const setOptions = createSetOptions(formOptions);

  const setItems = (items: FormItem[]) => {
    setOptions({ items });
  };

  const setModel = (model: Recordable) => {
    setOptions({ model });
  };

  const getModel = () => {
    const { model } = formOptions.value;
    return model ? structuredClone(model) : null;
  };

  const formController = createController(formInstance, {
    setOptions,
    setItems,
    setModel,
    getModel,
  });

  const Form = defineComponent<FormOptions<T>>({
    name: 'Form',
    setup(props, { attrs, slots }) {
      const formState = computed(() => {
        const { items, ...rest } = formOptions.value;

        return {
          items,
          props: { ...rest, ...props, ...attrs },
        };
      });
      const Item = (itemOptions: FormItem) => {
        const {
          slot,
          slots: itemSlotOptions = {},
          render,
          ...itemProps
        } = itemOptions;
        const itemSlots: Recordable = {};

        if (slot) {
          itemSlotOptions.default = slot;
        }
        Object.keys(itemSlotOptions).forEach(key => {
          const slotName: FormItemSlotName = Reflect.get(itemSlotOptions, key);

          if (slots[slotName]) {
            itemSlots[key] = (scope: any) => {
              const { model } = formState.value.props;
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
              const { model } = formState.value.props;
              const { prop } = itemProps;

              if (model && prop) {
                return h(component, {
                  ...render.props,
                  modelValue: model[prop],
                  'onUpdate:modelValue': (value: unknown) => {
                    Reflect.set(model, prop, value);
                  },
                });
              }
              return h(component, render.props);
            };
          }
        }
        return <ElFormItem {...itemProps}>{itemSlots}</ElFormItem>;
      };

      return () => {
        const { items = [], props } = formState.value;

        return (
          <ElForm ref={formInstance} {...props}>
            {{
              default: () => items.map(item => <Item {...item} />),
              ...slots,
            }}
          </ElForm>
        );
      };
    },
  });

  return [Form, formController] as const;
}
