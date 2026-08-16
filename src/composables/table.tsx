import {
  type TableColumnCtx,
  type TableInstance,
  ElTable,
  ElTableColumn,
  vLoading,
} from 'element-plus';
import {
  type VNodeChild,
  defineComponent,
  h,
  ref,
  toRaw,
  withDirectives,
} from 'vue';

import { getComponent, withOptions } from '#/config';
import {
  type HookComponentProps,
  type HookOptions,
  HOOK_METADATA,
} from '#/devtools';
import {
  type Awaitable,
  type Camelized,
  type Recordable,
  type RenderOptions,
  type Setter,
  createController,
  resolveRenderProps,
  unwrapSetter,
  useDataLoader,
  useState,
} from '#/util';

const tableColumnSlotNames = [
  'default',
  'header',
  'filterIcon',
  'expand',
] as const;
export type TableColumnSlotName = (typeof tableColumnSlotNames)[number];
type TableColumnSlot = (...args: never[]) => VNodeChild;

export type ColumnDefaultScope<T extends object> = {
  column: TableColumnCtx<T>;
  row: T;
  $index: number;
};
export type ColumnHeaderScope<T extends object> = {
  column: TableColumnCtx<T>;
  $index: number;
};
export type ColumnFilterIconScope = {
  filterOpened: boolean;
};
export type ColumnExpandScope = {
  expanded: boolean;
};
export type ColumnScope<T extends object> =
  | ColumnDefaultScope<T>
  | ColumnHeaderScope<T>
  | ColumnFilterIconScope
  | ColumnExpandScope;

export type TableColumn<T extends object = Recordable> = Partial<
  Omit<TableColumnCtx<T>, 'children'>
> & {
  key?: string | number;
  children?: TableColumn<T>[];
  slot?: string;
  slots?: Partial<Record<TableColumnSlotName, string>>;
  render?: RenderOptions<T>;
};

export type TableData<T extends object> = T[];

export type TableDataLoader<T extends object> = () => Awaitable<TableData<T>>;

export type TableOptions<T extends object> = HookOptions &
  Partial<Camelized<Omit<TableInstance['$props'], 'ref' | 'data'>>> & {
    data?: TableData<T>;
    columns?: TableColumn<T>[];
  };

export type TableProps<T extends object> = HookComponentProps<TableOptions<T>>;

export function useTable<T extends object = Recordable>(
  options: TableOptions<T> = {},
) {
  const name = 'Table';
  const merged = withOptions(options, 'table');

  Reflect.set(merged, HOOK_METADATA, {
    name,
    internal: options[HOOK_METADATA]?.internal,
  });

  const [tableState, setState, initState, getCurrentState] =
    useState<TableOptions<T>>(merged);
  const tableInstance = ref<TableInstance | null>(null);

  const setColumns: Setter<(typeof options)['columns']> = update => {
    setState(prev => ({
      ...prev,
      columns: unwrapSetter(update, prev.columns),
    }));
  };

  const getColumns = (): TableColumn<T>[] => {
    return getCurrentState().columns ?? [];
  };

  const {
    loading,
    setData: setResolvedData,
    loadData: loadResolvedData,
  } = useDataLoader<TableData<T>>(
    data => {
      setState(prev => ({ ...prev, data }));
    },
    () => undefined,
  );

  const setData: Setter<TableData<T>> = update => {
    setResolvedData(unwrapSetter(update, getCurrentState().data ?? []));
  };

  function loadData(loader: () => TableData<T>): void;
  function loadData(loader: () => PromiseLike<TableData<T>>): Promise<void>;
  function loadData(loader: TableDataLoader<T>): void | Promise<void>;
  function loadData(loader: TableDataLoader<T>) {
    return loadResolvedData(loader);
  }

  const getData = (): TableData<T> => {
    return toRaw(getCurrentState().data) ?? [];
  };

  const tableController = createController(tableInstance, {
    setState,
    setColumns,
    getColumns,
    setData,
    loadData,
    getData,
  });

  const Table = defineComponent<TableProps<T>>({
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

        if (slot) {
          columnSlotOptions.default = slot;
        }
        const columnSlots = tableColumnSlotNames.reduce<
          Partial<Record<TableColumnSlotName, TableColumnSlot>>
        >((result, key) => {
          const slotName = columnSlotOptions[key];
          const scopedSlot = slotName ? slots[slotName] : undefined;

          if (scopedSlot) {
            result[key] = (scope: ColumnScope<T>) => scopedSlot(scope);
          }
          return result;
        }, {});

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
                resolveRenderProps(render.props, scope.row),
              );
            };
          }
        }

        if (children?.length) {
          columnSlots.default = () =>
            children.map((child, index) => (
              <Column
                key={child.key ?? child.columnKey ?? child.prop ?? index}
                {...child}
              />
            ));
        }
        return <ElTableColumn {...columnProps}>{columnSlots}</ElTableColumn>;
      };

      return () => {
        if (!tableState.value) {
          return null;
        }
        const { columns = [], ...tableProps } = tableState.value;

        return withDirectives(
          <ElTable ref={tableInstance} {...tableProps}>
            {{
              default: () =>
                columns.map((column, index) => (
                  <Column
                    key={column.key ?? column.columnKey ?? column.prop ?? index}
                    {...column}
                  />
                )),
              ...slots,
            }}
          </ElTable>,
          [[vLoading, loading.value]],
        );
      };
    },
  });

  return [Table, tableController] as const;
}
