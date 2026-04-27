import { rm } from 'node:fs/promises';

import { type BuildConfig, $, build } from 'bun';

const config = {
  entrypoints: ['src/index.ts', 'src/composables/index.ts'],
  outdir: 'dist',
  external: ['vue', 'element-plus'],
  splitting: false,
} satisfies BuildConfig;

await rm('dist', { recursive: true, force: true });
await build(config);
await $`tsc -p tsconfig.build.json && tsc-alias -p tsconfig.build.json`;
