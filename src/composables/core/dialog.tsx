import { type DialogInstance, ElDialog } from 'element-plus';
import { defineComponent, ref } from 'vue';
import { withOptions } from '../../config';
import { type Camelized, createController, useState } from '../../util';

export type DialogSlotName = 'default' | 'header' | 'footer';

export type DialogOptions = Camelized<
  Omit<DialogInstance['$props'], 'ref' | 'modelValue' | 'onUpdate:modelValue'>
>;

export function useDialog(options: DialogOptions = {}) {
  const [dialogState, setState, initState] = useState<DialogOptions>(
    withOptions(options, 'dialog'),
  );

  const dialogVisible = ref(false);
  const dialogInstance = ref<DialogInstance | null>(null);

  const setTitle = (title: string) => {
    setState({ title });
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

  const Dialog = defineComponent<DialogOptions>({
    name: 'Dialog',
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
