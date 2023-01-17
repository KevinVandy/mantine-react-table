import React, { FC } from 'react';
import { Box } from '@mantine/core';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { MRT_Header, MRT_HeaderGroup, MRT_TableInstance } from '..';

interface Props {
  headerGroup: MRT_HeaderGroup;
  table: MRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHeadRow: FC<Props> = ({
  headerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}) => {
  const {
    options: { layoutMode, mantineTableHeadRowProps },
  } = table;

  const tableRowProps =
    mantineTableHeadRowProps instanceof Function
      ? mantineTableHeadRowProps({ headerGroup, table })
      : mantineTableHeadRowProps;

  return (
    <Box
      component="tr"
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        boxShadow: `4px 0 8px ${theme.fn.rgba(theme.black, 0.1)}`,
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        top: 0,
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps?.sx(theme)
          : (tableRowProps?.sx as any)),
      })}
    >
      {virtualPaddingLeft ? (
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {(virtualColumns ?? headerGroup.headers).map((headerOrVirtualHeader) => {
        const header = virtualColumns
          ? headerGroup.headers[headerOrVirtualHeader.index]
          : (headerOrVirtualHeader as MRT_Header);

        return (
          <MRT_TableHeadCell header={header} key={header.id} table={table} />
        );
      })}
      {virtualPaddingRight ? (
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </Box>
  );
};
