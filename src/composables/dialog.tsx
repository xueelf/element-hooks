import { type DialogInstance, ElDialog } from 'element-plus';
import { defineComponent, ref } from 'vue';

import { withOptions } from '#/config';
import {
  type HookComponentProps,
  type HookOptions,
  HOOK_METADATA,
} from '#/devtools';
import {
  type Camelized,
  type Setter,
  createController,
  mergeOptions,
  unwrapSetter,
  useState,
} from '#/util';

export type DialogSlotName = 'default' | 'header' | 'footer';

export type DialogOptions = HookOptions &
  Partial<
    Camelized<
      Omit<
        DialogInstance['$props'],
        'ref' | 'modelValue' | 'onUpdate:modelValue'
      >
    >
  >;

export type DialogProps = HookComponentProps<DialogOptions>;

export function useDialog(options: DialogOptions = {}) {
  const name = 'Dialog';
  const defaults = withOptions({}, 'dialog');
  const [dialogState, setState, initState, getCurrentState] =
    useState<DialogOptions>(
      {
        ...options,
        [HOOK_METADATA]: {
          name,
          internal: options[HOOK_METADATA]?.internal,
        },
      },
      current => mergeOptions(current, defaults),
    );
  const dialogVisible = ref(false);
  const dialogInstance = ref<DialogInstance | null>(null);

  const setTitle: Setter<typeof options.title> = update => {
    setState(prev => ({
      ...prev,
      title: unwrapSetter(update, getCurrentState().title),
    }));
  };

  const open = () => {
    dialogVisible.value = true;
  };

  const close = () => {
    dialogVisible.value = false;
  };

  const getVisible = () => {
    return dialogVisible.value;
  };

  const dialogController = createController(dialogInstance, {
    setState,
    setTitle,
    open,
    close,
    getVisible,
  });

  const Dialog = defineComponent<DialogProps>({
    name,
    inheritAttrs: false,
    setup(_, { slots }) {
      initState();

      return () => {
        if (!dialogState.value) {
          return null;
        }
        return (
          <ElDialog
            ref={dialogInstance}
            {...dialogState.value}
            modelValue={dialogVisible.value}
            onUpdate:modelValue={(val: boolean) => (dialogVisible.value = val)}
          >
            {slots}
          </ElDialog>
        );
      };
    },
  });

  return [Dialog, dialogController] as const;
}
