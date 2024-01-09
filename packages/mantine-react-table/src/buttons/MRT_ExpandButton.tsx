import clsx from 'clsx';
import classes from './MRT_ExpandButton.module.css';
import { type MouseEvent } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ExpandButton = <TData extends MRT_RowData>({
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
    row,
    table,
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
      disabled={!canExpand && !renderDetailPanel}
      label={
        actionIconProps?.title ?? isExpanded
          ? localization.collapse
          : localization.expand
      }
      openDelay={1000}
      withinPortal
    >
      <ActionIcon
        aria-label={localization.expand}
        color="gray"
        disabled={!canExpand && !renderDetailPanel}
        variant="subtle"
        {...actionIconProps}
        className={clsx(
          'mrt-expand-button',
          classes.root,
          actionIconProps?.className,
        )}
        onClick={handleToggleExpand}
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
