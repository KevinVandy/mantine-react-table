import React from 'react';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import type { HTMLPropsRef, MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFiltersButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { IconFilter, IconFilterOff },
      localization,
    },
    setShowColumnFilters,
  } = table;
  const { showColumnFilters } = getState();

  const handleToggleShowFilters = () => {
    setShowColumnFilters(!showColumnFilters);
  };

  return (
    <Tooltip
      withinPortal
      withArrow
      label={rest?.title ?? localization.showHideFilters}
    >
      <ActionIcon
        aria-label={localization.showHideFilters}
        onClick={handleToggleShowFilters}
        size="lg"
        {...rest}
        title={undefined}
      >
        {showColumnFilters ? <IconFilterOff /> : <IconFilter />}
      </ActionIcon>
    </Tooltip>
  );
};
