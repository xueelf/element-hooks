import { type BuildConfig, $, build } from 'bun';
import { rm } from 'node:fs/promises';

const config = {
  entrypoints: ['src/index.ts', 'src/composables/index.ts'],
  outdir: 'lib',
  external: ['vue', 'element-plus'],
  splitting: false,
} satisfies BuildConfig;

await rm('lib', { recursive: true, force: true });
await build(config);
await $`tsc -p tsconfig.build.json && tsc-alias -p tsconfig.build.json`;
