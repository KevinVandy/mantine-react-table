import clsx from 'clsx';
import { ActionIcon, Indicator, Tooltip } from '@mantine/core';
import type { SortDirection } from '@tanstack/react-table';

import type { MRT_Icons, MRT_Header, MRT_TableInstance } from '../types';
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
    options: { icons, localization },
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

  return (
    <Tooltip withinPortal openDelay={1000} label={sortTooltip}>
      {sorting.length < 2 || sortIndex === -1 ? (
        <SortIcon sorted={sorted} label={sortTooltip} icons={icons} />
      ) : (
        <Indicator
          className={clsx(
            'mrt-table-head-multi-sort-indicator',
            classes['multi-sort-indicator'],
          )}
          color="transparent"
          label={sortIndex + 1}
          offset={4}
          inline
        >
          <SortIcon sorted={sorted} label={sortTooltip} icons={icons} />
        </Indicator>
      )}
    </Tooltip>
  );
};

function SortIcon({
  sorted,
  label,
  icons: { IconSortDescending, IconSortAscending, IconArrowsSort },
}: {
  sorted: false | SortDirection;
  label: string;
  icons: Partial<MRT_Icons>;
}) {
  return (
    <ActionIcon
      className={clsx('mrt-table-head-sort-button', classes['sort-icon'])}
      aria-label={label}
      size={18}
      {...dataVariable('sorted', sorted)}
    >
      {sorted === 'desc' ? (
        <IconSortDescending />
      ) : sorted === 'asc' ? (
        <IconSortAscending />
      ) : (
        <IconArrowsSort />
      )}
    </ActionIcon>
  );
}
