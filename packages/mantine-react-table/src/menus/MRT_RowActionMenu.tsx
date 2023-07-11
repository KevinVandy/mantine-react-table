import { type MouseEvent } from 'react';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  handleEdit: (event: MouseEvent) => void;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_RowActionMenu = <TData extends Record<string, any>>({
  handleEdit,
  row,
  table,
}: Props<TData>) => {
  const {
    options: {
      editDisplayMode,
      enableEditing,
      icons: { IconEdit, IconDots },
      localization,
      renderRowActionMenuItems,
    },
  } = table;

  return (
    <Menu closeOnItemClick withinPortal>
      <Tooltip withinPortal openDelay={1000} label={localization.rowActions}>
        <Menu.Target>
          <ActionIcon
            aria-label={localization.rowActions}
            onClick={(event) => event.stopPropagation()}
            size="sm"
          >
            <IconDots />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <Menu.Dropdown onClick={(event) => event.stopPropagation()}>
        {enableEditing && editDisplayMode !== 'table' && (
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
