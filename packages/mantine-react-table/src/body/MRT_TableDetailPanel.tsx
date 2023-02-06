import React, { FC } from 'react';
import { Box, Collapse } from '@mantine/core';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  parentRowRef: React.RefObject<HTMLTableRowElement>;
  row: MRT_Row;
  table: MRT_TableInstance;
  virtualRow?: VirtualItem;
}

export const MRT_TableDetailPanel: FC<Props> = ({
  parentRowRef,
  row,
  table,
  virtualRow,
}) => {
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
      ? mantineTableBodyRowProps({ isDetailPanel: true, row, table })
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
      sx={(theme) => ({
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
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps.sx(theme)
          : (tableRowProps?.sx as any)),
      })}
    >
      <Box
        component="td"
        className="mantine-TableBodyCell-DetailPanel"
        colSpan={getVisibleLeafColumns().length}
        {...tableCellProps}
        sx={(theme) => ({
          backgroundColor: virtualRow
            ? theme.fn.lighten(theme.colors.dark[7], 0.06)
            : undefined,
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          display: layoutMode === 'grid' ? 'flex' : 'table-cell',
          paddingBottom: row.getIsExpanded()
            ? '16px !important'
            : '0 !important',
          paddingTop: row.getIsExpanded() ? '16px !important' : '0 !important',
          transition: 'all 100ms ease-in-out',
          width: `${table.getTotalSize()}px`,
          ...(tableCellProps?.sx instanceof Function
            ? tableCellProps.sx(theme)
            : (tableCellProps?.sx as any)),
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
