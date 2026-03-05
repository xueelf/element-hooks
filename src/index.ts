import { type Plugin } from 'vue';
import { version } from 'package.json';
import { type GlobalOptions, setOptions } from './config';

type ElementHooksPlugin = Plugin & { version: string };

export default {
  install(_, options: GlobalOptions = {}) {
    setOptions(options);
  },
  version,
} satisfies ElementHooksPlugin;

export * from './config';
export * from './composables';
