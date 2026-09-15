import { type Component } from 'vue';

import { type DialogOptions } from '#/composables/dialog';
import { type DrawerOptions } from '#/composables/drawer';
import { type FormOptions } from '#/composables/form';
import { type PaginationOptions } from '#/composables/grid';
import { type TableOptions } from '#/composables/table';
import { mergeOptions } from '#/util';

export interface GlobalComponents {}
export type GlobalComponentName = keyof GlobalComponents;

export type GlobalOptions = {
  components?: object;
  dialog?: DialogOptions;
  drawer?: DrawerOptions;
  form?: Partial<Omit<FormOptions<object>, 'items' | 'model'>>;
  table?: Omit<TableOptions<object>, 'columns' | 'data'>;
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
  return mergeOptions(source, (key ? globalOptions[key] : options) ?? {});
}

export const getComponent = (name: string): Component | undefined => {
  return globalOptions.components
    ? Reflect.get(globalOptions.components, name)
    : undefined;
};
