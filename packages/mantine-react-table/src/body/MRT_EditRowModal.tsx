import React from 'react';
import { Box, Flex, Modal, Stack, Text } from '@mantine/core';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  open: boolean;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditRowModal = <TData extends Record<string, any> = {}>({
  open,
  row,
  table,
}: Props<TData>) => {
  const {
    options: { localization },
  } = table;

  return (
    <Modal onClose={() => {}} withCloseButton={false} opened={open}>
      <Text sx={{ textAlign: 'center' }}>{localization.edit}</Text>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack
          sx={{
            gap: '1.5rem',
            minWidth: { xs: '300px', sm: '360px', md: '400px' },
            paddingTop: '1rem',
            width: '100%',
          }}
        >
          {row
            .getAllCells()
            .filter((cell) => cell.column.columnDef.columnDefType === 'data')
            .map((cell) => (
              <MRT_EditCellTextField
                cell={cell as any}
                key={cell.id}
                showLabel
                table={table as any}
              />
            ))}
        </Stack>
      </form>
      <Flex sx={{ paddingTop: '1.5rem', justifyContent: 'flex-end' }}>
        <MRT_EditActionButtons row={row} table={table} variant="text" />
      </Flex>
    </Modal>
  );
};
