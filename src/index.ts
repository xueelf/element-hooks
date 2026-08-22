import { type Plugin } from 'vue';

import { type GlobalOptions, setOptions } from '#/config';
import { setupDevtools } from '#/devtools';
import { version } from '~/package.json';

type ElementHooksPlugin = Plugin<[options?: GlobalOptions]> & {
  version: string;
};

export default {
  install(app, options = {}) {
    setOptions(options);
    setupDevtools(app);
  },
  version,
} satisfies ElementHooksPlugin;

export * from '#/config';
export * from '#/composables/index';
