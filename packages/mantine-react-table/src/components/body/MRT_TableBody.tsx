import clsx from 'clsx';
import classes from './MRT_TableBody.module.css';
import { memo, useMemo } from 'react';
import {
  type TableProps,
  TableTbody,
  type TableTbodyProps,
  Text,
} from '@mantine/core';
import { MRT_TableBodyRow, Memo_MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMRT_RowVirtualizer } from '../../hooks/useMRT_RowVirtualizer';
import { useMRT_Rows } from '../../hooks/useMRT_Rows';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableBodyProps<TData extends MRT_RowData>
  extends TableTbodyProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  table: MRT_TableInstance<TData>;
  tableProps: Partial<TableProps>;
}

export const MRT_TableBody = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
  tableProps,
  ...rest
}: MRT_TableBodyProps<TData>) => {
  const {
    getBottomRows,
    getIsSomeRowsPinned,
    getRowModel,
    getState,
    getTopRows,
    options: {
      enableStickyFooter,
      enableStickyHeader,
      layoutMode,
      localization,
      mantineTableBodyProps,
      memoMode,
      renderDetailPanel,
      renderEmptyRowsFallback,
      rowPinningDisplayMode,
    },
    refs: { tableFooterRef, tableHeadRef, tablePaperRef },
  } = table;
  const { columnFilters, globalFilter, isFullScreen, rowPinning } = getState();

  const tableBodyProps = {
    ...parseFromValuesOrFunc(mantineTableBodyProps, { table }),
    ...rest,
  };

  const tableHeadHeight =
    ((enableStickyHeader || isFullScreen) &&
      tableHeadRef.current?.clientHeight) ||
    0;
  const tableFooterHeight =
    (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

  const pinnedRowIds = useMemo(() => {
    if (!rowPinning.bottom?.length && !rowPinning.top?.length) return [];
    return getRowModel()
      .rows.filter((row) => row.getIsPinned())
      .map((r) => r.id);
  }, [rowPinning, getRowModel().rows]);

  const rows = useMRT_Rows(table);

  const rowVirtualizer = useMRT_RowVirtualizer(table, rows);

  const { virtualRows } = rowVirtualizer ?? {};

  const commonRowProps = {
    columnVirtualizer,
    numRows: rows.length,
    table,
    tableProps,
  };

  return (
    <>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('top') && (
          <TableTbody
            {...tableBodyProps}
            __vars={{
              '--mrt-table-head-height': `${tableHeadHeight}`,
              ...tableBodyProps?.__vars,
            }}
            className={clsx(
              classes.pinned,
              layoutMode?.startsWith('grid') && classes['root-grid'],
              tableBodyProps?.className,
            )}
          >
            {getTopRows().map((row, renderedRowIndex) => {
              const rowProps = {
                ...commonRowProps,
                renderedRowIndex,
                row,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...rowProps} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...rowProps} />
              );
            })}
          </TableTbody>
        )}
      <TableTbody
        {...tableBodyProps}
        __vars={{
          '--mrt-table-body-height': rowVirtualizer
            ? `${rowVirtualizer.getTotalSize()}px`
            : undefined,
          ...tableBodyProps?.__vars,
        }}
        className={clsx(
          classes.root,
          layoutMode?.startsWith('grid') && classes['root-grid'],
          !rows.length && classes['root-no-rows'],
          rowVirtualizer && classes['root-virtualized'],
          tableBodyProps?.className,
        )}
      >
        {tableBodyProps?.children ??
          (!rows.length ? (
            <tr
              className={clsx(
                'mrt-table-body-row',
                layoutMode?.startsWith('grid') && classes['empty-row-tr-grid'],
              )}
            >
              <td
                className={clsx(
                  'mrt-table-body-cell',
                  layoutMode?.startsWith('grid') &&
                    classes['empty-row-td-grid'],
                )}
                colSpan={table.getVisibleLeafColumns().length}
              >
                {renderEmptyRowsFallback?.({ table }) ?? (
                  <Text
                    __vars={{
                      '--mrt-paper-width': `${tablePaperRef.current?.clientWidth}`,
                    }}
                    className={clsx(classes['empty-row-td-content'])}
                  >
                    {globalFilter || columnFilters.length
                      ? localization.noResultsFound
                      : localization.noRecordsToDisplay}
                  </Text>
                )}
              </td>
            </tr>
          ) : (
            <>
              {(virtualRows ?? rows).map(
                (rowOrVirtualRow, renderedRowIndex) => {
                  if (rowVirtualizer) {
                    if (renderDetailPanel) {
                      if (rowOrVirtualRow.index % 2 === 1) {
                        return null;
                      } else {
                        renderedRowIndex = rowOrVirtualRow.index / 2;
                      }
                    } else {
                      renderedRowIndex = rowOrVirtualRow.index;
                    }
                  }
                  const row = rowVirtualizer
                    ? rows[renderedRowIndex]
                    : (rowOrVirtualRow as MRT_Row<TData>);
                  const props = {
                    ...commonRowProps,
                    pinnedRowIds,
                    renderedRowIndex,
                    row,
                    rowVirtualizer,
                    virtualRow: rowVirtualizer
                      ? (rowOrVirtualRow as MRT_VirtualItem)
                      : undefined,
                  };
                  const key = `${row.id}-${row.index}`;
                  return memoMode === 'rows' ? (
                    <Memo_MRT_TableBodyRow key={key} {...props} />
                  ) : (
                    <MRT_TableBodyRow key={key} {...props} />
                  );
                },
              )}
            </>
          ))}
      </TableTbody>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('bottom') && (
          <TableTbody
            {...tableBodyProps}
            __vars={{
              '--mrt-table-footer-height': `${tableFooterHeight}`,
              ...tableBodyProps?.__vars,
            }}
            className={clsx(
              classes.pinned,
              layoutMode?.startsWith('grid') && classes['root-grid'],
              tableBodyProps?.className,
            )}
          >
            {getBottomRows().map((row, renderedRowIndex) => {
              const props = {
                ...commonRowProps,
                renderedRowIndex,
                row,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </TableTbody>
        )}
    </>
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof MRT_TableBody;
