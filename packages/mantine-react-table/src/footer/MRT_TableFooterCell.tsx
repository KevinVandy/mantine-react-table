import { Box } from '@mantine/core';
import { getCommonCellStyles } from '../column.utils';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  footer: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooterCell = <TData extends Record<string, any> = {}>({
  footer,
  table,
}: Props<TData>) => {
  const {
    options: { layoutMode, mantineTableFooterCellProps },
  } = table;
  const { column } = footer;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const mTableFooterCellProps =
    mantineTableFooterCellProps instanceof Function
      ? mantineTableFooterCellProps({ column, table })
      : mantineTableFooterCellProps;

  const mcTableFooterCellProps =
    columnDef.mantineTableFooterCellProps instanceof Function
      ? columnDef.mantineTableFooterCellProps({ column, table })
      : columnDef.mantineTableFooterCellProps;

  const tableCellProps = {
    ...mTableFooterCellProps,
    ...mcTableFooterCellProps,
  };

  return (
    <Box
      component="th"
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={footer.colSpan}
      {...tableCellProps}
      sx={(theme) => ({
        display: layoutMode === 'grid' ? 'grid' : 'table-cell',
        fontWeight: 'bold',
        justifyContent: columnDefType === 'group' ? 'center' : undefined,
        padding: '8px',
        verticalAlign: 'top',
        zIndex: column.getIsPinned() && columnDefType !== 'group' ? 2 : 1,
        ...getCommonCellStyles({
          column,
          table,
          theme,
          tableCellProps,
        }),
      })}
    >
      <>
        {footer.isPlaceholder
          ? null
          : (columnDef.Footer instanceof Function
              ? columnDef.Footer?.({
                  column,
                  footer,
                  table,
                })
              : columnDef.Footer) ??
            columnDef.footer ??
            null}
      </>
    </Box>
  );
};
