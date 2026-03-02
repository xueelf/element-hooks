import { type BuildConfig, $, build } from 'bun';

const config = {
  entrypoints: ['src/index.ts'],
  outdir: 'lib',
  external: ['vue', 'element-plus'],
  splitting: true,
} satisfies BuildConfig;

await build(config);
await $`tsc -p tsconfig.build.json`;
