# useDrawer

`useDrawer` 返回 `Drawer` 组件以及 `open`、`close` 等方法。`Drawer` 组件支持 `ElDrawer` 原有的属性、插槽和事件。

## 基础用法 {#basic-usage}

<ExampleCard>
  <template #example>
    <DrawerBasicUsage />
  </template>

<<< @/examples/drawer/DrawerBasicUsage.vue
</ExampleCard>

## 不添加 Title {#no-title}

<ExampleCard>
  <template #example>
    <NoTitle />
  </template>

<<< @/examples/drawer/NoTitle.vue
</ExampleCard>

## 自定义内容 {#customized-content}

<ExampleCard>
  <template #example>
    <DrawerCustomizedContent />
  </template>

<<< @/examples/drawer/DrawerCustomizedContent.vue
</ExampleCard>

## 自定义头部 {#customized-header}

<ExampleCard>
  <template #example>
    <DrawerCustomizedHeader />
  </template>

<<< @/examples/drawer/DrawerCustomizedHeader.vue
</ExampleCard>

## 可调整抽屉 {#resizable-drawer}

<ExampleCard>
  <template #example>
    <ResizableDrawer />
  </template>

<<< @/examples/drawer/ResizableDrawer.vue
</ExampleCard>

## 嵌套抽屉 {#nested-drawer}

<ExampleCard>
  <template #example>
    <NestedDrawer />
  </template>

<<< @/examples/drawer/NestedDrawer.vue
</ExampleCard>

## 模态框 {#modal}

<ExampleCard>
  <template #example>
    <DrawerModal />
  </template>

<<< @/examples/drawer/DrawerModal.vue
</ExampleCard>

## API {#api}

### Options {#options}

`useDrawer` 支持 `ElDrawer` 的属性。`modelValue` 由 Hook 内部管理，因此不对外暴露。

更多属性请参考 [Element Plus Drawer Props](https://element-plus.org/zh-CN/component/drawer.html#attributes)。

### Controller {#controller}

| 成员         | 说明                    | 类型                                                                                           |
| ------------ | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `open`       | 打开抽屉                | `() => void`                                                                                   |
| `close`      | 关闭抽屉                | `() => void`                                                                                   |
| `getVisible` | 获取当前抽屉的可见状态  | `() => boolean`                                                                                |
| `setState`   | 更新抽屉的配置属性      | `(state: DrawerOptions \| ((prev: DrawerOptions) => DrawerOptions)) => void`                   |
| `setTitle`   | 更新抽屉标题            | `(title: string \| undefined \| ((prev: string \| undefined) => string \| undefined)) => void` |
| `instance`   | `ElDrawer` 组件实例引用 | `Ref<DrawerInstance \| null>`                                                                  |
