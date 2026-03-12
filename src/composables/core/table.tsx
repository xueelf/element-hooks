import {
  type TableColumnCtx,
  type TableInstance,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import { defineComponent, ref, toRaw } from 'vue';
import {
  type Camelized,
  type Recordable,
  createController,
  useState,
} from '@/util';
import { withOptions } from '@/config';

export type TableColumnSlotName =
  | 'default'
  | 'header'
  | 'filterIcon'
  | 'expand';

export type ColumnDefaultScope<T extends Recordable> = {
  column: TableColumnCtx<T>;
  row: T;
  $index: number;
};
export type ColumnHeaderScope<T extends Recordable> = {
  column: TableColumnCtx<T>;
  $index: number;
};
export type ColumnFilterIconScope = {
  filterOpened: boolean;
};
export type ColumnExpandScope = {
  expanded: boolean;
};
export type ColumnScope<T extends Recordable> =
  | ColumnDefaultScope<T>
  | ColumnHeaderScope<T>
  | ColumnFilterIconScope
  | ColumnExpandScope;

export type TableColumn<T extends Recordable> = Partial<
  Omit<TableColumnCtx<T>, 'children'>
> & {
  children?: TableColumn<T>[];
  slot?: string;
  slots?: Partial<Record<TableColumnSlotName, string>>;
};

export type TableData<T extends Recordable> = T[];

export type TableOptions<T extends Recordable> = Camelized<
  Omit<TableInstance['$props'], 'ref' | 'data'>
> & {
  data?: TableData<T>;
  columns?: TableColumn<T>[];
};

export function useTable<T extends Recordable = Recordable>(
  options: TableOptions<T> = {},
) {
  const [tableState, setState, initState] = useState<TableOptions<T>>(
    withOptions(options, 'table'),
  );

  const tableInstance = ref<TableInstance | null>(null);

  const setColumns = (columns: TableColumn<T>[]) => {
    setState({ columns });
  };

  const getColumns = (): TableColumn<T>[] => {
    return tableState.value?.columns ?? [];
  };

  const setData = (data: TableData<T>) => {
    setState({ data });
  };

  const getData = (): TableData<T> => {
    return toRaw(tableState.value?.data) ?? [];
  };

  const tableController = createController(tableInstance, {
    setState,
    setColumns,
    getColumns,
    setData,
    getData,
  });

  const Table = defineComponent<TableOptions<T>>({
    name: 'Table',
    inheritAttrs: false,
    setup(_, { slots }) {
      initState();

      const Column = (columnOptions: TableColumn<T>) => {
        const {
          slot,
          slots: rawColumnSlots,
          children,
          ...columnProps
        } = columnOptions;
        const columnSlotOptions = { ...rawColumnSlots };
        const columnSlots: Recordable = {};

        if (slot) {
          columnSlotOptions.default = slot;
        }
        Object.keys(columnSlotOptions).forEach(key => {
          const slotName: TableColumnSlotName = Reflect.get(
            columnSlotOptions,
            key,
          );

          if (slots[slotName]) {
            columnSlots[key] = (scope: any) => <>{slots[slotName]?.(scope)}</>;
          }
        });

        if (Array.isArray(children) && children.length > 0) {
          columnSlots.default = () =>
            children.map(child => <Column {...child} />);
        }
        return <ElTableColumn {...columnProps}>{columnSlots}</ElTableColumn>;
      };

      return () => {
        if (!tableState.value) {
          return null;
        }
        const { columns = [], ...tableProps } = tableState.value;

        return (
          <ElTable ref={tableInstance} {...tableProps}>
            {{
              default: () =>
                columns.map((column: TableColumn<T>) => <Column {...column} />),
              ...slots,
            }}
          </ElTable>
        );
      };
    },
  });

  return [Table, tableController] as const;
}
