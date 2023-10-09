import {
  type DragEvent,
  type ReactNode,
  useMemo,
  type CSSProperties,
} from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { MRT_ColumnActionMenu } from '../menus/MRT_ColumnActionMenu';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_TableHeadCellGrabHandle } from './MRT_TableHeadCellGrabHandle';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import {
  getIsFirstRightPinnedColumn,
  getIsLastLeftPinnedColumn,
  getPrimaryColor,
  getTotalRight,
  parseCSSVarId,
  parseFromValuesOrFunc,
} from '../column.utils';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import clsx from 'clsx';
import classes from './MRT_TableHeadCell.module.css';

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCell = <TData extends Record<string, any> = {}>({
  header,
  table,
}: Props<TData>) => {
  const theme = useMantineTheme();
  const {
    getState,
    options: {
      columnFilterDisplayMode,
      enableColumnActions,
      enableColumnDragging,
      enableColumnOrdering,
      enableGrouping,
      enableMultiSort,
      layoutMode,
      mantineTableHeadCellProps,
    },
    refs: { tableHeadCellRefs },
    setHoveredColumn,
  } = table;
  const { density, draggingColumn, grouping, hoveredColumn } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const arg = { column, table };
  const tableCellProps = {
    ...parseFromValuesOrFunc(mantineTableHeadCellProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineTableHeadCellProps, arg),
  };

  const widthStyles = useMemo(() => {
    const styles: CSSProperties = {
      minWidth: `max(calc(var(--col-${parseCSSVarId(column.id)}-size) * 1px), ${
        column.columnDef.minSize ?? 30
      }px)`,
      width: `calc(var(--col-${parseCSSVarId(column.id)}-size) * 1px)`,
    };

    if (layoutMode === 'grid') {
      styles.flex = `${column.getSize()} 0 auto`;
    }

    return styles;
  }, [column]);

  const showColumnActions =
    (enableColumnActions || columnDef.enableColumnActions) &&
    columnDef.enableColumnActions !== false;

  const showDragHandle =
    enableColumnDragging !== false &&
    columnDef.enableColumnDragging !== false &&
    (enableColumnDragging ||
      (enableColumnOrdering && columnDef.enableColumnOrdering !== false) ||
      (enableGrouping &&
        columnDef.enableGrouping !== false &&
        !grouping.includes(column.id)));

  const headerPL = useMemo(() => {
    let pl = 0;
    if (column.getCanSort()) pl++;
    if (showColumnActions) pl += 1.75;
    if (showDragHandle) pl += 1.25;
    return pl;
  }, [showColumnActions, showDragHandle]);

  const draggingBorder = useMemo(
    () =>
      draggingColumn?.id === column.id
        ? `1px dashed ${theme.colors.gray[7]} !important`
        : hoveredColumn?.id === column.id
        ? `2px dashed ${getPrimaryColor(theme)} !important`
        : undefined,
    [draggingColumn, hoveredColumn],
  );

  const draggingBorders = draggingBorder
    ? {
        borderLeft: draggingBorder,
        borderRight: draggingBorder,
        borderTop: draggingBorder,
      }
    : undefined;

  const handleDragEnter = (_e: DragEvent) => {
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn && columnDefType !== 'group') {
      setHoveredColumn(
        columnDef.enableColumnOrdering !== false ? column : null,
      );
    }
  };

  const headerElement =
    columnDef?.Header instanceof Function
      ? columnDef?.Header?.({
          column,
          header,
          table,
        })
      : columnDef?.Header ?? (columnDef.header as ReactNode);

  return (
    <Box
      component="th"
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={header.colSpan}
      onDragEnter={handleDragEnter}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          tableHeadCellRefs.current[column.id] = node;
        }
      }}
      {...tableCellProps}
      __vars={{
        '--mrt-table-head-cell-padding':
          density === 'xl' ? '23' : density === 'md' ? '16' : '10',
        '--mrt-table-head-cell-z-index':
          column.getIsResizing() || draggingColumn?.id === column.id
            ? '3'
            : column.getIsPinned() && columnDefType !== 'group'
            ? '2'
            : '1',
        '--mrt-table-cell-left':
          column.getIsPinned() === 'left'
            ? `${column.getStart('left')}`
            : undefined,
        '--mrt-table-cell-right':
          column.getIsPinned() === 'right'
            ? `${getTotalRight(table, column)}`
            : undefined,
      }}
      className={clsx(
        'mrt-table-head-cell',
        classes.root,
        layoutMode === 'grid' && classes['root-grid'],
        enableMultiSort && column.getCanSort() && classes['root-no-select'],
        column.getIsPinned() &&
          column.columnDef.columnDefType !== 'group' &&
          classes['root-pinned'],
        column.getIsPinned() === 'left' && classes['root-pinned-left'],
        column.getIsPinned() === 'right' && classes['root-pinned-right'],
        getIsLastLeftPinnedColumn(table, column) &&
          classes['root-pinned-left-last'],
        getIsFirstRightPinnedColumn(column) &&
          classes['root-pinned-right-first'],
        tableCellProps?.className,
        draggingColumn?.id === column.id ||
          (table.getState().hoveredColumn?.id === column.id &&
            classes['root-opacity']),
      )}
      style={(theme) => ({
        ...draggingBorders,
        ...widthStyles,
        ...parseFromValuesOrFunc(tableCellProps?.style, theme),
      })}
    >
      {header.isPlaceholder ? null : (
        <Flex
          className={clsx(
            'mrt-table-head-cell-content',
            classes.content,
            (columnDefType === 'group' || tableCellProps?.align === 'center') &&
              classes['content-center'],
            tableCellProps?.align === 'right' && classes['content-right'],
            column.getCanResize() && classes['content-spaced'],
          )}
        >
          <Flex
            __vars={{
              '--mrt-table-head-cell-labels-padding-left': `${headerPL}`,
            }}
            className={clsx(
              'mrt-table-head-cell-labels',
              classes.labels,
              column.getCanSort() &&
                columnDefType !== 'group' &&
                classes['labels-sortable'],
              tableCellProps?.align === 'right'
                ? classes['labels-right']
                : tableCellProps?.align === 'center' &&
                    classes['labels-center'],
              columnDefType === 'data' && classes['labels-data'],
            )}
            onClick={column.getToggleSortingHandler()}
          >
            <Flex
              className={clsx(
                'mrt-table-head-cell-content-wrapper',
                classes['content-wrapper'],
                columnDefType === 'data' &&
                  classes['content-wrapper-hidden-overflow'],
                (columnDef.header?.length ?? 0) < 20 &&
                  classes['content-wrapper-nowrap'],
              )}
              title={columnDefType === 'data' ? columnDef.header : undefined}
            >
              {headerElement}
            </Flex>
            {column.getCanSort() && (
              <MRT_TableHeadCellSortLabel header={header} table={table} />
            )}
            {column.getCanFilter() && (
              <MRT_TableHeadCellFilterLabel header={header} table={table} />
            )}
          </Flex>
          {columnDefType !== 'group' && (
            <Flex
              className={clsx(
                'mrt-table-head-cell-content-actions',
                classes['content-actions'],
              )}
            >
              {showDragHandle && (
                <MRT_TableHeadCellGrabHandle
                  column={column}
                  table={table}
                  tableHeadCellRef={{
                    current: tableHeadCellRefs.current[column.id],
                  }}
                />
              )}
              {showColumnActions && (
                <MRT_ColumnActionMenu header={header} table={table} />
              )}
            </Flex>
          )}
          {column.getCanResize() && (
            <MRT_TableHeadCellResizeHandle header={header} table={table} />
          )}
        </Flex>
      )}
      {columnFilterDisplayMode === 'subheader' && column.getCanFilter() && (
        <MRT_TableHeadCellFilterContainer header={header} table={table} />
      )}
    </Box>
  );
};
