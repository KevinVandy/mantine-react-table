import * as React from 'react';
import { Box, Collapse, lighten } from '@mantine/core';
import {
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';

interface Props<TData extends Record<string, any> = {}> {
  parentRowRef: React.RefObject<HTMLTableRowElement>;
  row: MRT_Row<TData>;
  rowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualRow?: MRT_VirtualItem;
}

export const MRT_TableDetailPanel = <TData extends Record<string, any> = {}>({
  parentRowRef,
  row,
  rowIndex,
  table,
  virtualRow,
}: Props<TData>) => {
  const {
    getVisibleLeafColumns,
    getState,
    options: {
      layoutMode,
      mantineTableBodyRowProps,
      mantineDetailPanelProps,
      renderDetailPanel,
    },
  } = table;
  const { isLoading } = getState();

  const tableRowProps =
    mantineTableBodyRowProps instanceof Function
      ? mantineTableBodyRowProps({
          isDetailPanel: true,
          row,
          staticRowIndex: rowIndex,
          table,
        })
      : mantineTableBodyRowProps;

  const tableCellProps =
    mantineDetailPanelProps instanceof Function
      ? mantineDetailPanelProps({ row, table })
      : mantineDetailPanelProps;

  return (
    <Box
      component="tr"
      className="mantine-TableBodyCell-DetailPanel"
      {...tableRowProps}
      style={(theme) => ({
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        position: virtualRow ? 'absolute' : undefined,
        top: virtualRow
          ? `${parentRowRef.current?.getBoundingClientRect()?.height}px`
          : undefined,
        transform: virtualRow
          ? `translateY(${virtualRow?.start}px)`
          : undefined,
        width: '100%',
        zIndex: virtualRow ? 2 : undefined,
        ...(tableRowProps?.style instanceof Function
          ? tableRowProps.style(theme)
          : (tableRowProps?.style as any)),
      })}
    >
      <Box
        component="td"
        className="mantine-TableBodyCell-DetailPanel"
        colSpan={getVisibleLeafColumns().length}
        {...tableCellProps}
        style={(theme) => ({
          backgroundColor: virtualRow
            ? lighten(theme.colors.dark[7], 0.06)
            : undefined,
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          display: layoutMode === 'grid' ? 'flex' : 'table-cell',
          paddingBottom: row.getIsExpanded()
            ? '16px !important'
            : '0 !important',
          paddingTop: row.getIsExpanded() ? '16px !important' : '0 !important',
          transition: 'all 100ms ease-in-out',
          width: `${table.getTotalSize()}px`,
          ...(tableCellProps?.style instanceof Function
            ? tableCellProps.style(theme)
            : (tableCellProps?.style as any)),
        })}
      >
        {renderDetailPanel && (
          <Collapse in={row.getIsExpanded()}>
            {!isLoading && renderDetailPanel({ row, table })}
          </Collapse>
        )}
      </Box>
    </Box>
  );
};
