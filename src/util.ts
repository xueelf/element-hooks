import {
  type Component,
  type FunctionalComponent,
  type Ref,
  type ShallowRef,
  onBeforeUpdate,
  onUnmounted,
  shallowRef,
  useAttrs,
  watch,
} from 'vue';

import { type GlobalComponentName } from '#/config';
import { type HookOptions, HOOK_METADATA, useDevtools } from '#/devtools';

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

type DataLoader<T, P> = (params: P) => Awaitable<T>;

type LoadDataResult<R> = R extends PromiseLike<unknown> ? Promise<void> : void;

export function useDataLoader<T, P = undefined>(
  updateData: (data: T) => void,
  getParams: () => P,
) {
  const loading = shallowRef(false);

  function loadData<R extends Awaitable<T>>(
    loader: (params: P) => R,
  ): LoadDataResult<R>;
  function loadData(loader: DataLoader<T, P>) {
    loading.value = true;

    const stopLoading = () => {
      loading.value = false;
    };

    try {
      const data = loader(getParams());

      if (isPromiseLike(data)) {
        return Promise.resolve(data).then(updateData).finally(stopLoading);
      }
      updateData(data);
      stopLoading();
    } catch (error) {
      stopLoading();
      throw error;
    }
  }
  return { loading, setData: updateData, loadData };
}

/**
 * 创建组件状态管理。
 *
 * - state: shallowRef，options 与 attrs 的扁平合并（attrs 优先），手动管理 render
 * - setState: 更新 options 源 → 触发 watch → state 重赋值 → render
 * - initState: 在组件 setup 中调用，更新前同步 attrs，卸载后清理 state
 * - getCurrentState: 组件挂载前读取 options，挂载后读取合并 attrs 的 state
 */
export function useState<T extends HookOptions>(
  initial: T,
): readonly [ShallowRef<T | null>, Setter<T>, () => void, () => T] {
  const options = shallowRef<T>(initial);
  const state: ShallowRef<T | null> = shallowRef(null);
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
    const syncState = () => {
      state.value = { ...options.value, ...attrs };
    };

    watch(options, syncState, { immediate: true, flush: 'sync' });
    onBeforeUpdate(() => {
      const next = { ...options.value, ...attrs };
      const current = state.value;
      const keys = Reflect.ownKeys(next);

      // 避免父组件读取状态并传入动态插槽时反复触发更新。
      if (
        !current ||
        keys.length !== Reflect.ownKeys(current).length ||
        keys.some(
          key =>
            !Object.hasOwn(current, key) ||
            !Object.is(Reflect.get(next, key), Reflect.get(current, key)),
        )
      ) {
        state.value = next;
      }
    });

    onUnmounted(() => {
      state.value = null;
    });
  };

  return [state, setState, initState, getCurrentState] as const;
}

export function resolveRenderProps<T>(
  props: RenderProps<T> | undefined,
  value: T | null,
): Recordable {
  if (typeof props !== 'function') {
    return props ?? {};
  }
  return value === null ? {} : props(value);
}
