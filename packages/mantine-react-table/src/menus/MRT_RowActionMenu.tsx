import React, { MouseEvent } from 'react';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  handleEdit: (event: MouseEvent) => void;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_RowActionMenu = <TData extends Record<string, any> = {}>({
  handleEdit,
  row,
  table,
}: Props<TData>) => {
  const {
    options: {
      icons: { IconEdit, IconDots },
      enableEditing,
      localization,
      renderRowActionMenuItems,
    },
  } = table;

  return (
    <Menu closeOnItemClick withinPortal>
      <Tooltip
        withinPortal
        withArrow
        openDelay={1000}
        label={localization.rowActions}
      >
        <Menu.Target>
          <ActionIcon aria-label={localization.rowActions} size="sm">
            <IconDots />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <Menu.Dropdown>
        {enableEditing && (
          <Menu.Item icon={<IconEdit />} onClick={handleEdit}>
            {localization.edit}
          </Menu.Item>
        )}
        {renderRowActionMenuItems?.({
          row,
          table,
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
