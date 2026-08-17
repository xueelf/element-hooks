import {
  type FormInstance,
  type FormItemProps,
  ElForm,
  ElFormItem,
} from 'element-plus';
import { type VNodeChild, defineComponent, h, ref, toRaw, watch } from 'vue';

import { getComponent, withOptions } from '#/config';
import {
  type HookComponentProps,
  type HookOptions,
  HOOK_METADATA,
} from '#/devtools';
import {
  type Camelized,
  type Recordable,
  type RenderOptions,
  type Setter,
  createController,
  resolveRenderProps,
  unwrapSetter,
  useState,
} from '#/util';

const formItemSlotNames = ['default', 'label', 'error'] as const;
export type FormItemSlotName = (typeof formItemSlotNames)[number];
type FormItemSlot = (...args: never[]) => VNodeChild;

export type FormItem<T extends object = object> = Partial<
  Omit<FormItemProps, 'prop'>
> & {
  key?: string | number;
  prop?: string | string[];
  slot?: string;
  slots?: Partial<Record<FormItemSlotName, string>>;
  render?: RenderOptions<T>;
  raw?: boolean;
};

export type FormOptions<T extends object> = HookOptions &
  Partial<Camelized<Omit<FormInstance['$props'], 'ref' | 'model'>>> & {
    model: T;
    items?: FormItem<NoInfer<T>>[];
  };

type FormState<T extends object> = Partial<FormOptions<T>>;

export type FormProps<T extends object> = HookComponentProps<FormState<T>>;

type InternalFormOptions<T extends object> = FormState<T> & {
  [HOOK_METADATA]: { internal: true };
};

function getProp(targetObject: object, path: string | string[]) {
  const pathKeys = Array.isArray(path) ? path : path.split('.');

  return pathKeys.reduce<unknown>(
    (value, key) =>
      typeof value === 'object' && value !== null
        ? Reflect.get(value, key)
        : undefined,
    targetObject,
  );
}

function setProp(
  targetObject: object,
  path: string | string[],
  value: unknown,
) {
  const pathKeys = Array.isArray(path) ? [...path] : path.split('.');
  const lastKey = pathKeys.pop();

  if (!lastKey) {
    return;
  }
  const targetParent = pathKeys.reduce<object>((target, key) => {
    const currentValue = Reflect.get(target, key);

    if (typeof currentValue === 'object' && currentValue !== null) {
      return currentValue;
    }
    const nextValue = {};

    Reflect.set(target, key, nextValue);
    return nextValue;
  }, targetObject);

  Reflect.set(targetParent, lastKey, value);
}

export function useForm<T extends object = object>(
  input?: FormOptions<T> | InternalFormOptions<T>,
) {
  const options: FormState<T> = input ?? {};
  const name = 'Form';
  const merged = withOptions(options, 'form');

  Reflect.set(merged, HOOK_METADATA, {
    name,
    internal: options[HOOK_METADATA]?.internal,
  });

  const [formState, setFormState, initState, getCurrentState] =
    useState<FormState<T>>(merged);
  const formModel = ref<T | null>(null);
  const formInstance = ref<FormInstance | null>(null);

  const setItems: Setter<FormItem<T>[]> = update => {
    setFormState(prev => ({
      ...prev,
      items: unwrapSetter(update, prev.items ?? []),
    }));
  };

  const getItems = (): FormItem<T>[] => {
    return getCurrentState().items ?? [];
  };

  const setModel: Setter<T> = update => {
    setFormState(prev => {
      if (prev.model === undefined) {
        if (typeof update === 'function') {
          throw new Error('[useForm] Cannot update an uninitialized model.');
        }
        return { ...prev, model: update };
      }
      return { ...prev, model: unwrapSetter(update, prev.model) };
    });
  };

  const setState: Setter<FormOptions<T>> = update => {
    setFormState(prev => {
      if (typeof update !== 'function') {
        return update;
      }
      if (prev.model === undefined) {
        throw new Error(
          '[useForm] Cannot update state before model is initialized.',
        );
      }
      return update({ ...prev, model: prev.model });
    });
  };

  const getModel = (): T | null => {
    return toRaw(getCurrentState().model ?? null);
  };

  const formController = createController(formInstance, {
    setState,
    setItems,
    getItems,
    setModel,
    getModel,
  });

  const Form = defineComponent<FormProps<T>>({
    name,
    inheritAttrs: false,
    setup(_, { slots }) {
      initState();

      watch(
        () => formState.value?.model,
        model => {
          formModel.value = model ?? null;
        },
        { immediate: true },
      );

      const Item = (itemOptions: FormItem<T>) => {
        const {
          slot,
          slots: rawItemSlots,
          render,
          raw,
          ...itemProps
        } = itemOptions;
        const itemSlotOptions = { ...rawItemSlots };

        if (slot) {
          itemSlotOptions.default = slot;
        }
        const itemSlots = formItemSlotNames.reduce<
          Partial<Record<FormItemSlotName, FormItemSlot>>
        >((result, key) => {
          const slotName = itemSlotOptions[key];
          const scopedSlot = slotName ? slots[slotName] : undefined;

          if (scopedSlot) {
            result[key] = (scope: Recordable) =>
              scopedSlot({ ...scope, model: formModel.value });
          }
          return result;
        }, {});

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
                  ...resolveRenderProps(render.props, formModel.value),
                  modelValue: getProp(formModel.value, prop),
                  'onUpdate:modelValue': (value: unknown) => {
                    setProp(formModel.value, prop, value);
                  },
                });
              }
              return h(
                renderComponent,
                resolveRenderProps(render.props, formModel.value),
              );
            };
          }
        }

        if (raw) {
          return <>{itemSlots.default?.()}</>;
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
              default: () =>
                items.map((item, index) => (
                  <Item
                    key={
                      item.key ??
                      (Array.isArray(item.prop)
                        ? item.prop.join('.')
                        : item.prop) ??
                      index
                    }
                    {...item}
                  />
                )),
              ...slots,
            }}
          </ElForm>
        );
      };
    },
  });

  return [Form, formController] as const;
}
