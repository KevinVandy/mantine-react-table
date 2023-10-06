import clsx from 'clsx';
import { TableTh, useMantineTheme } from '@mantine/core';

import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_Header, type MRT_TableInstance } from '../types';

import classes from './MRT_TableFooterCell.module.css';

interface Props<TData extends Record<string, any> = {}> {
  footer: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooterCell = <TData extends Record<string, any> = {}>({
  footer,
  table,
}: Props<TData>) => {
  const theme = useMantineTheme();
  const {
    options: { layoutMode, mantineTableFooterCellProps },
  } = table;
  const { column } = footer;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const arg = { column, table };
  const { className, ...tableCellProps } = {
    ...parseFromValuesOrFunc(mantineTableFooterCellProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineTableFooterCellProps, arg),
  };

  const footerProps = footer.isPlaceholder
    ? null
    : parseFromValuesOrFunc(columnDef.Footer, {
        column,
        footer,
        table,
      });

  return (
    <TableTh
      colSpan={footer.colSpan}
      {...tableCellProps}
      className={clsx(
        'mrt-table-footer-cell',
        classes.root,
        layoutMode === 'grid' && classes.grid,
        column.getIsPinned() && columnDefType !== 'group' && classes.pinned,
        columnDefType === 'group' && classes.group,
        className,
      )}
    >
      <>{footerProps}</>
    </TableTh>
  );
};
