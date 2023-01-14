import React, { FC } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellSortLabel: FC<Props> = ({ header, table }) => {
  const {
    options: {
      icons: { IconSortDescending, IconSortAscending, IconArrowsSort },
      localization,
    },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const sortTooltip = column.getIsSorted()
    ? column.getIsSorted() === 'desc'
      ? localization.sortedByColumnDesc.replace('{column}', columnDef.header)
      : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
    : localization.unsorted;

  return (
    <Tooltip withinPortal withArrow position="top" label={sortTooltip}>
      <ActionIcon
        aria-label={sortTooltip}
        size="xs"
        sx={{
          opacity: column.getIsSorted() ? 1 : 0,
          transition: 'opacity 100ms ease-in-out',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        {column.getIsSorted() === 'desc' ? (
          <IconSortDescending />
        ) : column.getIsSorted() === 'asc' ? (
          <IconSortAscending />
        ) : (
          <IconArrowsSort />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
