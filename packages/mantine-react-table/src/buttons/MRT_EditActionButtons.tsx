import clsx from 'clsx';
import { ActionIcon, Box, Button, Tooltip } from '@mantine/core';
import { type MRT_Row, type MRT_TableInstance } from '../types';

import classes from './MRT_EditActionButtons.module.css';

interface Props<TData extends Record<string, any> = {}> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
  variant?: 'icon' | 'text';
}

export const MRT_EditActionButtons = <TData extends Record<string, any> = {}>({
  row,
  table,
  variant = 'icon',
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { IconCircleX, IconDeviceFloppy },
      localization,
      onCreatingRowCancel,
      onCreatingRowSave,
      onEditingRowSave,
      onEditingRowCancel,
    },
    refs: { editInputRefs },
    setCreatingRow,
    setEditingRow,
  } = table;
  const { creatingRow, editingRow, isSaving } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const handleCancel = () => {
    if (isCreating) {
      onCreatingRowCancel?.({ row, table });
      setCreatingRow(null);
    } else if (isEditing) {
      onEditingRowCancel?.({ row, table });
      setEditingRow(null);
    }
    row._valuesCache = {} as any; //reset values cache
  };

  const handleSubmitRow = () => {
    //look for auto-filled input values
    Object.values(editInputRefs?.current)
      .filter((inputRef) => row.id === inputRef?.name?.split('_')?.[0])
      ?.forEach((input) => {
        if (
          input.value !== undefined &&
          Object.hasOwn(row?._valuesCache as object, input.name)
        ) {
          // @ts-ignore
          row._valuesCache[input.name] = input.value;
        }
      });
    if (isCreating)
      onCreatingRowSave?.({
        exitCreatingMode: () => setCreatingRow(null),
        row,
        table,
        values: row._valuesCache,
      });
    else if (isEditing) {
      onEditingRowSave?.({
        exitEditingMode: () => setEditingRow(null),
        row,
        table,
        values: row?._valuesCache,
      });
    }
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      className={clsx('mrt-edit-action-buttons', classes.root)}
    >
      {variant === 'icon' ? (
        <>
          <Tooltip withinPortal label={localization.cancel}>
            <ActionIcon
              color="red"
              aria-label={localization.cancel}
              onClick={handleCancel}
              variant="subtle"
            >
              <IconCircleX />
            </ActionIcon>
          </Tooltip>
          <Tooltip withinPortal label={localization.save}>
            <ActionIcon
              aria-label={localization.save}
              color="blue"
              onClick={handleSubmitRow}
              loading={isSaving}
              variant="subtle"
            >
              <IconDeviceFloppy />
            </ActionIcon>
          </Tooltip>
        </>
      ) : (
        <>
          <Button onClick={handleCancel} variant="subtle">
            {localization.cancel}
          </Button>
          <Button onClick={handleSubmitRow} variant="filled" loading={isSaving}>
            {localization.save}
          </Button>
        </>
      )}
    </Box>
  );
};
