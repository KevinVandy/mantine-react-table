import clsx from 'clsx';
import classes from './MRT_TableBodyCell.module.css';
import {
  type CSSProperties,
  type DragEvent,
  type MouseEvent,
  type RefObject,
  memo,
  useEffect,
  useState,
} from 'react';
import { Skeleton, TableTd, type TableTdProps } from '@mantine/core';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import {
  type MRT_Cell,
  type MRT_CellValue,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../../types';
import {
  getIsFirstColumn,
  getIsFirstRightPinnedColumn,
  getIsLastColumn,
  getIsLastLeftPinnedColumn,
  getTotalRight,
} from '../../utils/column.utils';
import { parseCSSVarId } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';

interface Props<TData extends MRT_RowData, TValue = MRT_CellValue>
  extends TableTdProps {
  cell: MRT_Cell<TData, TValue>;
  isStriped?: 'even' | 'odd' | boolean;
  measureElement?: (element: HTMLTableCellElement) => void;
  numRows?: number;
  rowRef: RefObject<HTMLTableRowElement>;
  staticRowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualCell?: MRT_VirtualItem;
}

export const MRT_TableBodyCell = <TData extends MRT_RowData>({
  cell,
  isStriped,
  measureElement,
  numRows,
  rowRef,
  staticRowIndex,
  table,
  virtualCell,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      columnResizeDirection,
      columnResizeMode,
      createDisplayMode,
      editDisplayMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableColumnVirtualization,
      enableEditing,
      enableGrouping,
      layoutMode,
      mantineSkeletonProps,
      mantineTableBodyCellProps,
    },
    refs: { editInputRefs },
    setEditingCell,
    setHoveredColumn,
  } = table;
  const {
    columnSizingInfo,
    creatingRow,
    density,
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    hoveredColumn,
    hoveredRow,
    isLoading,
    showSkeletons,
  } = getState();
  const { column, row } = cell;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const args = { cell, column, row, table };
  const tableCellProps = {
    ...parseFromValuesOrFunc(mantineTableBodyCellProps, args),
    ...parseFromValuesOrFunc(columnDef.mantineTableBodyCellProps, args),
    ...rest,
  };

  const skeletonProps = parseFromValuesOrFunc(mantineSkeletonProps, args);

  const [skeletonWidth, setSkeletonWidth] = useState(100);
  useEffect(() => {
    if ((!isLoading && !showSkeletons) || skeletonWidth !== 100) return;
    const size = column.getSize();
    setSkeletonWidth(
      columnDefType === 'display'
        ? size / 2
        : Math.round(Math.random() * (size - size / 3) + size / 3),
    );
  }, [isLoading, showSkeletons]);

  const widthStyles: CSSProperties = {
    minWidth: `max(calc(var(--col-${parseCSSVarId(
      column?.id,
    )}-size) * 1px), ${columnDef.minSize ?? 30}px)`,
    width: `calc(var(--col-${parseCSSVarId(column.id)}-size) * 1px)`,
  };
  if (layoutMode === 'grid') {
    widthStyles.flex = `${
      [0, false].includes(columnDef.grow!)
        ? 0
        : `var(--col-${parseCSSVarId(column.id)}-size)`
    } 0 auto`;
  } else if (layoutMode === 'grid-no-grow') {
    widthStyles.flex = `${+(columnDef.grow || 0)} 0 auto`;
  }

  const isEditable =
    !cell.getIsPlaceholder() &&
    (parseFromValuesOrFunc(enableEditing, row) &&
      parseFromValuesOrFunc(columnDef.enableEditing, row)) !== false;

  const isEditing =
    isEditable &&
    !['custom', 'modal'].includes(editDisplayMode as string) &&
    (editDisplayMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id) &&
    !row.getIsGrouped();

  const isCreating =
    isEditable && createDisplayMode === 'row' && creatingRow?.id === row.id;

  const showClickToCopyButton =
    parseFromValuesOrFunc(enableClickToCopy, cell) ||
    (parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) &&
      parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) !== false);

  const handleDoubleClick = (event: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDoubleClick?.(event);
    if (isEditable && editDisplayMode === 'cell') {
      setEditingCell(cell);
      setTimeout(() => {
        const textField = editInputRefs.current[cell.id];
        if (textField) {
          textField.focus();
          textField.select?.();
        }
      }, 100);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDragEnter?.(e);
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn) {
      setHoveredColumn(
        columnDef.enableColumnOrdering !== false ? column : null,
      );
    }
  };

  const cellValueProps = {
    cell,
    table,
  };

  return (
    <TableTd
      data-index={virtualCell?.index}
      data-pinned={
        column.getIsPinned() && column.columnDef.columnDefType !== 'group'
      }
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          measureElement?.(node);
        }
      }}
      {...tableCellProps}
      __vars={{
        '--mrt-table-cell-justify': layoutMode?.startsWith('grid')
          ? tableCellProps.align === 'left'
            ? 'flex-start'
            : tableCellProps.align === 'right'
              ? 'flex-end'
              : tableCellProps.align
          : undefined,
        '--mrt-table-cell-left':
          column.getIsPinned() === 'left'
            ? `${column.getStart('left')}`
            : undefined,
        '--mrt-table-cell-right':
          column.getIsPinned() === 'right'
            ? `${getTotalRight(table, column)}`
            : undefined,
        ...tableCellProps.__vars,
      }}
      className={clsx(
        classes.root,
        isStriped || row.getIsSelected()
          ? classes['root-inherit-background-color']
          : classes['root-default-background'],
        layoutMode?.startsWith('grid') && classes['root-grid'],
        isEditable &&
          editDisplayMode === 'cell' &&
          classes['root-cursor-pointer'],
        isEditable &&
          ['cell', 'table'].includes(editDisplayMode ?? '') &&
          columnDefType !== 'display' &&
          classes['root-editable-hover'],
        enableColumnVirtualization && classes['root-virtualized'],
        column.getIsPinned() &&
          column.columnDef.columnDefType !== 'group' &&
          classes['root-pinned'],
        column.getIsPinned() === 'left' && classes['root-pinned-left'],
        column.getIsPinned() === 'right' && classes['root-pinned-right'],
        getIsLastLeftPinnedColumn(table, column) &&
          classes['root-pinned-left-last'],
        getIsFirstRightPinnedColumn(column) &&
          classes['root-pinned-right-first'],
        column.id === 'mrt-row-expand' && classes['root-expand-depth'],
        columnDefType === 'data' && classes['root-data-col'],
        density === 'xs' && classes['root-nowrap'],
        columnSizingInfo?.isResizingColumn === column.id &&
          columnResizeMode === 'onChange' &&
          classes[`resizing-${columnResizeDirection}`],
        draggingColumn?.id === column.id && classes['dragging-column'],
        draggingColumn?.id !== column.id &&
          hoveredColumn?.id === column.id &&
          classes['hovered-column'],
        draggingRow?.id === row.id && classes['dragging-row'],
        draggingRow?.id !== row.id &&
          hoveredRow?.id === row.id &&
          classes['hovered-row'],
        getIsFirstColumn(column, table) && classes['first-column'],
        getIsLastColumn(column, table) && classes['last-column'],
        numRows && staticRowIndex === numRows - 1 && classes['last-row'],
        tableCellProps?.className,
      )}
      onDoubleClick={handleDoubleClick}
      onDragEnter={handleDragEnter}
      style={(theme) => ({
        ...widthStyles,
        ...parseFromValuesOrFunc(tableCellProps.style, theme),
      })}
    >
      {tableCellProps.children ?? (
        <>
          {cell.getIsPlaceholder() ? (
            columnDef.PlaceholderCell?.({ cell, column, row, table }) ?? null
          ) : showSkeletons !== false && (isLoading || showSkeletons) ? (
            <Skeleton height={20} width={skeletonWidth} {...skeletonProps} />
          ) : columnDefType === 'display' &&
            (['mrt-row-expand', 'mrt-row-numbers', 'mrt-row-select'].includes(
              column.id,
            ) ||
              !row.getIsGrouped()) ? (
            columnDef.Cell?.({
              cell,
              column,
              renderedCellValue: cell.renderValue() as any,
              row,
              rowRef,
              staticRowIndex,
              table,
            })
          ) : isCreating || isEditing ? (
            <MRT_EditCellTextInput cell={cell} table={table} />
          ) : showClickToCopyButton && columnDef.enableClickToCopy !== false ? (
            <MRT_CopyButton cell={cell} table={table}>
              <MRT_TableBodyCellValue {...cellValueProps} />
            </MRT_CopyButton>
          ) : (
            <MRT_TableBodyCellValue {...cellValueProps} />
          )}
          {cell.getIsGrouped() && !columnDef.GroupedCell && (
            <> ({row.subRows?.length})</>
          )}
        </>
      )}
    </TableTd>
  );
};

export const Memo_MRT_TableBodyCell = memo(
  MRT_TableBodyCell,
  (prev, next) => next.cell === prev.cell,
) as typeof MRT_TableBodyCell;
