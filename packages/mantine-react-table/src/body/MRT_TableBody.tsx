import { memo, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box, Text } from '@mantine/core';
import { Memo_MRT_TableBodyRow, MRT_TableBodyRow } from './MRT_TableBodyRow';
import { rankGlobalFuzzy } from '../sortingFns';
import { getCanRankRows, parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_VirtualItem,
  type MRT_Virtualizer,
} from '../types';
import classes from './MRT_TableBody.module.css';
import clsx from 'clsx';

interface Props<TData extends Record<string, any> = {}> {
  columnVirtualizer?: MRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  enableHover?: boolean;
  isStriped?: boolean | 'odd' | 'even';
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableBody = <TData extends Record<string, any> = {}>({
  columnVirtualizer,
  enableHover,
  isStriped,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    getRowModel,
    getPrePaginationRowModel,
    getState,
    options: {
      createDisplayMode,
      enableGlobalFilterRankedResults,
      enablePagination,
      enableRowVirtualization,
      layoutMode,
      localization,
      mantineTableBodyProps,
      manualExpanding,
      manualFiltering,
      manualGrouping,
      manualPagination,
      manualSorting,
      memoMode,
      renderEmptyRowsFallback,
      rowVirtualizerInstanceRef,
      rowVirtualizerProps,
    },
    refs: { tableContainerRef, tablePaperRef },
  } = table;
  const {
    creatingRow,
    columnFilters,
    density,
    expanded,
    globalFilter,
    pagination,
    sorting,
  } = getState();

  const tableBodyProps = parseFromValuesOrFunc(mantineTableBodyProps, {
    table,
  });

  const vProps = parseFromValuesOrFunc(rowVirtualizerProps, { table });

  const shouldRankRows = useMemo(
    () =>
      getCanRankRows(table) &&
      !Object.values(sorting).some(Boolean) &&
      globalFilter,
    [
      enableGlobalFilterRankedResults,
      expanded,
      globalFilter,
      manualExpanding,
      manualFiltering,
      manualGrouping,
      manualSorting,
      sorting,
    ],
  );

  const rows = useMemo(() => {
    if (!shouldRankRows) return getRowModel().rows;
    const rankedRows = getPrePaginationRowModel().rows.sort((a, b) =>
      rankGlobalFuzzy(a, b),
    );
    if (enablePagination && !manualPagination) {
      const start = pagination.pageIndex * pagination.pageSize;
      return rankedRows.slice(start, start + pagination.pageSize);
    }
    return rankedRows;
  }, [
    shouldRankRows,
    shouldRankRows ? getPrePaginationRowModel().rows : getRowModel().rows,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  const rowVirtualizer:
    | MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>
    | undefined = enableRowVirtualization
    ? useVirtualizer({
        count: rows.length,
        estimateSize: () =>
          density === 'xs' ? 42.7 : density === 'md' ? 54.7 : 70.7,
        getScrollElement: () => tableContainerRef.current,
        measureElement:
          typeof window !== 'undefined' &&
          navigator.userAgent.indexOf('Firefox') === -1
            ? (element) => element?.getBoundingClientRect().height
            : undefined,
        overscan: 4,
        ...vProps,
      })
    : undefined;

  if (rowVirtualizerInstanceRef && rowVirtualizer) {
    rowVirtualizerInstanceRef.current = rowVirtualizer;
  }

  const virtualRows = rowVirtualizer
    ? rowVirtualizer.getVirtualItems()
    : undefined;

  return (
    <Box
      component="tbody"
      {...tableBodyProps}
      className={clsx(
        'mrt-table-body',
        classes.root,
        layoutMode === 'grid' && classes['root-grid'],
        !rows.length && classes['root-no-rows'],
        rowVirtualizer && classes['root-virtualized'],
        tableBodyProps?.className,
      )}
      __vars={{
        '--mrt-table-body-height': rowVirtualizer
          ? `${rowVirtualizer.getTotalSize()}`
          : undefined,
        ...tableBodyProps?.__vars,
      }}
    >
      {creatingRow && createDisplayMode === 'row' && (
        <MRT_TableBodyRow table={table} row={creatingRow} rowIndex={-1} />
      )}
      {!rows.length ? (
        <tr
          className={clsx(
            'mrt-table-body-row',
            layoutMode === 'grid' && classes['empty-row-tr-grid'],
          )}
        >
          <td
            colSpan={table.getVisibleLeafColumns().length}
            className={clsx(
              'mrt-table-body-cell',
              layoutMode === 'grid' && classes['empty-row-td-grid'],
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
              columnVirtualizer,
              enableHover,
              isStriped,
              measureElement: rowVirtualizer?.measureElement,
              numRows: rows.length,
              row,
              rowIndex: rowVirtualizer ? rowOrVirtualRow.index : rowIndex,
              table,
              virtualColumns,
              virtualPaddingLeft,
              virtualPaddingRight,
              virtualRow: rowVirtualizer
                ? (rowOrVirtualRow as MRT_VirtualItem)
                : undefined,
            };
            return memoMode === 'rows' ? (
              <Memo_MRT_TableBodyRow
                key={row.id || `mrt-${row.index}`}
                {...props}
              />
            ) : (
              <MRT_TableBodyRow key={row.id || `mrt-${row.index}`} {...props} />
            );
          })}
        </>
      )}
    </Box>
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof MRT_TableBody;
