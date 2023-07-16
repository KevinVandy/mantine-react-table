import { Box, Divider } from '@mantine/core';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import { getPrimaryColor } from '../column.utils';

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
      sx={(theme) => ({
        cursor: 'col-resize',
        marginRight:
          density === 'xl' ? '-24px' : density === 'md' ? '-20px' : '-14px',
        position: 'absolute',
        right: '4px',
        paddingLeft: '1px',
        paddingRight: '1px',
        '&:active > .mantine-Divider-vertical': {
          borderLeftColor: getPrimaryColor(theme),
        },
      })}
      style={{
        transform:
          column.getIsResizing() && columnResizeMode === 'onEnd'
            ? `translateX(${getState().columnSizingInfo.deltaOffset ?? 0}px)`
            : undefined,
      }}
    >
      <Divider
        orientation="vertical"
        size="lg"
        sx={{
          borderRadius: '2px',
          borderWidth: '4px',
          height: '24px',
          touchAction: 'none',
          transition: column.getIsResizing()
            ? undefined
            : 'all 100ms ease-in-out',
          userSelect: 'none',
          zIndex: 4,
        }}
      />
    </Box>
  );
};
