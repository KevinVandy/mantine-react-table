import { Box, useMantineTheme } from '@mantine/core';
import clsx from 'clsx';
import { getCommonCellStyles } from '../column.utils';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import { funcValue } from '../funcValue';

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
    ...funcValue(mantineTableFooterCellProps, arg),
    ...funcValue(columnDef.mantineTableFooterCellProps, arg),
  };

  const {
    className: commonClassName,
    __vars,
    style,
  } = getCommonCellStyles({
    column,
    table,
    theme,
    tableCellProps,
  });

  const footerProps = footer.isPlaceholder
    ? null
    : funcValue(columnDef.Footer, {
        column,
        footer,
        table,
      });

  return (
    <Box
      component="th"
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={footer.colSpan}
      data-selected={'false'}
      data-ispinned={column?.getIsPinned() ?? 'false'}
      data-columndef={columnDefType}
      {...tableCellProps}
      className={clsx(commonClassName, classes.MRT_TableFooterCell, className)}
      __vars={{
        ...__vars,
        '--z-index':
          column.getIsPinned() && columnDefType !== 'group' ? '2' : '1',
        '--display': layoutMode === 'grid' ? 'grid' : 'table-cell',
        ...tableCellProps.__vars,
      }}
      style={style}
    >
      <>{footerProps}</>
    </Box>
  );
};
