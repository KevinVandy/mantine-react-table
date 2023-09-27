import { type DragEvent, type ReactNode, useMemo } from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import clsx from 'clsx';
import { MRT_ColumnActionMenu } from '../menus/MRT_ColumnActionMenu';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_TableHeadCellGrabHandle } from './MRT_TableHeadCellGrabHandle';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import { getCommonCellStyles } from '../column.utils';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import { funcValue } from '../funcValue';

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
    ...funcValue(mantineTableHeadCellProps, arg),
    ...funcValue(columnDef.mantineTableHeadCellProps, arg),
  };

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
        ? `1px dashed var(--mantine-color-gray-7) !important`
        : hoveredColumn?.id === column.id
        ? `2px dashed var(--mantine-color-gray-7) !important`
        : undefined,
    [draggingColumn, hoveredColumn],
  );

  const draggingBorders = draggingBorder
    ? {
        borderLeft: draggingBorder,
        borderRight: draggingBorder,
        borderTop: draggingBorder,
      }
    : {};

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
    funcValue(columnDef?.Header, {
      column,
      header,
      table,
    }) ?? (columnDef.header as ReactNode);

  const { className, __vars, style } = getCommonCellStyles({
    column,
    header,
    table,
    tableCellProps,
    theme,
  });

  return (
    <Box
      component="th"
      align={columnDefType === 'group' ? 'center' : 'left'}
      data-ispinned={column?.getIsPinned() ?? 'false'}
      data-cansort={column.getCanSort()}
      data-isresizing={column.getIsResizing()}
      colSpan={header.colSpan}
      onDragEnter={handleDragEnter}
      data-columndef={columnDefType}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          tableHeadCellRefs.current[column.id] = node;
        }
      }}
      {...tableCellProps}
      className={clsx(
        className,
        classes.MRT_TableHeadCell,
        tableCellProps.className,
      )}
      __vars={{
        ...__vars,
        '--flex-direction': layoutMode === 'grid' ? 'column' : undefined,
        '--padding':
          density === 'xl' ? '23px' : density === 'md' ? '16px' : '10px',
        '--user-select':
          enableMultiSort && column.getCanSort() ? 'none' : undefined,
        '--z-index':
          column.getIsResizing() || draggingColumn?.id === column.id
            ? '3'
            : column.getIsPinned() && columnDefType !== 'group'
            ? '2'
            : '1',
        ...tableCellProps.__vars,
      }}
      style={{
        ...style,
        ...draggingBorders,
      }}
    >
      {header.isPlaceholder ? null : (
        <Flex
          className={classes.content}
          __vars={{
            '--justify-content':
              columnDefType === 'group' || tableCellProps?.align === 'center'
                ? 'center'
                : column.getCanResize()
                ? 'space-between'
                : 'flex-start',
            '--flex-direction':
              tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
          }}
        >
          <Flex
            className={classes.labels}
            onClick={column.getToggleSortingHandler()}
            __vars={{
              '--labels-cursor':
                column.getCanSort() && columnDefType !== 'group'
                  ? 'pointer'
                  : undefined,
              '--labels-flex-direction':
                tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
              '--labels-flex-overflow':
                columnDefType === 'data' ? 'hidden' : undefined,
              '--labels-padding-left':
                tableCellProps?.align === 'center'
                  ? `${headerPL}rem`
                  : undefined,
            }}
          >
            <Flex
              className={classes.wrapper}
              __vars={{
                '--wrapper-overflow':
                  columnDefType === 'data' ? 'hidden' : undefined,
                '--wrapper-whitespace':
                  (columnDef.header?.length ?? 0) < 20 ? 'nowrap' : 'normal',
              }}
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
            <Flex className={classes.actions}>
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
