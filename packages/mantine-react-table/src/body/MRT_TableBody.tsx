import { memo, useMemo } from 'react';
import { TableTbody, Text } from '@mantine/core';
import { Memo_MRT_TableBodyRow, MRT_TableBodyRow } from './MRT_TableBodyRow';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_RowData,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_VirtualItem,
  type MRT_ColumnVirtualizer,
} from '../types';
import classes from './MRT_TableBody.module.css';
import clsx from 'clsx';
import { useMRT_Rows } from '../hooks/useMRT_Rows';
import { useMRT_RowVirtualizer } from '../hooks/useMRT_RowVirtualizer';

interface Props<TData extends MRT_RowData> {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  enableHover?: boolean;
  isStriped?: boolean | 'odd' | 'even';
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBody = <TData extends MRT_RowData>({
  columnVirtualizer,
  enableHover,
  isStriped,
  table,
}: Props<TData>) => {
  const {
    getBottomRows,
    getTopRows,
    getIsSomeRowsPinned,
    getRowModel,
    getState,
    options: {
      createDisplayMode,
      layoutMode,
      localization,
      mantineTableBodyProps,
      memoMode,
      renderEmptyRowsFallback,
      rowPinningDisplayMode,
      enableStickyFooter,
      enableStickyHeader,
    },
    refs: { tablePaperRef, tableHeadRef, tableFooterRef },
  } = table;
  const { creatingRow, columnFilters, globalFilter, rowPinning, isFullScreen } =
    getState();

  const tableBodyProps = parseFromValuesOrFunc(mantineTableBodyProps, {
    table,
  });

  const tableHeadHeight =
    ((enableStickyHeader || isFullScreen) &&
      tableHeadRef.current?.clientHeight) ||
    0;
  const tableFooterHeight =
    (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

  const pinnedRowIds = useMemo(() => {
    if (!rowPinning.bottom?.length && !rowPinning.top?.length) return [];
    return getRowModel()
      .rows.filter((row) => row.getIsPinned())
      .map((r) => r.id);
  }, [rowPinning, getRowModel().rows]);

  const rows = useMRT_Rows(table, pinnedRowIds);

  const rowVirtualizer = useMRT_RowVirtualizer(table, rows);

  const { virtualRows } = rowVirtualizer ?? {};

  const commonRowProps = {
    columnVirtualizer,
    numRows: rows.length,
    table,
  };

  const CreatingRow = creatingRow && createDisplayMode === 'row' && (
    <MRT_TableBodyRow {...commonRowProps} row={creatingRow} rowIndex={-1} />
  );

  return (
    <>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('top') && (
          <TableTbody
            {...tableBodyProps}
            style={(theme) => ({
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              position: 'sticky',
              top: tableHeadHeight - 1,
              zIndex: 1,
              ...(parseFromValuesOrFunc(tableBodyProps?.style, theme) as any),
            })}
          >
            {getTopRows().map((row, rowIndex) => {
              const props = {
                ...commonRowProps,
                row,
                rowIndex,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </TableTbody>
        )}
      {rowVirtualizer && CreatingRow && (
        <TableTbody
          {...tableBodyProps}
          style={(theme) => ({
            display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
            ...(parseFromValuesOrFunc(tableBodyProps?.style, theme) as any),
          })}
        >
          {CreatingRow}
        </TableTbody>
      )}
      <TableTbody
        {...tableBodyProps}
        className={clsx(
          classes.root,
          layoutMode?.startsWith('grid') && classes['root-grid'],
          !rows.length && classes['root-no-rows'],
          rowVirtualizer && classes['root-virtualized'],
          tableBodyProps?.className,
        )}
        __vars={{
          '--mrt-table-body-height': rowVirtualizer
            ? `${rowVirtualizer.getTotalSize()}px`
            : undefined,
          ...tableBodyProps?.__vars,
        }}
      >
        {!rowVirtualizer && CreatingRow}
        {tableBodyProps?.children ??
          (!rows.length && !CreatingRow ? (
            <tr
              className={clsx(
                'mrt-table-body-row',
                layoutMode?.startsWith('grid') && classes['empty-row-tr-grid'],
              )}
            >
              <td
                colSpan={table.getVisibleLeafColumns().length}
                className={clsx(
                  'mrt-table-body-cell',
                  layoutMode?.startsWith('grid') &&
                    classes['empty-row-td-grid'],
                )}
              >
                {renderEmptyRowsFallback?.({ table }) ?? (
                  <Text
                    className={clsx(classes['empty-row-td-content'])}
                    __vars={{
                      '--mrt-paper-width': `${tablePaperRef.current?.clientWidth}`,
                    }}
                  >
                    {globalFilter || columnFilters.length
                      ? localization.noResultsFound
                      : localization.noRecordsToDisplay}
                  </Text>
                )}
              </td>
            </tr>
          ) : (
            <>
              {(virtualRows ?? rows).map((rowOrVirtualRow, rowIndex) => {
                const row = rowVirtualizer
                  ? rows[rowOrVirtualRow.index]
                  : (rowOrVirtualRow as MRT_Row<TData>);
                const props = {
                  ...commonRowProps,
                  enableHover,
                  isStriped,
                  measureElement: rowVirtualizer?.measureElement,
                  pinnedRowIds,
                  row,
                  rowIndex: rowVirtualizer ? rowOrVirtualRow.index : rowIndex,
                  virtualRow: rowVirtualizer
                    ? (rowOrVirtualRow as MRT_VirtualItem)
                    : undefined,
                };
                const key = `${row.id}-${row.index}`;
                return memoMode === 'rows' ? (
                  <Memo_MRT_TableBodyRow key={key} {...props} />
                ) : (
                  <MRT_TableBodyRow key={key} {...props} />
                );
              })}
            </>
          ))}
      </TableTbody>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('bottom') && (
          <TableTbody
            {...tableBodyProps}
            style={(theme) => ({
              bottom: tableFooterHeight - 1,
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              position: 'sticky',
              zIndex: 1,
              ...(parseFromValuesOrFunc(tableBodyProps?.style, theme) as any),
            })}
          >
            {getBottomRows().map((row, rowIndex) => {
              const props = {
                ...commonRowProps,
                row,
                rowIndex,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </TableTbody>
        )}
    </>
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof MRT_TableBody;
