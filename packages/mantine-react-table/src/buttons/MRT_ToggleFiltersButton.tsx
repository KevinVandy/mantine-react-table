import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFiltersButton = <
  TData extends Record<string, any> = {},
>({
  table: {
    getState,
    options: {
      icons: { IconFilter, IconFilterOff },
      localization: { showHideFilters },
    },
    setShowColumnFilters,
  },
  title,
  ...rest
}: Props<TData>) => {
  const { showColumnFilters } = getState();

  return (
    <Tooltip withinPortal label={title ?? showHideFilters}>
      <ActionIcon
        color="gray"
        size="lg"
        variant="subtle"
        aria-label={title ?? showHideFilters}
        onClick={() => setShowColumnFilters((current) => !current)}
        {...rest}
      >
        {showColumnFilters ? <IconFilterOff /> : <IconFilter />}
      </ActionIcon>
    </Tooltip>
  );
};
