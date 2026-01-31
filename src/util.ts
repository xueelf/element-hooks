import { type Ref } from 'vue';

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
  });
}
