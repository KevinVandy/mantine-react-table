import clsx from 'clsx';
import { Box, Collapse } from '@mantine/core';

import {
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_TableDetailPanel.module.css';

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

  const tableRowProps = parseFromValuesOrFunc(mantineTableBodyRowProps, {
    isDetailPanel: true,
    row,
    staticRowIndex: rowIndex,
    table,
  });

  const tableCellProps = parseFromValuesOrFunc(mantineDetailPanelProps, {
    row,
    table,
  });

  const parentRowHeight = virtualRow
    ? parentRowRef.current?.getBoundingClientRect()?.height
    : 0;
  return (
    <Box
      component="tr"
      {...tableRowProps}
      __vars={{
        '--mrt-parent-row-height':
          virtualRow && parentRowHeight ? `${parentRowHeight}px` : undefined,
        '--mrt-virtual-row-start': virtualRow
          ? `${virtualRow.start}px`
          : undefined,
        ...tableRowProps?.__vars,
      }}
      className={clsx(
        'mrt-table-detail-panel',
        classes.root,
        layoutMode === 'grid' && classes['root-grid'],
        virtualRow && classes['root-virtual-row'],
        tableRowProps?.className,
      )}
    >
      <Box
        component="td"
        colSpan={getVisibleLeafColumns().length}
        {...tableCellProps}
        __vars={{
          '--mrt-inner-width': `${table.getTotalSize()}px`,
        }}
        className={clsx(
          'mrt-table-detail-panel-cell',
          classes.inner,
          layoutMode === 'grid' && classes['inner-grid'],
          row.getIsExpanded() && classes['inner-expanded'],
          virtualRow && classes['inner-virtual'],
        )}
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
