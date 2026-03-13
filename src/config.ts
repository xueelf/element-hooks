import { assign, omit } from 'radash';
import { type Component } from 'vue';
import { type DialogOptions } from './composables/core/dialog';
import { type PaginationOptions } from './composables/extra/ex-table';
import { type FormOptions } from './composables/core/form';
import { type TableOptions } from './composables/core/table';
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

export const setOptions = (options: GlobalOptions = {}) => {
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
  if (key) {
    const defaultOptions = globalOptions[key] ?? {};
    return assign(defaultOptions, source);
  }
  const defaultGlobalOptions = omit(globalOptions, ['components']);
  return assign(defaultGlobalOptions, source);
}

export const getComponent = (name: string) => {
  return globalOptions.components?.[name];
};
