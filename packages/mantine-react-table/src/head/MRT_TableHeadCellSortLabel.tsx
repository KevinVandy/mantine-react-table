import clsx from 'clsx';
import { ActionIcon, Indicator, Tooltip } from '@mantine/core';

import { type MRT_Header, type MRT_TableInstance } from '../types';
import { dataVariable } from '../dataVariable';

import classes from './MRT_TableHeadCellSortLabel.module.css';

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellSortLabel = <
  TData extends Record<string, any> = {},
>({
  header,
  table: {
    getState,
    options: {
      icons: { IconSortDescending, IconSortAscending, IconArrowsSort },
      localization,
    },
  },
}: Props<TData>) => {
  const column = header.column;
  const { columnDef } = column;
  const { sorting } = getState();
  const sorted = column.getIsSorted();
  const sortIndex = column.getSortIndex();

  const sortTooltip = sorted
    ? sorted === 'desc'
      ? localization.sortedByColumnDesc.replace('{column}', columnDef.header)
      : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
    : column.getNextSortingOrder() === 'desc'
    ? localization.sortByColumnDesc.replace('{column}', columnDef.header)
    : localization.sortByColumnAsc.replace('{column}', columnDef.header);

  const icon =
    sorted === 'desc' ? (
      <IconSortDescending />
    ) : sorted === 'asc' ? (
      <IconSortAscending />
    ) : (
      <IconArrowsSort />
    );

  return (
    <Tooltip withinPortal openDelay={1000} label={sortTooltip}>
      <Indicator
        color="transparent"
        disabled={sorting.length < 2 || sortIndex === -1}
        inline
        processing
        label={sortIndex + 1}
        offset={3}
      >
        <ActionIcon
          className={clsx('mrt-table-head-sort-button', classes['sort-icon'])}
          aria-label={sortTooltip}
          {...dataVariable('sorted', sorted)}
        >
          {icon}
        </ActionIcon>
      </Indicator>
    </Tooltip>
  );
};
