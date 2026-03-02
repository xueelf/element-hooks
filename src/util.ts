import { assign, isArray, isObject } from 'radash';
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

/**
 * 递归对比 source 与 target，将同一引用的数组或对象替换为新引用（浅拷贝）。
 * 用于确保 shallowRef 赋值后，组件能通过 options diff 检测到变更并重新渲染。
 */
function forkSharedRefs<T extends object>(source: T, target: T): T {
  const result = { ...target };

  for (const key of Object.keys(result)) {
    const targetVal = Reflect.get(result, key);
    const sourceVal = Reflect.get(source, key);

    if (targetVal === sourceVal) {
      if (isArray(targetVal)) {
        Reflect.set(result, key, [...targetVal]);
      } else if (isObject(targetVal)) {
        Reflect.set(result, key, { ...targetVal });
      }
    } else if (isObject(targetVal) && isObject(sourceVal)) {
      Reflect.set(result, key, forkSharedRefs(sourceVal, targetVal));
    }
  }
  return result;
}

/**
 * 创建一个类型安全的 setOptions 函数，用于更新 shallowRef 中的选项。
 * 内部会先通过 forkSharedRefs 消除新旧值之间的共享引用，再进行深合并赋值。
 */
export function createSetOptions<T extends object>(optionsRef: ShallowRef<T>) {
  return (options: Partial<T>) => {
    const forkedOptions = forkSharedRefs(optionsRef.value, <T>options);
    optionsRef.value = assign(optionsRef.value, forkedOptions);
  };
}
