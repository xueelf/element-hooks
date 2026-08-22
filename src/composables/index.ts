import { useDialog } from '#/composables/dialog';
import { useForm } from '#/composables/form';
import { useGrid } from '#/composables/grid';
import { useMessage } from '#/composables/message';
import { useMessageBox } from '#/composables/message-box';
import { useTable } from '#/composables/table';

export default {
  useDialog,
  useForm,
  useMessage,
  useMessageBox,
  useTable,
  useGrid,
};

export * from '#/composables/dialog';
export * from '#/composables/form';
export * from '#/composables/grid';
export * from '#/composables/message-box';
export * from '#/composables/message';
export * from '#/composables/table';

export type { Awaitable, Recordable, SetRequired } from '#/util';
