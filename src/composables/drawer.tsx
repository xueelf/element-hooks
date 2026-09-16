import { type DrawerInstance, ElDrawer } from 'element-plus';
import { defineComponent, ref } from 'vue';

import { withOptions } from '#/config';
import {
  type Camelized,
  type Setter,
  createController,
  mergeOptions,
  unwrapSetter,
  useState,
} from '#/util';

export type DrawerSlotName = 'default' | 'header' | 'footer';

export type DrawerOptions = Partial<
  Camelized<
    Omit<DrawerInstance['$props'], 'ref' | 'modelValue' | 'onUpdate:modelValue'>
  >
>;

export type DrawerProps = DrawerOptions;

export function useDrawer(options: DrawerOptions = {}) {
  const defaults = withOptions({}, 'drawer');
  const [drawerState, setState, initState, getCurrentState] =
    useState<DrawerOptions>(options, current =>
      mergeOptions(current, defaults),
    );
  const drawerVisible = ref(false);
  const drawerInstance = ref<DrawerInstance | null>(null);

  const setTitle: Setter<typeof options.title> = update => {
    setState(prev => ({
      ...prev,
      title: unwrapSetter(update, getCurrentState().title),
    }));
  };

  const open = () => {
    drawerVisible.value = true;
  };

  const close = () => {
    drawerVisible.value = false;
  };

  const getVisible = () => {
    return drawerVisible.value;
  };

  const drawerController = createController(drawerInstance, {
    setState,
    setTitle,
    open,
    close,
    getVisible,
  });

  const Drawer = defineComponent<DrawerProps>({
    name: 'Drawer',
    inheritAttrs: false,
    setup(_, { slots }) {
      initState();

      return () => {
        if (!drawerState.value) {
          return null;
        }
        return (
          <ElDrawer
            ref={drawerInstance}
            {...drawerState.value}
            modelValue={drawerVisible.value}
            onUpdate:modelValue={(visible: boolean) => {
              drawerVisible.value = visible;
            }}
          >
            {slots}
          </ElDrawer>
        );
      };
    },
  });

  return [Drawer, drawerController] as const;
}
