import clsx from 'clsx';
import { useState, type MouseEvent } from 'react';
import { ActionIcon, Box, Popover, Tooltip, Transition } from '@mantine/core';

import { type MRT_Header, type MRT_TableInstance } from '../types';
import { localizedFilterOption } from '../filterFns';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';

import classes from './MRT_TableHeadCellFilterLabel.module.css';

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterLabel = <
  TData extends Record<string, any> = {},
>({
  header,
  table,
}: Props<TData>) => {
  const {
    options: {
      columnFilterDisplayMode,
      icons: { IconFilter },
      localization,
    },
    refs: { filterInputRefs },
    setShowColumnFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const filterValue = column.getFilterValue();

  const [popoverOpened, setPopoverOpened] = useState(false);

  const isFilterActive =
    (Array.isArray(filterValue) && filterValue.some(Boolean)) ||
    (!!filterValue && !Array.isArray(filterValue));

  const isRangeFilter =
    columnDef.filterVariant === 'range' ||
    ['between', 'betweenInclusive', 'inNumberRange'].includes(
      columnDef._filterFn,
    );
  const currentFilterOption = columnDef._filterFn;
  const filterTooltip =
    columnFilterDisplayMode === 'popover' && !isFilterActive
      ? localization.filterByColumn?.replace(
          '{column}',
          String(columnDef.header),
        )
      : localization.filteringByColumn
          .replace('{column}', String(columnDef.header))
          .replace(
            '{filterType}',
            localizedFilterOption(localization, currentFilterOption),
          )
          .replace(
            '{filterValue}',
            `"${
              Array.isArray(column.getFilterValue())
                ? (column.getFilterValue() as [string, string]).join(
                    `" ${isRangeFilter ? localization.and : localization.or} "`,
                  )
                : (column.getFilterValue() as string)
            }"`,
          )
          .replace('" "', '');

  return (
    <Popover
      onClose={() => setPopoverOpened(false)}
      opened={popoverOpened}
      position="top"
      keepMounted={columnDef.filterVariant === 'range-slider'}
      shadow="xl"
      width={360}
      withinPortal
    >
      <Transition
        transition="scale"
        mounted={
          columnFilterDisplayMode === 'popover' ||
          (!!column.getFilterValue() && !isRangeFilter) ||
          (isRangeFilter && // @ts-ignore
            (!!column.getFilterValue()?.[0] || !!column.getFilterValue()?.[1]))
        }
      >
        {() => (
          <Box component="span">
            <Popover.Target>
              <Tooltip
                disabled={popoverOpened}
                label={filterTooltip}
                multiline
                w={filterTooltip.length > 40 ? 300 : undefined}
                withinPortal
              >
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  className={clsx(
                    'mrt-table-head-cell-filter-label-icon',
                    classes.root,
                    isFilterActive && classes.active,
                  )}
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    if (columnFilterDisplayMode === 'popover') {
                      setPopoverOpened((opened) => !opened);
                    } else {
                      setShowColumnFilters(true);
                    }
                    setTimeout(() => {
                      const input = filterInputRefs.current[`${column.id}-0`];
                      input?.focus();
                      input?.select();
                    }, 100);
                  }}
                >
                  <IconFilter />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
          </Box>
        )}
      </Transition>
      {columnFilterDisplayMode === 'popover' && (
        <Popover.Dropdown
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) =>
            event.key === 'Enter' && setPopoverOpened(false)
          }
        >
          <MRT_TableHeadCellFilterContainer header={header} table={table} />
        </Popover.Dropdown>
      )}
    </Popover>
  );
};
