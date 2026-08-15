import { type Component } from 'vue';

import { type DialogOptions } from './composables/dialog';
import { type FormOptions } from './composables/form';
import { type PaginationOptions } from './composables/grid';
import { type TableOptions } from './composables/table';
import { type Recordable } from './util';

export interface GlobalComponents {}
export type GlobalComponentName = keyof GlobalComponents;

export type GlobalOptions = {
  components?: Record<string, Component>;
  dialog?: DialogOptions;
  form?: FormOptions<Recordable>;
  table?: TableOptions<Recordable>;
  pagination?: PaginationOptions;
};

export type OptionKey = Exclude<keyof GlobalOptions, 'components'>;

const globalOptions: GlobalOptions = {};

export const setOptions = (options: GlobalOptions) => {
  Object.assign(globalOptions, options);
};

export const getOptions = () => globalOptions;

export function withOptions<K extends OptionKey, T extends object>(
  source: T,
  key: K,
): NonNullable<GlobalOptions[K]> & T;
export function withOptions<T extends object>(
  source: T,
): Omit<GlobalOptions, 'components'> & T;
export function withOptions(source: object, key?: OptionKey) {
  const { components: _components, ...options } = globalOptions;
  const merged: Record<PropertyKey, unknown> = {
    ...(key ? globalOptions[key] : options),
  };

  for (const optionKey of Reflect.ownKeys(source)) {
    const value = Reflect.get(source, optionKey);

    if (value !== undefined) {
      Reflect.set(merged, optionKey, value);
    }
  }
  return merged;
}

export const getComponent = (name: string) => {
  return globalOptions.components?.[name];
};
