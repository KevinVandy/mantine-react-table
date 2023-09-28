import { Box, Divider } from '@mantine/core';
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

  return (
    <Box
      onDoubleClick={() => {
        setColumnSizingInfo((old) => ({
          ...old,
          isResizingColumn: false,
        }));
        column.resetSize();
      }}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={classes.MRT_TableHeadCellResizeHandle}
      __vars={{
        '--margin-right':
          density === 'xl' ? '-24px' : density === 'md' ? '-20px' : '-14px',
        '--transform':
          column.getIsResizing() && columnResizeMode === 'onEnd'
            ? `translateX(${getState().columnSizingInfo.deltaOffset ?? 0}px)`
            : undefined,
      }}
    >
      <Divider
        orientation="vertical"
        size="lg"
        className={classes.MRT_TableHeadCellResizeHandleDivider}
        __vars={{
          '--transition': column.getIsResizing()
            ? undefined
            : 'all 100ms ease-in-out',
        }}
      />
    </Box>
  );
};
