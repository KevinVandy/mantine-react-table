import React, { DragEvent, FC, RefObject } from 'react';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { reorderColumn } from '../column.utils';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  column: MRT_Column;
  table: MRT_TableInstance;
  tableHeadCellRef: RefObject<HTMLTableCellElement>;
}

export const MRT_TableHeadCellGrabHandle: FC<Props> = ({
  column,
  table,
  tableHeadCellRef,
}) => {
  const {
    getState,
    options: { enableColumnOrdering, muiTableHeadCellDragHandleProps },
    setColumnOrder,
    setDraggingColumn,
    setHoveredColumn,
  } = table;
  const { columnDef } = column;
  const { hoveredColumn, draggingColumn, columnOrder } = getState();

  const mActionIconProps =
    muiTableHeadCellDragHandleProps instanceof Function
      ? muiTableHeadCellDragHandleProps({ column, table })
      : muiTableHeadCellDragHandleProps;

  const mcActionIconProps =
    columnDef.muiTableHeadCellDragHandleProps instanceof Function
      ? columnDef.muiTableHeadCellDragHandleProps({ column, table })
      : columnDef.muiTableHeadCellDragHandleProps;

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
      iconButtonProps={actionIconProps}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      table={table}
    />
  );
};
