import {
  type FormInstance,
  type TableInstance,
  ElPagination,
  vLoading,
} from 'element-plus';
import { addUnit } from 'element-plus/es/utils/dom/style';
import { type Slot, computed, defineComponent, ref, withDirectives } from 'vue';

import { type FormOptions, useForm } from '#/composables/form';
import { type TableOptions, useTable } from '#/composables/table';
import { withOptions } from '#/config';
import { type HookComponentProps, HOOK_METADATA } from '#/devtools';
import {
  type Awaitable,
  type Camelized,
  type Recordable,
  type Setter,
  createController,
  unwrapSetter,
  useDataSetter,
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

export type GridResponse = Recordable;

export type GridData<D extends object> = D[] | GridResponse;

export type GridPaginationPayload = {
  currentPage?: number;
  pageSize?: number;
};

export type GridDataPayload<M extends object> = Omit<
  M,
  keyof GridPaginationPayload
> &
  GridPaginationPayload;

export type GridDataCallback<D extends object, M extends object> = (
  payload: GridDataPayload<M>,
) => Awaitable<GridData<D>>;

export type GridOptions<
  D extends object = Recordable,
  M extends object = Recordable,
> = Omit<TableOptions<D>, 'data' | 'height' | 'maxHeight'> & {
  data?: GridData<D>;
  height?: string | number;
  maxHeight?: string | number;
  form?: FormOptions<M>;
  pagination?: PaginationOptions;
};

export type GridProps<
  D extends object = Recordable,
  M extends object = Recordable,
> = HookComponentProps<GridOptions<D, M>>;

export type GridInstance = {
  form: FormInstance | null;
  table: TableInstance | null;
  pagination: PaginationInstance | null;
};

function mergePayload<M extends object>(
  model: M | null,
  pagination: GridPaginationPayload,
): GridDataPayload<M>;
function mergePayload(model: object | null, pagination: GridPaginationPayload) {
  return { ...(model ?? {}), ...pagination };
}

export function useGrid<
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
    const resolvedData = source[result];
    const resolvedTotal = source[total];

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

  const getPagination = (): GridPaginationPayload => {
    const paginationState = getCurrentState().pagination;

    return {
      currentPage: paginationState?.currentPage,
      pageSize: paginationState?.pageSize,
    };
  };

  const { loading, setData: setResolvedData } = useDataSetter<
    GridData<D>,
    GridDataPayload<M>
  >(
    data => {
      setState(prev => ({ ...prev, data }));
    },
    () => mergePayload(getModel(), getPagination()),
  );

  function setData(nextData: GridData<D>): void;
  function setData(
    callback: (payload: GridDataPayload<M>) => GridData<D>,
  ): void;
  function setData(
    callback: (payload: GridDataPayload<M>) => PromiseLike<GridData<D>>,
  ): Promise<void>;
  function setData(callback: GridDataCallback<D, M>): void | Promise<void>;
  function setData(
    dataOrCallback: GridData<D> | GridDataCallback<D, M>,
  ): void | Promise<void> {
    return setResolvedData(dataOrCallback);
  }

  const setItems: Setter<
    NonNullable<typeof options.form>['items']
  > = update => {
    setState(prev => ({
      ...prev,
      form: { ...prev.form, items: unwrapSetter(update, prev.form?.items) },
    }));
  };

  const setColumns: Setter<(typeof options)['columns']> = update => {
    setState(prev => ({
      ...prev,
      columns: unwrapSetter(update, prev.columns),
    }));
  };

  const setModel: Setter<M | null> = update => {
    const nextModel = unwrapSetter(update, getModel());

    setState(prev => ({
      ...prev,
      form: {
        ...prev.form,
        model: nextModel ?? undefined,
      },
    }));
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
