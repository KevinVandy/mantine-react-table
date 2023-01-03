import React, { Fragment, useMemo } from 'react';
import { Flex, Menu } from '@mantine/core';
import type {
  MRT_FilterOption,
  MRT_Header,
  MRT_InternalFilterOption,
  MRT_Localization,
  MRT_TableInstance,
} from '..';

export const mrtFilterOptions = (
  localization: MRT_Localization,
): MRT_InternalFilterOption[] => [
  {
    option: 'fuzzy',
    symbol: '≈',
    label: localization.filterFuzzy,
    divider: false,
  },
  {
    option: 'contains',
    symbol: '*',
    label: localization.filterContains,
    divider: false,
  },
  {
    option: 'startsWith',
    symbol: 'a',
    label: localization.filterStartsWith,
    divider: false,
  },
  {
    option: 'endsWith',
    symbol: 'z',
    label: localization.filterEndsWith,
    divider: true,
  },
  {
    option: 'equals',
    symbol: '=',
    label: localization.filterEquals,
    divider: false,
  },
  {
    option: 'notEquals',
    symbol: '≠',
    label: localization.filterNotEquals,
    divider: true,
  },
  {
    option: 'between',
    symbol: '⇿',
    label: localization.filterBetween,
    divider: false,
  },
  {
    option: 'betweenInclusive',
    symbol: '⬌',
    label: localization.filterBetweenInclusive,
    divider: true,
  },
  {
    option: 'greaterThan',
    symbol: '>',
    label: localization.filterGreaterThan,
    divider: false,
  },
  {
    option: 'greaterThanOrEqualTo',
    symbol: '≥',
    label: localization.filterGreaterThanOrEqualTo,
    divider: false,
  },
  {
    option: 'lessThan',
    symbol: '<',
    label: localization.filterLessThan,
    divider: false,
  },
  {
    option: 'lessThanOrEqualTo',
    symbol: '≤',
    label: localization.filterLessThanOrEqualTo,
    divider: true,
  },
  {
    option: 'empty',
    symbol: '∅',
    label: localization.filterEmpty,
    divider: false,
  },
  {
    option: 'notEmpty',
    symbol: '!∅',
    label: localization.filterNotEmpty,
    divider: false,
  },
];

interface Props<TData extends Record<string, any> = {}> {
  header?: MRT_Header<TData>;
  onSelect?: () => void;
  setFilterValue?: (filterValue: any) => void;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterOptionMenu = <TData extends Record<string, any> = {}>({
  header,
  onSelect,
  setFilterValue,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      columnFilterModeOptions,
      globalFilterModeOptions,
      localization,
      renderColumnFilterModeMenuItems,
      renderGlobalFilterModeMenuItems,
    },
    setColumnFilterFns,
    setGlobalFilterFn,
  } = table;
  const { globalFilterFn } = getState();
  const { column } = header ?? {};
  const { columnDef } = column ?? {};

  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;

  const internalFilterOptions = useMemo(
    () =>
      mrtFilterOptions(localization).filter((filterOption) =>
        columnDef
          ? allowedColumnFilterOptions === undefined ||
            allowedColumnFilterOptions?.includes(filterOption.option)
          : (!globalFilterModeOptions ||
              globalFilterModeOptions.includes(filterOption.option)) &&
            ['fuzzy', 'contains', 'startsWith'].includes(filterOption.option),
      ),
    [],
  );

  const handleSelectFilterMode = (option: MRT_FilterOption) => {
    if (header && column) {
      setColumnFilterFns((prev: { [key: string]: any }) => ({
        ...prev,
        [header.id]: option,
      }));
      if (['empty', 'notEmpty'].includes(option as string)) {
        column.setFilterValue(' ');
      } else if (
        columnDef?.filterVariant === 'multi-select' ||
        ['arrIncludesSome', 'arrIncludesAll', 'arrIncludes'].includes(
          option as string,
        )
      ) {
        column.setFilterValue([]);
        setFilterValue?.([]);
      } else if (
        columnDef?.filterVariant === 'range' ||
        ['between', 'betweenInclusive', 'inNumberRange'].includes(
          option as MRT_FilterOption,
        )
      ) {
        column.setFilterValue(['', '']);
        setFilterValue?.('');
      } else {
        column.setFilterValue('');
        setFilterValue?.('');
      }
    } else {
      setGlobalFilterFn(option);
    }
    onSelect?.();
  };

  const filterOption =
    !!header && columnDef ? columnDef._filterFn : globalFilterFn;

  return (
    <Menu.Dropdown>
      {(header && column && columnDef
        ? columnDef.renderColumnFilterModeMenuItems?.({
            column: column as any,
            internalFilterOptions,
            onSelectFilterMode: handleSelectFilterMode,
            table,
          }) ??
          renderColumnFilterModeMenuItems?.({
            column: column as any,
            internalFilterOptions,
            onSelectFilterMode: handleSelectFilterMode,
            table,
          })
        : renderGlobalFilterModeMenuItems?.({
            internalFilterOptions,
            onSelectFilterMode: handleSelectFilterMode,
            table,
          })) ??
        internalFilterOptions.map(
          ({ option, label, divider, symbol }, index) => (
            <Fragment key={index}>
              <Menu.Item
                onClick={() =>
                  handleSelectFilterMode(option as MRT_FilterOption)
                }
                color={option === filterOption ? 'blue' : undefined}
                sx={{
                  '& > .mantine-Menu-itemLabel': {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: '1ch',
                  },
                }}
                value={option}
              >
                <Flex
                  sx={{
                    fontSize: '1.25rem',
                    transform: 'translateY(-2px)',
                    width: '2ch',
                  }}
                >
                  {symbol}
                </Flex>
                <Flex align="center">{label}</Flex>
              </Menu.Item>
              {divider && <Menu.Divider />}
            </Fragment>
          ),
        )}
    </Menu.Dropdown>
  );
};
