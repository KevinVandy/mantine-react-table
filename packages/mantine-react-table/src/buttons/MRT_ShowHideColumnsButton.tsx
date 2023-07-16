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
  ...rest
}: Props<TData>) => {
  const {
    options: {
      icons: { IconColumns },
      localization,
    },
  } = table;

  return (
    <Menu closeOnItemClick={false} withinPortal>
      <Tooltip withinPortal label={rest?.title ?? localization.showHideColumns}>
        <Menu.Target>
          <ActionIcon
            aria-label={localization.showHideColumns}
            size="lg"
            {...rest}
            title={undefined}
          >
            <IconColumns />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <MRT_ShowHideColumnsMenu table={table} />
    </Menu>
  );
};
