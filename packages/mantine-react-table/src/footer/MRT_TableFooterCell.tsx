import React, { FC } from 'react';
import { Box } from '@mantine/core';
import { getCommonCellStyles } from '../column.utils';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  footer: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableFooterCell: FC<Props> = ({ footer, table }) => {
  const {
    getState,
    options: { layoutMode, muiTableFooterCellProps },
  } = table;
  const { density } = getState();
  const { column } = footer;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps({ column, table })
      : muiTableFooterCellProps;

  const mcTableFooterCellProps =
    columnDef.muiTableFooterCellProps instanceof Function
      ? columnDef.muiTableFooterCellProps({ column, table })
      : columnDef.muiTableFooterCellProps;

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
        padding:
          density === 'compact'
            ? '0.5rem'
            : density === 'comfortable'
            ? '1rem'
            : '1.5rem',
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
