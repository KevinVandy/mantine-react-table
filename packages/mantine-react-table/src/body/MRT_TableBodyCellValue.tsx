import React, { ReactNode } from 'react';
import { Box } from '@mantine/core';
import highlightWords from 'highlight-words';
import type { MRT_Cell, MRT_TableInstance } from '..';

const allowedTypes = ['string', 'number'];

interface Props {
  cell: MRT_Cell;
  table: MRT_TableInstance;
}

export const MRT_TableBodyCellValue = ({ cell, table }: Props) => {
  const {
    getState,
    options: { enableFilterMatchHighlighting },
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { globalFilter } = getState();
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
    renderedCellValue &&
    allowedTypes.includes(typeof renderedCellValue) &&
    ((filterValue &&
      allowedTypes.includes(typeof filterValue) &&
      columnDef.filterVariant === 'text') ||
      (globalFilter && allowedTypes.includes(typeof globalFilter)))
  ) {
    const chunks = highlightWords?.({
      text: renderedCellValue?.toString() as string,
      query: (column.getFilterValue() ?? globalFilter ?? '').toString(),
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
