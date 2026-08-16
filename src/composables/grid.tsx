import {
  type FormInstance,
  type TableInstance,
  ElPagination,
  vLoading,
} from 'element-plus';
import { addUnit } from 'element-plus/es/utils/dom/style';
import { type Slot, computed, defineComponent, ref, withDirectives } from 'vue';

import { type FormItem, type FormOptions, useForm } from '#/composables/form';
import {
  type TableColumn,
  type TableOptions,
  useTable,
} from '#/composables/table';
import { withOptions } from '#/config';
import { type HookComponentProps, HOOK_METADATA } from '#/devtools';
import {
  type Awaitable,
  type Camelized,
  type Recordable,
  type SetRequired,
  type Setter,
  createController,
  unwrapSetter,
  useDataLoader,
  useState,
} from '#/util';

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

export type GridResponse = object;

export type GridData<D extends object> = D[] | GridResponse;

export type GridPaginationParams = {
  currentPage: number;
  pageSize: number;
};

export type GridLoadParams<M extends object> = [M] extends [never]
  ? GridPaginationParams
  : Omit<M, keyof GridPaginationParams> & GridPaginationParams;

export type GridDataLoader<D extends object, M extends object> = (
  params: GridLoadParams<M>,
) => Awaitable<GridData<D>>;

export type GridOptions<
  D extends object = Recordable,
  M extends object = Recordable,
> = Omit<TableOptions<D>, 'columns' | 'data' | 'height' | 'maxHeight'> & {
  columns?: TableColumn<D>[];
  data?: GridData<D>;
  height?: string | number;
  maxHeight?: string | number;
  form?: SetRequired<FormOptions<M>, 'model'>;
  pagination?: PaginationOptions;
};

export type GridProps<
  D extends object = Recordable,
  M extends object = Recordable,
> = HookComponentProps<GridOptions<D, M>>;

type GridOptionsWithoutForm<D extends object> = Omit<
  GridOptions<D, never>,
  'form'
> & { form?: never };

type GridOptionsWithForm<D extends object, M extends object> = SetRequired<
  GridOptions<D, M>,
  'form'
>;

type GridResult<D extends object, M extends object> = ReturnType<
  typeof createGrid<D, M>
>;

export type GridInstance = {
  form: FormInstance | null;
  table: TableInstance | null;
  pagination: PaginationInstance | null;
};

function createLoadParams<M extends object>(
  model: M | null,
  pagination: GridPaginationParams,
): GridLoadParams<M>;
function createLoadParams(
  model: object | null,
  pagination: GridPaginationParams,
) {
  return { ...(model ?? {}), ...pagination };
}

export function useGrid<
  D extends object = Recordable,
  M extends object = Recordable,
>(options: GridOptionsWithForm<D, M>): GridResult<D, M>;
export function useGrid<D extends object = Recordable>(
  options?: GridOptionsWithoutForm<D>,
): GridResult<D, never>;
export function useGrid<
  D extends object = Recordable,
  M extends object = Recordable,
>(
  options?: GridOptionsWithForm<D, M> | GridOptionsWithoutForm<D>,
): GridResult<D, M> | GridResult<D, never> {
  return createGrid(options);
}

function createGrid<
  D extends object = Recordable,
  M extends object = Recordable,
>(options: GridOptions<D, M> = {}) {
  const name = 'Grid';
  const { form, pagination, data, ...table } = options;
  const tableOptions = withOptions(table, 'table');
  const formOptions = form ? withOptions(form, 'form') : undefined;
  const paginationOptions = pagination
    ? withOptions(pagination, 'pagination')
    : undefined;

  const [gridState, setState, initState, getCurrentState] = useState<
    GridOptions<D, M>
  >({
    ...tableOptions,
    [HOOK_METADATA]: {
      name,
      internal: false,
    },
    data,
    form: formOptions,
    pagination: paginationOptions,
  });

  const resolveData = (
    source?: GridData<D>,
  ): { result: D[]; total: number } => {
    if (!source) {
      return { result: [], total: 0 };
    }
    if (Array.isArray(source)) {
      return { result: source, total: source.length };
    }
    const { result = 'result', total = 'total' } =
      getCurrentState().pagination?.props ?? {};
    const resolvedData = Reflect.get(source, result);
    const resolvedTotal = Reflect.get(source, total);

    return {
      result: Array.isArray(resolvedData) ? resolvedData : [],
      total: typeof resolvedTotal === 'number' ? resolvedTotal : 0,
    };
  };

  const [Form, formController] = useForm<M>({
    [HOOK_METADATA]: {
      internal: true,
    },
  });
  const [Table, tableController] = useTable<D>({
    [HOOK_METADATA]: {
      internal: true,
    },
  });
  const paginationRef = ref<PaginationInstance | null>(null);
  const gridInstance = computed<GridInstance>(() => ({
    form: formController.instance.value,
    table: tableController.instance.value,
    pagination: paginationRef.value,
  }));

  const getModel = (): M | null => {
    return getCurrentState().form?.model ?? null;
  };

  const getPagination = (): GridPaginationParams => {
    const pagination = getCurrentState().pagination;

    return {
      currentPage: pagination?.currentPage ?? 1,
      pageSize: pagination?.pageSize ?? 10,
    };
  };

  const {
    loading,
    setData: setResolvedData,
    loadData,
  } = useDataLoader<GridData<D>, GridLoadParams<M>>(
    data => {
      setState(prev => ({ ...prev, data }));
    },
    () => createLoadParams(getModel(), getPagination()),
  );

  const setData: Setter<GridData<D>> = update => {
    setResolvedData(unwrapSetter(update, getCurrentState().data ?? []));
  };

  const setItems: Setter<FormItem<M>[]> = update => {
    setState(prev => {
      if (!prev.form) {
        throw new Error('[useGrid] Cannot update items without a form.');
      }
      return {
        ...prev,
        form: {
          ...prev.form,
          items: unwrapSetter(update, prev.form.items ?? []),
        },
      };
    });
  };

  const setColumns: Setter<TableColumn<D>[]> = update => {
    setState(prev => ({
      ...prev,
      columns: unwrapSetter(update, prev.columns ?? []),
    }));
  };

  const setModel: Setter<M> = update => {
    setState(prev => {
      if (prev.form?.model === undefined) {
        if (typeof update === 'function') {
          throw new Error('[useGrid] Cannot update an uninitialized model.');
        }
        return { ...prev, form: { ...prev.form, model: update } };
      }
      return {
        ...prev,
        form: {
          ...prev.form,
          model: unwrapSetter(update, prev.form.model),
        },
      };
    });
  };

  const updatePagination = (
    update: Partial<Pick<PaginationOptions, 'currentPage' | 'pageSize'>>,
  ) => {
    setState(prev => ({
      ...prev,
      pagination: { ...prev.pagination, ...update },
    }));
  };

  const getData = (): D[] => {
    return resolveData(getCurrentState().data).result;
  };

  const gridController = createController(gridInstance, {
    setState,
    setData,
    loadData,
    setItems,
    setColumns,
    setModel,
    getModel,
    getData,
    getPagination,
  });

  const Grid = defineComponent<GridProps<D, M>>({
    name,
    inheritAttrs: false,
    setup(_, { slots }) {
      initState();

      return () => {
        if (!gridState.value) {
          return null;
        }
        const {
          data: currentData,
          form: formOptions,
          pagination: paginationOptions,
          ...tableOptions
        } = gridState.value;
        const { result, total } = resolveData(currentData);
        const { height, maxHeight, ...tableProps } = tableOptions;
        const normalizedTableProps = {
          ...tableProps,
          ...(height === undefined ? {} : { height: '100%' }),
          ...(maxHeight === undefined ? {} : { maxHeight: '100%' }),
          data: result,
        };
        const formSlots: Record<string, Slot> = {};

        for (const [slotName, slot] of Object.entries(slots)) {
          if (slotName !== 'default' && slot) {
            formSlots[slotName] = scope =>
              slot({ ...scope, loading: loading.value });
          }
        }

        const {
          props: _mapping,
          style: paginationStyle,
          disabled: paginationDisabled,
          'onUpdate:currentPage': onUpdateCurrentPage,
          'onUpdate:pageSize': onUpdatePageSize,
          ...paginationProps
        } = paginationOptions ?? {};

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: addUnit(height),
              maxHeight: addUnit(maxHeight),
            }}
          >
            {formOptions && (
              <Form
                {...formOptions}
                style={[formOptions.style, { flexShrink: 0 }]}
              >
                {formSlots}
              </Form>
            )}

            {withDirectives(
              <div style={{ flex: 1, minHeight: 0, minWidth: 0 }}>
                <Table {...normalizedTableProps}>{slots}</Table>
              </div>,
              [[vLoading, loading.value]],
            )}
            {paginationOptions && total > 0 && (
              <div
                style={{
                  flexShrink: 0,
                  /*
                   * 与 Element Plus FormItem 默认的 margin-bottom 保持一致。
                   * Element Plus 未提供对应的 CSS 变量。
                   */
                  marginTop: '18px',
                }}
              >
                <ElPagination
                  ref={paginationRef}
                  {...paginationProps}
                  total={total}
                  disabled={paginationDisabled || loading.value}
                  style={paginationStyle}
                  onUpdate:current-page={(page: number) => {
                    updatePagination({ currentPage: page });
                    onUpdateCurrentPage?.(page);
                  }}
                  onUpdate:page-size={(size: number) => {
                    updatePagination({ pageSize: size });
                    onUpdatePageSize?.(size);
                  }}
                />
              </div>
            )}
          </div>
        );
      };
    },
  });

  return [Grid, gridController] as const;
}
