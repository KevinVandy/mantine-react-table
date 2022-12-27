import React, { FC } from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';
import { BoxProps, Tooltip } from '@mantine/core';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
  tableCellProps?: BoxProps;
}

export const MRT_TableHeadCellSortLabel: FC<Props> = ({
  header,
  table,
  tableCellProps,
}) => {
  const {
    options: {
      icons: { IconArrowDown },
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
    <Tooltip withArrow position="top" label={sortTooltip}>
      <TableSortLabel
        aria-label={sortTooltip}
        active={!!column.getIsSorted()}
        direction={
          column.getIsSorted()
            ? (column.getIsSorted() as 'asc' | 'desc')
            : undefined
        }
        sx={{
          flex: '0 0',
          width: '2.3ch',
          transform:
            tableCellProps?.align !== 'right'
              ? 'translateX(-0.5ch)'
              : undefined,
        }}
        IconComponent={IconArrowDown}
      />
    </Tooltip>
  );
};
