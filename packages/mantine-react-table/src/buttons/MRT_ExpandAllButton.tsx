import { ActionIcon, Tooltip } from '@mantine/core';
import { type MRT_TableInstance } from '../types';
import { funcValue, styleValue } from '../funcValue';

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

  const actionIconProps = funcValue(mantineExpandAllButtonProps, { table });

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
        color="gray"
        disabled={isLoading || (!renderDetailPanel && !getCanSomeRowsExpand())}
        onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
        variant="transparent"
        {...actionIconProps}
        style={(theme) => ({
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
          ...styleValue(actionIconProps, theme),
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
