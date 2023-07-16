import { Box } from '@mantine/core';
import { MRT_FilterTextInput } from './MRT_FilterTextInput';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterRangeFields = <TData extends Record<string, any> = {}>({
  header,
  table,
}: Props<TData>) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '6fr 6fr', gap: '16px' }}>
      <MRT_FilterTextInput header={header} rangeFilterIndex={0} table={table} />
      <MRT_FilterTextInput header={header} rangeFilterIndex={1} table={table} />
    </Box>
  );
};
