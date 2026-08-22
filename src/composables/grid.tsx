import {
  type FormInstance,
  type TableInstance,
  ElPagination,
  useGlobalSize,
  useNamespace,
  vLoading,
} from 'element-plus';
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

export type PaginationOptions = Omit<
  PaginationProps,
  'defaultCurrentPage' | 'defaultPageSize' | 'pageCount' | 'total'
> & {
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

type GridBaseOptions<D extends object> = Omit<
  TableOptions<D>,
  'columns' | 'data' | 'height' | 'maxHeight'
> & {
  columns?: TableColumn<D>[];
  data?: GridData<D>;
  height?: string | number;
  maxHeight?: string | number;
  pagination?: PaginationOptions;
};

type GridOptionsWithoutForm<D extends object> = GridBaseOptions<D> & {
  form?: never;
};

type DefaultGridOptions = Omit<GridOptionsWithoutForm<object>, 'data'> & {
  data?: never[];
};

type GridOptionsWithForm<
  D extends object,
  M extends object,
> = GridBaseOptions<D> & {
  form: FormOptions<M>;
};

export type GridOptions<D extends object = object, M extends object = never> = [
  M,
] extends [never]
  ? GridOptionsWithoutForm<D>
  : GridOptionsWithForm<D, M>;

type GridState<D extends object, M extends object> = GridBaseOptions<D> & {
  form?: FormOptions<M>;
};

export type GridProps<
  D extends object = object,
  M extends object = never,
> = HookComponentProps<GridState<D, M>>;

type GridResult<D extends object, M extends object> = ReturnType<
  typeof createGrid<[D] extends [never] ? object : D, M>
>;

export type GridInstance = {
  form: FormInstance | null;
  table: TableInstance;
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

export function useGrid<D extends object, M extends object>(
  options: GridOptionsWithForm<D, M>,
): GridResult<D, M>;
export function useGrid(
  options?: DefaultGridOptions,
): GridResult<object, never>;
export function useGrid<D extends object>(
  options?: GridOptionsWithoutForm<D>,
): GridResult<D, never>;
export function useGrid<D extends object = object, M extends object = object>(
  options?: GridOptionsWithForm<D, M> | GridOptionsWithoutForm<D>,
): readonly [unknown, unknown] {
  return createGrid(options);
}

function createGrid<D extends object = object, M extends object = never>(
  options: GridOptionsWithForm<D, M> | GridOptionsWithoutForm<D> = {},
) {
  const name = 'Grid';
  const { form, pagination, data, ...table } = options;
  const tableOptions = withOptions(table, 'table');
  const formOptions = form ? withOptions(form, 'form') : undefined;
  const paginationOptions = pagination
    ? withOptions(pagination, 'pagination')
    : undefined;

  const [gridState, setGridState, initState, getCurrentState] = useState<
    GridState<D, M>
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
  const gridInstance = computed<GridInstance | null>(() => {
    const table = tableController.instance.value;

    return table
      ? {
          form: formController.instance.value,
          table,
          pagination: paginationRef.value,
        }
      : null;
  });

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
      setGridState(prev => ({ ...prev, data }));
    },
    () => createLoadParams(getModel(), getPagination()),
  );

  const setData: Setter<GridData<D>> = update => {
    setResolvedData(unwrapSetter(update, getCurrentState().data ?? []));
  };

  const setItems: Setter<FormItem<M>[]> = update => {
    setGridState(prev => {
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
    setGridState(prev => ({
      ...prev,
      columns: unwrapSetter(update, prev.columns ?? []),
    }));
  };

  const setModel: Setter<M> = update => {
    setGridState(prev => {
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
    setGridState(prev => ({
      ...prev,
      pagination: { ...prev.pagination, ...update },
    }));
  };

  const getData = (): D[] => {
    return resolveData(getCurrentState().data).result;
  };

  const setState: Setter<GridOptions<D, M>> = update => {
    setGridState(prev => unwrapSetter(update, prev as GridOptions<D, M>));
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
      const globalSize = useGlobalSize();
      const formItemNamespace = useNamespace('form-item');

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

        /*
         * 分页与表格的间距沿用当前尺寸下
         * FormItem 的 margin-bottom。
         */
        const formItemSize = formOptions?.size || globalSize.value || 'default';

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: typeof height === 'number' ? `${height}px` : height,
              maxHeight:
                typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
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
                class={formItemNamespace.m(formItemSize)}
                style={{
                  flexShrink: 0,
                  marginTop: `var(${formItemNamespace.cssVarBlockName(
                    'margin-bottom',
                  )})`,
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
