import { type DrawerInstance, ElDrawer } from 'element-plus';
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
  unwrapSetter,
  useState,
} from '#/util';

export type DrawerSlotName = 'default' | 'header' | 'footer';

export type DrawerOptions = HookOptions &
  Partial<
    Camelized<
      Omit<
        DrawerInstance['$props'],
        'ref' | 'modelValue' | 'onUpdate:modelValue'
      >
    >
  >;

export type DrawerProps = HookComponentProps<DrawerOptions>;

export function useDrawer(options: DrawerOptions = {}) {
  const name = 'Drawer';
  const merged = withOptions(options, 'drawer');

  Reflect.set(merged, HOOK_METADATA, {
    name,
    internal: options[HOOK_METADATA]?.internal,
  });

  const [drawerState, setState, initState] = useState<DrawerOptions>(merged);
  const drawerVisible = ref(false);
  const drawerInstance = ref<DrawerInstance | null>(null);

  const setTitle: Setter<typeof options.title> = update => {
    setState(prev => ({
      ...prev,
      title: unwrapSetter(update, prev.title),
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
    name,
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
