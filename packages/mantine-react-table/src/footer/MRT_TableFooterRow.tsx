import { Box } from '@mantine/core';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import {
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';

interface Props<TData extends Record<string, any> = {}> {
  footerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooterRow = <TData extends Record<string, any> = {}>({
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

  const tableRowProps =
    mantineTableFooterRowProps instanceof Function
      ? mantineTableFooterRowProps({ footerGroup, table })
      : mantineTableFooterRowProps;

  return (
    <Box
      component="tr"
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor: theme.fn.lighten(
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          0.06,
        ),
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        width: '100%',
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps?.sx(theme)
          : (tableRowProps?.sx as any)),
      })}
    >
      {virtualPaddingLeft ? (
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
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
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </Box>
  );
};
