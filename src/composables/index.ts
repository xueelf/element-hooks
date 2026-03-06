import { useDialog } from './core/dialog';
import { useForm } from './core/form';
import { useMessage } from './core/message';
import { useMessageBox } from './core/message-box';
import { useTable } from './core/table';
import { useExTable } from './extra/ex-table';

export default {
  useDialog,
  useForm,
  useMessage,
  useMessageBox,
  useTable,
  useExTable,
};

export * from './core/dialog';
export * from './core/form';
export * from './core/message';
export * from './core/message-box';
export * from './core/table';

export * from './extra/ex-table';
