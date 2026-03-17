import { assign, isFunction } from 'radash';
import { type Ref, shallowRef, useAttrs, watchEffect } from 'vue';
import { useDevtools, HOOK_METADATA, type HookOptions } from './devtools';

export type Recordable<T = any> = Record<PropertyKey, T>;

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

export type NonPartial =
  | readonly unknown[]
  | Function
  | Date
  | Error
  | RegExp
  | Promise<unknown>
  | Map<unknown, unknown>
  | ReadonlyMap<unknown, unknown>
  | Set<unknown>
  | ReadonlySet<unknown>
  | WeakMap<object, unknown>
  | WeakSet<object>;

/**
 * 将对象属性递归转换为可选。
 */
export type DeepPartial<T> = T extends NonPartial
  ? T
  : T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

export type InstanceController<T, E extends object = object> = {
  instance: Ref<T | null>;
} & E;

export function createController<T extends object, E extends object = object>(
  instance: Ref<T | null>,
  extensions?: E,
): InstanceController<T, E> {
  const target = Object.assign({ instance }, extensions);

  return new Proxy(target, {
    get(_, prop) {
      if (extensions && Reflect.has(extensions, prop)) {
        return Reflect.get(extensions, prop);
      } else if (prop === 'instance') {
        return instance;
      }
    },
    has(_, prop) {
      return (
        (extensions && Reflect.has(extensions, prop)) || prop === 'instance'
      );
    },
    ownKeys() {
      return [...(extensions ? Reflect.ownKeys(extensions) : []), 'instance'];
    },
    getOwnPropertyDescriptor(_, prop) {
      if (
        (extensions && Reflect.has(extensions, prop)) ||
        prop === 'instance'
      ) {
        return { configurable: true, enumerable: true };
      }
    },
  });
}

export type SetState<T extends object> = (update: DeepPartial<T>) => void;

export type HookStateOptions<T> = T & HookOptions;

/**
 * 创建组件状态管理。
 *
 * - state: shallowRef，options 与 attrs 的扁平合并（attrs 优先），手动管理 render
 * - setState: 深合并更新 options 源 → 触发 watchEffect → state 重赋值 → render
 * - initState: 在组件 setup 中调用，内部通过 useAttrs() 建立 watchEffect 自动同步
 */
export function useState<T extends object>(initial: HookStateOptions<T>) {
  const options = shallowRef<HookStateOptions<T>>(initial);
  const state = shallowRef<T | null>(null);
  const meta = Reflect.get(initial, HOOK_METADATA);

  if (meta && meta.name && !meta.internal) {
    useDevtools(meta.name, state);
  }
  const normalizeArrayRef = (target: Recordable) => {
    for (const key of Object.keys(target)) {
      const value = target[key];

      if (Array.isArray(value)) {
        target[key] = [...value];
      }
    }
    return target;
  };

  const setState: SetState<T> = update => {
    options.value = assign(options.value, update);
  };

  const initState = () => {
    const attrs = useAttrs();

    watchEffect(
      () => {
        state.value = normalizeArrayRef({ ...options.value, ...attrs });
      },
      { flush: 'sync' },
    );
  };

  return [state, setState, initState] as const;
}

export const resolveFunctionalProps = (
  props: Recordable = {},
  ...args: any[]
) => {
  const result: Recordable = {};

  for (const key in props) {
    const value = props[key];

    // 以 on 开头，且后跟至少一个大写字母的键，被认为是事件类型
    if (isFunction(value) && !/^on[A-Z]/.test(key)) {
      result[key] = value(...args);
    } else {
      result[key] = value;
    }
  }
  return result;
};
