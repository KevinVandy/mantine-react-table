import React, { MouseEvent, useState } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import type { MRT_Cell, MRT_Row, MRT_TableInstance } from '..';

const commonActionIconStyles = {
  height: '2rem',
  ml: '10px',
  opacity: 0.5,
  transition: 'opacity 150ms',
  width: '2rem',
  '&:hover': {
    opacity: 1,
  },
};

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
      icons: { IconEdit, IconDots },
      localization,
      renderRowActionMenuItems,
      renderRowActions,
    },
    setEditingRow,
  } = table;

  const { editingRow } = getState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenRowActionMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleStartEditMode = (event: MouseEvent) => {
    event.stopPropagation();
    setEditingRow({ ...row });
    setAnchorEl(null);
  };

  return (
    <>
      {renderRowActions ? (
        <>{renderRowActions({ cell, row, table })}</>
      ) : row.id === editingRow?.id && editingMode === 'row' ? (
        <MRT_EditActionButtons row={row} table={table} />
      ) : !renderRowActionMenuItems && enableEditing ? (
        <Tooltip
          withinPortal
          position="right"
          withArrow
          label={localization.edit}
        >
          <ActionIcon
            aria-label={localization.edit}
            sx={commonActionIconStyles}
            onClick={handleStartEditMode}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
      ) : renderRowActionMenuItems ? (
        <>
          <Tooltip
            withinPortal
            withArrow
            openDelay={1000}
            label={localization.rowActions}
          >
            <ActionIcon
              aria-label={localization.rowActions}
              onClick={handleOpenRowActionMenu}
              size="sm"
              sx={commonActionIconStyles}
            >
              <IconDots />
            </ActionIcon>
          </Tooltip>
          <MRT_RowActionMenu
            anchorEl={anchorEl}
            handleEdit={handleStartEditMode}
            row={row as any}
            setAnchorEl={setAnchorEl}
            table={table as any}
          />
        </>
      ) : null}
    </>
  );
};
