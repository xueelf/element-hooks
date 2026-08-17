# useMessageBox

原生 `ElMessageBox.confirm` 和 `ElMessageBox.prompt` 在取消或关闭时会 `reject` 并抛出异常，通常需要额外编写 `catch` 逻辑。`useMessageBox` 已统一处理这两种情况，因此可以直接使用 `await` 进行管理。

- **`confirm`** — 确认时返回 `true`，取消或关闭时返回 `false`。
- **`prompt`** — 确认时返回输入内容，取消或关闭时返回 `null`。

## 消息提示 {#alert}

<ExampleCard>
  <template #example>
    <Alert />
  </template>

<<< @/examples/message-box/Alert.vue
</ExampleCard>

## 确认消息 {#confirm}

<ExampleCard>
  <template #example>
    <Confirm />
  </template>

<<< @/examples/message-box/Confirm.vue
</ExampleCard>

## 提交内容 {#prompt}

<ExampleCard>
  <template #example>
    <Prompt />
  </template>

<<< @/examples/message-box/Prompt.vue
</ExampleCard>

## 使用 VNode {#use-vnode}

<ExampleCard>
  <template #example>
    <UseVNode />
  </template>

<<< @/examples/message-box/UseVNode.vue
</ExampleCard>

## 使用带有事件处理函数的 VNode {#use-vnode-with-action-handlers}

<ExampleCard>
  <template #example>
    <UseVNodeWithActionHandlers />
  </template>

<<< @/examples/message-box/UseVNodeWithActionHandlers.vue
</ExampleCard>

## 个性化 {#customization}

<ExampleCard>
  <template #example>
    <Customization />
  </template>

<<< @/examples/message-box/Customization.vue
</ExampleCard>

## 使用 HTML 片段 {#use-html-string}

<ExampleCard>
  <template #example>
    <MessageBoxUseHTMLString />
  </template>

<<< @/examples/message-box/MessageBoxUseHTMLString.vue
</ExampleCard>

## 区分取消操作与关闭操作 {#distinguishing-cancel-and-close}

<ExampleCard>
  <template #example>
    <DistinguishingCancelAndClose />
  </template>

<<< @/examples/message-box/DistinguishingCancelAndClose.vue
</ExampleCard>

## 内容居中 {#centered-content}

<ExampleCard>
  <template #example>
    <MessageBoxCenteredContent />
  </template>

<<< @/examples/message-box/MessageBoxCenteredContent.vue
</ExampleCard>

## 自定义图标 {#customized-icon}

<ExampleCard>
  <template #example>
    <CustomizedIcon />
  </template>

<<< @/examples/message-box/CustomizedIcon.vue
</ExampleCard>

## 可拖放 {#draggable}

<ExampleCard>
  <template #example>
    <Draggable />
  </template>

<<< @/examples/message-box/Draggable.vue
</ExampleCard>

## API {#api}

### useMessageBox {#use-message-box}

调用参数与 `ElMessageBox` 对应方法一致。

- **`alert`** — 与 `ElMessageBox.alert` 行为一致。
- **`confirm`** — 确认时返回 `true`，否则返回 `false`。
- **`prompt`** — 确认时返回输入值，否则返回 `null`。

### 返回值方法 {#returned-methods}

| 方法名    | 描述                                 | 类型签名                                                       |
| --------- | ------------------------------------ | -------------------------------------------------------------- |
| `alert`   | 简单的提示框                         | `ElMessageBoxShortcutMethod`                                   |
| `confirm` | 确认消息框，取消或关闭时返回 `false` | `(...args: MessageBoxMethodParams) => Promise<boolean>`        |
| `prompt`  | 提交内容框，取消或关闭时返回 `null`  | `(...args: MessageBoxMethodParams) => Promise<string \| null>` |
