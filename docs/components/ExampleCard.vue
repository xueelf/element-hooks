<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { Check, CopyDocument, Hide, View } from '@element-plus/icons-vue';
  import { computed, reactive, useTemplateRef } from 'vue';

  const state = reactive({
    copied: false,
    expanded: false,
    sourceCodeRef: useTemplateRef<HTMLDivElement>('source-code'),
  });
  const icon = computed(() => {
    return {
      copy: {
        component: state.copied ? Check : CopyDocument,
        title: state.copied ? '已复制' : '复制代码',
      },
      expand: {
        component: state.expanded ? Hide : View,
        title: state.expanded ? '隐藏代码' : '查看代码',
      },
    };
  });

  const handleCopy = async () => {
    if (!state.sourceCodeRef) {
      return;
    }
    const code = state.sourceCodeRef.querySelector('pre code')?.textContent;

    if (!code) {
      ElMessage.warning('未找到可复制的代码');
      return;
    }

    try {
      await navigator.clipboard.writeText(code);

      ElMessage.success('代码已复制');
      Reflect.set(state, 'copied', true);
      setTimeout(() => {
        Reflect.set(state, 'copied', false);
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
        <el-icon class="cursor-pointer" title="Open in Playground">
          <icon-ep-link />
        </el-icon>
        <el-icon
          class="cursor-pointer"
          :title="icon.copy.title"
          @click="handleCopy"
        >
          <component :is="icon.copy.component" />
        </el-icon>
        <el-icon
          class="cursor-pointer"
          :title="icon.expand.title"
          @click="handleExpand"
        >
          <component :is="icon.expand.component" />
        </el-icon>
      </div>
      <div ref="source-code" :class="state.expanded ? 'block' : 'hidden'">
        <slot />
        <div class="expand-wrapper">
          <el-button
            link
            style="width: 100%; height: 100%"
            @click="handleExpand"
          >
            <template #icon>
              <el-icon class="cursor-pointer">
                <icon-ep-caret-top />
              </el-icon>
            </template>
            <span>{{ icon.expand.title }}</span>
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
      gap: 1rem;
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
