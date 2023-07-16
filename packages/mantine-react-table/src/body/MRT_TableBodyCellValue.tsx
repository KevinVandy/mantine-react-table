import { Highlight, type HighlightProps } from '@mantine/core';
import { type MRT_Cell, type MRT_TableInstance } from '../types';

const allowedTypes = ['string', 'number'];
const allowedFilterVariants = ['text', 'autocomplete'];

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyCellValue = <TData extends Record<string, any> = {}>({
  cell,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { enableFilterMatchHighlighting, mantineHighlightProps },
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { globalFilter, globalFilterFn } = getState();
  const filterValue = column.getFilterValue();

  const highlightProps = (
    mantineHighlightProps instanceof Function
      ? mantineHighlightProps({ cell, column, row, table })
      : mantineHighlightProps
  ) as Partial<HighlightProps>;

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
    renderedCellValue = cell.renderValue() as number | string;
  }

  if (
    enableFilterMatchHighlighting &&
    columnDef.enableFilterMatchHighlighting !== false &&
    renderedCellValue &&
    allowedTypes.includes(typeof renderedCellValue) &&
    ((filterValue &&
      allowedTypes.includes(typeof filterValue) &&
      allowedFilterVariants.includes(columnDef.filterVariant as string)) ||
      (globalFilter &&
        allowedTypes.includes(typeof globalFilter) &&
        column.getCanGlobalFilter()))
  ) {
    let highlight: string | string[] = (
      column.getFilterValue() ??
      globalFilter ??
      ''
    ).toString() as string;
    if ((filterValue ? columnDef._filterFn : globalFilterFn) === 'fuzzy') {
      highlight = highlight.split(' ');
    }

    renderedCellValue = (
      <Highlight
        highlightColor="yellow.3"
        highlight={highlight}
        {...highlightProps}
      >
        {renderedCellValue?.toString()}
      </Highlight>
    );
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

  return renderedCellValue;
};
