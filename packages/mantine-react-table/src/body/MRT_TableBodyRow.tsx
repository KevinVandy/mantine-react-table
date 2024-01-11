import clsx from 'clsx';
import classes from './MRT_TableBodyRow.module.css';
import { type DragEvent, memo, useMemo, useRef } from 'react';
import { Box, TableTr } from '@mantine/core';
import { MRT_TableBodyCell, Memo_MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Cell,
  type MRT_ColumnVirtualizer,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';

interface Props<TData extends MRT_RowData> {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  enableHover?: boolean;
  isStriped?: 'even' | 'odd' | boolean;
  measureElement?: (element: HTMLTableRowElement) => void;
  numRows?: number;
  pinnedRowIds?: string[];
  row: MRT_Row<TData>;
  rowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualRow?: MRT_VirtualItem;
}

export const MRT_TableBodyRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  enableHover,
  isStriped,
  measureElement,
  numRows,
  pinnedRowIds,
  row,
  rowIndex,
  table,
  virtualRow,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableRowOrdering,
      enableRowPinning,
      enableStickyFooter,
      enableStickyHeader,
      layoutMode,
      mantineTableBodyRowProps,
      memoMode,
      renderDetailPanel,
      rowPinningDisplayMode,
    },
    refs: { tableFooterRef, tableHeadRef },
    setHoveredRow,
  } = table;
  const {
    density,
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    hoveredRow,
    isFullScreen,
    rowPinning,
  } = getState();

  const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } =
    columnVirtualizer ?? {};

  const isPinned = enableRowPinning && row.getIsPinned();
  const isDraggingRow = draggingRow?.id === row.id;
  const isHoveredRow = hoveredRow?.id === row.id;

  const tableRowProps = parseFromValuesOrFunc(mantineTableBodyRowProps, {
    row,
    staticRowIndex: rowIndex,
    table,
  });

  const [bottomPinnedIndex, topPinnedIndex] = useMemo(() => {
    if (
      !enableRowPinning ||
      !rowPinningDisplayMode?.includes('sticky') ||
      !pinnedRowIds ||
      !row.getIsPinned()
    )
      return [];
    return [
      [...pinnedRowIds].reverse().indexOf(row.id),
      pinnedRowIds.indexOf(row.id),
    ];
  }, [pinnedRowIds, rowPinning]);

  const tableHeadHeight =
    ((enableStickyHeader || isFullScreen) &&
      tableHeadRef.current?.clientHeight) ||
    0;
  const tableFooterHeight =
    (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

  const rowHeight =
    // @ts-ignore
    parseInt(tableRowProps?.style?.height, 10) ||
    (density === 'xs' ? 37 : density === 'md' ? 53 : 69);

  const handleDragEnter = (_e: DragEvent) => {
    if (enableRowOrdering && draggingRow) {
      setHoveredRow(row);
    }
  };

  const rowRef = useRef<HTMLTableRowElement | null>(null);

  return (
    <>
      <TableTr
        data-index={rowIndex}
        data-selected={
          row.getIsSelected() || row.getIsAllSubRowsSelected() || undefined
        }
        onDragEnter={handleDragEnter}
        ref={(node: HTMLTableRowElement) => {
          if (node) {
            rowRef.current = node;
            measureElement?.(node);
          }
        }}
        {...tableRowProps}
        __vars={{
          ...tableRowProps?.__vars,
          '--mrt-pinned-row-bottom':
            !virtualRow && bottomPinnedIndex !== undefined && isPinned
              ? `${
                  bottomPinnedIndex * rowHeight +
                  (enableStickyFooter ? tableFooterHeight - 1 : 0)
                }`
              : undefined,
          '--mrt-pinned-row-top': virtualRow
            ? '0'
            : topPinnedIndex !== undefined && isPinned
              ? `${
                  topPinnedIndex * rowHeight +
                  (enableStickyHeader || isFullScreen ? tableHeadHeight - 1 : 0)
                }`
              : undefined,
          '--mrt-virtual-row-start': virtualRow
            ? `${virtualRow.start}`
            : undefined,
        }}
        className={clsx(
          classes.root,
          layoutMode?.startsWith('grid') && classes['root-grid'],
          virtualRow && classes['root-virtualized'],
          (isDraggingRow || isHoveredRow) && classes['root-dragging'],
          enableHover !== false && classes['root-hover'],
          tableRowProps?.className,
          isPinned && classes['root-pinned'],
          !virtualRow &&
            isPinned &&
            rowPinningDisplayMode?.includes('sticky') &&
            classes['root-sticky-pinned'],
          !virtualRow &&
            isPinned &&
            rowPinningDisplayMode?.includes('sticky') &&
            bottomPinnedIndex !== undefined &&
            classes['root-sticky-pinned-top'],
          !virtualRow &&
            isPinned &&
            rowPinningDisplayMode?.includes('sticky') &&
            topPinnedIndex !== undefined &&
            classes['root-sticky-pinned-bottom'],
        )}
      >
        {virtualPaddingLeft ? (
          <Box component="td" display="flex" w={virtualPaddingLeft} />
        ) : null}
        {(virtualColumns ?? row.getVisibleCells()).map((cellOrVirtualCell) => {
          const cell = columnVirtualizer
            ? row.getVisibleCells()[
                (cellOrVirtualCell as MRT_VirtualItem).index
              ]
            : (cellOrVirtualCell as MRT_Cell<TData>);
          const props = {
            cell,
            isStriped,
            measureElement:
              !isDraggingRow && !isHoveredRow
                ? columnVirtualizer?.measureElement
                : undefined,
            numRows,
            rowIndex,
            rowRef,
            table,
            virtualCell: columnVirtualizer
              ? (cellOrVirtualCell as MRT_VirtualItem)
              : undefined,
          };
          return memoMode === 'cells' &&
            cell.column.columnDef.columnDefType === 'data' &&
            !draggingColumn &&
            !draggingRow &&
            editingCell?.id !== cell.id &&
            editingRow?.id !== row.id ? (
            <Memo_MRT_TableBodyCell
              key={cell.id + cell.getValue()?.toString()}
              {...props}
            />
          ) : (
            <MRT_TableBodyCell
              key={cell.id + cell.getValue?.toString()}
              {...props}
            />
          );
        })}
        {virtualPaddingRight ? (
          <Box component="td" display="flex" w={virtualPaddingRight} />
        ) : null}
      </TableTr>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel
          parentRowRef={rowRef}
          row={row}
          rowIndex={rowIndex}
          table={table}
          virtualRow={virtualRow}
        />
      )}
    </>
  );
};

export const Memo_MRT_TableBodyRow = memo(
  MRT_TableBodyRow,
  (prev, next) => prev.row === next.row && prev.rowIndex === next.rowIndex,
) as typeof MRT_TableBodyRow;
