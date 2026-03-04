import { assign } from 'radash';
import { type Ref, type ShallowRef } from 'vue';

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

export function createSetOptions<T extends object>(optionsRef: ShallowRef<T>) {
  return (options: Partial<T>) => {
    optionsRef.value = assign(optionsRef.value, options as T);
  };
}
