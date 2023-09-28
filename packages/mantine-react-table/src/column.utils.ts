import { type ReactNode } from 'react';
import {
  createRow as _createRow,
  flexRender as _flexRender,
  type Renderable,
  type Row,
} from '@tanstack/react-table';
import { type MRT_AggregationFns } from './aggregationFns';
import { type MRT_FilterFns } from './filterFns';
import { type MRT_SortingFns } from './sortingFns';
import {
  type BoxProps,
  type CssVariable,
  type MantineStyleProp,
  type MantineTheme,
} from '@mantine/core';
import {
  type MantineShade,
  type MRT_Column,
  type MRT_ColumnDef,
  type MRT_ColumnOrderState,
  type MRT_DefinedColumnDef,
  type MRT_DisplayColumnIds,
  type MRT_FilterOption,
  type MRT_GroupingState,
  type MRT_Header,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_TableOptions,
} from './types';
import { funcValue } from './funcValue';

import classes from './columns.utils.module.css';

export const getColumnId = <TData extends Record<string, any> = {}>(
  columnDef: MRT_ColumnDef<TData>,
): string =>
  columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;

export const getAllLeafColumnDefs = <TData extends Record<string, any> = {}>(
  columns: MRT_ColumnDef<TData>[],
) => {
  const allLeafColumnDefs: MRT_ColumnDef<TData>[] = [];
  const getLeafColumns = (cols: MRT_ColumnDef<TData>[]) => {
    cols.forEach((col) => {
      if (col.columns) {
        getLeafColumns(col.columns);
      } else {
        allLeafColumnDefs.push(col);
      }
    });
  };
  getLeafColumns(columns);
  return allLeafColumnDefs;
};

export const prepareColumns = <TData extends Record<string, any> = {}>({
  aggregationFns,
  columnDefs,
  columnFilterFns,
  defaultDisplayColumn,
  filterFns,
  sortingFns,
}: {
  aggregationFns: typeof MRT_AggregationFns &
    MRT_TableOptions<TData>['aggregationFns'];
  columnDefs: MRT_ColumnDef<TData>[];
  columnFilterFns: { [key: string]: MRT_FilterOption };
  defaultDisplayColumn: Partial<MRT_ColumnDef<TData>>;
  filterFns: typeof MRT_FilterFns & MRT_TableOptions<TData>['filterFns'];
  sortingFns: typeof MRT_SortingFns & MRT_TableOptions<TData>['sortingFns'];
}): MRT_DefinedColumnDef<TData>[] =>
  columnDefs.map((columnDef) => {
    //assign columnId
    if (!columnDef.id) columnDef.id = getColumnId(columnDef);
    if (process.env.NODE_ENV !== 'production' && !columnDef.id) {
      console.error(
        'Column definitions must have a valid `accessorKey` or `id` property',
      );
    }

    //assign columnDefType
    if (!columnDef.columnDefType) columnDef.columnDefType = 'data';
    if (columnDef.columns?.length) {
      columnDef.columnDefType = 'group';
      //recursively prepare columns if this is a group column
      columnDef.columns = prepareColumns({
        aggregationFns,
        columnDefs: columnDef.columns,
        columnFilterFns,
        defaultDisplayColumn,
        filterFns,
        sortingFns,
      });
    } else if (columnDef.columnDefType === 'data') {
      //assign aggregationFns if multiple aggregationFns are provided
      if (Array.isArray(columnDef.aggregationFn)) {
        const aggFns = columnDef.aggregationFn as string[];
        columnDef.aggregationFn = (
          columnId: string,
          leafRows: Row<TData>[],
          childRows: Row<TData>[],
        ) =>
          aggFns.map(
            (fn) => aggregationFns[fn]?.(columnId, leafRows, childRows),
          );
      }

      //assign filterFns
      if (Object.keys(filterFns).includes(columnFilterFns[columnDef.id])) {
        columnDef.filterFn =
          filterFns[columnFilterFns[columnDef.id]] ?? filterFns.fuzzy;
        (columnDef as MRT_DefinedColumnDef<TData>)._filterFn =
          columnFilterFns[columnDef.id];
      }

      //assign sortingFns
      if (Object.keys(sortingFns).includes(columnDef.sortingFn as string)) {
        // @ts-ignore
        columnDef.sortingFn = sortingFns[columnDef.sortingFn];
      }
    } else if (columnDef.columnDefType === 'display') {
      columnDef = {
        ...(defaultDisplayColumn as MRT_ColumnDef<TData>),
        ...columnDef,
      };
    }
    return columnDef;
  }) as MRT_DefinedColumnDef<TData>[];

export const reorderColumn = <TData extends Record<string, any> = {}>(
  draggedColumn: MRT_Column<TData>,
  targetColumn: MRT_Column<TData>,
  columnOrder: MRT_ColumnOrderState,
): MRT_ColumnOrderState => {
  if (draggedColumn.getCanPin()) {
    draggedColumn.pin(targetColumn.getIsPinned());
  }
  columnOrder.splice(
    columnOrder.indexOf(targetColumn.id),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumn.id), 1)[0],
  );
  return [...columnOrder];
};

export const showExpandColumn = <TData extends Record<string, any> = {}>(
  props: MRT_TableOptions<TData>,
  grouping?: MRT_GroupingState,
) =>
  !!(
    props.enableExpanding ||
    (props.enableGrouping && (grouping === undefined || grouping?.length)) ||
    props.renderDetailPanel
  );

export const getLeadingDisplayColumnIds = <
  TData extends Record<string, any> = {},
>(
  props: MRT_TableOptions<TData>,
) =>
  [
    (props.enableRowDragging || props.enableRowOrdering) && 'mrt-row-drag',
    props.positionActionsColumn === 'first' &&
      (props.enableRowActions ||
        (props.enableEditing &&
          ['row', 'modal', 'custom'].includes(props.editDisplayMode ?? ''))) &&
      'mrt-row-actions',
    props.positionExpandColumn === 'first' &&
      showExpandColumn(props) &&
      'mrt-row-expand',
    props.enableRowSelection && 'mrt-row-select',
    props.enableRowNumbers && 'mrt-row-numbers',
  ].filter(Boolean) as MRT_DisplayColumnIds[];

export const getTrailingDisplayColumnIds = <
  TData extends Record<string, any> = {},
>(
  props: MRT_TableOptions<TData>,
) =>
  [
    props.positionActionsColumn === 'last' &&
      (props.enableRowActions ||
        (props.enableEditing &&
          ['row', 'modal'].includes(props.editDisplayMode ?? ''))) &&
      'mrt-row-actions',
    props.positionExpandColumn === 'last' &&
      showExpandColumn(props) &&
      'mrt-row-expand',
  ].filter(Boolean) as MRT_DisplayColumnIds[];

export const getDefaultColumnOrderIds = <
  TData extends Record<string, any> = {},
>(
  props: MRT_TableOptions<TData>,
) => {
  const leadingDisplayCols: string[] = getLeadingDisplayColumnIds(props);
  const trailingDisplayCols: string[] = getTrailingDisplayColumnIds(props);
  const allLeafColumnDefs = getAllLeafColumnDefs(props.columns)
    .map((columnDef) => getColumnId(columnDef))
    .filter(
      (columnId) =>
        !leadingDisplayCols.includes(columnId) &&
        !trailingDisplayCols.includes(columnId),
    );
  return [...leadingDisplayCols, ...allLeafColumnDefs, ...trailingDisplayCols];
};

export const getDefaultColumnFilterFn = <
  TData extends Record<string, any> = {},
>(
  columnDef: MRT_ColumnDef<TData>,
): MRT_FilterOption => {
  const { filterVariant } = columnDef;
  if (filterVariant === 'multi-select') return 'arrIncludesSome';
  if (['range', 'date-range', 'range-slider'].includes(filterVariant || ''))
    return 'betweenInclusive';
  if (['select', 'checkbox', 'date'].includes(filterVariant || ''))
    return 'equals';
  return 'fuzzy';
};

export const getIsFirstColumn = <TData extends Record<string, any> = {}>(
  column: MRT_Column<TData>,
  table: MRT_TableInstance<TData>,
) => {
  return table.getVisibleLeafColumns()[0].id === column.id;
};

export const getIsLastColumn = <TData extends Record<string, any> = {}>(
  column: MRT_Column<TData>,
  table: MRT_TableInstance<TData>,
) => {
  const columns = table.getVisibleLeafColumns();
  return columns[columns.length - 1].id === column.id;
};

export const getIsLastLeftPinnedColumn = <
  TData extends Record<string, any> = {},
>(
  table: MRT_TableInstance<TData>,
  column: MRT_Column<TData>,
) => {
  return (
    column.getIsPinned() === 'left' &&
    table.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
  );
};

export const getIsFirstRightPinnedColumn = <
  TData extends Record<string, any> = {},
>(
  column: MRT_Column<TData>,
) => {
  return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
};

export const getTotalRight = <TData extends Record<string, any> = {}>(
  table: MRT_TableInstance<TData>,
  column: MRT_Column<TData>,
) => {
  return table
    .getRightLeafHeaders()
    .slice(column.getPinnedIndex() + 1)
    .reduce((acc, col) => acc + col.getSize(), 0);
};

export const getCanRankRows = <TData extends Record<string, any> = {}>(
  table: MRT_TableInstance<TData>,
) => {
  const { options, getState } = table;
  const {
    manualExpanding,
    manualFiltering,
    manualGrouping,
    manualSorting,
    enableGlobalFilterRankedResults,
  } = options;
  const { globalFilterFn, expanded } = getState();

  return (
    !manualExpanding &&
    !manualFiltering &&
    !manualGrouping &&
    !manualSorting &&
    enableGlobalFilterRankedResults &&
    globalFilterFn === 'fuzzy' &&
    expanded !== true &&
    !Object.values(expanded).some(Boolean)
  );
};

export const getCommonCellStyles = <TData extends Record<string, any> = {}>({
  column,
  header,
  table,
  tableCellProps,
  theme,
}: {
  column: MRT_Column<TData>;
  header?: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
  tableCellProps: BoxProps;
  theme: MantineTheme;
}): { className: string; style: MantineStyleProp } => {
  const __vars: Record<CssVariable, string | undefined> = {};
  __vars['--header-id'] = `var(--${header ? 'header' : 'col'}-${parseCSSVarId(
    header?.id ?? column.id,
  )}-size)`;
  const widthStyles = {
    minWidth: `max(calc(var(--header-id) * 1px), ${
      column.columnDef.minSize ?? 30
    }px)`,
    width: `calc(var(--header-id) * 1px)`,
  };
  __vars['--col-size'] = `${column.columnDef.minSize ?? 30}px`;
  __vars['--box-shadow'] = getIsLastLeftPinnedColumn(table, column)
    ? '-4px 0 8px -6px rgba(var(--mantine-color-black, 0.2)) inset'
    : getIsFirstRightPinnedColumn(column)
    ? `4px 0 8px -6px rgba(var(--mantine-color-black, 0.2)) inset`
    : 'transparent';
  __vars['--display'] =
    table.options.layoutMode === 'grid' ? 'flex' : 'table-cell';

  __vars['--flex'] =
    table.options.layoutMode === 'grid' ? 'var(--header-id) 0 auto' : '';
  __vars['--left'] = `${column.getStart('left')}px`;
  __vars['--ml'] =
    table.options.enableColumnVirtualization &&
    column.getIsPinned() === 'left' &&
    column.getPinnedIndex() === 0
      ? `-${
          column.getSize() * (table.getState().columnPinning.left?.length ?? 1)
        }px`
      : undefined;
  __vars['--mr'] =
    table.options.enableColumnVirtualization &&
    column.getIsPinned() === 'right' &&
    column.getPinnedIndex() === table.getVisibleLeafColumns().length - 1
      ? `-${
          column.getSize() *
          (table.getState().columnPinning.right?.length ?? 1) *
          1.2
        }px`
      : undefined;
  __vars['--opacity'] =
    table.getState().draggingColumn?.id === column.id ||
    table.getState().hoveredColumn?.id === column.id
      ? '0.5'
      : '1';
  __vars['--right'] =
    column.getIsPinned() === 'right'
      ? `${getTotalRight(table, column)}px`
      : undefined;
  __vars['--transition'] = table.options.enableColumnVirtualization
    ? 'none'
    : `padding 100ms ease-in-out`;

  const style = {
    ...__vars,
    ...(!table.options.enableColumnResizing && widthStyles), //let devs pass in width styles if column resizing is disabled
    ...funcValue(tableCellProps?.style, theme),
    ...(table.options.enableColumnResizing && widthStyles), //do not let devs pass in width styles if column resizing is enabled
  };
  return {
    className: classes.MRT_Column_Common,
    style,
  };
};

export const MRT_DefaultColumn = {
  filterVariant: 'text',
  minSize: 40,
  maxSize: 1000,
  size: 180,
} as const;

export const MRT_DefaultDisplayColumn = {
  columnDefType: 'display',
  enableClickToCopy: false,
  enableColumnActions: false,
  enableColumnDragging: false,
  enableColumnFilter: false,
  enableColumnOrdering: false,
  enableEditing: false,
  enableGlobalFilter: false,
  enableGrouping: false,
  enableHiding: false,
  enableResizing: false,
  enableSorting: false,
} as const;

export const parseCSSVarId = (id: string) => id.replace(/[^a-zA-Z0-9]/g, '_');

export const getPrimaryShade = (theme: MantineTheme): number =>
  typeof theme.primaryShade === 'number'
    ? theme.primaryShade
    : theme.primaryShade?.dark ?? 7;
// TODO: where is colorScheme?
// (theme.colorScheme === 'dark'
//   ? // @ts-ignore
//     theme.primaryShade?.dark ?? theme.primaryShade
//   : // @ts-ignore
//     theme.primaryShade?.light ?? theme.primaryShade) ?? 7;

export const getPrimaryColor = (
  theme: MantineTheme,
  shade?: MantineShade,
): string => theme.colors[theme.primaryColor][shade ?? getPrimaryShade(theme)];
export const flexRender = _flexRender as (
  Comp: Renderable<any>,
  props: any,
) => ReactNode | JSX.Element;

export const createRow = <TData extends Record<string, any> = {}>(
  table: MRT_TableInstance<TData>,
  originalRow?: TData,
): MRT_Row<TData> =>
  _createRow(
    table as any,
    'mrt-row-create',
    originalRow ??
      Object.assign(
        {},
        ...getAllLeafColumnDefs(table.options.columns)
          .filter((c) => c.columnDefType === 'data')
          .map((col) => ({
            [getColumnId(col)]: '',
          })),
      ),
    -1,
    0,
  ) as MRT_Row<TData>;
