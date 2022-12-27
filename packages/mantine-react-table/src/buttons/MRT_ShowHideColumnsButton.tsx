import React, { MouseEvent, useState } from 'react';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps {
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip withArrow label={rest?.title ?? localization.showHideColumns}>
        <ActionIcon
          aria-label={localization.showHideColumns}
          onClick={handleClick}
          {...rest}
          title={undefined}
        >
          <IconColumns />
        </ActionIcon>
      </Tooltip>
      {anchorEl && (
        <MRT_ShowHideColumnsMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          table={table}
        />
      )}
    </>
  );
};
