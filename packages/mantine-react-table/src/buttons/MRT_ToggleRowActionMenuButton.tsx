import { type MouseEvent } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import { type MRT_Cell, type MRT_Row, type MRT_TableInstance } from '../types';
import classes from './MRT_ToggleRowActionMenuButton.module.css';

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
  className?: string | string[];
}

export const MRT_ToggleRowActionMenuButton = <
  TData extends Record<string, any> = {},
>({
  cell,
  row,
  table,
  className,
}: Props<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableEditing,
      icons: { IconEdit },
      localization,
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
        (enableEditing instanceof Function
          ? enableEditing(row)
          : enableEditing) ? (
        <Tooltip withinPortal position="right" label={localization.edit}>
          <ActionIcon
            aria-label={localization.edit}
            disabled={!!editingRow && editingRow.id !== row.id}
            onClick={handleStartEditMode}
            className={clsx(classes.MRT_ToggleRowActionMenuButton, className)}
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
