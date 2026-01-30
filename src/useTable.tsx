import {
  ElTable,
  ElTableColumn,
  type TableColumnCtx,
  type TableInstance,
} from 'element-plus';
import { defineComponent, computed, ref } from 'vue';
import { createInstanceActions } from './util';

export type TableColumn<T extends Recordable> = Partial<
  Omit<TableColumnCtx<T>, 'children'>
> & {
  slot?: string;
  children?: TableColumn<T>[];
};
// store, _self, column, row, $index, cellIndex, expanded
export type ColumnScope<T extends Recordable> = {
  store: Recordable;
  _self: Recordable;
  column: TableColumnCtx<T>;
  row: T;
  $index: number;
  cellIndex: number;
  expanded: Recordable;
};
export type TableOptions<T extends Recordable> = Camelized<
  Omit<TableInstance['$props'], 'ref' | 'data' | 'columns'>
> & {
  data?: T[];
  columns?: TableColumn<T>[];
};

export function useTable<T extends Recordable = Recordable>(
  options: TableOptions<T>,
) {
  const instanceRef = ref<TableInstance | null>(null);
  const instanceActions = createInstanceActions<TableInstance>(instanceRef);

  const Table = defineComponent<typeof options>({
    name: 'Table',
    setup(props, { attrs, slots }) {
      const optionsState = computed(() => {
        const { columns, ...rest } = options;

        return {
          columns,
          props: { ...rest, ...props, ...attrs },
        };
      });
      const Column = (columnProps: TableColumn<T>) => {
        const { slot, children, ...rest } = columnProps;

        if (slot) {
          return (
            <ElTableColumn {...rest}>
              {{
                default: (scope: ColumnScope<T>) => <>{slots[slot]?.(scope)}</>,
              }}
            </ElTableColumn>
          );
        } else if (Array.isArray(children)) {
          return (
            <ElTableColumn {...rest}>
              {{
                default: () => children.map(child => <Column {...child} />),
              }}
            </ElTableColumn>
          );
        }
        return <ElTableColumn {...rest} />;
      };

      return () => (
        <>
          <ElTable ref={instanceRef} {...optionsState.value.props}>
            {optionsState.value.columns?.map(column => (
              <Column {...column} />
            ))}
          </ElTable>
        </>
      );
    },
  });

  return [Table, instanceActions] as const;
}
