import React, { FC, memo, useMemo } from 'react';
import {
  useVirtualizer,
  Virtualizer,
  VirtualItem,
} from '@tanstack/react-virtual';
import { Box, Text } from '@mantine/core';
import { Memo_MRT_TableBodyRow, MRT_TableBodyRow } from './MRT_TableBodyRow';
import { rankGlobalFuzzy } from '../sortingFns';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  enableHover?: boolean;
  table: MRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableBody: FC<Props> = ({
  columnVirtualizer,
  enableHover,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}) => {
  const {
    getRowModel,
    getPrePaginationRowModel,
    getState,
    options: {
      enableGlobalFilterRankedResults,
      enablePagination,
      enableRowVirtualization,
      layoutMode,
      localization,
      manualFiltering,
      manualSorting,
      memoMode,
      mantineTableBodyProps,
      rowVirtualizerInstanceRef,
      rowVirtualizerProps,
    },
    refs: { tableContainerRef, tablePaperRef },
  } = table;
  const { columnFilters, density, globalFilter, pagination, sorting } =
    getState();

  const tableBodyProps =
    mantineTableBodyProps instanceof Function
      ? mantineTableBodyProps({ table })
      : mantineTableBodyProps;

  const vProps =
    rowVirtualizerProps instanceof Function
      ? rowVirtualizerProps({ table })
      : rowVirtualizerProps;

  const rows = useMemo(() => {
    if (
      enableGlobalFilterRankedResults &&
      globalFilter &&
      !manualFiltering &&
      !manualSorting &&
      !Object.values(sorting).some(Boolean)
    ) {
      const rankedRows = getPrePaginationRowModel().rows.sort((a, b) =>
        rankGlobalFuzzy(a, b),
      );
      if (enablePagination) {
        const start = pagination.pageIndex * pagination.pageSize;
        return rankedRows.slice(start, start + pagination.pageSize);
      }
      return rankedRows;
    }
    return getRowModel().rows;
  }, [
    enableGlobalFilterRankedResults,
    (enableGlobalFilterRankedResults && globalFilter) || !enablePagination
      ? getPrePaginationRowModel().rows
      : getRowModel().rows,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  const rowVirtualizer:
    | Virtualizer<HTMLDivElement, HTMLTableRowElement>
    | undefined = enableRowVirtualization
    ? useVirtualizer({
        count: rows.length,
        estimateSize: () =>
          density === 'xs' ? 37 : density === 'md' ? 58 : 73,
        getScrollElement: () => tableContainerRef.current,
        measureElement: (element) => element?.getBoundingClientRect().height,
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
      sx={(theme) => ({
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        height: rowVirtualizer
          ? `${rowVirtualizer.getTotalSize()}px`
          : 'inherit',
        minHeight: !rows.length ? '100px' : undefined,
        position: 'relative',
        ...(tableBodyProps?.sx instanceof Function
          ? tableBodyProps?.sx(theme)
          : (tableBodyProps?.sx as any)),
      })}
    >
      {!rows.length ? (
        <tr style={{ display: layoutMode === 'grid' ? 'grid' : 'table-row' }}>
          <td
            colSpan={table.getVisibleLeafColumns().length}
            style={{ display: layoutMode === 'grid' ? 'grid' : 'table-cell' }}
          >
            <Text
              sx={{
                color: 'gray',
                fontStyle: 'italic',
                maxWidth: `min(100vw, ${
                  tablePaperRef.current?.clientWidth ?? 360
                }px)`,
                paddingTop: '2rem',
                paddingBottom: '2rem',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {globalFilter || columnFilters.length
                ? localization.noResultsFound
                : localization.noRecordsToDisplay}
            </Text>
          </td>
        </tr>
      ) : (
        <>
          {(virtualRows ?? rows).map((rowOrVirtualRow, rowIndex) => {
            const row = rowVirtualizer
              ? rows[rowOrVirtualRow.index]
              : (rowOrVirtualRow as MRT_Row);
            const props = {
              columnVirtualizer,
              enableHover,
              key: row.id,
              measureElement: rowVirtualizer?.measureElement,
              numRows: rows.length,
              row,
              rowIndex: rowVirtualizer ? rowOrVirtualRow.index : rowIndex,
              table,
              virtualColumns,
              virtualPaddingLeft,
              virtualPaddingRight,
              virtualRow: rowVirtualizer
                ? (rowOrVirtualRow as VirtualItem)
                : undefined,
            };
            return memoMode === 'rows' ? (
              <Memo_MRT_TableBodyRow {...props} />
            ) : (
              <MRT_TableBodyRow {...props} />
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
);
