import clsx from 'clsx';
import classes from './MRT_TableFooterCell.module.css';
import { TableTh } from '@mantine/core';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { CSSProperties, useMemo } from 'react';
import { parseCSSVarId } from '../../utils/style.utils';

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

  const widthStyles = useMemo(() => {
    const styles: CSSProperties = {
      minWidth: `max(calc(var(--col-${parseCSSVarId(
        column?.id,
      )}-size) * 1px), ${columnDef.minSize ?? 30}px)`,
      width: `calc(var(--col-${parseCSSVarId(column.id)}-size) * 1px)`,
    };
    if (layoutMode === 'grid') {
      styles.flex = `${
        [0, false].includes(columnDef.grow!)
          ? 0
          : `var(--col-${parseCSSVarId(column.id)}-size)`
      } 0 auto`;
    } else if (layoutMode === 'grid-no-grow') {
      styles.flex = `${+(columnDef.grow || 0)} 0 auto`;
    }
    return styles;
  }, [column]);

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
      style={(theme) => ({
        ...widthStyles,
        ...parseFromValuesOrFunc(tableCellProps.style, theme),
      })}
    >
      <>{footerProps}</>
    </TableTh>
  );
};
