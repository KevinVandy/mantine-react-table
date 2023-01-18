import React, { FC } from 'react';
import { Collapse } from '@mantine/core';
import { MRT_FilterRangeFields } from '../inputs/MRT_FilterRangeFields';
import { MRT_FilterTextInput } from '../inputs/MRT_FilterTextInput';
import { MRT_Header, MRT_TableInstance } from '..';
import { MRT_FilterCheckbox } from '../inputs/MRT_FilterCheckbox';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellFilterContainer: FC<Props> = ({
  header,
  table,
}) => {
  const { getState } = table;
  const { showColumnFilters } = getState();
  const { column } = header;
  const { columnDef } = column;

  return (
    <Collapse in={showColumnFilters}>
      {columnDef.filterVariant === 'checkbox' ? (
        <MRT_FilterCheckbox column={column} table={table} />
      ) : columnDef.filterVariant === 'range' ||
        columnDef.filterVariant === 'date-range' ||
        ['between', 'betweenInclusive', 'inNumberRange'].includes(
          columnDef._filterFn,
        ) ? (
        <MRT_FilterRangeFields header={header} table={table} />
      ) : (
        <MRT_FilterTextInput header={header} table={table} />
      )}
    </Collapse>
  );
};
