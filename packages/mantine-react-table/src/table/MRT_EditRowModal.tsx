import { Flex, Modal, Stack, Text } from '@mantine/core';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  open: boolean;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditRowModal = <TData extends Record<string, any>>({
  open,
  row,
  table,
}: Props<TData>) => {
  const {
    options: { localization, onEditingRowCancel },
    setEditingRow,
  } = table;

  return (
    <Modal
      closeOnClickOutside={false}
      onClose={() => {
        onEditingRowCancel?.({ row, table });
        setEditingRow(null);
      }}
      opened={open}
      withCloseButton={false}
    >
      <Text sx={{ textAlign: 'center' }}>{localization.edit}</Text>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack
          sx={{
            gap: '24px',
            paddingTop: '16px',
            width: '100%',
          }}
        >
          {row
            .getAllCells()
            .filter((cell) => cell.column.columnDef.columnDefType === 'data')
            .map((cell) => (
              <MRT_EditCellTextInput
                cell={cell as any}
                key={cell.id}
                table={table as any}
              />
            ))}
        </Stack>
      </form>
      <Flex sx={{ paddingTop: '24px', justifyContent: 'flex-end' }}>
        <MRT_EditActionButtons row={row} table={table} variant="text" />
      </Flex>
    </Modal>
  );
};
