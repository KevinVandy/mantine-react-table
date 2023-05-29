import { memo, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box, Text } from '@mantine/core';
import { Memo_MRT_TableBodyRow, MRT_TableBodyRow } from './MRT_TableBodyRow';
import { rankGlobalFuzzy } from '../sortingFns';
import {
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_VirtualItem,
  type MRT_Virtualizer,
} from '../types';

interface Props {
  columnVirtualizer?: MRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  enableHover?: boolean;
  isStriped?: boolean;
  table: MRT_TableInstance;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableBody = ({
  columnVirtualizer,
  enableHover,
  isStriped,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props) => {
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
    columnFilters,
    density,
    expanded,
    globalFilter,
    globalFilterFn,
    pagination,
    sorting,
  } = getState();

  const tableBodyProps =
    mantineTableBodyProps instanceof Function
      ? mantineTableBodyProps({ table })
      : mantineTableBodyProps;

  const vProps =
    rowVirtualizerProps instanceof Function
      ? rowVirtualizerProps({ table })
      : rowVirtualizerProps;

  const shouldRankResults = useMemo(
    () =>
      !manualExpanding &&
      !manualFiltering &&
      !manualGrouping &&
      !manualSorting &&
      enableGlobalFilterRankedResults &&
      globalFilter &&
      globalFilterFn === 'fuzzy' &&
      expanded !== true &&
      !Object.values(sorting).some(Boolean) &&
      !Object.values(expanded).some(Boolean),
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
    if (!shouldRankResults) return getRowModel().rows;
    const rankedRows = getPrePaginationRowModel().rows.sort((a, b) =>
      rankGlobalFuzzy(a, b),
    );
    if (enablePagination && !manualPagination) {
      const start = pagination.pageIndex * pagination.pageSize;
      return rankedRows.slice(start, start + pagination.pageSize);
    }
    return rankedRows;
  }, [
    shouldRankResults,
    shouldRankResults ? getPrePaginationRowModel().rows : getRowModel().rows,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  const rowVirtualizer:
    | MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>
    | undefined = enableRowVirtualization
    ? useVirtualizer({
        count: rows.length,
        estimateSize: () =>
          density === 'xs'
            ? 42.7
            : density === 'sm'
            ? 46.7
            : density === 'md'
            ? 54.7
            : density === 'lg'
            ? 62.7
            : 70.7,
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
            {renderEmptyRowsFallback?.({ table }) ?? (
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
            )}
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
              isStriped,
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
                ? (rowOrVirtualRow as MRT_VirtualItem)
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
