import { type DialogInstance, ElDialog } from 'element-plus';
import { defineComponent, computed, ref, shallowRef } from 'vue';
import { createController, createSetProps } from './util';

export type DialogSlotName = 'default' | 'header' | 'footer';

export type DialogOptions = Camelized<Omit<DialogInstance['$props'], 'ref'>>;

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

  const dialogController = createController(dialogInstance, {
    setProps,
    setTitle,
    open,
    close,
  });

  const Dialog = defineComponent<DialogOptions>({
    name: 'Dialog',
    setup(props, { attrs, slots }) {
      const dialogState = computed(() => {
        return {
          props: { ...dialogOptions.value, ...props, ...attrs },
        };
      });

      return () => {
        const { props } = dialogState.value;

        return (
          <ElDialog
            ref={dialogInstance}
            v-slots={slots}
            v-model={visible.value}
            {...props}
          />
        );
      };
    },
  });

  return [Dialog, dialogController] as const;
}
