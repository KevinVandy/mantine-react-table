import clsx from 'clsx';
import {
  memo,
  type CSSProperties,
  type DragEvent,
  type MouseEvent,
  type RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Skeleton, TableTd } from '@mantine/core';

import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import {
  getIsFirstColumn,
  getIsFirstRightPinnedColumn,
  getIsLastColumn,
  getIsLastLeftPinnedColumn,
  getTotalRight,
  parseCSSVarId,
  parseFromValuesOrFunc,
} from '../column.utils';
import {
  type MRT_RowData,
  type MRT_Cell,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';

import classes from './MRT_TableBodyCell.module.css';

interface Props<TData extends MRT_RowData> {
  cell: MRT_Cell<TData>;
  isStriped?: boolean | 'odd' | 'even';
  measureElement?: (element: HTMLTableCellElement) => void;
  numRows?: number;
  rowIndex: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
  virtualCell?: MRT_VirtualItem;
}

export const MRT_TableBodyCell = <TData extends MRT_RowData>({
  cell,
  isStriped,
  measureElement,
  numRows,
  rowIndex,
  rowRef,
  table,
  virtualCell,
}: Props<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableColumnVirtualization,
      enableEditing,
      enableGrouping,
      enableRowNumbers,
      layoutMode,
      mantineSkeletonProps,
      mantineTableBodyCellProps,
      rowNumberMode,
    },
    refs: { editInputRefs },
    setEditingCell,
    setHoveredColumn,
  } = table;
  const {
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

  const arg = { cell, column, row, table };
  const tableCellProps = {
    ...parseFromValuesOrFunc(mantineTableBodyCellProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineTableBodyCellProps, arg),
  };

  const skeletonProps = parseFromValuesOrFunc(mantineSkeletonProps, arg);

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

  const widthStyles = useMemo(() => {
    const styles: CSSProperties = {
      minWidth: `max(calc(var(--col-${parseCSSVarId(column.id)}-size) * 1px), ${
        column.columnDef.minSize ?? 30
      }px)`,
      width: `calc(var(--col-${parseCSSVarId(column.id)}-size) * 1px)`,
    };

    if (layoutMode === 'grid') {
      styles.flex = `${column.getSize()} 0 auto`;
    } else if (layoutMode === 'grid-no-grow') {
      styles.flex = '0 0 auto';
    }

    return styles;
  }, [column]);

  const isEditable =
    (parseFromValuesOrFunc(enableEditing, row) &&
      parseFromValuesOrFunc(columnDef.enableEditing, row)) !== false;

  const isEditing =
    isEditable &&
    !['modal', 'custom'].includes(editDisplayMode as string) &&
    (editDisplayMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id) &&
    !row.getIsGrouped();

  const isCreating =
    isEditable && createDisplayMode === 'row' && creatingRow?.id === row.id;

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
        '--mrt-row-depth':
          column.id === 'mrt-row-expand' ? `${row.depth}` : undefined,
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
          ['table', 'cell'].includes(editDisplayMode ?? '') &&
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
        numRows && rowIndex === numRows - 1 && classes['last-row'],
        tableCellProps?.className,
      )}
      style={(theme) => ({
        ...widthStyles,
        ...parseFromValuesOrFunc(tableCellProps.style, theme),
      })}
      onDragEnter={handleDragEnter}
      onDoubleClick={handleDoubleClick}
    >
      <>
        {cell.getIsPlaceholder() ? (
          columnDef.PlaceholderCell?.({ cell, column, row, table }) ?? null
        ) : isLoading || showSkeletons ? (
          <Skeleton height={20} width={skeletonWidth} {...skeletonProps} />
        ) : enableRowNumbers &&
          rowNumberMode === 'static' &&
          column.id === 'mrt-row-numbers' ? (
          rowIndex + 1
        ) : columnDefType === 'display' &&
          (['mrt-row-drag', 'mrt-row-expand', 'mrt-row-select'].includes(
            column.id,
          ) ||
            !row.getIsGrouped()) ? (
          columnDef.Cell?.({
            cell,
            column,
            row,
            rowRef,
            renderedCellValue: <>{cell.getValue()}</>,
            table,
          })
        ) : isCreating || isEditing ? (
          <MRT_EditCellTextInput cell={cell} table={table} />
        ) : (enableClickToCopy || columnDef.enableClickToCopy) &&
          columnDef.enableClickToCopy !== false ? (
          <MRT_CopyButton cell={cell} table={table}>
            <MRT_TableBodyCellValue cell={cell} table={table} />
          </MRT_CopyButton>
        ) : (
          <MRT_TableBodyCellValue cell={cell} table={table} />
        )}
      </>
      {cell.getIsGrouped() && !columnDef.GroupedCell && (
        <> ({row.subRows?.length})</>
      )}
    </TableTd>
  );
};

export const Memo_MRT_TableBodyCell = memo(
  MRT_TableBodyCell,
  (prev, next) => next.cell === prev.cell,
) as typeof MRT_TableBodyCell;
