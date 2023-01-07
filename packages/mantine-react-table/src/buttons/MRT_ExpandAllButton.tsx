import React, { FC } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_ExpandAllButton: FC<Props> = ({ table }) => {
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
  const { isLoading } = getState();

  const actionIconProps =
    mantineExpandAllButtonProps instanceof Function
      ? mantineExpandAllButtonProps({ table })
      : mantineExpandAllButtonProps;

  const isAllRowsExpanded = getIsAllRowsExpanded();

  return (
    <Tooltip
      withinPortal
      withArrow
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
          marginLeft: '6px',
          '&:disabled': {
            backgroundColor: 'transparent',
            border: 'none',
          },
          ...(actionIconProps?.sx instanceof Function
            ? actionIconProps?.sx(theme)
            : (actionIconProps?.sx as any)),
        })}
        title={undefined}
      >
        <IconChevronsDown
          style={{
            transform: `rotate(${
              isAllRowsExpanded ? -180 : getIsSomeRowsExpanded() ? -90 : 0
            }deg)`,
            transition: 'transform 150ms',
          }}
        />
      </ActionIcon>
    </Tooltip>
  );
};
