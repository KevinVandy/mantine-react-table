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
      muiExpandAllButtonProps,
      renderDetailPanel,
    },
    toggleAllRowsExpanded,
  } = table;
  const { density, isLoading } = getState();

  const actionIconProps =
    muiExpandAllButtonProps instanceof Function
      ? muiExpandAllButtonProps({ table })
      : muiExpandAllButtonProps;

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
      <span>
        <ActionIcon
          aria-label={localization.expandAll}
          disabled={
            isLoading || (!renderDetailPanel && !getCanSomeRowsExpand())
          }
          onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
          {...actionIconProps}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            mt: density !== 'compact' ? '-0.25rem' : undefined,
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
      </span>
    </Tooltip>
  );
};
