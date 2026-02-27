import { type DialogInstance, ElDialog } from 'element-plus';
import { defineComponent, computed, ref, shallowRef } from 'vue';
import { createController, createSetProps } from './util';

export type DialogSlotName = 'default' | 'header' | 'footer';

export type DialogOptions = Camelized<
  Omit<DialogInstance['$props'], 'ref' | 'modelValue' | 'onUpdate:modelValue'>
>;

const IGNORED_ATTRS = ['modelValue', 'onUpdate:modelValue'];

export function useDialog(options: DialogOptions = {}) {
  const dialogInstance = ref<DialogInstance | null>(null);
  const dialogOptions = shallowRef<DialogOptions>(options);
  const visible = ref(false);

  const setProps = createSetProps(dialogOptions);

  const setTitle = (title: string) => {
    setProps({ title });
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
    setProps,
    setTitle,
    open,
    close,
    getVisible,
  });

  const Dialog = defineComponent<DialogOptions>({
    name: 'Dialog',
    setup(props, { attrs, slots }) {
      const dialogState = computed(() => {
        const filteredAttrs = Object.fromEntries(
          Object.entries(attrs).filter(([key]) => !IGNORED_ATTRS.includes(key)),
        );

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
