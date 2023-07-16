import { type DragEvent, memo, useRef } from 'react';
import { Box } from '@mantine/core';
import { Memo_MRT_TableBodyCell, MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { getPrimaryColor } from '../column.utils';
import {
  type MRT_Cell,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_VirtualItem,
  type MRT_Virtualizer,
} from '../types';

interface Props<TData extends Record<string, any> = {}> {
  columnVirtualizer?: MRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  enableHover?: boolean;
  isStriped?: boolean;
  measureElement?: (element: HTMLTableRowElement) => void;
  numRows?: number;
  row: MRT_Row<TData>;
  rowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
  virtualRow?: MRT_VirtualItem;
}

export const MRT_TableBodyRow = <TData extends Record<string, any> = {}>({
  columnVirtualizer,
  enableHover,
  isStriped,
  measureElement,
  numRows,
  row,
  rowIndex,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
  virtualRow,
}: Props<TData>) => {
  const {
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
      ? mantineTableBodyRowProps({ row, staticRowIndex: rowIndex, table })
      : mantineTableBodyRowProps;

  const handleDragEnter = (_e: DragEvent) => {
    if (enableRowOrdering && draggingRow) {
      setHoveredRow(row);
    }
  };

  const rowRef = useRef<HTMLTableRowElement | null>(null);

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
          boxSizing: 'border-box',
          display: layoutMode === 'grid' ? 'flex' : 'table-row',
          opacity:
            draggingRow?.id === row.id || hoveredRow?.id === row.id ? 0.5 : 1,
          position: virtualRow ? 'absolute' : undefined,
          top: virtualRow ? 0 : undefined,
          transition: virtualRow ? 'none' : 'all 100ms ease-in-out',
          width: '100%',
          '&:hover td': {
            backgroundColor:
              enableHover !== false
                ? row.getIsSelected()
                  ? theme.fn.rgba(getPrimaryColor(theme), 0.2)
                  : theme.colorScheme === 'dark'
                  ? `${theme.fn.lighten(theme.colors.dark[7], 0.12)}`
                  : `${theme.fn.darken(theme.white, 0.05)}`
                : undefined,
          },
          ...(tableRowProps?.sx instanceof Function
            ? tableRowProps.sx(theme)
            : (tableRowProps?.sx as any)),
        })}
        style={{
          transform: virtualRow
            ? `translateY(${virtualRow?.start}px)`
            : undefined,
          ...tableRowProps?.style,
        }}
      >
        {virtualPaddingLeft ? (
          <td style={{ display: 'flex', width: virtualPaddingLeft }} />
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
            measureElement: columnVirtualizer?.measureElement,
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
          <td style={{ display: 'flex', width: virtualPaddingRight }} />
        ) : null}
      </Box>
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
