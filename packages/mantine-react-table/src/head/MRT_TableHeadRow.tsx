import { Box, TableTr } from '@mantine/core';
import clsx from 'clsx';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import {
  type MRT_RowData,
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_TableHeadRow.module.css';

interface Props<TData extends MRT_RowData> {
  headerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHeadRow = <TData extends MRT_RowData>({
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

  const tableRowProps = parseFromValuesOrFunc(mantineTableHeadRowProps, {
    headerGroup,
    table,
  });

  return (
    <TableTr
      {...tableRowProps}
      className={clsx(
        classes.root,
        (enableStickyHeader || isFullScreen) && classes.sticky,
        layoutMode?.startsWith('grid') && classes['layout-mode-grid'],
      )}
    >
      {virtualPaddingLeft ? (
        <Box component="th" display="flex" w={virtualPaddingLeft} />
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
        <Box component="th" display="flex" w={virtualPaddingRight} />
      ) : null}
    </TableTr>
  );
};
