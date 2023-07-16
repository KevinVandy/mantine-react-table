import { ActionIcon, Tooltip } from '@mantine/core';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ExpandAllButton = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    getIsAllRowsExpanded,
    getIsSomeRowsExpanded,
    getCanSomeRowsExpand,
    getState,
    options: {
      icons: { IconChevronsDown },
      localization,
      mantineExpandAllButtonProps,
      renderDetailPanel,
    },
    toggleAllRowsExpanded,
  } = table;
  const { density, isLoading } = getState();

  const actionIconProps =
    mantineExpandAllButtonProps instanceof Function
      ? mantineExpandAllButtonProps({ table })
      : mantineExpandAllButtonProps;

  const isAllRowsExpanded = getIsAllRowsExpanded();

  return (
    <Tooltip
      withinPortal
      openDelay={1000}
      label={
        actionIconProps?.title ?? isAllRowsExpanded
          ? localization.collapseAll
          : localization.expandAll
      }
    >
      <ActionIcon
        aria-label={localization.expandAll}
        disabled={isLoading || (!renderDetailPanel && !getCanSomeRowsExpand())}
        onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
        {...actionIconProps}
        sx={(theme) => ({
          marginLeft:
            density === 'xl' ? '-6px' : density === 'md' ? '0' : '6px',
          opacity: 0.8,
          '&:disabled': {
            backgroundColor: 'transparent',
            border: 'none',
          },
          '&:hover': {
            opacity: 1,
          },
          ...(actionIconProps?.sx instanceof Function
            ? actionIconProps?.sx(theme)
            : (actionIconProps?.sx as any)),
        })}
        title={undefined}
      >
        {actionIconProps?.children ?? (
          <IconChevronsDown
            style={{
              transform: `rotate(${
                isAllRowsExpanded ? -180 : getIsSomeRowsExpanded() ? -90 : 0
              }deg)`,
              transition: 'transform 100ms',
            }}
          />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
