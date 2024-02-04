import clsx from 'clsx';
import classes from './MRT_TableFooterRow.module.css';
import { Box, TableTr, type TableTrProps } from '@mantine/core';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> extends TableTrProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  footerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooterRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  footerGroup,
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: { layoutMode, mantineTableFooterRowProps },
  } = table;

  const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } =
    columnVirtualizer ?? {};

  // if no content in row, skip row
  if (
    !footerGroup.headers?.some(
      (header) =>
        (typeof header.column.columnDef.footer === 'string' &&
          !!header.column.columnDef.footer) ||
        header.column.columnDef.Footer,
    )
  ) {
    return null;
  }

  const tableRowProps = {
    ...parseFromValuesOrFunc(mantineTableFooterRowProps, {
      footerGroup,
      table,
    }),
    ...rest,
  };

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
      {(virtualColumns ?? footerGroup.headers).map(
        (footerOrVirtualFooter, renderedColumnIndex) => {
          let footer = footerOrVirtualFooter as MRT_Header<TData>;
          if (columnVirtualizer) {
            renderedColumnIndex = (footerOrVirtualFooter as MRT_VirtualItem)
              .index;
            footer = footerGroup.headers[renderedColumnIndex];
          }

          return (
            <MRT_TableFooterCell
              footer={footer}
              key={footer.id}
              renderedColumnIndex={renderedColumnIndex}
              table={table}
            />
          );
        },
      )}
      {virtualPaddingRight ? (
        <Box component="th" display="flex" w={virtualPaddingRight} />
      ) : null}
    </TableTr>
  );
};
