import React from 'react';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleGlobalFilterButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { IconSearch, IconCircleOff },

      localization,
    },
    refs: { searchInputRef },
    setShowGlobalFilter,
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const handleToggleSearch = () => {
    setShowGlobalFilter(!showGlobalFilter);
    queueMicrotask(() => searchInputRef.current?.focus());
  };

  return (
    <Tooltip withArrow label={rest?.title ?? localization.showHideSearch}>
      <ActionIcon
        disabled={!!globalFilter}
        onClick={handleToggleSearch}
        {...rest}
        title={undefined}
      >
        {showGlobalFilter ? <IconCircleOff /> : <IconSearch />}
      </ActionIcon>
    </Tooltip>
  );
};
