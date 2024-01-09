import clsx from 'clsx';
import classes from './MRT_Table.module.css';
import { useMemo } from 'react';
import { Table } from '@mantine/core';
import { MRT_TableBody, Memo_MRT_TableBody } from '../body/MRT_TableBody';
import { parseCSSVarId, parseFromValuesOrFunc } from '../column.utils';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { useMRT_ColumnVirtualizer } from '../hooks/useMRT_ColumnVirtualizer';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

export const MRT_Table = <TData extends MRT_RowData>({
  table,
}: Props<TData>) => {
  const {
    getFlatHeaders,
    getState,
    options: {
      columns,
      enableColumnResizing,
      enableTableFooter,
      enableTableHead,
      layoutMode,
      mantineTableProps,
      memoMode,
    },
  } = table;
  const { columnSizing, columnSizingInfo, columnVisibility, density } =
    getState();

  const tableProps = parseFromValuesOrFunc(mantineTableProps, { table });

  const columnSizeVars = useMemo(() => {
    const headers = getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const colSize = header.getSize();
      colSizes[`--header-${parseCSSVarId(header.id)}-size`] = colSize;
      colSizes[`--col-${parseCSSVarId(header.column.id)}-size`] = colSize;
    }
    return colSizes;
  }, [columns, columnSizing, columnSizingInfo, columnVisibility]);

  const columnVirtualizer = useMRT_ColumnVirtualizer(table);

  const commonTableGroupProps = {
    columnVirtualizer,
    enableHover: tableProps?.highlightOnHover,
    isStriped: tableProps?.striped,
    table,
  };

  return (
    <Table
      className={clsx(
        'mrt-table',
        layoutMode?.startsWith('grid') && classes['root-grid'],
        enableColumnResizing &&
          layoutMode === 'semantic' &&
          classes['root-semantic-not-resizing'],
        tableProps?.className,
      )}
      highlightOnHover
      horizontalSpacing={density}
      verticalSpacing={density}
      {...tableProps}
      __vars={{
        ...columnSizeVars,
        ...tableProps?.__vars,
      }}
    >
      {enableTableHead && <MRT_TableHead {...commonTableGroupProps} />}
      {memoMode === 'table-body' || columnSizingInfo.isResizingColumn ? (
        <Memo_MRT_TableBody {...commonTableGroupProps} />
      ) : (
        <MRT_TableBody {...commonTableGroupProps} />
      )}
      {enableTableFooter && <MRT_TableFooter {...commonTableGroupProps} />}
    </Table>
  );
};
