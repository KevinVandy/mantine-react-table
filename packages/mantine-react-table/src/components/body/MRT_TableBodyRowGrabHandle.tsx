import { type DragEvent, type RefObject } from 'react';
import { type ActionIconProps } from '@mantine/core';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';

interface Props<TData extends MRT_RowData> extends ActionIconProps {
  row: MRT_Row<TData>;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyRowGrabHandle = <TData extends MRT_RowData>({
  row,
  rowRef,
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: { mantineRowDragHandleProps },
  } = table;

  const actionIconProps = {
    ...parseFromValuesOrFunc(mantineRowDragHandleProps, {
      row,
      table,
    }),
    ...rest,
  };

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
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      table={table}
    />
  );
};
