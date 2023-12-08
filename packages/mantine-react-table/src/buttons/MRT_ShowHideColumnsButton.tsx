import { ActionIcon, type ActionIconProps, Menu, Tooltip } from '@mantine/core';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsButton = <
  TData extends Record<string, any> = {},
>({
  table,
  title,
  ...rest
}: Props<TData>) => {
  const {
    icons: { IconColumns },
    localization: { showHideColumns },
  } = table.options;

  return (
    <Menu closeOnItemClick={false} withinPortal>
      <Tooltip withinPortal label={title ?? showHideColumns}>
        <Menu.Target>
          <ActionIcon
            color="gray"
            size="lg"
            variant="subtle"
            aria-label={title ?? showHideColumns}
            {...rest}
          >
            <IconColumns />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <MRT_ShowHideColumnsMenu table={table} />
    </Menu>
  );
};
