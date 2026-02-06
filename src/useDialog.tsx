import { type DialogInstance, ElDialog } from 'element-plus';
import { defineComponent, computed, ref, shallowRef } from 'vue';
import { createController } from './util';

export type DialogSlotName = 'default' | 'header' | 'footer';

export type DialogOptions = Camelized<Omit<DialogInstance['$props'], 'ref'>>;

export function useDialog(options: DialogOptions = {}) {
  const dialogInstance = ref<DialogInstance | null>(null);
  const dialogOptions = shallowRef<DialogOptions>(options);
  const visible = ref(false);

  const setProps = (props: Partial<DialogOptions>) => {
    const keys = Object.keys(props);

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = Reflect.get(props, key);

      if (Array.isArray(value)) {
        Reflect.set(props, key, [...value]);
      }
    }
    dialogOptions.value = { ...dialogOptions.value, ...props };
  };
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
