import { Box } from '@mantine/core';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { MRT_ToolbarAlertBanner } from '../toolbar';
import { type MRT_TableInstance, type MRT_VirtualItem } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHead = <TData extends Record<string, any> = {}>({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    getHeaderGroups,
    getSelectedRowModel,
    getState,
    options: {
      enableStickyHeader,
      layoutMode,
      mantineTableHeadProps,
      positionToolbarAlertBanner,
    },
  } = table;
  const { isFullScreen, showAlertBanner } = getState();

  const tableHeadProps =
    mantineTableHeadProps instanceof Function
      ? mantineTableHeadProps({ table })
      : mantineTableHeadProps;

  const stickyHeader = enableStickyHeader || isFullScreen;

  return (
    <Box
      component="thead"
      {...tableHeadProps}
      sx={(theme) => ({
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        position: stickyHeader && layoutMode === 'grid' ? 'sticky' : 'relative',
        opacity: 0.97,
        top: stickyHeader ? 0 : undefined,
        zIndex: stickyHeader ? 2 : undefined,
        ...(tableHeadProps?.sx instanceof Function
          ? tableHeadProps?.sx(theme)
          : (tableHeadProps?.sx as any)),
      })}
    >
      {positionToolbarAlertBanner === 'head-overlay' &&
      (showAlertBanner || getSelectedRowModel().rows.length > 0) ? (
        <tr style={{ display: layoutMode === 'grid' ? 'grid' : 'table-row' }}>
          <th
            colSpan={table.getVisibleLeafColumns().length}
            style={{
              display: layoutMode === 'grid' ? 'grid' : 'table-cell',
              padding: 0,
            }}
          >
            <MRT_ToolbarAlertBanner table={table} />
          </th>
        </tr>
      ) : (
        getHeaderGroups().map((headerGroup) => (
          <MRT_TableHeadRow
            headerGroup={headerGroup as any}
            key={headerGroup.id}
            table={table}
            virtualColumns={virtualColumns}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
          />
        ))
      )}
      {}
    </Box>
  );
};
