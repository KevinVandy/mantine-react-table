import React, { DragEvent, RefObject } from 'react';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { reorderColumn } from '../column.utils';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  column: MRT_Column;
  table: MRT_TableInstance;
  tableHeadCellRef: RefObject<HTMLTableCellElement>;
}

export const MRT_TableHeadCellGrabHandle = ({
  column,
  table,
  tableHeadCellRef,
}: Props) => {
  const {
    getState,
    options: { enableColumnOrdering, mantineColumnDragHandleProps },
    setColumnOrder,
    setDraggingColumn,
    setHoveredColumn,
  } = table;
  const { columnDef } = column;
  const { hoveredColumn, draggingColumn, columnOrder } = getState();

  const mActionIconProps =
    mantineColumnDragHandleProps instanceof Function
      ? mantineColumnDragHandleProps({ column, table })
      : mantineColumnDragHandleProps;

  const mcActionIconProps =
    columnDef.mantineColumnDragHandleProps instanceof Function
      ? columnDef.mantineColumnDragHandleProps({ column, table })
      : columnDef.mantineColumnDragHandleProps;

  const actionIconProps = {
    ...mActionIconProps,
    ...mcActionIconProps,
  };

  const handleDragStart = (event: DragEvent<HTMLButtonElement>) => {
    actionIconProps?.onDragStart?.(event);
    setDraggingColumn(column);
    event.dataTransfer.setDragImage(
      tableHeadCellRef.current as HTMLElement,
      0,
      0,
    );
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    actionIconProps?.onDragEnd?.(event);
    if (hoveredColumn?.id === 'drop-zone') {
      column.toggleGrouping();
    } else if (
      enableColumnOrdering &&
      hoveredColumn &&
      hoveredColumn?.id !== draggingColumn?.id
    ) {
      setColumnOrder(
        reorderColumn(column, hoveredColumn as MRT_Column, columnOrder),
      );
    }
    setDraggingColumn(null);
    setHoveredColumn(null);
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
