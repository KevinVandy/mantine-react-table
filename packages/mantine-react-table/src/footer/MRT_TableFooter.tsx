import { Box } from '@mantine/core';
import clsx from 'clsx';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { type MRT_TableInstance, type MRT_VirtualItem } from '../types';
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

  const { className, ...tableFooterProps } =
    mantineTableFooterProps instanceof Function
      ? mantineTableFooterProps({ table })
      : mantineTableFooterProps;

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  return (
    <Box
      component="tfoot"
      {...tableFooterProps}
      className={clsx(
        stickFooter && classes.MRT_TableFooterSticky,
        layoutMode === 'grid'
          ? classes.MRT_TableFooterGrid
          : classes.MRT_TableFooterTableRowGroup,
        className,
      )}
      style={(theme) => ({
        ...(tableFooterProps?.style instanceof Function
          ? tableFooterProps?.style(theme)
          : (tableFooterProps?.style as any)),
      })}
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
