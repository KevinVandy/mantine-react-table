import { type ReactNode } from 'react';
import { Flex, Tooltip } from '@mantine/core';
import { MRT_ExpandAllButton } from '../../components/buttons/MRT_ExpandAllButton';
import { MRT_ExpandButton } from '../../components/buttons/MRT_ExpandButton';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import {
  defaultDisplayColumnProps,
  showRowExpandColumn,
} from '../../utils/displayColumn.utils';

export const getMRT_RowExpandColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  if (!showRowExpandColumn(tableOptions)) {
    return null;
  }

  const {
    defaultColumn,
    enableExpandAll,
    groupedColumnMode,
    positionExpandColumn,
    renderDetailPanel,
    state: { grouping },
  } = tableOptions;

  const alignProps =
    positionExpandColumn === 'last'
      ? ({
          align: 'right',
        } as const)
      : undefined;

  return {
    Cell: ({ cell, column, row, table }) => {
      const expandButtonProps = { row, table };
      const subRowsLength = row.subRows?.length;
      if (tableOptions.groupedColumnMode === 'remove' && row.groupingColumnId) {
        return (
          <Flex align="center" gap="0.25rem">
            <MRT_ExpandButton {...expandButtonProps} />
            <Tooltip
              label={table.getColumn(row.groupingColumnId).columnDef.header}
              openDelay={1000}
              position="right"
            >
              <span>{row.groupingValue as ReactNode}</span>
            </Tooltip>
            {!!subRowsLength && <span>({subRowsLength})</span>}
          </Flex>
        );
      } else {
        return (
          <>
            <MRT_ExpandButton {...expandButtonProps} />
            {column.columnDef.GroupedCell?.({ cell, column, row, table })}
          </>
        );
      }
    },
    Header: enableExpandAll
      ? ({ table }) => {
          return (
            <>
              <MRT_ExpandAllButton table={table} />
              {groupedColumnMode === 'remove' &&
                grouping
                  ?.map(
                    (groupedColumnId) =>
                      table.getColumn(groupedColumnId).columnDef.header,
                  )
                  ?.join(', ')}
            </>
          );
        }
      : undefined,
    mantineTableBodyCellProps: alignProps,
    mantineTableHeadCellProps: alignProps,
    ...defaultDisplayColumnProps({
      header: 'expand',
      id: 'mrt-row-expand',
      size:
        groupedColumnMode === 'remove'
          ? defaultColumn?.size
          : renderDetailPanel
            ? 60
            : 100,
      tableOptions,
    }),
  };
};
