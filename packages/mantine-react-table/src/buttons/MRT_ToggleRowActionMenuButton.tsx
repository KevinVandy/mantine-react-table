import { type MouseEvent } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import {
  type MRT_RowData,
  type MRT_Cell,
  type MRT_Row,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends MRT_RowData> {
  cell: MRT_Cell<TData>;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleRowActionMenuButton = <TData extends MRT_RowData>({
  cell,
  row,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableEditing,
      icons: { IconEdit },
      localization: { edit },
      renderRowActionMenuItems,
      renderRowActions,
    },
    setEditingRow,
  } = table;

  const { creatingRow, editingRow } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const handleStartEditMode = (event: MouseEvent) => {
    event.stopPropagation();
    setEditingRow({ ...row });
  };

  const showEditActionButtons =
    (isCreating && createDisplayMode === 'row') ||
    (isEditing && editDisplayMode === 'row');

  return (
    <>
      {renderRowActions && !showEditActionButtons ? (
        renderRowActions({ cell, row, table })
      ) : showEditActionButtons ? (
        <MRT_EditActionButtons row={row} table={table} />
      ) : !renderRowActionMenuItems &&
        parseFromValuesOrFunc(enableEditing, row) ? (
        <Tooltip withinPortal openDelay={1000} position="right" label={edit}>
          <ActionIcon
            aria-label={edit}
            disabled={!!editingRow && editingRow.id !== row.id}
            onClick={handleStartEditMode}
            size="md"
            variant="default"
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
      ) : renderRowActionMenuItems ? (
        <MRT_RowActionMenu
          handleEdit={handleStartEditMode}
          row={row}
          table={table}
        />
      ) : null}
    </>
  );
};
