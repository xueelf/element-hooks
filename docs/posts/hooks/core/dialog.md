# useDialog

`useDialog` 返回 `Dialog` 组件以及 `open`、`close` 等方法。`Dialog` 组件支持 `ElDialog` 原有的属性、插槽和事件。

## 基础用法 {#basic-usage}

<ExampleCard>
  <template #example>
    <DialogBasicUsage />
  </template>

<<< @/examples/dialog/DialogBasicUsage.vue
</ExampleCard>

## 自定义内容 {#customized-content}

<ExampleCard>
  <template #example>
    <CustomizedContent />
  </template>

<<< @/examples/dialog/CustomizedContent.vue
</ExampleCard>

## 自定义头部 {#customized-header}

<ExampleCard>
  <template #example>
    <CustomizedHeader />
  </template>

<<< @/examples/dialog/CustomizedHeader.vue
</ExampleCard>

## 嵌套的对话框 {#nested-dialog}

<ExampleCard>
  <template #example>
    <NestedDialog />
  </template>

<<< @/examples/dialog/NestedDialog.vue
</ExampleCard>

## 内容居中 {#centered-content}

<ExampleCard>
  <template #example>
    <DialogCenteredContent />
  </template>

<<< @/examples/dialog/DialogCenteredContent.vue
</ExampleCard>

## 居中对话框 {#align-center-dialog}

<ExampleCard>
  <template #example>
    <AlignCenterDialog />
  </template>

<<< @/examples/dialog/AlignCenterDialog.vue
</ExampleCard>

## 关闭时销毁 {#destroy-on-close}

<ExampleCard>
  <template #example>
    <DestroyOnClose />
  </template>

<<< @/examples/dialog/DestroyOnClose.vue
</ExampleCard>

## 可拖拽对话框 {#draggable-dialog}

<ExampleCard>
  <template #example>
    <DraggableDialog />
  </template>

<<< @/examples/dialog/DraggableDialog.vue
</ExampleCard>

## 全屏 {#fullscreen}

<ExampleCard>
  <template #example>
    <Fullscreen />
  </template>

<<< @/examples/dialog/Fullscreen.vue
</ExampleCard>

## 模态框 {#modal}

<ExampleCard>
  <template #example>
    <Modal />
  </template>

<<< @/examples/dialog/Modal.vue
</ExampleCard>

## 自定义动画 {#custom-animation}

<ExampleCard>
  <template #example>
    <CustomAnimation />
  </template>

<<< @/examples/dialog/CustomAnimation.vue
</ExampleCard>

## Events {#events}

<ExampleCard>
  <template #example>
    <Events />
  </template>

<<< @/examples/dialog/Events.vue
</ExampleCard>

## API {#api}

### Options {#options}

`useDialog` 支持 `ElDialog` 的属性。`modelValue` 由 Hook 内部管理，因此不对外暴露。

更多属性请参考 [Element Plus Dialog Props](https://element-plus.org/zh-CN/component/dialog.html#attributes)。

### Controller {#controller}

| 成员         | 说明                     | 类型                                                                                           |
| ------------ | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `open`       | 打开对话框               | `() => void`                                                                                   |
| `close`      | 关闭对话框               | `() => void`                                                                                   |
| `getVisible` | 获取当前对话框的可见状态 | `() => boolean`                                                                                |
| `setState`   | 更新对话框的配置属性     | `(state: DialogOptions \| ((prev: DialogOptions) => DialogOptions)) => void`                   |
| `setTitle`   | 更新对话框标题           | `(title: string \| undefined \| ((prev: string \| undefined) => string \| undefined)) => void` |
| `instance`   | `ElDialog` 组件实例引用  | `Ref<DialogInstance \| null>`                                                                  |
