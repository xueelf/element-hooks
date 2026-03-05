import { defineConfig } from 'vitepress';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import UnoCSS from 'unocss/vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import VueJSX from '@vitejs/plugin-vue-jsx';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const VITEPRESS_PATH = new URL('./', import.meta.url);
const ROOT_PATH = new URL('../../', import.meta.url);

const resolvePath = (base: URL, path: string = '') =>
  new URL(path, base).pathname;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Element Hooks',
  description: 'Using Hooks in Element Plus.',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/images/logo.svg' }]],
  rewrites: {
    'posts/(.*)': '(.*)',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/logo.svg',
    nav: [
      { text: '指南', link: '/guide/introduce', activeMatch: '^/guide/' },
      { text: 'Hooks', link: '/hooks/introduce', activeMatch: '^/hooks/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '简介', link: '/guide/introduce' },
            { text: '快速上手', link: '/guide/quick-start' },
          ],
        },
        {
          text: '进阶',
          items: [{ text: '全局配置', link: '/guide/global-options' }],
        },
      ],
      '/hooks/': [
        {
          text: '概览',
          items: [{ text: 'Hooks 介绍', link: '/hooks/introduce' }],
        },
        {
          text: '核心功能 (Core)',
          items: [
            { text: 'useDialog', link: '/hooks/core/dialog' },
            { text: 'useForm', link: '/hooks/core/form' },
            { text: 'useTable', link: '/hooks/core/table' },
            { text: 'useMessage', link: '/hooks/core/message' },
            { text: 'useMessageBox', link: '/hooks/core/message-box' },
          ],
        },
        {
          text: '扩展组合 (Extra)',
          items: [{ text: 'useExTable', link: '/hooks/extra/ex-table' }],
        },
      ],
    },
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
      VueDevTools(),
      VueJSX(),
    ],
    resolve: {
      alias: {
        '~': resolvePath(VITEPRESS_PATH),
        '@': resolvePath(ROOT_PATH, './src'),
        'element-hooks': resolvePath(ROOT_PATH, './src/index'),
        'package.json': resolvePath(ROOT_PATH, './package.json'),
      },
    },
    ssr: {
      noExternal: ['element-plus'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '~/theme/styles/element.scss';`,
        },
      },
    },
  },
});
