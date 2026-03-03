import {
  type TableColumnCtx,
  type TableInstance,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import { defineComponent, computed, ref, shallowRef } from 'vue';
import {
  type Camelized,
  type Recordable,
  createController,
  createSetOptions,
} from './util';

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
  Omit<TableInstance['$props'], 'ref'>
> & {
  data?: TableData<T>;
  columns?: TableColumn<T>[];
};

export function useTable<T extends Recordable = Recordable>(
  options: TableOptions<T> = {},
) {
  const tableInstance = ref<TableInstance | null>(null);
  const tableOptions = shallowRef<TableOptions<T>>(options);

  const setOptions = createSetOptions(tableOptions);

  const setColumns = (columns: TableColumn<T>[]) => {
    setOptions({ columns });
  };

  const setData = (data: TableData<T>) => {
    setOptions({ data });
  };

  const getData = () => {
    const { data } = tableOptions.value;
    return data ? structuredClone(data) : null;
  };

  const tableController = createController(tableInstance, {
    setOptions,
    setColumns,
    setData,
    getData,
  });

  const Table = defineComponent<TableOptions<T>>({
    name: 'Table',
    setup(props, { attrs, slots }) {
      const tableState = computed(() => {
        const { columns: columnsOption, ...restOptions } = tableOptions.value;
        const { columns: columnsAttr, ...restAttrs } = attrs as TableOptions<T>;

        return {
          columns: columnsAttr ?? columnsOption,
          props: { ...restOptions, ...props, ...restAttrs },
        };
      });
      const Column = (columnOptions: TableColumn<T>) => {
        const {
          slot,
          slots: columnSlotOptions = {},
          children,
          ...columnProps
        } = columnOptions;
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
        const { columns = [], props } = tableState.value;

        return (
          <ElTable ref={tableInstance} {...props}>
            {{
              default: () => columns.map(column => <Column {...column} />),
              ...slots,
            }}
          </ElTable>
        );
      };
    },
  });

  return [Table, tableController] as const;
}
