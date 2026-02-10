import {
  type TableColumnCtx,
  type TableInstance,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import { defineComponent, computed, ref, shallowRef } from 'vue';
import { createController, createSetProps } from './util';

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

export type TableOptions<T extends Recordable> = Camelized<
  Omit<TableInstance['$props'], 'ref'>
> & {
  data?: T[];
  columns?: TableColumn<T>[];
};

export function useTable<T extends Recordable = Recordable>(
  options: TableOptions<T> = {},
) {
  const tableInstance = ref<TableInstance | null>(null);
  const tableOptions = shallowRef<TableOptions<T>>(options);

  const setProps = createSetProps(tableOptions);

  const setColumns = (columns: TableColumn<T>[]) => {
    setProps({ columns });
  };

  const setData = (data: T[]) => {
    setProps({ data });
  };

  const tableController = createController(tableInstance, {
    setProps,
    setData,
    setColumns,
  });

  const Table = defineComponent<TableOptions<T>>({
    name: 'Table',
    setup(props, { attrs, slots }) {
      const tableState = computed(() => {
        const { columns, ...rest } = tableOptions.value;

        return {
          columns,
          props: { ...rest, ...props, ...attrs },
        };
      });
      const Column = (columnProps: TableColumn<T>) => {
        const {
          slot,
          slots: columnsSlots = {},
          children,
          ...rest
        } = columnProps;
        const columnSlots: Recordable = {};

        if (slot) {
          columnsSlots.default = slot;
        }
        Object.keys(columnsSlots).forEach(key => {
          const slotName: TableColumnSlotName = Reflect.get(columnsSlots, key);

          if (slots[slotName]) {
            columnSlots[key] = (scope: any) => <>{slots[slotName]?.(scope)}</>;
          }
        });

        if (Array.isArray(children) && children.length > 0) {
          columnSlots.default = () =>
            children.map(child => <Column {...child} />);
        }
        return <ElTableColumn v-slots={columnSlots} {...rest} />;
      };

      return () => {
        const { columns = [], props } = tableState.value;

        return (
          <ElTable ref={tableInstance} v-slots={slots} {...props}>
            {columns.map(column => (
              <Column {...column} />
            ))}
          </ElTable>
        );
      };
    },
  });

  return [Table, tableController] as const;
}
