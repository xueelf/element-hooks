import { globalIgnores } from 'eslint/config';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from 'eslint-config-prettier/flat';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,tsx}'],
  },

  globalIgnores(['**/lib/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  skipFormatting,

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
);
