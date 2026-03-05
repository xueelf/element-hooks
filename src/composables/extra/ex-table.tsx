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
  type Recordable,
  createController,
  useState,
} from '../../util';
import { withOptions } from '../../config';
import { type FormItem, type FormOptions, useForm } from '../core/form';
import { type TableColumn, type TableOptions, useTable } from '../core/table';

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

export type ExTableData<T extends Recordable> = T[] | Recordable;

export type ExTableOptions<T extends Recordable> = Omit<
  TableOptions<T>,
  'data'
> & {
  data?: ExTableData<T>;
  form?: FormOptions<Recordable>;
  pagination?: PaginationOptions;
};

export type ExTableInstance = {
  form: FormInstance | null;
  table: TableInstance | null;
  pagination: PaginationInstance | null;
};

export function useExTable<T extends Recordable = Recordable>(
  options: ExTableOptions<T> = {},
) {
  const { form, pagination, data, ...table } = options;

  const mergedOptions = withOptions({
    table,
    form,
    pagination,
  });

  const [exTableState, setState, initState] = useState<ExTableOptions<T>>({
    ...(mergedOptions.table ?? {}),
    data,
    form: mergedOptions.form,
    pagination: mergedOptions.pagination,
  });

  const resolveData = (data?: ExTableData<T>) => {
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

  const [Form, formController] = useForm();
  const [Table, tableController] = useTable<T>();
  const exTableInstance = ref<ExTableInstance | null>(null);

  const setData = (data: ExTableData<T>) => {
    setState({ data });
  };

  const setItems = (items: FormItem[]) => {
    setState({ form: { items } });
  };

  const setColumns = (columns: TableColumn<T>[]) => {
    setState({ columns });
  };

  const setModel = (model: Recordable) => {
    setState({ form: { model } });
  };

  const getModel = () => {
    return formController.getModel();
  };

  const getData = () => {
    return resolveData(exTableState.value?.data).result;
  };

  const getCurrentPage = () => exTableState.value?.pagination?.currentPage;

  const exTableController = createController(exTableInstance, {
    setState,
    setData,
    setItems,
    setColumns,
    setModel,
    getModel,
    getData,
    getCurrentPage,
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
