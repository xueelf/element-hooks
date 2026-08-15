<script setup lang="ts">
  import { useMessage } from 'element-hooks';
  import { type MessagePlacement, type MessageType } from 'element-plus';

  const message = useMessage();

  const placementOptions = {
    top: { count: 0, type: 'success' },
    bottom: { count: 0, type: 'warning' },
    'top-left': { count: 0, type: 'info' },
    'top-right': { count: 0, type: 'primary' },
    'bottom-left': { count: 0, type: 'warning' },
    'bottom-right': { count: 0, type: 'error' },
  } satisfies Record<MessagePlacement, { count: number; type: MessageType }>;

  const openMsg = (placement: MessagePlacement = 'top') => {
    const options = placementOptions[placement];

    options.count += 1;

    message({
      message: `This is a message from the ${placement} ${options.count}`,
      type: options.type,
      placement,
    });
  };
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <el-button class="!ml-0" :plain="true" @click="openMsg()">Top</el-button>
    <el-button class="!ml-0" :plain="true" @click="openMsg('top-left')">
      Top Left
    </el-button>
    <el-button class="!ml-0" :plain="true" @click="openMsg('top-right')">
      Top Right
    </el-button>
    <el-button class="!ml-0" :plain="true" @click="openMsg('bottom')">
      Bottom
    </el-button>
    <el-button class="!ml-0" :plain="true" @click="openMsg('bottom-left')">
      Bottom Left
    </el-button>
    <el-button class="!ml-0" :plain="true" @click="openMsg('bottom-right')">
      Bottom Right
    </el-button>
  </div>
</template>
