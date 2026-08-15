import ElementHooks from 'element-hooks';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import 'virtual:uno.css';
import 'element-plus/theme-chalk/src/index.scss';
import 'element-plus/theme-chalk/src/dark/css-vars.scss';
import './styles/index.scss';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, {
      locale: zhCn,
    });
    app.use(ElementHooks);
  },
} satisfies Theme;
