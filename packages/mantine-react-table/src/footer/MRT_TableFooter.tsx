import { TableTfoot } from '@mantine/core';
import clsx from 'clsx';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import {
  type MRT_ColumnVirtualizer,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_TableFooter.module.css';

interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  columnVirtualizer?: MRT_ColumnVirtualizer;
}

export const MRT_TableFooter = <TData extends MRT_RowData>({
  table,
  columnVirtualizer,
}: Props<TData>) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, layoutMode, mantineTableFooterProps },
    refs: { tableFooterRef },
  } = table;
  const { isFullScreen } = getState();

  const tableFooterProps = parseFromValuesOrFunc(mantineTableFooterProps, {
    table,
  });

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  return (
    <TableTfoot
      {...tableFooterProps}
      ref={(ref: HTMLTableSectionElement) => {
        tableFooterRef.current = ref;
        if (tableFooterProps?.ref) {
          // @ts-ignore
          tableFooterProps.ref.current = ref;
        }
      }}
      className={clsx(
        classes.root,
        tableFooterProps?.className,
        stickFooter && classes.sticky,
        layoutMode?.startsWith('grid') && classes.grid,
      )}
    >
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          table={table}
          columnVirtualizer={columnVirtualizer}
        />
      ))}
    </TableTfoot>
  );
};
