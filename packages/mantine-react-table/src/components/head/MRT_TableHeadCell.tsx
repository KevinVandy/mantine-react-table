import clsx from 'clsx';
import classes from './MRT_TableHeadCell.module.css';
import {
  type CSSProperties,
  type DragEventHandler,
  type ReactNode,
  useMemo,
} from 'react';
import { Flex, TableTh, useDirection } from '@mantine/core';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_TableHeadCellGrabHandle } from './MRT_TableHeadCellGrabHandle';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import {
  getIsFirstRightPinnedColumn,
  getIsLastLeftPinnedColumn,
  getTotalRight,
} from '../../utils/column.utils';
import { parseCSSVarId } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_ColumnActionMenu } from '../menus/MRT_ColumnActionMenu';

interface Props<TData extends MRT_RowData> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCell = <TData extends MRT_RowData>({
  header,
  table,
}: Props<TData>) => {
  const direction = useDirection();
  const {
    getState,
    options: {
      columnResizeMode,
      columnResizeDirection,
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
  const { density, draggingColumn, grouping, hoveredColumn, columnSizingInfo } =
    getState();
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
      minWidth: `max(calc(var(--header-${parseCSSVarId(
        header?.id,
      )}-size) * 1px), ${columnDef.minSize ?? 30}px)`,
      width: `calc(var(--header-${parseCSSVarId(header.id)}-size) * 1px)`,
    };
    if (layoutMode === 'grid') {
      styles.flex = `${
        [0, false].includes(columnDef.grow!)
          ? 0
          : `var(--header-${parseCSSVarId(header.id)}-size)`
      } 0 auto`;
    } else if (layoutMode === 'grid-no-grow') {
      styles.flex = `${+(columnDef.grow || 0)} 0 auto`;
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

  const handleDragEnter: DragEventHandler<HTMLTableCellElement> = (_e) => {
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
    <TableTh
      {...tableCellProps}
      __vars={{
        '--mrt-table-cell-left':
          column.getIsPinned() === 'left'
            ? `${column.getStart('left')}`
            : undefined,
        '--mrt-table-cell-right':
          column.getIsPinned() === 'right'
            ? `${getTotalRight(table, column)}`
            : undefined,
        '--mrt-table-head-cell-padding':
          density === 'xl' ? '23' : density === 'md' ? '16' : '10',
        '--mrt-table-head-cell-z-index':
          column.getIsResizing() || draggingColumn?.id === column.id
            ? '3'
            : column.getIsPinned() && columnDefType !== 'group'
              ? '2'
              : '1',
      }}
      align={
        columnDefType === 'group'
          ? 'center'
          : direction.dir === 'rtl'
            ? 'right'
            : 'left'
      }
      className={clsx(
        classes.root,
        layoutMode?.startsWith('grid') && classes['root-grid'],
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
        columnSizingInfo?.isResizingColumn === column.id &&
          columnResizeMode === 'onChange' &&
          classes[`resizing-${columnResizeDirection}`],
        draggingColumn?.id === column.id && classes['dragging'],
        draggingColumn?.id !== column.id &&
          hoveredColumn?.id === column.id &&
          classes['hovered'],
      )}
      colSpan={header.colSpan}
      onDragEnter={handleDragEnter}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          tableHeadCellRefs.current[column.id] = node;
        }
      }}
      style={(theme) => ({
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
            >
              {headerElement}
            </Flex>
            {column.getCanFilter() && (
              <MRT_TableHeadCellFilterLabel header={header} table={table} />
            )}
            {column.getCanSort() && (
              <MRT_TableHeadCellSortLabel header={header} table={table} />
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
    </TableTh>
  );
};
