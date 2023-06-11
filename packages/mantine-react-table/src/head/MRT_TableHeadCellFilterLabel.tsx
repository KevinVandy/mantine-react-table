import { type MouseEvent } from 'react';
import { ActionIcon, Box, Transition, Tooltip } from '@mantine/core';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellFilterLabel = ({ header, table }: Props) => {
  const {
    options: {
      icons: { IconFilter },
      localization,
    },
    refs: { filterInputRefs },
    setShowColumnFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const isRangeFilter =
    columnDef.filterVariant === 'range' ||
    ['between', 'betweenInclusive', 'inNumberRange'].includes(
      columnDef._filterFn,
    );
  const currentFilterOption = columnDef._filterFn;
  const filterTooltip = localization.filteringByColumn
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
    <Transition
      transition="scale"
      mounted={
        (!!column.getFilterValue() && !isRangeFilter) ||
        (isRangeFilter && // @ts-ignore
          (!!column.getFilterValue()?.[0] || !!column.getFilterValue()?.[1]))
      }
    >
      {(styles) => (
        <Box component="span" sx={{ flex: '0 0' }} style={styles}>
          <Tooltip withinPortal withArrow position="top" label={filterTooltip}>
            <ActionIcon
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                setShowColumnFilters(true);
                setTimeout(() => {
                  filterInputRefs.current[`${column.id}-0`]?.focus();
                  filterInputRefs.current[`${column.id}-0`]?.select();
                }, 100);
                event.stopPropagation();
              }}
              size="sm"
              sx={{
                opacity: 0.5,
                padding: '2px',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <IconFilter />
            </ActionIcon>
          </Tooltip>
        </Box>
      )}
    </Transition>
  );
};
