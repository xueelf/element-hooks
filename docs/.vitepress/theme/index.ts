import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import 'virtual:uno.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/index.scss';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, {
      locale: zhCn,
    });
  },
} satisfies Theme;
