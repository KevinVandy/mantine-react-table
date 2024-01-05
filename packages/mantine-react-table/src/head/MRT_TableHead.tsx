import clsx from 'clsx';
import { TableThead, TableTr, TableTh } from '@mantine/core';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { MRT_ToolbarAlertBanner } from '../toolbar';
import {
  type MRT_ColumnVirtualizer,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_TableHead.module.css';

interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  columnVirtualizer?: MRT_ColumnVirtualizer;
}

export const MRT_TableHead = <TData extends MRT_RowData>({
  table,
  columnVirtualizer,
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
    refs: { tableHeadRef },
  } = table;
  const { isFullScreen, showAlertBanner } = getState();

  const tableHeadProps = parseFromValuesOrFunc(mantineTableHeadProps, {
    table,
  });

  const stickyHeader = enableStickyHeader || isFullScreen;

  return (
    <TableThead
      {...tableHeadProps}
      ref={(ref: HTMLTableSectionElement) => {
        tableHeadRef.current = ref;
        if (tableHeadProps?.ref) {
          // @ts-ignore
          tableHeadProps.ref.current = ref;
        }
      }}
      className={clsx(
        classes.root,
        layoutMode?.startsWith('grid')
          ? classes['root-grid']
          : classes['root-table-row-group'],
        stickyHeader && classes['root-sticky'],
        tableHeadProps?.className,
      )}
      pos={
        stickyHeader && layoutMode?.startsWith('grid') ? 'sticky' : 'relative'
      }
    >
      {positionToolbarAlertBanner === 'head-overlay' &&
      (showAlertBanner || getSelectedRowModel().rows.length > 0) ? (
        <TableTr
          className={clsx(
            classes['banner-tr'],
            layoutMode?.startsWith('grid') && classes.grid,
          )}
        >
          <TableTh
            colSpan={table.getVisibleLeafColumns().length}
            className={clsx(
              classes['banner-th'],
              layoutMode?.startsWith('grid') && classes.grid,
            )}
          >
            <MRT_ToolbarAlertBanner table={table} />
          </TableTh>
        </TableTr>
      ) : (
        getHeaderGroups().map((headerGroup) => (
          <MRT_TableHeadRow
            headerGroup={headerGroup as any}
            key={headerGroup.id}
            table={table}
            columnVirtualizer={columnVirtualizer}
          />
        ))
      )}
    </TableThead>
  );
};
