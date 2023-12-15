import { type DragEvent, type RefObject } from 'react';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import {
  type MRT_RowData,
  type MRT_Row,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends MRT_RowData> {
  row: MRT_Row<TData>;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyRowGrabHandle = <TData extends MRT_RowData>({
  row,
  rowRef,
  table,
}: Props<TData>) => {
  const {
    options: { mantineRowDragHandleProps },
  } = table;

  const actionIconProps = parseFromValuesOrFunc(mantineRowDragHandleProps, {
    row,
    table,
  });

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
