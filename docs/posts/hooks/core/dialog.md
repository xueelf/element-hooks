# useDialog

`useDialog` 基于 `ElDialog` 提供了更清晰的状态控制方式。你可以在保留原始 Props、Slots 与事件能力的前提下，通过控制器方法完成打开、关闭与动态配置更新。

与手动维护 `v-model` 相比，`useDialog` 将可见状态统一提取至 Hook 内部统一管理，适合在复杂交互场景中保持视图与逻辑解耦。

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

### Options

`useDialog` 的配置项继承自 Element Plus `ElDialog` 的 Props，但移除了 `modelValue`（由 Hook 内部管理）。

更多属性请参考 [Element Plus Dialog Props](https://element-plus.org/zh-CN/component/dialog.html#attributes)。

### Controller

| 方法         | 说明                                             | 参数                                      |
| ------------ | ------------------------------------------------ | ----------------------------------------- |
| `open`       | 打开对话框                                       | `() => void`                              |
| `close`      | 关闭对话框                                       | `() => void`                              |
| `getVisible` | 获取当前对话框的可见状态                         | `() => boolean`                           |
| `setState`   | 动态更新对话框的配置属性                         | `(state: Partial<DialogOptions>) => void` |
| `setTitle`   | 快捷更新对话框标题                               | `(title: string) => void`                 |
| `instance`   | 内部 ElDialog 组件实例引用（可调用原生实例方法） | `Ref<DialogInstance>`                     |
