<script setup lang="ts">
  import {
    CaretTop,
    Check,
    CopyDocument,
    Hide,
    View,
  } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { computed, reactive, useId, useTemplateRef } from 'vue';

  const sourceCodeRef = useTemplateRef<HTMLDivElement>('source-code');
  const sourceCodeId = useId();
  const state = reactive({
    copied: false,
    expanded: false,
  });
  const copyTitle = computed(() => (state.copied ? '已复制' : '复制代码'));
  const expandTitle = computed(() =>
    state.expanded ? '隐藏代码' : '查看代码',
  );

  const handleCopy = async () => {
    const code = sourceCodeRef.value?.querySelector('pre code')?.textContent;

    if (!code) {
      ElMessage.warning('未找到可复制的代码');
      return;
    }

    try {
      await navigator.clipboard.writeText(code);

      ElMessage.success('代码已复制');
      state.copied = true;
      setTimeout(() => {
        state.copied = false;
      }, 2000);
    } catch (error) {
      console.error(error);
      ElMessage.error('代码复制失败');
    }
  };

  const handleExpand = () => {
    state.expanded = !state.expanded;
  };
</script>

<template>
  <el-card shadow="never" class="example-card">
    <template #default>
      <slot name="example" />
    </template>
    <template #footer>
      <div class="action-wrapper">
        <el-button
          link
          :icon="state.copied ? Check : CopyDocument"
          :title="copyTitle"
          :aria-label="copyTitle"
          @click="handleCopy"
        />
        <el-button
          link
          :icon="state.expanded ? Hide : View"
          :title="expandTitle"
          :aria-label="expandTitle"
          :aria-expanded="state.expanded"
          :aria-controls="sourceCodeId"
          @click="handleExpand"
        />
      </div>
      <div v-show="state.expanded" :id="sourceCodeId" ref="source-code">
        <slot />
        <div class="expand-wrapper">
          <el-button
            link
            :icon="CaretTop"
            style="width: 100%; height: 100%"
            :aria-expanded="state.expanded"
            :aria-controls="sourceCodeId"
            @click="handleExpand"
          >
            {{ expandTitle }}
          </el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
  .example-card {
    overflow: visible;

    .action-wrapper {
      height: 2.5rem;
      padding: 0 var(--el-card-padding);
      background-color: var(--el-card-bg-color);
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .expand-wrapper {
      height: 2.5rem;
      position: sticky;
      bottom: 0;
      background-color: var(--el-card-bg-color);
      z-index: 1;
      border-top: 1px solid var(--el-card-border-color);
    }

    :deep(.el-card__footer) {
      padding: 0;

      [class*='language-'] {
        margin: 0;
        border-radius: 0;
      }
    }
  }
</style>
