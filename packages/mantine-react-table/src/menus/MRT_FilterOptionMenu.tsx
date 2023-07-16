import { Fragment, useMemo } from 'react';
import { Flex, Menu } from '@mantine/core';
import {
  type MRT_FilterOption,
  type MRT_Header,
  type MRT_InternalFilterOption,
  type MRT_Localization,
  type MRT_TableInstance,
} from '../types';

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

const rangeModes = ['between', 'betweenInclusive', 'inNumberRange'];
const emptyModes = ['empty', 'notEmpty'];
const arrModes = ['arrIncludesSome', 'arrIncludesAll', 'arrIncludes'];
const rangeVariants = ['range-slider', 'date-range', 'range'];

interface Props<TData extends Record<string, any> = {}> {
  header?: MRT_Header<TData>;
  onSelect?: () => void;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterOptionMenu = <TData extends Record<string, any> = {}>({
  header,
  onSelect,
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
  const currentFilterValue = column?.getFilterValue();

  let allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;

  if (rangeVariants.includes(columnDef?.filterVariant as string)) {
    allowedColumnFilterOptions = [
      ...rangeModes,
      ...(allowedColumnFilterOptions ?? []),
    ].filter((option) => rangeModes.includes(option));
  }

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
    const prevFilterMode = columnDef?._filterFn ?? '';
    if (!header || !column) {
      // global filter mode
      setGlobalFilterFn(option);
    } else if (option !== prevFilterMode) {
      // column filter mode
      setColumnFilterFns((prev: { [key: string]: any }) => ({
        ...prev,
        [header.id]: option,
      }));

      // reset filter value and/or perform new filter render
      if (emptyModes.includes(option)) {
        // will now be empty/notEmpty filter mode
        if (
          currentFilterValue !== ' ' &&
          !emptyModes.includes(prevFilterMode)
        ) {
          column.setFilterValue(' ');
        } else if (currentFilterValue) {
          column.setFilterValue(currentFilterValue); // perform new filter render
        }
      } else if (
        columnDef?.filterVariant === 'multi-select' ||
        arrModes.includes(option as string)
      ) {
        // will now be array filter mode
        if (
          currentFilterValue instanceof String ||
          (currentFilterValue as Array<any>)?.length
        ) {
          column.setFilterValue([]);
        } else if (currentFilterValue) {
          column.setFilterValue(currentFilterValue); // perform new filter render
        }
      } else if (
        rangeVariants.includes(columnDef?.filterVariant as string) ||
        rangeModes.includes(option as MRT_FilterOption)
      ) {
        // will now be range filter mode
        if (
          !Array.isArray(currentFilterValue) ||
          (!(currentFilterValue as Array<any>)?.every((v) => v === '') &&
            !rangeModes.includes(prevFilterMode))
        ) {
          column.setFilterValue(['', '']);
        } else {
          column.setFilterValue(currentFilterValue); // perform new filter render
        }
      } else {
        // will now be single value filter mode
        if (Array.isArray(currentFilterValue)) {
          column.setFilterValue('');
        } else {
          column.setFilterValue(currentFilterValue); // perform new filter render
        }
      }
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
                    fontSize: '20px',
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
