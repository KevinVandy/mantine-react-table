import { type MouseEvent } from 'react';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';

interface Props<TData extends MRT_RowData> {
  handleEdit: (event: MouseEvent) => void;
  row: MRT_Row<TData>;
  staticRowIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_RowActionMenu = <TData extends MRT_RowData>({
  handleEdit,
  row,
  staticRowIndex,
  table,
}: Props<TData>) => {
  const {
    options: {
      editDisplayMode,
      enableEditing,
      icons: { IconDots, IconEdit },
      localization,
      positionActionsColumn,
      renderRowActionMenuItems,
    },
  } = table;

  return (
    <Menu
      closeOnItemClick
      position={
        positionActionsColumn === 'first'
          ? 'bottom-start'
          : positionActionsColumn === 'last'
            ? 'bottom-end'
            : undefined
      }
      withinPortal
    >
      <Tooltip label={localization.rowActions} openDelay={1000} withinPortal>
        <Menu.Target>
          <ActionIcon
            aria-label={localization.rowActions}
            color="gray"
            onClick={(event) => event.stopPropagation()}
            size="sm"
            variant="subtle"
          >
            <IconDots />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <Menu.Dropdown onClick={(event) => event.stopPropagation()}>
        {enableEditing && editDisplayMode !== 'table' && (
          <Menu.Item leftSection={<IconEdit />} onClick={handleEdit}>
            {localization.edit}
          </Menu.Item>
        )}
        {renderRowActionMenuItems?.({
          row,
          staticRowIndex,
          table,
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
