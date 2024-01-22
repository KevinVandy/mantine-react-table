import clsx from 'clsx';
import classes from './MRT_TableHead.module.css';
import { TableTh, TableThead, TableTr } from '@mantine/core';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import {
  type MRT_ColumnVirtualizer,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_ToolbarAlertBanner } from '../toolbar/MRT_ToolbarAlertBanner';

interface Props<TData extends MRT_RowData> {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHead = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
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
      ref={(ref: HTMLTableSectionElement) => {
        tableHeadRef.current = ref;
        if (tableHeadProps?.ref) {
          // @ts-ignore
          tableHeadProps.ref.current = ref;
        }
      }}
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
            className={clsx(
              classes['banner-th'],
              layoutMode?.startsWith('grid') && classes.grid,
            )}
            colSpan={table.getVisibleLeafColumns().length}
          >
            <MRT_ToolbarAlertBanner table={table} />
          </TableTh>
        </TableTr>
      ) : (
        getHeaderGroups().map((headerGroup) => (
          <MRT_TableHeadRow
            columnVirtualizer={columnVirtualizer}
            headerGroup={headerGroup as any}
            key={headerGroup.id}
            table={table}
          />
        ))
      )}
    </TableThead>
  );
};
