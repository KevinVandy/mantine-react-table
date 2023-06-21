import { type ReactNode } from 'react';
import { Box } from '@mantine/core';
import highlightWords from 'highlight-words';
import { type MRT_Cell, type MRT_TableInstance } from '../types';

const allowedTypes = ['string', 'number'];

interface Props<TData extends Record<string, any>> {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyCellValue = <TData extends Record<string, any>>({
  cell,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { enableFilterMatchHighlighting },
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { globalFilter, globalFilterFn } = getState();
  const filterValue = column.getFilterValue();

  let renderedCellValue =
    cell.getIsAggregated() && columnDef.AggregatedCell
      ? columnDef.AggregatedCell({
          cell,
          column,
          row,
          table,
        })
      : row.getIsGrouped() && !cell.getIsGrouped()
      ? null
      : cell.getIsGrouped() && columnDef.GroupedCell
      ? columnDef.GroupedCell({
          cell,
          column,
          row,
          table,
        })
      : undefined;

  const isGroupedValue = renderedCellValue !== undefined;

  if (!isGroupedValue) {
    renderedCellValue = cell.renderValue() as number | string | ReactNode;
  }

  if (
    enableFilterMatchHighlighting &&
    columnDef.enableFilterMatchHighlighting !== false &&
    renderedCellValue &&
    allowedTypes.includes(typeof renderedCellValue) &&
    ((filterValue &&
      allowedTypes.includes(typeof filterValue) &&
      columnDef.filterVariant === 'text') ||
      (globalFilter &&
        allowedTypes.includes(typeof globalFilter) &&
        column.getCanGlobalFilter()))
  ) {
    const chunks = highlightWords?.({
      text: renderedCellValue?.toString(),
      query: (column.getFilterValue() ?? globalFilter ?? '').toString(),
      matchExactly:
        (filterValue ? columnDef._filterFn : globalFilterFn) !== 'fuzzy',
    });
    if (chunks?.length > 1 || chunks?.[0]?.match) {
      renderedCellValue = (
        <span aria-label={renderedCellValue as string} role="note">
          {chunks?.map(({ key, match, text }) => (
            <Box
              aria-hidden="true"
              component="span"
              key={key}
              sx={
                match
                  ? (theme) => ({
                      backgroundColor:
                        theme.colors.yellow[
                          theme.colorScheme === 'dark' ? 9 : 5
                        ],
                      borderRadius: '2px',
                      color:
                        theme.colorScheme === 'dark'
                          ? theme.white
                          : theme.black,
                      p: '2px 1px',
                    })
                  : undefined
              }
            >
              {text}
            </Box>
          )) ?? renderedCellValue}
        </span>
      );
    }
  }

  if (columnDef.Cell && !isGroupedValue) {
    renderedCellValue = columnDef.Cell({
      cell,
      renderedCellValue,
      column,
      row,
      table,
    });
  }

  return <>{renderedCellValue}</>;
};
