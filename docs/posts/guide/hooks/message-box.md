# useMessageBox

`useMessageBox` 的目的并非替代 `ElMessageBox`，而是为了应对不同的使用场景。`ElMessageBox` 在用户点击取消或关闭时会返回一个 rejected 的 Promise，这意味着你必须使用 `try/catch` 来处理取消操作，在只关心结果的场景下显得繁琐。`useMessageBox` 对此进行了封装，使你可以直接使用 `await` 获取结果，无需额外的异常捕获逻辑。

`useMessageBox` 返回一个包含以下方法的对象：

- **`alert`**：与 `ElMessageBox.alert` 行为完全一致，未做额外封装。
- **`confirm`**：返回 `Promise<boolean>`，用户确认时返回 `true`，取消或关闭时返回 `false`，不再抛出异常。
- **`prompt`**：返回 `Promise<string | null>`，用户确认时返回输入的字符串值，取消或关闭时返回 `null`，不再抛出异常。

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
    <UseHTMLString />
  </template>

<<< @/examples/message-box/UseHTMLString.vue
</ExampleCard>

## 内容居中 {#centered-content}

<ExampleCard>
  <template #example>
    <CenteredContent />
  </template>

<<< @/examples/message-box/CenteredContent.vue
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
