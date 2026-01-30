import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { defineConfig } from 'vitepress';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import UnoCSS from 'unocss/vite';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Element Hooks',
  description: 'Using Hooks in Element Plus.',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        text: 'Hooks',
        items: [{ text: 'useTable', link: '/table' }],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xueelf/element-hooks' },
    ],
  },
  vite: {
    plugins: [
      AutoImport({
        dts: './types/auto-imports.d.ts',
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        dirs: ['components', 'examples'],
        dts: './types/components.d.ts',
        include: [/\.vue$/, /\.md$/],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'icon',
            enabledCollections: ['ep'],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      UnoCSS(),
      VueJsx(),
    ],
    resolve: {
      alias: {
        'element-hooks': resolve(__dirname, '../../src/index'),
      },
    },
  },
});
