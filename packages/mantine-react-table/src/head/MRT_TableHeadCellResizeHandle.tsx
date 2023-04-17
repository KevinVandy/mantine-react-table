import React from 'react';
import { Box, Divider } from '@mantine/core';
import { MRT_Header, MRT_TableInstance } from '..';
import { getPrimaryColor } from '../column.utils';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellResizeHandle = ({ header, table }: Props) => {
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
          density === 'xl'
            ? '-24px'
            : density === 'lg'
            ? '-22px'
            : density === 'md'
            ? '-20px'
            : density === 'sm'
            ? '-16px'
            : '-14px',
        position: 'absolute',
        right: '4px',
        paddingLeft: '1px',
        paddingRight: '1px',
        '&:active > .mantine-Divider-vertical': {
          borderLeftColor: getPrimaryColor(theme),
          opacity: 1,
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
