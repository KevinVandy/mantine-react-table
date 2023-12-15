import clsx from 'clsx';
import { Box, TableTr } from '@mantine/core';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import {
  type MRT_RowData,
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_TableFooterRow.module.css';

interface Props<TData extends MRT_RowData> {
  footerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooterRow = <TData extends MRT_RowData>({
  footerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    options: { layoutMode, mantineTableFooterRowProps },
  } = table;

  // if no content in row, skip row
  if (
    !footerGroup.headers?.some(
      (header) =>
        (typeof header.column.columnDef.footer === 'string' &&
          !!header.column.columnDef.footer) ||
        header.column.columnDef.Footer,
    )
  )
    return null;

  const tableRowProps = parseFromValuesOrFunc(mantineTableFooterRowProps, {
    footerGroup,
    table,
  });

  return (
    <TableTr
      className={clsx(
        classes.root,
        layoutMode?.startsWith('grid') && classes['layout-mode-grid'],
      )}
      {...tableRowProps}
    >
      {virtualPaddingLeft ? (
        <Box component="th" display="flex" w={virtualPaddingLeft} />
      ) : null}
      {(virtualColumns ?? footerGroup.headers).map((footerOrVirtualFooter) => {
        const footer = virtualColumns
          ? footerGroup.headers[footerOrVirtualFooter.index]
          : (footerOrVirtualFooter as MRT_Header<TData>);

        return (
          <MRT_TableFooterCell footer={footer} key={footer.id} table={table} />
        );
      })}
      {virtualPaddingRight ? (
        <Box component="th" display="flex" w={virtualPaddingRight} />
      ) : null}
    </TableTr>
  );
};
