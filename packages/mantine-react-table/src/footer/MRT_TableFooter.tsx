import { Box } from '@mantine/core';
import clsx from 'clsx';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { type MRT_TableInstance, type MRT_VirtualItem } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_TableFooter.module.css';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooter = <TData extends Record<string, any> = {}>({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, layoutMode, mantineTableFooterProps },
  } = table;
  const { isFullScreen } = getState();

  const tableFooterProps = parseFromValuesOrFunc(mantineTableFooterProps, {
    table,
  });

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  return (
    <Box
      component="tfoot"
      {...tableFooterProps}
      className={clsx(
        'mrt-table-footer',
        classes.root,
        tableFooterProps?.className,
        stickFooter && classes.sticky,
        layoutMode === 'grid' && classes.grid,
      )}
      // style={(theme) => ({
      //   ...styleValue(tableFooterProps, theme),
      // })}
    >
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          table={table}
          virtualColumns={virtualColumns}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      ))}
    </Box>
  );
};
