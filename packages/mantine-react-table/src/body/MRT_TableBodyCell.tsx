import React, {
  DragEvent,
  memo,
  MouseEvent,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Box, Skeleton, useMantineTheme } from '@mantine/core';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { MRT_TableBodyRowGrabHandle } from './MRT_TableBodyRowGrabHandle';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import {
  getCommonCellStyles,
  getIsFirstColumn,
  getIsLastColumn,
  getPrimaryColor,
} from '../column.utils';
import type { MRT_Cell, MRT_TableInstance, MRT_VirtualItem } from '..';

interface Props {
  cell: MRT_Cell;
  measureElement?: (element: HTMLTableCellElement) => void;
  numRows: number;
  rowIndex: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance;
  virtualCell?: MRT_VirtualItem;
}

export const MRT_TableBodyCell = ({
  cell,
  measureElement,
  numRows,
  rowIndex,
  rowRef,
  table,
  virtualCell,
}: Props) => {
  const theme = useMantineTheme();
  const {
    getState,
    options: {
      editingMode,
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
    draggingColumn,
    draggingRow,
    hoveredRow,
    editingCell,
    editingRow,
    hoveredColumn,
    density,
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

  const [skeletonWidth, setSkeletonWidth] = useState(0);
  useEffect(
    () =>
      setSkeletonWidth(
        isLoading || showSkeletons
          ? columnDefType === 'display'
            ? column.getSize() / 2
            : Math.round(
                Math.random() * (column.getSize() - column.getSize() / 3) +
                  column.getSize() / 3,
              )
          : 100,
      ),
    [],
  );

  const draggingBorders = useMemo(() => {
    const isDraggingColumn = draggingColumn?.id === column.id;
    const isHoveredColumn = hoveredColumn?.id === column.id;
    const isDraggingRow = draggingRow?.id === row.id;
    const isHoveredRow = hoveredRow?.id === row.id;
    const isFirstColumn = getIsFirstColumn(column, table);
    const isLastColumn = getIsLastColumn(column, table);
    const isLastRow = rowIndex === numRows - 1;

    const borderStyle =
      isDraggingColumn || isDraggingRow
        ? `1px dashed ${theme.colors.gray[7]} !important`
        : isHoveredColumn || isHoveredRow
        ? `2px dashed ${getPrimaryColor(theme)} !important`
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
    editingMode !== 'modal' &&
    (editingMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id) &&
    !row.getIsGrouped();

  const handleDoubleClick = (event: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDoubleClick?.(event);
    if (isEditable && editingMode === 'cell') {
      setEditingCell(cell);
      setTimeout(() => {
        const textField = editInputRefs.current[column.id];
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
    <Box
      component="td"
      data-index={virtualCell?.index}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          measureElement?.(node);
        }
      }}
      {...tableCellProps}
      onDragEnter={handleDragEnter}
      onDoubleClick={handleDoubleClick}
      sx={(theme) => ({
        alignItems: layoutMode === 'grid' ? 'center' : undefined,
        cursor: isEditable && editingMode === 'cell' ? 'pointer' : 'inherit',
        justifyContent:
          layoutMode === 'grid' ? tableCellProps.align : undefined,
        overflow: 'hidden',
        paddingLeft:
          column.id === 'mrt-row-expand'
            ? `${row.depth + 1}rem !important`
            : undefined,
        textOverflow: columnDefType !== 'display' ? 'ellipsis' : undefined,
        whiteSpace: density === 'xs' ? 'nowrap' : 'normal',
        zIndex:
          draggingColumn?.id === column.id ? 2 : column.getIsPinned() ? 1 : 0,
        '&:hover': {
          outline: ['table', 'cell'].includes(editingMode ?? '')
            ? `1px solid ${theme.colors.gray[7]}`
            : undefined,
          outlineOffset: '-1px',
          textOverflow: 'clip',
        },
        ...getCommonCellStyles({
          column,
          row,
          table,
          theme,
          tableCellProps,
        }),
        ...draggingBorders,
      })}
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
        ) : column.id === 'mrt-row-drag' ? (
          <MRT_TableBodyRowGrabHandle
            cell={cell}
            rowRef={rowRef}
            table={table}
          />
        ) : columnDefType === 'display' &&
          (column.id === 'mrt-row-select' ||
            column.id === 'mrt-row-expand' ||
            !row.getIsGrouped()) ? (
          columnDef.Cell?.({
            cell,
            column,
            row,
            renderedCellValue: cell.getValue() as any,
            table,
          })
        ) : isEditing ? (
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
);
