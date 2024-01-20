import clsx from 'clsx';
import classes from './MRT_TableHeadCellResizeHandle.module.css';
import { Box } from '@mantine/core';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';

interface Props<TData extends MRT_RowData> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellResizeHandle = <TData extends MRT_RowData>({
  header,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { columnResizeMode },
    setColumnSizingInfo,
  } = table;
  const { density } = getState();
  const { column } = header;
  const handler = header.getResizeHandler();

  const offset =
    columnResizeMode === 'onEnd' && column.getIsResizing()
      ? `translateX(${getState().columnSizingInfo.deltaOffset ?? 0}px)`
      : undefined;

  return (
    <Box
      __vars={{ '--mrt-transform': offset }}
      className={clsx(
        'mrt-table-head-cell-resize-handle',
        classes.root,
        density,
      )}
      onDoubleClick={() => {
        setColumnSizingInfo((old) => ({
          ...old,
          isResizingColumn: false,
        }));
        column.resetSize();
      }}
      onMouseDown={handler}
      onTouchStart={handler}
      role="separator"
    />
  );
};
