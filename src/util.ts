import {
  type Component,
  type FunctionalComponent,
  type Ref,
  computed,
  shallowRef,
  useAttrs,
  watchEffect,
} from 'vue';

import { type GlobalComponentName } from './config';
import { type HookOptions, HOOK_METADATA, useDevtools } from './devtools';

export type Awaitable<T> = T | PromiseLike<T>;

export type Recordable<T = unknown> = Record<string, T>;

export type SetRequired<Type, Keys extends keyof Type> = Omit<Type, Keys> &
  Required<Pick<Type, Keys>>;

export type RenderComponent =
  Component | FunctionalComponent | GlobalComponentName | (string & {});

export type RenderProps<T> = Recordable | ((value: T) => Recordable);

export type RenderOptions<T> = {
  component: RenderComponent;
  props?: RenderProps<T>;
};

/**
 * 将字符串字面量转换为小驼峰命名
 * 例如: 'on-row-click' -> 'onRowClick'
 */
export type CamelCase<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}${Capitalize<CamelCase<U>>}`
  : S;

/**
 * 将对象的所有键递归转换为小驼峰命名
 */
export type Camelized<T> = {
  [K in keyof T as K extends string ? CamelCase<K> : K]: T[K];
};

export type InstanceController<T, E extends object = object> = {
  instance: Ref<T | null>;
} & E;

export function createController<T extends object, E extends object = object>(
  instance: Ref<T | null>,
  extensions?: E,
): InstanceController<T, E> {
  return Object.assign({ instance }, extensions);
}

export type Setter<T> = (value: T | ((prev: T) => T)) => void;

export function unwrapSetter<T>(update: T | ((prev: T) => T), prev: T): T {
  return typeof update === 'function'
    ? (update as (prev: T) => T)(prev)
    : update;
}

function isPromiseLike<T>(value: Awaitable<T>): value is PromiseLike<T> {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    'then' in value &&
    typeof value.then === 'function'
  );
}

type DataSetterCallback<T, P = void> = (payload: P) => Awaitable<T>;

export function useDataSetter<T, P = void>(
  updateData: (data: T) => void,
  getPayload: () => P,
) {
  const pendingCount = shallowRef(0);
  const loading = computed(() => pendingCount.value > 0);
  let updateVersion = 0;

  const setData = (
    dataOrCallback: T | DataSetterCallback<T, P>,
  ): void | Promise<void> => {
    const currentVersion = ++updateVersion;
    const commit = (data: T) => {
      if (currentVersion === updateVersion) {
        updateData(data);
      }
    };

    if (typeof dataOrCallback !== 'function') {
      commit(dataOrCallback);
      return;
    }

    pendingCount.value += 1;
    const stopLoading = () => {
      pendingCount.value -= 1;
    };

    try {
      const callback = dataOrCallback as DataSetterCallback<T, P>;
      const data = callback(getPayload());

      if (isPromiseLike(data)) {
        return Promise.resolve(data).then(commit).finally(stopLoading);
      }

      commit(data);
      stopLoading();
    } catch (error) {
      stopLoading();
      throw error;
    }
  };

  return { loading, setData };
}

/**
 * 创建组件状态管理。
 *
 * - state: shallowRef，options 与 attrs 的扁平合并（attrs 优先），手动管理 render
 * - setState: 更新 options 源 → 触发 watchEffect → state 重赋值 → render
 * - initState: 在组件 setup 中调用，内部通过 useAttrs() 建立 watchEffect 自动同步
 * - getCurrentState: 组件挂载前读取 options，挂载后读取合并 attrs 的 state
 */
export function useState<T extends HookOptions>(initial: T) {
  const options = shallowRef<T>(initial);
  const state = shallowRef<T | null>(null);
  const meta = initial[HOOK_METADATA];

  if (meta && meta.name && !meta.internal) {
    useDevtools(meta.name, state);
  }
  const setState: Setter<T> = update => {
    options.value = unwrapSetter(update, options.value);
  };

  const getCurrentState = (): T => {
    return state.value ?? options.value;
  };

  const initState = () => {
    const attrs = useAttrs();

    watchEffect(
      () => {
        state.value = { ...options.value, ...attrs };
      },
      { flush: 'sync' },
    );
  };

  return [state, setState, initState, getCurrentState] as const;
}

export function resolveRenderProps<T>(
  props: RenderProps<T> | undefined,
  value: T | null,
) {
  if (typeof props !== 'function') {
    return props ?? {};
  }
  return value === null ? {} : props(value);
}
