import React from 'react';
import { Box } from '@mantine/core';
import { MRT_FilterTextInput } from './MRT_FilterTextInput';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_FilterRangeFields = ({ header, table }: Props) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '6fr 6fr', gap: '16px' }}>
      <MRT_FilterTextInput header={header} rangeFilterIndex={0} table={table} />
      <MRT_FilterTextInput header={header} rangeFilterIndex={1} table={table} />
    </Box>
  );
};
