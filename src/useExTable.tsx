import {
  type FormInstance,
  type TableInstance,
  ElPagination,
} from 'element-plus';
import { isArray } from 'radash';
import { defineComponent, onMounted, ref } from 'vue';
import {
  type Camelized,
  type Recordable,
  createController,
  useState,
} from './util';
import { type FormItem, type FormOptions, useForm } from './useForm';
import { type TableColumn, type TableOptions, useTable } from './useTable';

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
  const [exTableState, setState, initState] =
    useState<ExTableOptions<T>>(options);

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
        const tableProps = { ...tableOptions, data: result };

        const namedSlots = Object.fromEntries(
          Object.entries(slots).filter(([key]) => key !== 'default'),
        );

        return (
          <>
            {form && <Form {...form}>{namedSlots}</Form>}
            <Table {...tableProps}>{namedSlots}</Table>
            {pagination && total > 0 && (
              <ElPagination
                ref={paginationRef}
                {...pagination}
                total={total}
                onUpdate:current-page={(page: number) => {
                  setState({ pagination: { currentPage: page } });
                }}
                onUpdate:page-size={(size: number) => {
                  setState({ pagination: { pageSize: size } });
                }}
              />
            )}
          </>
        );
      };
    },
  });

  return [ExTable, exTableController] as const;
}
