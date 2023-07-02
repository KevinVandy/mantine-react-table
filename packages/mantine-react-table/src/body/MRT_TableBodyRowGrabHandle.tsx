import { useRef, type DragEvent, type RefObject } from 'react';
import { type MRT_Cell, type MRT_TableInstance } from '../types';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { GhostRow } from '../GhostRow';
import { useMantineTheme } from '@mantine/core';

interface Props<TData extends Record<string, any>> {
  cell: MRT_Cell<TData>;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyRowGrabHandle = <TData extends Record<string, any>>({
  cell,
  rowRef,
  table,
}: Props<TData>) => {
  const theme = useMantineTheme();
  const ghostRowRef = useRef<GhostRow | null>(null);

  const {
    options: { mantineRowDragHandleProps },
  } = table;
  const { row } = cell;

  const { ghostRowProps, ...actionIconProps } =
    mantineRowDragHandleProps instanceof Function
      ? mantineRowDragHandleProps({ row, table })
      : mantineRowDragHandleProps ?? {};

  const handleDragStart = (event: DragEvent<HTMLButtonElement>) => {
    actionIconProps?.onDragStart?.(event);

    if (ghostRowProps?.enabled) {
      const ghostRow = GhostRow.getInstance();

      const { enabled, rowStyle, cellStyle, ...otherGhostRowProps } =
        ghostRowProps;
      const ghostRowStyle =
        rowStyle instanceof Function ? rowStyle({ theme }) : rowStyle ?? {};
      const ghostCellStyle =
        cellStyle instanceof Function ? cellStyle({ theme }) : cellStyle ?? {};
      ghostRow.create({
        row: rowRef.current as HTMLTableRowElement,
        startX: event.clientX,
        startY: event.clientY,
        rowStyle: ghostRowStyle,
        cellStyle: ghostCellStyle,
        ...otherGhostRowProps,
      });
      ghostRowRef.current = ghostRow;
    } else {
      event.dataTransfer.setDragImage(rowRef.current as HTMLElement, 0, 0);
    }

    table.setDraggingRow(row as any);
  };

  const HandleDrag = (event: DragEvent<HTMLButtonElement>) => {
    if (ghostRowProps?.enabled) {
      ghostRowRef.current?.move(event.clientX, event.clientY);
    }
    actionIconProps?.onDrag?.(event);
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    if (ghostRowProps?.enabled) {
      ghostRowRef.current?.remove();
    }
    actionIconProps?.onDragEnd?.(event);
    table.setDraggingRow(null);
    table.setHoveredRow(null);
  };

  return (
    <MRT_GrabHandleButton
      actionIconProps={actionIconProps}
      onDragStart={handleDragStart}
      onDrag={HandleDrag}
      onDragEnd={handleDragEnd}
      table={table}
    />
  );
};
