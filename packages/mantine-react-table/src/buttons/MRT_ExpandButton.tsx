import React, { FC, MouseEvent } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  table: MRT_TableInstance;
}

export const MRT_ExpandButton: FC<Props> = ({ row, table }) => {
  const {
    getState,
    options: {
      icons: { IconChevronDown },
      localization,
      muiExpandButtonProps,
      renderDetailPanel,
    },
  } = table;
  const { density } = getState();

  const iconButtonProps =
    muiExpandButtonProps instanceof Function
      ? muiExpandButtonProps({ table, row })
      : muiExpandButtonProps;

  const canExpand = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    row.toggleExpanded();
    iconButtonProps?.onClick?.(event);
  };

  return (
    <Tooltip
      withArrow
      disabled={!canExpand && !renderDetailPanel}
      openDelay={1000}
      label={
        iconButtonProps?.title ?? isExpanded
          ? localization.collapse
          : localization.expand
      }
    >
      <span>
        <ActionIcon
          aria-label={localization.expand}
          disabled={!canExpand && !renderDetailPanel}
          {...iconButtonProps}
          onClick={handleToggleExpand}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            ...(iconButtonProps?.sx instanceof Function
              ? iconButtonProps.sx(theme)
              : (iconButtonProps?.sx as any)),
          })}
          title={undefined}
        >
          <IconChevronDown
            style={{
              transform: `rotate(${
                !canExpand && !renderDetailPanel ? -90 : isExpanded ? -180 : 0
              }deg)`,
              transition: 'transform 150ms',
            }}
          />
        </ActionIcon>
      </span>
    </Tooltip>
  );
};
