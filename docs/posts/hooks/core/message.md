# useMessage

`useMessage` 返回 `$message` 全局方法，用法与 `ElMessage` 完全一致。可以直接调用返回值，也可以使用 `success`、`warning` 等快捷方法。

## 基础用法 {#basic-usage}

<ExampleCard>
  <template #example>
    <MessageBasicUsage />
  </template>

<<< @/examples/message/MessageBasicUsage.vue
</ExampleCard>

## 不同状态 {#types}

<ExampleCard>
  <template #example>
    <Types />
  </template>

<<< @/examples/message/Types.vue
</ExampleCard>

## Plain {#plain}

<ExampleCard>
  <template #example>
    <Plain />
  </template>

<<< @/examples/message/Plain.vue
</ExampleCard>

## 可关闭的消息提示 {#closable}

<ExampleCard>
  <template #example>
    <Closable />
  </template>

<<< @/examples/message/Closable.vue
</ExampleCard>

## 使用 HTML 片段作为正文内容 {#use-html-string}

<ExampleCard>
  <template #example>
    <MessageUseHTMLString />
  </template>

<<< @/examples/message/MessageUseHTMLString.vue
</ExampleCard>

## 分组消息合并 {#grouping}

<ExampleCard>
  <template #example>
    <Grouping />
  </template>

<<< @/examples/message/Grouping.vue
</ExampleCard>

## Placement {#placement}

<ExampleCard>
  <template #example>
    <Placement />
  </template>

<<< @/examples/message/Placement.vue
</ExampleCard>

## API {#api}

`useMessage` 无需参数，直接返回 `$message` 全局方法。

`useMessage()` 的返回值可以像 `ElMessage` 一样直接调用，也可以调用 `success`、`warning`、`error` 等方法。

```ts
import { useMessage } from 'element-hooks';

const message = useMessage();

// 等同于直接调用 ElMessage.success
message.success('Ciallo～(∠·ω< )⌒★');
```
