import { type DialogInstance, ElDialog } from 'element-plus';
import { omit } from 'radash';
import { defineComponent, computed, ref, shallowRef } from 'vue';
import { type Camelized, createController, createSetOptions } from './util';

export type DialogSlotName = 'default' | 'header' | 'footer';

export type DialogOptions = Camelized<
  Omit<DialogInstance['$props'], 'ref' | 'modelValue' | 'onUpdate:modelValue'>
>;

export function useDialog(options: DialogOptions = {}) {
  const dialogInstance = ref<DialogInstance | null>(null);
  const dialogOptions = shallowRef<DialogOptions>(options);
  const visible = ref(false);

  const setOptions = createSetOptions(dialogOptions);

  const setTitle = (title: string) => {
    setOptions({ title });
  };

  const open = () => {
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };

  const getVisible = () => {
    return visible.value;
  };

  const dialogController = createController(dialogInstance, {
    setOptions,
    setTitle,
    open,
    close,
    getVisible,
  });

  const Dialog = defineComponent<DialogOptions>({
    name: 'Dialog',
    setup(props, { attrs, slots }) {
      const dialogState = computed(() => {
        const filteredAttrs = omit(attrs, [
          'modelValue',
          'onUpdate:modelValue',
        ]);

        return {
          props: { ...dialogOptions.value, ...props, ...filteredAttrs },
        };
      });

      return () => {
        const { props } = dialogState.value;

        return (
          <ElDialog
            ref={dialogInstance}
            modelValue={visible.value}
            onUpdate:modelValue={(val: boolean) => (visible.value = val)}
            {...props}
          >
            {slots}
          </ElDialog>
        );
      };
    },
  });

  return [Dialog, dialogController] as const;
}
