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
        variant="subtle"
        {...actionIconProps}
        disabled={isLoading || (!renderDetailPanel && !getCanSomeRowsExpand())}
        onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
        className={clsx(
          'mrt-expand-all-button',
          classes.root,
          actionIconProps?.className,
          density,
        )}
        title={undefined}
      >
        {actionIconProps?.children ?? (
          <IconChevronsDown
            className={clsx(
              classes.chevron,
              isAllRowsExpanded
                ? classes.up
                : getIsSomeRowsExpanded()
                ? classes.right
                : undefined,
            )}
          />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
