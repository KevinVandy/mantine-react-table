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
import {
  Skeleton,
  TableTd,
  type TableTdProps,
  useDirection,
} from '@mantine/core';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import {
  type MRT_Cell,
  type MRT_CellValue,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../../types';
import {
  getIsFirstRightPinnedColumn,
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
  numRows?: number;
  renderedColumnIndex?: number;
  renderedRowIndex?: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
  virtualCell?: MRT_VirtualItem;
}

export const MRT_TableBodyCell = <TData extends MRT_RowData>({
  cell,
  isStriped,
  numRows = 1,
  renderedColumnIndex = 0,
  renderedRowIndex = 0,
  rowRef,
  table,
  virtualCell,
  ...rest
}: Props<TData>) => {
  const direction = useDirection();

  const {
    getState,
    options: {
      columnResizeDirection,
      columnResizeMode,
      createDisplayMode,
      editDisplayMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableColumnPinning,
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
    editingCell,
    editingRow,
    hoveredColumn,
    isLoading,
    showSkeletons,
  } = getState();
  const { column, row } = cell;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const args = {
    cell,
    column,
    renderedColumnIndex,
    renderedRowIndex,
    row,
    table,
  };
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
  const isDraggingColumn = draggingColumn?.id === column.id;
  const isHoveredColumn = hoveredColumn?.id === column.id;
  const isColumnPinned =
    enableColumnPinning &&
    columnDef.columnDefType !== 'group' &&
    column.getIsPinned();

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
    renderedColumnIndex,
    renderedRowIndex,
    table,
  };

  return (
    <TableTd
      data-column-pinned={isColumnPinned || undefined}
      data-dragging-column={isDraggingColumn || undefined}
      data-first-right-pinned={getIsFirstRightPinnedColumn(column) || undefined}
      data-hovered-column-target={isHoveredColumn || undefined}
      data-index={renderedColumnIndex}
      data-last-left-pinned={
        getIsLastLeftPinnedColumn(table, column) || undefined
      }
      data-last-row={renderedRowIndex === numRows - 1 || undefined}
      data-resizing={
        (columnResizeMode === 'onChange' &&
          columnSizingInfo?.isResizingColumn === column.id &&
          columnResizeDirection) ||
        undefined
      }
      {...tableCellProps}
      __vars={{
        '--mrt-cell-align':
          tableCellProps.align ?? (direction.dir === 'rtl' ? 'right' : 'left'),
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
        virtualCell && classes['root-virtualized'],
        isEditable &&
          editDisplayMode === 'cell' &&
          classes['root-cursor-pointer'],
        isEditable &&
          ['cell', 'table'].includes(editDisplayMode ?? '') &&
          columnDefType !== 'display' &&
          classes['root-editable-hover'],
        columnDefType === 'data' && classes['root-data-col'],
        density === 'xs' && classes['root-nowrap'],
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
              renderedColumnIndex,
              renderedRowIndex,
              row,
              rowRef,
              table,
            })
          ) : isCreating || isEditing ? (
            <MRT_EditCellTextInput {...cellValueProps} />
          ) : showClickToCopyButton && columnDef.enableClickToCopy !== false ? (
            <MRT_CopyButton {...cellValueProps}>
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
