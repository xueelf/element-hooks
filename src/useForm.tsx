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
  onMounted,
  ref,
  shallowRef,
  toRaw,
  watch,
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
  const formInstance = ref<FormInstance | null>(null);
  const formOptions = shallowRef<FormOptions<T>>(options);
  const formModel = ref<T | null>(null);

  const setOptions = createSetOptions(formOptions);

  const setItems = (items: FormItem[]) => {
    setOptions({ items });
  };

  const setModel = (model: T) => {
    formModel.value = model;
  };

  const getModel = () => {
    return toRaw(formModel.value);
  };

  const formController = createController(formInstance, {
    setOptions,
    setItems,
    setModel,
    getModel,
  });

  const Form = defineComponent<FormOptions<T>>({
    name: 'Form',
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      const formState = computed(() => {
        const { items: itemsOption, ...restOptions } = formOptions.value;
        const { items: itemsAttr, ...restAttrs } = attrs as FormOptions<T>;

        return {
          items: itemsAttr ?? itemsOption,
          props: {
            ...restOptions,
            ...props,
            ...restAttrs,
          },
        };
      });

      const syncModelToSource = () => {
        const rawModel = toRaw(formModel.value);
        const sourceModel = formState.value.props.model;

        if (rawModel && sourceModel && rawModel !== sourceModel) {
          Object.keys(sourceModel).forEach(key =>
            Reflect.deleteProperty(sourceModel, key),
          );
          Object.assign(sourceModel, rawModel);
        }
      };

      watch(formModel, syncModelToSource, { deep: true });
      watch(
        () => formState.value.props.model,
        model => {
          if (model && toRaw(formModel.value) !== model) {
            formModel.value = model;
          }
        },
      );

      onMounted(() => {
        formModel.value = formState.value.props.model ?? null;
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
              const { prop } = itemProps;

              if (formModel.value && prop) {
                return h(component, {
                  ...render.props,
                  modelValue: formModel.value[prop],
                  'onUpdate:modelValue': (value: unknown) => {
                    Reflect.set(formModel.value!, prop, value);
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
          <>
            {formModel.value && (
              <ElForm ref={formInstance} {...props} model={formModel.value}>
                {{
                  default: () =>
                    items.map((item: FormItem) => <Item {...item} />),
                  ...slots,
                }}
              </ElForm>
            )}
          </>
        );
      };
    },
  });

  return [Form, formController] as const;
}
