# useDialog

`useDialog` 的 options 与 `ElDialog` 的 props 基本保持一致，但移除了 `modelValue` 相关属性，因为对话框的显示/隐藏状态由 hook 内部管理，无需手动绑定 `v-model`。

`useDialog` 返回一个元组 `[Dialog, controller]`，其中 `controller` 提供了以下方法：

- **`open`** / **`close`**：控制对话框的打开与关闭，替代手动操作 `v-model` 的方式。
- **`getVisible`**：获取当前对话框的显示状态。
- **`setProps`**：动态更新对话框的属性配置。
- **`setTitle`**：动态更新对话框标题。
- **`instance`**：对内部 `ElDialog` 实例的 ref 引用，可以通过它直接访问 `ElDialog` 上的原生属性和方法，组件未挂载时值为 `null`。

## 基础用法 {#basic-usage}

<ExampleCard>
  <template #example>
    <BasicUsage />
  </template>

<<< @/examples/dialog/BasicUsage.vue
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
    <CenteredContent />
  </template>

<<< @/examples/dialog/CenteredContent.vue
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
