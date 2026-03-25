import {
  type TableColumnCtx,
  type TableInstance,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import { defineComponent, h, ref, toRaw } from 'vue';
import { isArray } from 'radash';
import {
  type Camelized,
  type Recordable,
  type RenderOptions,
  type Setter,
  createController,
  resolveFunctionalProps,
  unwrapSetter,
  useState,
} from '@/util';
import { getComponent, withOptions } from '@/config';
import { type HookOptions, HOOK_METADATA } from '@/devtools';

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

export type TableColumn<T extends Recordable = Recordable> = Partial<
  Omit<TableColumnCtx<T>, 'children'>
> & {
  children?: TableColumn<T>[];
  slot?: string;
  slots?: Partial<Record<TableColumnSlotName, string>>;
  render?: RenderOptions<T>;
};

export type TableData<T extends Recordable> = T[];

export type TableOptions<T extends Recordable> = HookOptions &
  Partial<Camelized<Omit<TableInstance['$props'], 'ref' | 'data'>>> & {
    data?: TableData<T>;
    columns?: TableColumn<T>[];
  };

export function useTable<T extends Recordable = Recordable>(
  options: TableOptions<T> = {},
) {
  const name = 'Table';

  Reflect.set(options, HOOK_METADATA, {
    name,
    internal: options[HOOK_METADATA]?.internal,
  });

  const [tableState, setState, initState] = useState<TableOptions<T>>(
    withOptions(options, 'table'),
  );
  const tableInstance = ref<TableInstance | null>(null);

  const setColumns: Setter<(typeof options)['columns']> = update => {
    setState(prev => ({
      ...prev,
      columns: unwrapSetter(update, prev.columns),
    }));
  };

  const getColumns = (): TableColumn<T>[] => {
    return tableState.value?.columns ?? [];
  };

  const setData: Setter<(typeof options)['data']> = update => {
    setState(prev => ({
      ...prev,
      data: unwrapSetter(update, prev.data),
    }));
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
    name,
    inheritAttrs: false,
    setup(_, { slots }) {
      initState();

      const Column = (columnOptions: TableColumn<T>) => {
        const {
          slot,
          slots: rawColumnSlots,
          children,
          render,
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
            columnSlots[key] = (scope: ColumnScope<T>) => (
              <>{slots[slotName]?.(scope)}</>
            );
          }
        });

        if (render) {
          if (columnSlots.default) {
            console.warn(
              `[useTable] TableColumn "${columnProps.prop ?? slot}" has both a slot and render defined. The slot will take priority.`,
            );
          } else {
            columnSlots.default = (scope: ColumnDefaultScope<T>) => {
              const { component } = render;
              const renderComponent =
                typeof component === 'string'
                  ? getComponent(component)
                  : component;

              if (!renderComponent) {
                console.warn(
                  `[useTable] Global component "${String(component)}" is not registered.`,
                );
                return null;
              }
              return h(
                renderComponent,
                resolveFunctionalProps(render.props, scope.row),
              );
            };
          }
        }

        if (isArray(children) && children.length > 0) {
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
