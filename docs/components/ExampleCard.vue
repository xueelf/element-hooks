<script setup lang="ts">
  import { reactive } from 'vue';

  const state = reactive({
    isExpanded: false,
  });

  const handleExpand = () => {
    state.isExpanded = !state.isExpanded;
  };
</script>

<template>
  <el-card shadow="never" class="example-card">
    <template #default>
      <slot name="example" />
    </template>
    <template #footer>
      <div
        class="bg-[--el-card-bg-color] px-[--el-card-padding] flex justify-end items-center gap-4 h-10"
      >
        <el-icon class="cursor-pointer" title="Open in Playground">
          <icon-ep-link />
        </el-icon>
        <el-icon class="cursor-pointer" title="Copy Code">
          <icon-ep-copy-document />
        </el-icon>
        <el-icon
          class="cursor-pointer"
          :title="state.isExpanded ? 'Hide Code' : 'Show Code'"
          @click="handleExpand"
        >
          <icon-ep-hide v-if="state.isExpanded" />
          <icon-ep-view v-else />
        </el-icon>
      </div>
      <div :class="state.isExpanded ? 'block' : 'hidden'">
        <slot />
        <el-button
          link
          style="width: 100%; height: 2.5rem"
          @click="handleExpand"
        >
          <template #icon>
            <el-icon class="cursor-pointer">
              <icon-ep-caret-top />
            </el-icon>
          </template>
          <span>隐藏源代码</span>
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
  .example-card {
    :deep(.el-card__footer) {
      padding: 0;

      [class*='language-'] {
        margin: 0;
        border-radius: 0;
      }
    }
  }
</style>
