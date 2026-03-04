import { assign } from 'radash';
import { type Ref, shallowRef, useAttrs, watchEffect } from 'vue';

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

export type InstanceController<T, E extends object = object> = {
  instance: Ref<T | null>;
} & E;

export function createController<T extends object, E extends object = object>(
  instance: Ref<T | null>,
  extensions?: E,
): InstanceController<T, E> {
  return new Proxy({} as any, {
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

/**
 * 创建组件状态管理。
 *
 * - state: shallowRef，options 与 attrs 的扁平合并（attrs 优先），手动管理 render
 * - setState: 深合并更新 options 源 → 触发 watchEffect → state 重赋值 → render
 * - initState: 在组件 setup 中调用，内部通过 useAttrs() 建立 watchEffect 自动同步
 */
export function useState<T extends object>(initial: T) {
  const options = shallowRef<T>(initial);
  const state = shallowRef<T | null>(null);

  const normalizeArrayRef = (target: Recordable) => {
    for (const key of Object.keys(target)) {
      const value = target[key];

      if (Array.isArray(value)) {
        target[key] = [...value];
      }
    }
    return target;
  };

  const setState = (update: Partial<T>) => {
    options.value = assign(options.value, update);
  };

  const initState = () => {
    const attrs = useAttrs();

    watchEffect(() => {
      state.value = normalizeArrayRef({ ...options.value, ...attrs });
    });
  };

  return [state, setState, initState] as const;
}
