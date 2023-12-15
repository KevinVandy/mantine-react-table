import clsx from 'clsx';
import { TableTh } from '@mantine/core';

import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_RowData,
  type MRT_Header,
  type MRT_TableInstance,
} from '../types';

import classes from './MRT_TableFooterCell.module.css';

interface Props<TData extends MRT_RowData> {
  footer: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooterCell = <TData extends MRT_RowData>({
  footer,
  table,
}: Props<TData>) => {
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
      }) ?? columnDef?.footer;

  return (
    <TableTh
      colSpan={footer.colSpan}
      {...tableCellProps}
      className={clsx(
        classes.root,
        layoutMode?.startsWith('grid') && classes.grid,
        column.getIsPinned() && columnDefType !== 'group' && classes.pinned,
        columnDefType === 'group' && classes.group,
        className,
      )}
    >
      <>{footerProps}</>
    </TableTh>
  );
};
