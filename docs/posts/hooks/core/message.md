# useMessage

`useMessage` 对 `ElMessage` 进行轻量封装。
它适用于操作后的即时反馈场景。

它保持 `ElMessage` 的调用方式。
它同时支持函数调用和状态快捷方法。

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

`useMessage` 无需参数，直接返回 `ElMessage` 实例函数。

你可以直接调用完整的 `ElMessage` 方法集，包括函数调用形式与各类状态快捷方法。

```ts
import { useMessage } from 'element-hooks';

const message = useMessage();

// 等同于直接调用 ElMessage.success
message.success('Ciallo～(∠·ω< )⌒★');
```
