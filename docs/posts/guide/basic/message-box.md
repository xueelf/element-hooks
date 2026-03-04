# useMessageBox

`useMessageBox` 用于封装 `ElMessageBox` 的命令式调用，适用于消息提示、确认消息与提交内容等场景。

它的设计目标并非替代 `ElMessageBox`，而是在常见业务流中提供更直接的结果处理方式：对 `confirm` 与 `prompt` 的取消/关闭场景进行统一封装，便于直接使用 `await` 编排流程。

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

## 使用 HTML 片段 {#use-html-string}

<ExampleCard>
  <template #example>
    <MessageBoxUseHTMLString />
  </template>

<<< @/examples/message-box/MessageBoxUseHTMLString.vue
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
### useMessageBox

与 `ElMessageBox` 的函数调用方式一致，返回包含 `alert`、`confirm` 与 `prompt` 的方法对象。

- **`alert`**：与 `ElMessageBox.alert` 行为一致，不做额外封装。
- **`confirm`**：返回 `Promise<boolean>`，确认返回 `true`，取消/关闭返回 `false`。
- **`prompt`**：返回 `Promise<string | null>`，确认返回输入值，取消/关闭返回 `null`。

### 返回值方法

| 方法名 | 描述 | 类型签名 |
| --- | --- | --- |
| `alert` | 简单的提示框 | `ElMessageBoxShortcutMethod` |
| `confirm` | 确认消息框，统一封装取消/关闭分支，不再抛出异常 | `(...args: MessageBoxMethodParams) => Promise<boolean>` |
| `prompt` | 提交内容框，统一封装取消/关闭分支，不再抛出异常 | `(...args: MessageBoxMethodParams) => Promise<string | null>` |
