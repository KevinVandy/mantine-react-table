import clsx from 'clsx';
import classes from './MRT_ExpandAllButton.module.css';
import { ActionIcon, Tooltip } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ExpandAllButton = <TData extends MRT_RowData>({
  table,
}: Props<TData>) => {
  const {
    getCanSomeRowsExpand,
    getIsAllRowsExpanded,
    getIsSomeRowsExpanded,
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
      label={
        actionIconProps?.title ?? isAllRowsExpanded
          ? localization.collapseAll
          : localization.expandAll
      }
      openDelay={1000}
      withinPortal
    >
      <ActionIcon
        aria-label={localization.expandAll}
        color="gray"
        variant="subtle"
        {...actionIconProps}
        className={clsx(
          'mrt-expand-all-button',
          classes.root,
          actionIconProps?.className,
          density,
        )}
        disabled={isLoading || (!renderDetailPanel && !getCanSomeRowsExpand())}
        onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
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
