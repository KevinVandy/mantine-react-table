import { useState, type MouseEvent } from 'react';
import {
  ActionIcon,
  Box,
  Transition,
  Tooltip,
  Popover,
  useMantineTheme,
} from '@mantine/core';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import { getPrimaryColor } from '../column.utils';

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

  const theme = useMantineTheme();

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
            // @ts-ignore
            localization[
              `filter${
                currentFilterOption?.charAt(0)?.toUpperCase() +
                currentFilterOption?.slice(1)
              }`
            ],
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
        {(styles) => (
          <Box component="span" sx={{ flex: '0 0' }} style={styles}>
            <Popover.Target>
              <Tooltip
                disabled={popoverOpened}
                label={filterTooltip}
                multiline
                width={filterTooltip.length > 40 ? 300 : undefined}
                withinPortal
              >
                <ActionIcon
                  color={isFilterActive ? getPrimaryColor(theme) : undefined}
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    if (columnFilterDisplayMode === 'popover') {
                      setPopoverOpened((opened) => !opened);
                    } else {
                      setShowColumnFilters(true);
                    }
                    setTimeout(() => {
                      filterInputRefs.current[`${column.id}-0`]?.focus();
                      filterInputRefs.current[`${column.id}-0`]?.select();
                    }, 100);
                  }}
                  size="sm"
                  sx={{
                    opacity: isFilterActive ? 1 : 0.5,
                    padding: '2px',
                    '&:hover': {
                      opacity: 1,
                    },
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
