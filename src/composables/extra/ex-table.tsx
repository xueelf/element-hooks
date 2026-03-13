import {
  type FormInstance,
  type TableInstance,
  ElPagination,
} from 'element-plus';
import { addUnit } from 'element-plus/es/utils/dom/style';
import { isArray, omit } from 'radash';
import { type CSSProperties, defineComponent, onMounted, ref } from 'vue';
import {
  type Camelized,
  type DeepPartial,
  type Recordable,
  createController,
  useState,
} from '@/util';
import { withOptions } from '@/config';
import {
  type FormItem,
  type FormOptions,
  useForm,
} from '@/composables/core/form';
import {
  type TableColumn,
  type TableOptions,
  useTable,
} from '@/composables/core/table';

type PaginationInstance = InstanceType<typeof ElPagination>;

export type PaginationProps = Camelized<
  Omit<PaginationInstance['$props'], 'ref'>
>;

export type PaginationOptions = PaginationProps & {
  props?: {
    result?: string;
    total?: string;
  };
};

export type ExTableData<D extends Recordable> = D[] | Recordable;

export type ExTableOptions<
  D extends Recordable = Recordable,
  M extends Recordable = Recordable,
> = Omit<TableOptions<D>, 'data'> & {
  data?: ExTableData<D>;
  form?: FormOptions<M>;
  pagination?: PaginationOptions;
};

export type ExTableInstance = {
  form: FormInstance | null;
  table: TableInstance | null;
  pagination: PaginationInstance | null;
};

export function useExTable<
  D extends Recordable = Recordable,
  M extends Recordable = Recordable,
>(options: ExTableOptions<D, M> = {}) {
  const { form, pagination, data, ...table } = options;

  const mergedOptions = withOptions({
    table,
    form,
    pagination,
  });

  const [exTableState, setState, initState] = useState<ExTableOptions<D, M>>({
    ...(mergedOptions.table ?? {}),
    data,
    form: mergedOptions.form,
    pagination: mergedOptions.pagination,
  });

  const resolveData = (data?: ExTableData<D>) => {
    if (!data) {
      return { result: undefined, total: 0 };
    }
    if (isArray(data)) {
      return { result: data, total: data.length };
    }
    const { result = 'result', total = 'total' } =
      exTableState.value?.pagination?.props ?? {};

    return {
      result: Reflect.get(data, result),
      total: Reflect.get(data, total),
    };
  };

  const [Form, formController] = useForm<M>();
  const [Table, tableController] = useTable<D>();
  const exTableInstance = ref<ExTableInstance | null>(null);

  const setData = (data: ExTableData<D>) => {
    setState({ data });
  };

  const setItems = (items: FormItem[]) => {
    setState({ form: { items } });
  };

  const setColumns = (columns: TableColumn<D>[]) => {
    setState({ columns });
  };

  const setModel = (model: DeepPartial<M>) => {
    setState({ form: { model } });
  };

  const getModel = () => {
    return formController.getModel();
  };

  const getData = () => {
    return resolveData(exTableState.value?.data).result;
  };

  const getPagination = () => {
    return {
      pageSize: exTableState.value?.pagination?.pageSize,
      currentPage: exTableState.value?.pagination?.currentPage,
    };
  };

  const exTableController = createController(exTableInstance, {
    setState,
    setData,
    setItems,
    setColumns,
    setModel,
    getModel,
    getData,
    getPagination,
  });

  const ExTable = defineComponent({
    name: 'ExTable',
    inheritAttrs: false,
    setup(_, { slots }) {
      initState();

      const paginationRef = ref<PaginationInstance | null>(null);

      onMounted(() => {
        exTableInstance.value = {
          form: formController.instance.value,
          table: tableController.instance.value,
          pagination: paginationRef.value,
        };
      });

      return () => {
        if (!exTableState.value) {
          return null;
        }
        const { data, form, pagination, ...tableOptions } = exTableState.value;
        const { result, total } = resolveData(data);

        const { height, maxHeight, ...tableProps } = tableOptions;

        const hasHeightOption = height !== undefined || maxHeight !== undefined;
        const normalizedTableProps = {
          ...tableProps,
          ...(hasHeightOption ? { height: '100%' } : {}),
          data: result,
        };

        const namedSlots = omit(slots, ['default']);

        const wrapperStyle = {
          display: 'flex',
          flexDirection: 'column',
          height: addUnit(height),
          maxHeight: addUnit(maxHeight),
        } satisfies CSSProperties;

        return (
          <div class="ex-table" style={wrapperStyle}>
            {form && (
              <div style={{ flexShrink: 0 }}>
                <Form {...form}>{namedSlots}</Form>
              </div>
            )}

            <div style={{ flex: 1, minHeight: 0, minWidth: 0 }}>
              <Table {...normalizedTableProps}>{namedSlots}</Table>
            </div>

            {pagination && total > 0 && (
              <div style={{ flexShrink: 0 }}>
                <ElPagination
                  ref={paginationRef}
                  {...pagination}
                  total={total}
                  style={{ marginTop: '18px' }}
                  onUpdate:current-page={(page: number) => {
                    setState({ pagination: { currentPage: page } });
                  }}
                  onUpdate:page-size={(size: number) => {
                    setState({ pagination: { pageSize: size } });
                  }}
                />
              </div>
            )}
          </div>
        );
      };
    },
  });

  return [ExTable, exTableController] as const;
}
