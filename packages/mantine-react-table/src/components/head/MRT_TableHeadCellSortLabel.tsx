import clsx from 'clsx';
import classes from './MRT_TableHeadCellSortLabel.module.css';
import { ActionIcon, Indicator, Tooltip } from '@mantine/core';
import { dataVariable } from '../../utils/style.utils';
import type { MRT_Header, MRT_RowData, MRT_TableInstance } from '../../types';

interface Props<TData extends MRT_RowData> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellSortLabel = <TData extends MRT_RowData>({
  header,
  table: {
    getState,
    options: {
      icons: { IconArrowsSort, IconSortAscending, IconSortDescending },
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

  return (
    <Tooltip label={sortTooltip} openDelay={1000} withinPortal>
      {sorting.length < 2 || sortIndex === -1 ? (
        <ActionIcon
          aria-label={sortTooltip}
          className={clsx('mrt-table-head-sort-button', classes['sort-icon'])}
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
      ) : (
        <Indicator
          className={clsx(
            'mrt-table-head-multi-sort-indicator',
            classes['multi-sort-indicator'],
          )}
          inline
          label={sortIndex + 1}
          offset={4}
        >
          <ActionIcon
            aria-label={sortTooltip}
            className={clsx('mrt-table-head-sort-button', classes['sort-icon'])}
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
        </Indicator>
      )}
    </Tooltip>
  );
};
