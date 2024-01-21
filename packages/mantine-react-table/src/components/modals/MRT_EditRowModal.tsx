import { Flex, Modal, Stack } from '@mantine/core';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';

interface Props<TData extends MRT_RowData> {
  open: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditRowModal = <TData extends MRT_RowData>({
  open,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      mantineCreateRowModalProps,
      mantineEditRowModalProps,
      onCreatingRowCancel,
      onEditingRowCancel,
      renderCreateRowModalContent,
      renderEditRowModalContent,
    },
    setCreatingRow,
    setEditingRow,
  } = table;
  const { creatingRow, editingRow } = getState();
  const row = (creatingRow ?? editingRow) as MRT_Row<TData>;

  const arg = { row, table };
  const modalProps = {
    ...parseFromValuesOrFunc(mantineEditRowModalProps, arg),
    ...(creatingRow && parseFromValuesOrFunc(mantineCreateRowModalProps, arg)),
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
      key={row.id}
      onClose={handleCancel}
    >
      {((creatingRow &&
        renderCreateRowModalContent?.({
          internalEditComponents,
          row,
          table,
        })) ||
        renderEditRowModalContent?.({
          internalEditComponents,
          row,
          table,
        })) ?? (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack gap="lg" pb={24} pt={16}>
              {internalEditComponents}
            </Stack>
          </form>
          <Flex justify="flex-end">
            <MRT_EditActionButtons row={row} table={table} variant="text" />
          </Flex>
        </>
      )}
    </Modal>
  );
};
