import { Box } from '@chakra-ui/react';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { type MRT_TableInstance, type MRT_VirtualItem } from '../types';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHead = <TData extends Record<string, any>>({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    getHeaderGroups,
    getState,
    options: { enableStickyHeader, layoutMode, mantineTableHeadProps },
  } = table;
  const { isFullScreen } = getState();

  const tableHeadProps =
    mantineTableHeadProps instanceof Function
      ? mantineTableHeadProps({ table })
      : mantineTableHeadProps;

  const stickyHeader = enableStickyHeader || isFullScreen;

  return (
    <Box
      as="thead"
      {...tableHeadProps}
      sx={{
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        position: stickyHeader && layoutMode === 'grid' ? 'sticky' : 'relative',
        opacity: 0.97,
        top: stickyHeader ? 0 : undefined,
        zIndex: stickyHeader ? 2 : undefined,
        ...(tableHeadProps?.sx as any),
      }}
    >
      {getHeaderGroups().map((headerGroup) => (
        <MRT_TableHeadRow
          headerGroup={headerGroup as any}
          key={headerGroup.id}
          table={table}
          virtualColumns={virtualColumns}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      ))}
    </Box>
  );
};
