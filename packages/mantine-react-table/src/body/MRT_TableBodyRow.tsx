import React, { DragEvent, FC, memo, useMemo, useRef } from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import { Memo_MRT_TableBodyCell, MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import type { MRT_Cell, MRT_Row, MRT_TableInstance } from '..';

interface Props {
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  enableHover?: boolean;
  measureElement?: (element: HTMLTableRowElement) => void;
  numRows: number;
  row: MRT_Row;
  rowIndex: number;
  table: MRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
  virtualRow?: VirtualItem;
}

export const MRT_TableBodyRow: FC<Props> = ({
  columnVirtualizer,
  enableHover,
  measureElement,
  numRows,
  row,
  rowIndex,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
  virtualRow,
}) => {
  const theme = useMantineTheme();
  const {
    getIsSomeColumnsPinned,
    getState,
    options: {
      enableRowOrdering,
      layoutMode,
      memoMode,
      mantineTableBodyRowProps,
      renderDetailPanel,
    },
    setHoveredRow,
  } = table;
  const { draggingColumn, draggingRow, editingCell, editingRow, hoveredRow } =
    getState();

  const tableRowProps =
    mantineTableBodyRowProps instanceof Function
      ? mantineTableBodyRowProps({ row, table })
      : mantineTableBodyRowProps;

  const handleDragEnter = (_e: DragEvent) => {
    if (enableRowOrdering && draggingRow) {
      setHoveredRow(row);
    }
  };

  const rowRef = useRef<HTMLTableRowElement | null>(null);

  const draggingBorder = useMemo(
    () =>
      draggingRow?.id === row.id
        ? `1px dashed ${theme.colors.gray[7]}`
        : hoveredRow?.id === row.id
        ? `2px dashed ${theme.primaryColor}`
        : undefined,
    [draggingRow, hoveredRow],
  );

  const draggingBorders = draggingBorder
    ? {
        border: draggingBorder,
      }
    : undefined;

  return (
    <>
      <Box
        component="tr"
        data-index={virtualRow?.index}
        onDragEnter={handleDragEnter}
        ref={(node: HTMLTableRowElement) => {
          if (node) {
            rowRef.current = node;
            measureElement?.(node);
          }
        }}
        {...tableRowProps}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? row.getIsSelected()
                ? theme.fn.rgba(theme.colors.blue[7], 0.1)
                : theme.colors.dark[7]
              : row.getIsSelected()
              ? theme.fn.rgba(theme.colors.blue[7], 0.1)
              : theme.white,
          display: layoutMode === 'grid' ? 'flex' : 'table-row',
          opacity:
            draggingRow?.id === row.id || hoveredRow?.id === row.id ? 0.5 : 1,
          position: virtualRow ? 'absolute' : undefined,
          top: virtualRow ? 0 : undefined,
          transform: virtualRow
            ? `translateY(${virtualRow?.start}px)`
            : undefined,
          transition: virtualRow ? 'none' : 'all 150ms ease-in-out',
          width: '100%',
          '&:hover td': {
            backgroundColor:
              enableHover !== false && getIsSomeColumnsPinned()
                ? theme.colorScheme === 'dark'
                  ? `${theme.fn.lighten(theme.colors.dark[7], 0.12)}`
                  : `${theme.fn.darken(theme.white, 0.05)}`
                : undefined,
          },
          ...(tableRowProps?.sx instanceof Function
            ? tableRowProps.sx(theme)
            : (tableRowProps?.sx as any)),
          ...draggingBorders,
        })}
      >
        {virtualPaddingLeft ? (
          <td style={{ display: 'flex', width: virtualPaddingLeft }} />
        ) : null}
        {(virtualColumns ?? row.getVisibleCells()).map((cellOrVirtualCell) => {
          const cell = columnVirtualizer
            ? row.getVisibleCells()[(cellOrVirtualCell as VirtualItem).index]
            : (cellOrVirtualCell as MRT_Cell);
          const props = {
            cell,
            enableHover,
            key: cell.id,
            measureElement: columnVirtualizer?.measureElement,
            numRows,
            rowIndex,
            rowRef,
            table,
            virtualCell: columnVirtualizer
              ? (cellOrVirtualCell as VirtualItem)
              : undefined,
          };
          return memoMode === 'cells' &&
            cell.column.columnDef.columnDefType === 'data' &&
            !draggingColumn &&
            !draggingRow &&
            editingCell?.id !== cell.id &&
            editingRow?.id !== row.id ? (
            <Memo_MRT_TableBodyCell {...props} />
          ) : (
            <MRT_TableBodyCell {...props} />
          );
        })}
        {virtualPaddingRight ? (
          <td style={{ display: 'flex', width: virtualPaddingRight }} />
        ) : null}
      </Box>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel
          parentRowRef={rowRef}
          row={row}
          table={table}
          virtualRow={virtualRow}
        />
      )}
    </>
  );
};

export const Memo_MRT_TableBodyRow = memo(
  MRT_TableBodyRow,
  (prev, next) => prev.row === next.row,
);
