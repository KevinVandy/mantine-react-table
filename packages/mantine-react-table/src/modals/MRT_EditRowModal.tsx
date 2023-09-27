import { Flex, Modal, Stack } from '@mantine/core';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
import { type MRT_Row, type MRT_TableInstance } from '../types';
import { funcValue } from '../funcValue';

interface Props<TData extends Record<string, any> = {}> {
  open: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditRowModal = <TData extends Record<string, any> = {}>({
  open,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      onEditingRowCancel,
      onCreatingRowCancel,
      renderEditRowModalContent,
      renderCreateRowModalContent,
      mantineCreateRowModalProps,
      mantineEditRowModalProps,
    },
    setEditingRow,
    setCreatingRow,
  } = table;
  const { creatingRow, editingRow } = getState();
  const row = (creatingRow ?? editingRow) as MRT_Row<TData>;

  const arg = { row, table };
  const modalProps = {
    ...funcValue(mantineEditRowModalProps, arg),
    ...(creatingRow && funcValue(mantineCreateRowModalProps, arg)),
  };

  const internalEditComponents = row
    .getAllCells()
    .filter((cell) => cell.column.columnDef.columnDefType === 'data')
    .map((cell) => (
      <MRT_EditCellTextInput cell={cell} key={cell.id} table={table} />
    ));

  const handleCancel = () => {
    if (creatingRow) {
      onCreatingRowCancel?.({ row, table });
      setCreatingRow(null);
    } else {
      onEditingRowCancel?.({ row, table });
      setEditingRow(null);
    }
    row._valuesCache = {} as any; //reset values cache
    modalProps.onClose?.();
  };

  return (
    <Modal
      opened={open}
      withCloseButton={false}
      {...modalProps}
      onClose={handleCancel}
      key={row.id}
    >
      {((creatingRow &&
        renderCreateRowModalContent?.({
          row,
          table,
          internalEditComponents,
        })) ||
        renderEditRowModalContent?.({
          row,
          table,
          internalEditComponents,
        })) ?? (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              style={{
                gap: '24px',
                paddingTop: '16px',
                width: '100%',
              }}
            >
              {internalEditComponents}
            </Stack>
          </form>
          <Flex style={{ paddingTop: '24px', justifyContent: 'flex-end' }}>
            <MRT_EditActionButtons row={row} table={table} variant="text" />
          </Flex>
        </>
      )}
    </Modal>
  );
};
