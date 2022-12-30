import React from 'react';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { HTMLPropsRef, MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
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
      icons: { IconStack, IconStack2, IconStack3 },
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
    <Tooltip
      withinPortal
      withArrow
      label={rest?.title ?? localization.toggleDensity}
    >
      <ActionIcon
        aria-label={localization.toggleDensity}
        onClick={handleToggleDensePadding}
        size="lg"
        {...rest}
        title={undefined}
      >
        {density === 'compact' ? (
          <IconStack3 />
        ) : density === 'comfortable' ? (
          <IconStack2 />
        ) : (
          <IconStack />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
