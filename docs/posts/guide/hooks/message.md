# useMessage

`useMessage` 直接返回 `ElMessage`，用法与 `ElMessage` 完全一致，支持直接调用及 `success`、`warning`、`info`、`error`、`primary` 等快捷方法。

## 基础用法 {#basic-usage}

<ExampleCard>
  <template #example>
    <BasicUsage />
  </template>

<<< @/examples/message/BasicUsage.vue
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
    <UseHTMLString />
  </template>

<<< @/examples/message/UseHTMLString.vue
</ExampleCard>

## 分组消息合并 {#grouping}

<ExampleCard>
  <template #example>
    <Grouping />
  </template>

<<< @/examples/message/Grouping.vue
</ExampleCard>
