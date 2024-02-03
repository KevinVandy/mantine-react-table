import clsx from 'clsx';
import classes from './MRT_TableBody.module.css';
import { memo, useMemo } from 'react';
import { TableTbody, Text } from '@mantine/core';
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

interface Props<TData extends MRT_RowData> {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  enableHover?: boolean;
  isStriped?: 'even' | 'odd' | boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBody = <TData extends MRT_RowData>({
  columnVirtualizer,
  enableHover,
  isStriped,
  table,
}: Props<TData>) => {
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

  const tableBodyProps = parseFromValuesOrFunc(mantineTableBodyProps, {
    table,
  });

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

  const rows = useMRT_Rows(table, pinnedRowIds);

  const rowVirtualizer = useMRT_RowVirtualizer(table, rows);

  const { virtualRows } = rowVirtualizer ?? {};

  const commonRowProps = {
    columnVirtualizer,
    numRows: rows.length,
    table,
  };

  return (
    <>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('top') && (
          <TableTbody
            {...tableBodyProps}
            style={(theme) => ({
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              position: 'sticky',
              top: tableHeadHeight - 1,
              zIndex: 1,
              ...(parseFromValuesOrFunc(tableBodyProps?.style, theme) as any),
            })}
          >
            {getTopRows().map((row, rowRenderIndex) => {
              const rowProps = {
                ...commonRowProps,
                row,
                rowRenderIndex,
              };
              row.renderIndex = rowRenderIndex;
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
              {(virtualRows ?? rows).map((rowOrVirtualRow, rowRenderIndex) => {
                if (rowVirtualizer) {
                  if (renderDetailPanel) {
                    if (rowOrVirtualRow.index % 2 === 1) {
                      return null;
                    } else {
                      rowRenderIndex = rowOrVirtualRow.index / 2;
                    }
                  } else {
                    rowRenderIndex = rowOrVirtualRow.index;
                  }
                }
                const row = rowVirtualizer
                  ? rows[rowRenderIndex]
                  : (rowOrVirtualRow as MRT_Row<TData>);
                row.renderIndex = rowRenderIndex;
                const props = {
                  ...commonRowProps,
                  enableHover,
                  isStriped,
                  pinnedRowIds,
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
              })}
            </>
          ))}
      </TableTbody>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('bottom') && (
          <TableTbody
            {...tableBodyProps}
            style={(theme) => ({
              bottom: tableFooterHeight - 1,
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              position: 'sticky',
              zIndex: 1,
              ...(parseFromValuesOrFunc(tableBodyProps?.style, theme) as any),
            })}
          >
            {getBottomRows().map((row, rowRenderIndex) => {
              const props = {
                ...commonRowProps,
                row,
                rowRenderIndex,
              };
              row.renderIndex = rowRenderIndex;
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
