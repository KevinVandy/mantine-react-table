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
  table: {
    getState,
    options: {
      icons: { IconSearch, IconSearchOff },
      localization: { showHideSearch },
    },
    refs: { searchInputRef },
    setShowGlobalFilter,
  },
  title,
  ...rest
}: Props<TData>) => {
  const { globalFilter, showGlobalFilter } = getState();

  const handleToggleSearch = () => {
    setShowGlobalFilter(!showGlobalFilter);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  return (
    <Tooltip withinPortal label={title ?? showHideSearch}>
      <ActionIcon
        color="gray"
        size="lg"
        variant="subtle"
        aria-label={title ?? showHideSearch}
        disabled={!!globalFilter}
        onClick={handleToggleSearch}
        {...rest}
      >
        {showGlobalFilter ? <IconSearchOff /> : <IconSearch />}
      </ActionIcon>
    </Tooltip>
  );
};
