import {
  type DragEvent,
  memo,
  type MouseEvent,
  type RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Box, Skeleton, useMantineTheme } from '@mantine/core';
import clsx from 'clsx';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import {
  getCommonCellStyles,
  getIsFirstColumn,
  getIsLastColumn,
} from '../column.utils';
import {
  type MRT_Cell,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';
import classes from './MRT_TableBodyCell.module.css';

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  isStriped?: boolean;
  measureElement?: (element: HTMLTableCellElement) => void;
  numRows?: number;
  rowIndex: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
  virtualCell?: MRT_VirtualItem;
}

export const MRT_TableBodyCell = <TData extends Record<string, any> = {}>({
  cell,
  isStriped,
  measureElement,
  numRows,
  rowIndex,
  rowRef,
  table,
  virtualCell,
}: Props<TData>) => {
  const theme = useMantineTheme();
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableEditing,
      enableGrouping,
      enableRowNumbers,
      layoutMode,
      mantineTableBodyCellProps,
      mantineSkeletonProps,
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

  const mTableCellBodyProps =
    mantineTableBodyCellProps instanceof Function
      ? mantineTableBodyCellProps({ cell, column, row, table })
      : mantineTableBodyCellProps;

  const mcTableCellBodyProps =
    columnDef.mantineTableBodyCellProps instanceof Function
      ? columnDef.mantineTableBodyCellProps({ cell, column, row, table })
      : columnDef.mantineTableBodyCellProps;

  const tableCellProps = {
    ...mTableCellBodyProps,
    ...mcTableCellBodyProps,
  };

  const skeletonProps =
    mantineSkeletonProps instanceof Function
      ? mantineSkeletonProps({ cell, column, row, table })
      : mantineSkeletonProps;

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

  const draggingBorders = useMemo(() => {
    const isDraggingColumn = draggingColumn?.id === column.id;
    const isHoveredColumn = hoveredColumn?.id === column.id;
    const isDraggingRow = draggingRow?.id === row.id;
    const isHoveredRow = hoveredRow?.id === row.id;
    const isFirstColumn = getIsFirstColumn(column, table);
    const isLastColumn = getIsLastColumn(column, table);
    const isLastRow = rowIndex === numRows && numRows - 1;

    const borderStyle =
      isDraggingColumn || isDraggingRow
        ? '1px dashed var(--mantine-color-gray-7) !important'
        : isHoveredColumn || isHoveredRow
        ? '2px dashed var(--mantine-primary-color-filled) !important'
        : undefined;

    return borderStyle
      ? {
          borderLeft:
            isDraggingColumn ||
            isHoveredColumn ||
            ((isDraggingRow || isHoveredRow) && isFirstColumn)
              ? borderStyle
              : undefined,
          borderRight:
            isDraggingColumn ||
            isHoveredColumn ||
            ((isDraggingRow || isHoveredRow) && isLastColumn)
              ? borderStyle
              : undefined,
          borderBottom:
            isDraggingRow || isHoveredRow || isLastRow
              ? borderStyle
              : undefined,
          borderTop: isDraggingRow || isHoveredRow ? borderStyle : undefined,
        }
      : undefined;
  }, [draggingColumn, draggingRow, hoveredColumn, hoveredRow, rowIndex]);

  const isEditable =
    (enableEditing instanceof Function ? enableEditing(row) : enableEditing) &&
    (columnDef.enableEditing instanceof Function
      ? columnDef.enableEditing(row)
      : columnDef.enableEditing) !== false;

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
  const { style, className, __vars } = getCommonCellStyles({
    column,
    table,
    theme,
    tableCellProps,
  });

  return (
    <Box
      component="td"
      data-index={virtualCell?.index}
      data-selected={row?.getIsSelected() ?? 'false'}
      data-ispinned={column?.getIsPinned() ?? 'false'}
      data-striped={isStriped}
      data-columndef={columnDefType}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          measureElement?.(node);
        }
      }}
      {...tableCellProps}
      __vars={{
        ...__vars,
        ...tableCellProps.__vars,
        '--align-items': layoutMode === 'grid' ? 'center' : '',
        '--cursor':
          isEditable && editDisplayMode === 'cell' ? 'pointer' : 'inherit',
        '--align': layoutMode === 'grid' ? tableCellProps.align : '',
        '--padding-left':
          column.id === 'mrt-row-expand'
            ? `${row.depth + 1}rem !important`
            : '',
        '--white-space': density === 'xs' ? 'nowrap' : 'normal',
        '--z-index':
          draggingColumn?.id === column.id
            ? '2'
            : column.getIsPinned()
            ? '1'
            : '0',
        '--outline':
          isEditing &&
          ['table', 'cell'].includes(editDisplayMode ?? '') &&
          columnDefType !== 'display'
            ? `1px solid var(--mantine-color-gray-7)`
            : '',
      }}
      className={clsx(
        className,
        classes.MRT_TableBodyCell,
        tableCellProps.className,
      )}
      onDragEnter={handleDragEnter}
      onDoubleClick={handleDoubleClick}
      style={{
        ...style,
        ...draggingBorders,
      }}
    >
      <>
        {cell.getIsPlaceholder() ? (
          columnDef.PlaceholderCell?.({ cell, column, row, table }) ?? null
        ) : (isLoading || showSkeletons) &&
          [undefined, null].includes(cell.getValue<any>()) ? (
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
    </Box>
  );
};

export const Memo_MRT_TableBodyCell = memo(
  MRT_TableBodyCell,
  (prev, next) => next.cell === prev.cell,
) as typeof MRT_TableBodyCell;
