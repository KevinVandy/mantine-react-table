import {
  defaultRangeExtractor,
  type Range,
  useVirtualizer,
} from '@tanstack/react-virtual';
import { Table } from '@mantine/core';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { useCallback, useMemo } from 'react';
import { Memo_MRT_TableBody, MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { parseCSSVarId, parseFromValuesOrFunc } from '../column.utils';
import { type MRT_TableInstance, type MRT_Virtualizer } from '../types';

import classes from './MRT_Table.module.css';
import clsx from 'clsx';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_Table = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    getFlatHeaders,
    getState,
    options: {
      columnVirtualizerInstanceRef,
      columnVirtualizerProps,
      columns,
      enableColumnResizing,
      enableColumnVirtualization,
      enablePinning,
      enableTableFooter,
      enableTableHead,
      layoutMode,
      mantineTableProps,
      memoMode,
    },
    refs: { tableContainerRef },
  } = table;
  const {
    columnPinning,
    columnSizing,
    columnSizingInfo,
    columnVisibility,
    density,
  } = getState();

  const tableProps = parseFromValuesOrFunc(mantineTableProps, { table });
  const vProps = parseFromValuesOrFunc(columnVirtualizerProps, { table });

  const columnSizeVars = useMemo(() => {
    const headers = getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const colSize = header.getSize();
      colSizes[`--header-${parseCSSVarId(header.id)}-size`] = colSize;
      colSizes[`--col-${parseCSSVarId(header.column.id)}-size`] = colSize;
    }
    return colSizes;
  }, [columns, columnSizing, columnSizingInfo, columnVisibility]);

  //get first 16 column widths and average them
  const averageColumnWidth = useMemo(() => {
    if (!enableColumnVirtualization) return 0;
    const columnsWidths =
      table
        .getRowModel()
        .rows[0]?.getCenterVisibleCells()
        ?.slice(0, 16)
        ?.map((cell) => cell.column.getSize() * 1.2) ?? [];
    return columnsWidths.reduce((a, b) => a + b, 0) / columnsWidths.length;
  }, [table.getRowModel().rows, columnPinning, columnVisibility]);

  const [leftPinnedIndexes, rightPinnedIndexes] = useMemo(
    () =>
      enableColumnVirtualization && enablePinning
        ? [
            table.getLeftLeafColumns().map((c) => c.getPinnedIndex()),
            table
              .getRightLeafColumns()
              .map(
                (c) =>
                  table.getVisibleLeafColumns().length - c.getPinnedIndex() - 1,
              ),
          ]
        : [[], []],
    [columnPinning, enableColumnVirtualization, enablePinning],
  );

  const columnVirtualizer:
    | MRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>
    | undefined = enableColumnVirtualization
    ? useVirtualizer({
        count: table.getVisibleLeafColumns().length,
        estimateSize: () => averageColumnWidth,
        getScrollElement: () => tableContainerRef.current,
        horizontal: true,
        overscan: 3,
        rangeExtractor: useCallback(
          (range: Range) => [
            ...new Set([
              ...leftPinnedIndexes,
              ...defaultRangeExtractor(range),
              ...rightPinnedIndexes,
            ]),
          ],
          [leftPinnedIndexes, rightPinnedIndexes],
        ),
        ...vProps,
      })
    : undefined;

  if (columnVirtualizerInstanceRef && columnVirtualizer) {
    columnVirtualizerInstanceRef.current = columnVirtualizer;
  }

  const virtualColumns = columnVirtualizer
    ? columnVirtualizer.getVirtualItems()
    : undefined;

  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[leftPinnedIndexes.length]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1 - rightPinnedIndexes.length]
        ?.end ?? 0);
  }

  const props = {
    columnVirtualizer,
    enableHover: tableProps?.highlightOnHover,
    isStriped: tableProps?.striped,
    table,
    virtualColumns,
    virtualPaddingLeft,
    virtualPaddingRight,
  };

  return (
    <Table
      className={clsx(
        'mrt-table',
        classes.root,
        layoutMode === 'grid' && classes['root-grid'],
        enableColumnResizing &&
          layoutMode !== 'grid' &&
          classes['root-semantic-not-resizing'],
      )}
      highlightOnHover
      horizontalSpacing={density}
      verticalSpacing={density}
      {...tableProps}
      __vars={{
        ...columnSizeVars,
        ...tableProps?.__vars,
      }}
    >
      {enableTableHead && <MRT_TableHead {...props} />}
      {memoMode === 'table-body' || columnSizingInfo.isResizingColumn ? (
        <Memo_MRT_TableBody {...props} />
      ) : (
        <MRT_TableBody {...props} />
      )}
      {enableTableFooter && <MRT_TableFooter {...props} />}
    </Table>
  );
};
