# useMessage

`useMessage` 对 `ElMessage` 进行了轻量封装，适用于主动操作后的即时反馈场景。

它保持与 `ElMessage` 一致的调用方式，支持函数直接调用与 `success`、`warning`、`info`、`error`、`primary` 等快捷方法，可无缝迁移现有代码。

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

## API {#api}

### useMessage

`useMessage` 无需参数，直接返回 `ElMessage` 实例函数。

你可以直接调用完整的 `ElMessage` 方法集，包括函数调用形式与各类状态快捷方法。

```ts
import { useMessage } from 'element-hooks';

const message = useMessage();

// 等同于直接调用 ElMessage.success
message.success('Ciallo～(∠·ω< )⌒★');
```
