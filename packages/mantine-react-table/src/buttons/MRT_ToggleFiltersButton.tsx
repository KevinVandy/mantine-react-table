import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import {
  type MRT_RowData,
  type HTMLPropsRef,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFiltersButton = <TData extends MRT_RowData>({
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
