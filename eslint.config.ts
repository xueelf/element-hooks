import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import skipFormatting from 'eslint-config-prettier/flat';
import pluginVue from 'eslint-plugin-vue';
import { globalIgnores } from 'eslint/config';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,tsx}'],
  },

  globalIgnores(['**/dist/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  skipFormatting,

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
);
