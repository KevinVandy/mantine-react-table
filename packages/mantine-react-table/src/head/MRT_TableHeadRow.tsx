import { Box } from '@mantine/core';
import clsx from 'clsx';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import {
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';
import { funcValue, styleValue } from '../funcValue';

import classes from './MRT_TableHeadRow.module.css';

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

  const tableRowProps = funcValue(mantineTableHeadRowProps, {
    headerGroup,
    table,
  });

  const stickyHeader = enableStickyHeader || isFullScreen;

  return (
    <Box
      component="tr"
      {...tableRowProps}
      className={clsx(
        classes.MRT_TableHeadRow,
        stickyHeader && classes.MRT_TableHeadRowSticky,
      )}
      __vars={{
        '--display': layoutMode === 'grid' ? 'flex' : 'table-row',
      }}
      style={(theme) => ({
        ...styleValue(tableRowProps, theme),
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
