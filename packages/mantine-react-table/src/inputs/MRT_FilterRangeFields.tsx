import { Box } from '@mantine/core';
import { MRT_FilterTextInput } from './MRT_FilterTextInput';
import { type MRT_Header, type MRT_TableInstance } from '../types';

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
