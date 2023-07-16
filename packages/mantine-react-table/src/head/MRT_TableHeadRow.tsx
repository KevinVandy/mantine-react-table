import { Box } from '@mantine/core';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import {
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';

interface Props<TData extends Record<string, any> = {}> {
  headerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHeadRow = <TData extends Record<string, any> = {}>({
  headerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    getState,
    options: { enableStickyHeader, layoutMode, mantineTableHeadRowProps },
  } = table;
  const { isFullScreen } = getState();

  const tableRowProps =
    mantineTableHeadRowProps instanceof Function
      ? mantineTableHeadRowProps({ headerGroup, table })
      : mantineTableHeadRowProps;

  const stickyHeader = enableStickyHeader || isFullScreen;

  return (
    <Box
      component="tr"
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        boxShadow: `0 4px 8px ${theme.fn.rgba(theme.black, 0.1)}`,
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        top: stickyHeader ? 0 : undefined,
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps?.sx(theme)
          : (tableRowProps?.sx as any)),
        position: stickyHeader ? 'sticky' : undefined,
      })}
    >
      {virtualPaddingLeft ? (
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {(virtualColumns ?? headerGroup.headers).map((headerOrVirtualHeader) => {
        const header = virtualColumns
          ? headerGroup.headers[headerOrVirtualHeader.index]
          : (headerOrVirtualHeader as MRT_Header<TData>);

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
