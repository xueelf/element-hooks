import { assign, omit } from 'radash';
import { type Component } from 'vue';
import { type DialogOptions } from './useDialog';
import { type PaginationOptions } from './useExTable';
import { type FormOptions } from './useForm';
import { type TableOptions } from './useTable';
import { type Recordable } from './util';

export type GlobalOptions = {
  components?: Record<string, Component>;
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
