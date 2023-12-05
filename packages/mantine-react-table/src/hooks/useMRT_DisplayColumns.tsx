import { type RefObject, useMemo } from 'react';
import { showExpandColumn } from '../column.utils';
import { MRT_TableBodyRowPinButton } from '../body/MRT_TableBodyRowPinButton';
import { MRT_TableBodyRowGrabHandle } from '../body';
import { MRT_ExpandAllButton } from '../buttons/MRT_ExpandAllButton';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_ToggleRowActionMenuButton } from '../buttons/MRT_ToggleRowActionMenuButton';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import type {
  MRT_ColumnDef,
  MRT_ColumnOrderState,
  MRT_DefinedTableOptions,
  MRT_DisplayColumnIds,
  MRT_GroupingState,
  MRT_Localization,
  MRT_Row,
} from '../types';

interface Params<TData extends Record<string, any> = {}> {
  creatingRow: MRT_Row<TData> | null;
  columnOrder: MRT_ColumnOrderState;
  grouping: MRT_GroupingState;
  tableOptions: MRT_DefinedTableOptions<TData>;
}

export const useMRT_DisplayColumns = <TData extends Record<string, any> = {}>(
  params: Params<TData>,
) => {
  const { creatingRow, columnOrder, grouping, tableOptions } = params;
  return useMemo(() => {
    const order = tableOptions.state?.columnOrder ?? columnOrder;
    const displayColumns = [
      makePinColumn(params, order),
      makeDragColumn(params, order),
      makeRowActionsColumn(params, order),
      makeExpandColumn(params, order),
      makeRowSelectColumn(params, order),
      makeRowNumbersColumn(params, order),
    ].filter((x) => x) as MRT_ColumnDef<TData>[];
    return displayColumns;
  }, [
    creatingRow,
    columnOrder,
    grouping,
    tableOptions.displayColumnDefOptions,
    tableOptions.editDisplayMode,
    tableOptions.enableColumnDragging,
    tableOptions.enableColumnFilterModes,
    tableOptions.enableColumnOrdering,
    tableOptions.enableEditing,
    tableOptions.enableExpandAll,
    tableOptions.enableExpanding,
    tableOptions.enableGrouping,
    tableOptions.enableRowActions,
    tableOptions.enableRowDragging,
    tableOptions.enableRowNumbers,
    tableOptions.enableRowOrdering,
    tableOptions.enableRowSelection,
    tableOptions.enableSelectAll,
    tableOptions.localization,
    tableOptions.positionActionsColumn,
    tableOptions.renderDetailPanel,
    tableOptions.renderRowActionMenuItems,
    tableOptions.renderRowActions,
    tableOptions.state?.columnOrder,
    tableOptions.state?.grouping,
  ]);
};

function makePinColumn<TData extends Record<string, any> = {}>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | undefined {
  const id: MRT_DisplayColumnIds = 'mrt-row-pin';
  if (order.includes(id))
    return {
      Cell: ({ row, table }) => (
        <MRT_TableBodyRowPinButton row={row} table={table} />
      ),
      ...defaultDisplayColumnProps(tableOptions, id, 'pin'),
    };
  return undefined;
}

function makeDragColumn<TData extends Record<string, any> = {}>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | undefined {
  const id: MRT_DisplayColumnIds = 'mrt-row-drag';
  if (order.includes(id))
    return {
      Cell: ({ row, rowRef, table }) => (
        <MRT_TableBodyRowGrabHandle
          row={row}
          rowRef={rowRef as RefObject<HTMLTableRowElement>}
          table={table}
        />
      ),
      ...defaultDisplayColumnProps(tableOptions, id, 'move'),
    };
  return undefined;
}

function makeRowActionsColumn<TData extends Record<string, any> = {}>(
  { tableOptions, creatingRow }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | undefined {
  const id: MRT_DisplayColumnIds = 'mrt-row-actions';
  if (
    order.includes(id) ||
    (creatingRow && tableOptions.createDisplayMode === 'row') ||
    tableOptions.enableEditing
  )
    return {
      Cell: ({ cell, row, table }) => (
        <MRT_ToggleRowActionMenuButton cell={cell} row={row} table={table} />
      ),
      ...defaultDisplayColumnProps(tableOptions, id, 'actions', 70),
    };
  return undefined;
}

function makeExpandColumn<TData extends Record<string, any> = {}>(
  { tableOptions, grouping }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | undefined {
  const id: MRT_DisplayColumnIds = 'mrt-row-expand';
  if (
    order.includes(id) &&
    showExpandColumn(tableOptions, tableOptions.state?.grouping ?? grouping)
  )
    return {
      Cell: ({ row, table }) => <MRT_ExpandButton row={row} table={table} />,
      Header: tableOptions.enableExpandAll
        ? ({ table }) => <MRT_ExpandAllButton table={table} />
        : null,
      ...defaultDisplayColumnProps(tableOptions, id, 'expand'),
    };
  return undefined;
}

function makeRowSelectColumn<TData extends Record<string, any> = {}>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | undefined {
  const id: MRT_DisplayColumnIds = 'mrt-row-select';
  if (order.includes(id))
    return {
      Cell: ({ row, table }) => <MRT_SelectCheckbox row={row} table={table} />,
      Header:
        tableOptions.enableSelectAll && tableOptions.enableMultiRowSelection
          ? ({ table }) => <MRT_SelectCheckbox selectAll table={table} />
          : null,
      ...defaultDisplayColumnProps(tableOptions, id, 'select'),
    };
  return undefined;
}

function makeRowNumbersColumn<TData extends Record<string, any> = {}>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | undefined {
  const id: MRT_DisplayColumnIds = 'mrt-row-numbers';
  if (order.includes(id) || tableOptions.enableRowNumbers)
    return {
      Cell: ({ row }) => row.index + 1,
      Header: () => tableOptions.localization.rowNumber,
      ...defaultDisplayColumnProps(tableOptions, id, 'rowNumbers'),
    };
  return undefined;
}

function defaultDisplayColumnProps<TData extends Record<string, any> = {}>(
  {
    defaultDisplayColumn,
    displayColumnDefOptions,
    localization,
  }: MRT_DefinedTableOptions<TData>,
  id: MRT_DisplayColumnIds,
  header: keyof MRT_Localization,
  size = 60,
) {
  return {
    size,
    header: localization[header]!,
    ...defaultDisplayColumn,
    ...displayColumnDefOptions?.[id],
    id,
  };
}
