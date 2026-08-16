---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Element Hooks'
  text: 'Using Hooks in Element Plus.'
  tagline: 以 Hook 的方式使用 Element Plus 组件
  image:
    src: /images/logo.svg
    alt: Element Hooks
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quick-start
    - theme: alt
      text: 深度指南
      link: /guide/introduce

features:
  - title: 配置驱动
    details: 通过配置描述组件结构，减少重复的模板代码。
  - title: 状态管理
    details: 组件状态由 Hook 管理，无需额外绑定 v-model 或维护响应式变量。
  - title: 原生兼容
    details: Element Plus 组件的 props 可直接作为 Hook options 使用。
  - title: 组合能力
    details: 组合多个 Element Plus 组件，复用常见的布局和交互逻辑。
---
