import clsx from 'clsx';
import { Box } from '@mantine/core';
import { type MRT_Header, type MRT_TableInstance } from '../types';

import classes from './MRT_TableHeadCellResizeHandle.module.css';

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellResizeHandle = <
  TData extends Record<string, any> = {},
>({
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
      role="separator"
      onMouseDown={handler}
      onTouchStart={handler}
      onDoubleClick={() => {
        setColumnSizingInfo((old) => ({
          ...old,
          isResizingColumn: false,
        }));
        column.resetSize();
      }}
      className={clsx(
        'mrt-table-head-cell-resize-handle',
        classes.root,
        density,
      )}
      __vars={{ '--mrt-transform': offset }}
    ></Box>
  );
};
