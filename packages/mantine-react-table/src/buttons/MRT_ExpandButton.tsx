import { type MouseEvent } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { type MRT_Row, type MRT_TableInstance } from '../types';

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

  const actionIconProps =
    mantineExpandButtonProps instanceof Function
      ? mantineExpandButtonProps({ table, row })
      : mantineExpandButtonProps;

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
        disabled={!canExpand && !renderDetailPanel}
        {...actionIconProps}
        onClick={handleToggleExpand}
        sx={(theme) => ({
          opacity: 0.8,
          '&:disabled': {
            backgroundColor: 'transparent',
            border: 'none',
          },
          '&:hover': {
            opacity: 1,
          },
          ...(actionIconProps?.sx instanceof Function
            ? actionIconProps.sx(theme)
            : (actionIconProps?.sx as any)),
        })}
        title={undefined}
      >
        {actionIconProps?.children ?? (
          <IconChevronDown
            style={{
              transform: `rotate(${
                !canExpand && !renderDetailPanel ? -90 : isExpanded ? -180 : 0
              }deg)`,
              transition: 'transform 100ms',
            }}
          />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
