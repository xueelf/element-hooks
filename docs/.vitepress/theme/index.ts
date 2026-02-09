import 'virtual:uno.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './custom.scss';

export default {
  extends: DefaultTheme,
} satisfies Theme;
