import { type MouseEvent } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import { type MRT_Cell, type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleRowActionMenuButton = <
  TData extends Record<string, any> = {},
>({
  cell,
  row,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      editingMode,
      enableEditing,
      icons: { IconEdit },
      localization,
      renderRowActionMenuItems,
      renderRowActions,
    },
    setEditingRow,
  } = table;

  const { editingRow } = getState();

  const handleStartEditMode = (event: MouseEvent) => {
    event.stopPropagation();
    setEditingRow({ ...row });
  };

  return (
    <>
      {renderRowActions ? (
        <>{renderRowActions({ cell, row, table })}</>
      ) : row.id === editingRow?.id && editingMode === 'row' ? (
        <MRT_EditActionButtons row={row} table={table} />
      ) : !renderRowActionMenuItems &&
        (enableEditing instanceof Function
          ? enableEditing(row)
          : enableEditing) ? (
        <Tooltip
          withinPortal
          position="right"
          withArrow
          label={localization.edit}
        >
          <ActionIcon
            aria-label={localization.edit}
            onClick={handleStartEditMode}
            sx={{
              opacity: 0.8,
              '&:hover': {
                opacity: 1,
              },
            }}
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
