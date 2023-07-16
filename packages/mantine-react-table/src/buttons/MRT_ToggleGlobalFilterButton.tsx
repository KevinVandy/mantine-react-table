import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
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
      icons: { IconSearch, IconSearchOff },

      localization,
    },
    refs: { searchInputRef },
    setShowGlobalFilter,
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const handleToggleSearch = () => {
    setShowGlobalFilter(!showGlobalFilter);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  return (
    <Tooltip withinPortal label={rest?.title ?? localization.showHideSearch}>
      <ActionIcon
        aria-label={rest?.title ?? localization.showHideSearch}
        disabled={!!globalFilter}
        onClick={handleToggleSearch}
        size="lg"
        {...rest}
        title={undefined}
      >
        {showGlobalFilter ? <IconSearchOff /> : <IconSearch />}
      </ActionIcon>
    </Tooltip>
  );
};
