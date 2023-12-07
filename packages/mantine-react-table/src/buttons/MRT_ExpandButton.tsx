import clsx from 'clsx';
import { type MouseEvent } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { type MRT_Row, type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_ExpandButton.module.css';

interface Props<TData extends Record<string, any> = {}> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ExpandButton = <TData extends Record<string, any> = {}>({
  row,
  table,
}: Props<TData>) => {
  const {
    options: {
      icons: { IconChevronDown },
      localization,
      mantineExpandButtonProps,
      renderDetailPanel,
    },
  } = table;

  const actionIconProps = parseFromValuesOrFunc(mantineExpandButtonProps, {
    table,
    row,
  });
  const canExpand = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    row.toggleExpanded();
    actionIconProps?.onClick?.(event);
  };

  return (
    <Tooltip
      withinPortal
      disabled={!canExpand && !renderDetailPanel}
      openDelay={1000}
      label={
        actionIconProps?.title ?? isExpanded
          ? localization.collapse
          : localization.expand
      }
    >
      <ActionIcon
        aria-label={localization.expand}
        color="gray"
        disabled={!canExpand && !renderDetailPanel}
        variant="subtle"
        {...actionIconProps}
        onClick={handleToggleExpand}
        className={clsx(
          'mrt-expand-button',
          classes.root,
          actionIconProps?.className,
        )}
        title={undefined}
      >
        {actionIconProps?.children ?? (
          <IconChevronDown
            className={clsx(
              'mrt-expand-button-chevron',
              classes.chevron,
              !canExpand && !renderDetailPanel
                ? classes.right
                : isExpanded
                ? classes.up
                : undefined,
            )}
          />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
