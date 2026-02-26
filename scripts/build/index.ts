import { build, type BuildConfig } from 'bun';

const config = {
  entrypoints: ['src/index.ts'],
  outdir: 'lib',
  packages: 'external',
  splitting: true,
} satisfies BuildConfig;

await build(config);
