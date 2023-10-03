import clsx from 'clsx';
import { TableThead } from '@mantine/core';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { MRT_ToolbarAlertBanner } from '../toolbar';
import { type MRT_TableInstance, type MRT_VirtualItem } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_TableHead.module.css';

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

  const tableHeadProps = parseFromValuesOrFunc(mantineTableHeadProps, {
    table,
  });

  const stickyHeader = enableStickyHeader || isFullScreen;

  return (
    <TableThead
      {...tableHeadProps}
      className={clsx(
        'mrt-table-head',
        classes.root,
        layoutMode === 'grid' && classes['root-grid'],
        stickyHeader && classes['root-sticky'],
        tableHeadProps?.className,
      )}
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
    </TableThead>
  );
};
