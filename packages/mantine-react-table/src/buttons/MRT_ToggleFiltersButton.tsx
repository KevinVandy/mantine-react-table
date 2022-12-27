import React from 'react';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps {
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
    setShowFilters,
  } = table;
  const { showColumnFilters } = getState();

  const handleToggleShowFilters = () => {
    setShowFilters(!showColumnFilters);
  };

  return (
    <Tooltip withArrow label={rest?.title ?? localization.showHideFilters}>
      <ActionIcon
        aria-label={localization.showHideFilters}
        onClick={handleToggleShowFilters}
        {...rest}
        title={undefined}
      >
        {showColumnFilters ? <IconFilterOff /> : <IconFilter />}
      </ActionIcon>
    </Tooltip>
  );
};
