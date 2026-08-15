import { useDialog } from './dialog';
import { useForm } from './form';
import { useGrid } from './grid';
import { useMessage } from './message';
import { useMessageBox } from './message-box';
import { useTable } from './table';

export default {
  useDialog,
  useForm,
  useMessage,
  useMessageBox,
  useTable,
  useGrid,
};

export * from './dialog';
export * from './form';
export * from './grid';
export * from './message-box';
export * from './message';
export * from './table';

export type { Awaitable, Recordable } from '../util';
