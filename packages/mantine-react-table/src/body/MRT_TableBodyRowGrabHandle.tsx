import React, { DragEvent, RefObject } from 'react';
import { MRT_Cell, MRT_TableInstance } from '..';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';

interface Props {
  cell: MRT_Cell;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance;
}

export const MRT_TableBodyRowGrabHandle = ({ cell, rowRef, table }: Props) => {
  const {
    options: { mantineRowDragHandleProps },
  } = table;
  const { row } = cell;

  const actionIconProps =
    mantineRowDragHandleProps instanceof Function
      ? mantineRowDragHandleProps({ row, table })
      : mantineRowDragHandleProps;

  const handleDragStart = (event: DragEvent<HTMLButtonElement>) => {
    actionIconProps?.onDragStart?.(event);
    event.dataTransfer.setDragImage(rowRef.current as HTMLElement, 0, 0);
    table.setDraggingRow(row as any);
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    actionIconProps?.onDragEnd?.(event);
    table.setDraggingRow(null);
    table.setHoveredRow(null);
  };

  return (
    <MRT_GrabHandleButton
      actionIconProps={actionIconProps}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      table={table}
    />
  );
};
