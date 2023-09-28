import { type DragEvent, memo, useRef } from 'react';
import { Box, useMantineTheme, rgba } from '@mantine/core';
import clsx from 'clsx';
import { Memo_MRT_TableBodyCell, MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import {
  type MRT_Cell,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_VirtualItem,
  type MRT_Virtualizer,
} from '../types';
import { funcValue, styleValue } from '../funcValue';

import classes from './MRT_TableBodyRow.module.css';

interface Props<TData extends Record<string, any> = {}> {
  columnVirtualizer?: MRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  enableHover?: boolean;
  isStriped?: boolean | 'odd' | 'even';
  measureElement?: (element: HTMLTableRowElement) => void;
  numRows?: number;
  row: MRT_Row<TData>;
  rowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
  virtualRow?: MRT_VirtualItem;
  className?: string | string[];
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
  className,
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
  const theme = useMantineTheme();

  const tableRowProps = funcValue(mantineTableBodyRowProps, {
    row,
    staticRowIndex: rowIndex,
    table,
  });

  const handleDragEnter = (_e: DragEvent) => {
    if (enableRowOrdering && draggingRow) {
      setHoveredRow(row);
    }
  };

  const rowRef = useRef<HTMLTableRowElement | null>(null);

  return (
    <>
      <Box
        className={clsx(
          classes.MRT_TableBodyRow,
          enableHover !== false && classes.MRT_TableBodyRowHover,
          virtualRow && classes.MRT_TableBodyRowVirtual,
          className,
        )}
        component="tr"
        data-index={virtualRow?.index}
        onDragEnter={handleDragEnter}
        data-selected={row.getIsSelected()}
        ref={(node: HTMLTableRowElement) => {
          if (node) {
            rowRef.current = node;
            measureElement?.(node);
          }
        }}
        {...tableRowProps}
        __vars={{
          ...tableRowProps?.__vars,
          '--display': layoutMode === 'grid' ? 'flex' : 'table-row',
          '--light-bg-color': rgba(theme.colors.dark[7], 0.12),
          '--dark-bg-color': rgba(theme.white, 0.05),
        }}
        style={(theme) => ({
          opacity:
            draggingRow?.id === row.id || hoveredRow?.id === row.id ? 0.5 : 1,
          transform: virtualRow
            ? `translateY(${virtualRow?.start}px)`
            : undefined,
          ...styleValue(tableRowProps, theme),
        })}
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
