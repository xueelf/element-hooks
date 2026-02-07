import { type Ref, type ShallowRef } from 'vue';

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

export function createSetProps<T extends object>(optionsRef: ShallowRef<T>) {
  return (props: Partial<T>) => {
    const keys = Object.keys(props);

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = Reflect.get(props, key);

      if (Array.isArray(value)) {
        Reflect.set(props, key, [...value]);
      }
    }
    optionsRef.value = { ...optionsRef.value, ...props };
  };
}
