import clsx from 'clsx';
import { ActionIcon, Tooltip } from '@mantine/core';
import { type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_ExpandAllButton.module.css';

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

  const actionIconProps = parseFromValuesOrFunc(mantineExpandAllButtonProps, {
    table,
  });

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
        variant="transparent"
        {...actionIconProps}
        disabled={isLoading || (!renderDetailPanel && !getCanSomeRowsExpand())}
        onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
        className={clsx(
          'mrt-expand-all-button',
          classes.root,
          actionIconProps?.className,
          density === 'xl'
            ? classes.xl
            : density === 'md'
            ? classes.md
            : undefined,
        )}
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
