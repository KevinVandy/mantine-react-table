import React from 'react';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleDensePaddingButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { IconMenu, IconMenu2 },
      localization,
    },
    setDensity,
  } = table;
  const { density } = getState();

  const handleToggleDensePadding = () => {
    const nextDensity =
      density === 'comfortable'
        ? 'compact'
        : density === 'compact'
        ? 'spacious'
        : 'comfortable';
    setDensity(nextDensity);
  };

  return (
    <Tooltip withArrow label={rest?.title ?? localization.toggleDensity}>
      <ActionIcon
        aria-label={localization.toggleDensity}
        onClick={handleToggleDensePadding}
        {...rest}
        title={undefined}
      >
        {density === 'compact' ? (
          <IconMenu2 />
        ) : density === 'comfortable' ? (
          <IconMenu2 />
        ) : (
          <IconMenu />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
