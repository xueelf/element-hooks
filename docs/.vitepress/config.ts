import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { defineConfig } from 'vitepress';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import UnoCSS from 'unocss/vite';
import VueJSX from '@vitejs/plugin-vue-jsx';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Element Hooks',
  description: 'Using Hooks in Element Plus.',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/images/logo.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/logo.svg',
    sidebar: [
      {
        text: 'Hooks',
        items: [
          { text: 'useTable', link: '/table' },
          { text: 'useDialog', link: '/dialog' },
        ],
      },
    ],
    outline: {
      label: '本页目录',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xueelf/element-hooks' },
    ],
    editLink: {
      pattern: 'https://github.com/xueelf/element-hooks/edit/master/docs/:path',
      text: '帮助改善当前页面',
    },
    lastUpdated: {
      text: '更新日期',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色主题',
    darkModeSwitchTitle: '切换到深色主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
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
      ElementPlus({
        useSource: true,
      }),
      Icons({
        autoInstall: true,
      }),
      UnoCSS(),
      VueJSX(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './'),
        'element-hooks': resolve(__dirname, '../../src/index'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/theme/styles/element.scss';`,
        },
      },
    },
  },
});
