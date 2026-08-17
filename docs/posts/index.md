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
      link: /guide/introduction

features:
  - title: 配置驱动
    details: 使用配置项定义组件结构，减少重复的模板代码。
  - title: 状态管理
    details: 通过 Hook Controller 集中维护组件状态，避免逻辑分散。
  - title: 原生兼容
    details: 原生组件的 Props、Slots 和事件可直接用于 Hook Options，简单易上手。
  - title: 聚合扩展
    details: Composite Hooks 通过聚合多个组件，轻松处理跨组件交互。
---
