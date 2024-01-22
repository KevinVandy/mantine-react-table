import clsx from 'clsx';
import classes from './MRT_TableHeadCellFilterLabel.module.css';
import { type MouseEvent, useState } from 'react';
import { ActionIcon, Popover, Tooltip, Transition } from '@mantine/core';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { localizedFilterOption } from '../../fns/filterFns';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { dataVariable } from '../../utils/style.utils';

interface Props<TData extends MRT_RowData> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterLabel = <TData extends MRT_RowData>({
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
    <>
      <Popover
        keepMounted={columnDef.filterVariant === 'range-slider'}
        onClose={() => setPopoverOpened(false)}
        opened={popoverOpened}
        position="top"
        shadow="xl"
        width={360}
        withinPortal
      >
        <Transition
          mounted={
            columnFilterDisplayMode === 'popover' ||
            (!!column.getFilterValue() && !isRangeFilter) ||
            (isRangeFilter &&
              (!!(column.getFilterValue() as [any, any])?.[0] ||
                !!(column.getFilterValue() as [any, any])?.[1]))
          }
          transition="scale"
        >
          {() => (
            <Popover.Target>
              <Tooltip
                disabled={popoverOpened}
                label={filterTooltip}
                multiline
                w={filterTooltip.length > 40 ? 300 : undefined}
                withinPortal
              >
                <ActionIcon
                  className={clsx(
                    'mrt-table-head-cell-filter-label-icon',
                    classes.root,
                  )}
                  size={18}
                  {...dataVariable('active', isFilterActive)}
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
    </>
  );
};
