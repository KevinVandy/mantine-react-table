import React, {
  DragEvent,
  FC,
  memo,
  MouseEvent,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Box, Skeleton, useMantineTheme } from '@mantine/core';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { MRT_TableBodyRowGrabHandle } from './MRT_TableBodyRowGrabHandle';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import { getCommonCellStyles } from '../column.utils';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { MRT_Cell, MRT_TableInstance } from '..';

interface Props {
  cell: MRT_Cell;
  enableHover?: boolean;
  measureElement?: (element: HTMLTableCellElement) => void;
  numRows: number;
  rowIndex: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance;
  virtualCell?: VirtualItem;
}

export const MRT_TableBodyCell: FC<Props> = ({
  cell,
  enableHover,
  measureElement,
  numRows,
  rowIndex,
  rowRef,
  table,
  virtualCell,
}) => {
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

  const draggingBorder = useMemo(
    () =>
      draggingColumn?.id === column.id
        ? `1px dashed ${theme.colors.gray[7]}`
        : hoveredColumn?.id === column.id
        ? `2px dashed ${theme.colors[theme.primaryColor][7]}`
        : undefined,
    [draggingColumn, hoveredColumn],
  );

  const draggingBorders = useMemo(
    () =>
      draggingBorder
        ? {
            borderLeft: draggingBorder,
            borderRight: draggingBorder,
            borderBottom: rowIndex === numRows - 1 ? draggingBorder : undefined,
          }
        : undefined,
    [draggingBorder, numRows],
  );

  const isEditable =
    (enableEditing || columnDef.enableEditing) &&
    columnDef.enableEditing !== false;

  const isEditing =
    isEditable &&
    editingMode !== 'modal' &&
    (editingMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id) &&
    !row.getIsGrouped();

  const handleDoubleClick = (event: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDoubleClick?.(event);
    if (
      (enableEditing || columnDef.enableEditing) &&
      columnDef.enableEditing !== false &&
      editingMode === 'cell'
    ) {
      setEditingCell(cell);
      queueMicrotask(() => {
        const textField = editInputRefs.current[column.id];
        if (textField) {
          textField.focus();
          textField.select?.();
        }
      });
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
          backgroundColor:
            enableHover &&
            enableEditing &&
            columnDef.enableEditing !== false &&
            ['table', 'cell'].includes(editingMode ?? '')
              ? theme.colorScheme === 'dark'
                ? `${theme.fn.lighten(theme.colors.dark[7], 0.2)} !important`
                : `${theme.fn.darken(theme.colors.dark[7], 0.1)} !important`
              : undefined,
        },
        ...getCommonCellStyles({
          column,
          table,
          theme,
          tableCellProps,
        }),
        ...draggingBorders,
      })}
    >
      <>
        {cell.getIsPlaceholder() ? null : isLoading || showSkeletons ? (
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
          columnDef.Cell?.({ cell, column, row, table })
        ) : isEditing ? (
          <MRT_EditCellTextField cell={cell} table={table} />
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
