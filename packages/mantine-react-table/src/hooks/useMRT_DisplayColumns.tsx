import { type RefObject, useMemo, type ReactNode } from 'react';
import { MRT_DefaultDisplayColumn, showExpandColumn } from '../column.utils';
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
  MRT_RowData,
} from '../types';
import { Flex, Tooltip } from '@mantine/core';

interface Params<TData extends MRT_RowData> {
  columnOrder: MRT_ColumnOrderState;
  creatingRow: MRT_Row<TData> | null;
  grouping: MRT_GroupingState;
  tableOptions: MRT_DefinedTableOptions<TData>;
}
export const useMRT_DisplayColumns = <TData extends MRT_RowData>(
  params: Params<TData>,
): MRT_ColumnDef<TData>[] => {
  const { columnOrder, creatingRow, grouping, tableOptions } = params;
  const order = tableOptions.state?.columnOrder ?? columnOrder;

  return useMemo(
    () =>
      [
        makeRowPinColumn,
        makeRowDragColumn,
        makeRowActionsColumn,
        makeRowExpandColumn,
        makeRowSelectColumn,
        makeRowNumbersColumn,
        makeSpacerColumn,
      ]
        .map((makeCol) => makeCol(params, order))
        .filter(Boolean) as MRT_ColumnDef<TData>[],
    [
      columnOrder,
      creatingRow,
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
      tableOptions.groupedColumnMode,
      tableOptions.localization,
      tableOptions.positionActionsColumn,
      tableOptions.renderDetailPanel,
      tableOptions.renderRowActionMenuItems,
      tableOptions.renderRowActions,
      tableOptions.state?.columnOrder,
      tableOptions.state?.grouping,
    ],
  );
};

function defaultDisplayColumnProps<TData extends MRT_RowData>(
  {
    defaultDisplayColumn,
    displayColumnDefOptions,
    localization,
  }: MRT_DefinedTableOptions<TData>,
  id: MRT_DisplayColumnIds,
  header?: keyof MRT_Localization,
  size = 60,
) {
  return {
    ...defaultDisplayColumn,
    header: header ? localization[header]! : '',
    size,
    ...displayColumnDefOptions?.[id],
    id,
  } as const;
}

function makeRowPinColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-pin';
  if (order.includes(id)) {
    return {
      Cell: ({ row, table }) => (
        <MRT_TableBodyRowPinButton row={row} table={table} />
      ),
      ...defaultDisplayColumnProps(tableOptions, id, 'pin'),
    };
  }
  return null;
}

function makeRowDragColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-drag';
  if (order.includes(id)) {
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
  }
  return null;
}

function makeRowActionsColumn<TData extends MRT_RowData>(
  { creatingRow, tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-actions';
  if (
    order.includes(id) ||
    (creatingRow && tableOptions.createDisplayMode === 'row')
  ) {
    return {
      Cell: ({ cell, row, table }) => (
        <MRT_ToggleRowActionMenuButton cell={cell} row={row} table={table} />
      ),
      ...defaultDisplayColumnProps(tableOptions, id, 'actions'),
    };
  }
  return null;
}

function makeRowExpandColumn<TData extends MRT_RowData>(
  { grouping, tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-expand';
  if (
    order.includes(id) &&
    showExpandColumn(tableOptions, tableOptions.state?.grouping ?? grouping)
  ) {
    return {
      Cell: ({ cell, column, row, table }) => {
        const expandButtonProps = { row, table };
        const subRowsLength = row.subRows?.length;
        if (
          tableOptions.groupedColumnMode === 'remove' &&
          row.groupingColumnId
        ) {
          return (
            <Flex align="center" gap="0.25rem">
              <MRT_ExpandButton {...expandButtonProps} />
              <Tooltip
                openDelay={1000}
                position="right"
                label={table.getColumn(row.groupingColumnId).columnDef.header}
              >
                <span>{row.groupingValue as ReactNode}</span>
              </Tooltip>
              {!!subRowsLength && <span>({subRowsLength})</span>}
            </Flex>
          );
        } else {
          return (
            <>
              <MRT_ExpandButton {...expandButtonProps} />
              {column.columnDef.GroupedCell?.({ cell, column, row, table })}
            </>
          );
        }
      },
      Header: tableOptions.enableExpandAll
        ? ({ table }) => {
            return (
              <Flex align="center">
                <MRT_ExpandAllButton table={table} />
                {tableOptions.groupedColumnMode === 'remove' &&
                  grouping
                    .map(
                      (groupedColumnId) =>
                        table.getColumn(groupedColumnId).columnDef.header,
                    )
                    .join(', ')}
              </Flex>
            );
          }
        : undefined,
      ...defaultDisplayColumnProps(
        tableOptions,
        id,
        'expand',
        tableOptions.groupedColumnMode === 'remove'
          ? tableOptions?.defaultColumn?.size
          : 60,
      ),
    };
  }
  return null;
}

function makeRowSelectColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-select';
  if (order.includes(id)) {
    return {
      Cell: ({ row, staticRowIndex, table }) => (
        <MRT_SelectCheckbox
          row={row}
          staticRowIndex={staticRowIndex}
          table={table}
        />
      ),
      Header:
        tableOptions.enableSelectAll && tableOptions.enableMultiRowSelection
          ? ({ table }) => <MRT_SelectCheckbox selectAll table={table} />
          : undefined,
      ...defaultDisplayColumnProps(tableOptions, id, 'select'),
    };
  }
  return null;
}

function makeRowNumbersColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-numbers';
  if (order.includes(id) || tableOptions.enableRowNumbers)
    return {
      Cell: ({ row, staticRowIndex }) =>
        ((tableOptions.rowNumberDisplayMode === 'static'
          ? staticRowIndex
          : row.index) ?? 0) + 1,
      Header: () => tableOptions.localization.rowNumber,
      ...defaultDisplayColumnProps(tableOptions, id, 'rowNumbers'),
    };
  return null;
}

const blankColProps = {
  children: null,
  style: {
    flex: '1 0 auto',
    minWidth: 0,
    padding: 0,
    width: 0,
  },
};

function makeSpacerColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-spacer';
  if (order.includes(id)) {
    return {
      ...defaultDisplayColumnProps(tableOptions, id, undefined, 0),
      ...MRT_DefaultDisplayColumn,
      mantineTableBodyCellProps: blankColProps,
      mantineTableFooterCellProps: blankColProps,
      mantineTableHeadCellProps: blankColProps,
    };
  }
  return null;
}
