import { assign, omit } from 'radash';
import { type Component } from 'vue';

import { type DialogOptions } from './composables/core/dialog';
import { type FormOptions } from './composables/core/form';
import { type TableOptions } from './composables/core/table';
import { type PaginationOptions } from './composables/extra/ex-table';
import { type Recordable } from './util';

export interface GlobalComponents {}
export type GlobalComponentName = keyof GlobalComponents;

export type GlobalOptions = {
  components?: Partial<Record<string, Component>>;
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

export function withOptions<K extends OptionKey, T extends Recordable>(
  source: T,
  key: K,
): NonNullable<GlobalOptions[K]> & T;
export function withOptions<T extends Recordable>(
  source: T,
): Omit<GlobalOptions, 'components'> & T;
export function withOptions(source: Recordable, key?: OptionKey) {
  const merged = key
    ? assign(globalOptions[key] ?? {}, source)
    : assign(omit(globalOptions, ['components']), source);

  for (const sym of Object.getOwnPropertySymbols(source)) {
    Reflect.set(merged, sym, Reflect.get(source, sym));
  }
  return merged;
}

export const getComponent = (name: string) => {
  return globalOptions.components?.[name];
};
