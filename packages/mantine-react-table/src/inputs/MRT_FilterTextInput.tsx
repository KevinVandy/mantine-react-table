import clsx from 'clsx';
import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActionIcon,
  Autocomplete,
  Badge,
  Box,
  MultiSelect,
  Select,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';
import { localizedFilterOption } from '../filterFns';

import classes from './MRT_FilterTextInput.module.css';

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  rangeFilterIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterTextInput = <TData extends Record<string, any> = {}>({
  header,
  rangeFilterIndex,
  table,
}: Props<TData>) => {
  const {
    options: {
      columnFilterDisplayMode,
      columnFilterModeOptions,
      icons: { IconX },
      localization,
      mantineFilterAutocompleteProps,
      mantineFilterDateInputProps,
      mantineFilterMultiSelectProps,
      mantineFilterSelectProps,
      mantineFilterTextInputProps,
      manualFiltering,
    },
    refs: { filterInputRefs },
    setColumnFilterFns,
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const arg = { column, table, rangeFilterIndex };
  const textInputProps = {
    ...parseFromValuesOrFunc(mantineFilterTextInputProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineFilterTextInputProps, arg),
  };

  const selectProps = {
    ...parseFromValuesOrFunc(mantineFilterSelectProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineFilterSelectProps, arg),
  };

  const multiSelectProps = {
    ...parseFromValuesOrFunc(mantineFilterMultiSelectProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineFilterMultiSelectProps, arg),
  };

  const dateInputProps = {
    ...parseFromValuesOrFunc(mantineFilterDateInputProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineFilterDateInputProps, arg),
  };

  const autoCompleteProps = {
    ...parseFromValuesOrFunc(mantineFilterAutocompleteProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineFilterAutocompleteProps, arg),
  };

  const isRangeFilter =
    columnDef.filterVariant === 'range' ||
    columnDef.filterVariant === 'date-range' ||
    rangeFilterIndex !== undefined;
  const isSelectFilter = columnDef.filterVariant === 'select';
  const isMultiSelectFilter = columnDef.filterVariant === 'multi-select';
  const isDateFilter =
    columnDef.filterVariant === 'date' ||
    columnDef.filterVariant === 'date-range';
  const isAutoCompleteFilter = columnDef.filterVariant === 'autocomplete';
  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;

  const currentFilterOption = columnDef._filterFn;
  const filterChipLabel = ['empty', 'notEmpty'].includes(currentFilterOption)
    ? localizedFilterOption(localization, currentFilterOption)
    : '';
  const filterPlaceholder = !isRangeFilter
    ? textInputProps?.placeholder ??
      localization.filterByColumn?.replace('{column}', String(columnDef.header))
    : rangeFilterIndex === 0
    ? localization.min
    : rangeFilterIndex === 1
    ? localization.max
    : '';

  const facetedUniqueValues = column.getFacetedUniqueValues();

  const filterSelectOptions = useMemo(
    () =>
      (
        autoCompleteProps?.data ??
        selectProps?.data ??
        multiSelectProps?.data ??
        ((isAutoCompleteFilter || isSelectFilter || isMultiSelectFilter) &&
        facetedUniqueValues
          ? Array.from(facetedUniqueValues.keys()).sort((a, b) =>
              a.localeCompare(b),
            )
          : [])
      )
        //@ts-ignore
        .filter((o: any) => o !== undefined && o !== null),
    [
      autoCompleteProps?.data,
      facetedUniqueValues,
      isAutoCompleteFilter,
      isMultiSelectFilter,
      isSelectFilter,
      multiSelectProps?.data,
      selectProps?.data,
    ],
  );

  const isMounted = useRef(false);

  const [filterValue, setFilterValue] = useState<any>(() =>
    isMultiSelectFilter
      ? (column.getFilterValue() as string[]) || []
      : isRangeFilter
      ? (column.getFilterValue() as [string, string])?.[
          rangeFilterIndex as number
        ] || ''
      : (column.getFilterValue() as string) ?? '',
  );

  const [debouncedFilterValue] = useDebouncedValue(
    filterValue,
    manualFiltering ? 400 : 200,
  );

  //send debounced filterValue to table instance
  useEffect(() => {
    if (!isMounted.current) return;
    if (isRangeFilter) {
      column.setFilterValue((old: [string, string]) => {
        const newFilterValues = Array.isArray(old) ? old : ['', ''];
        newFilterValues[rangeFilterIndex as number] =
          debouncedFilterValue as string;
        return newFilterValues;
      });
    } else {
      column.setFilterValue(debouncedFilterValue ?? undefined);
    }
  }, [debouncedFilterValue]);

  //receive table filter value and set it to local state
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const tableFilterValue = column.getFilterValue();
    if (tableFilterValue === undefined) {
      handleClear();
    } else if (isRangeFilter && rangeFilterIndex !== undefined) {
      setFilterValue(
        ((tableFilterValue ?? ['', '']) as [string, string])[rangeFilterIndex],
      );
    } else {
      setFilterValue(tableFilterValue ?? '');
    }
  }, [column.getFilterValue()]);

  const handleClear = () => {
    if (isMultiSelectFilter) {
      setFilterValue([]);
      column.setFilterValue([]);
    } else if (isRangeFilter) {
      setFilterValue('');
      column.setFilterValue((old: [string | undefined, string | undefined]) => {
        const newFilterValues = Array.isArray(old) ? old : ['', ''];
        newFilterValues[rangeFilterIndex as number] = undefined;
        return newFilterValues;
      });
    } else {
      setFilterValue('');
      column.setFilterValue(undefined);
    }
  };

  if (columnDef.Filter) {
    return (
      <>{columnDef.Filter?.({ column, header, rangeFilterIndex, table })}</>
    );
  }

  const handleClearEmptyFilterChip = () => {
    setFilterValue('');
    column.setFilterValue(undefined);
    setColumnFilterFns((prev) => ({
      ...prev,
      [header.id]: allowedColumnFilterOptions?.[0] ?? 'fuzzy',
    }));
  };

  const { className, ...commonProps } = {
    disabled: !!filterChipLabel,
    placeholder: filterPlaceholder,
    title: filterPlaceholder,
    'aria-label': filterPlaceholder,
    onClick: (event: MouseEvent<HTMLInputElement>) => event.stopPropagation(),
    onChange: setFilterValue,
    value: filterValue,
    variant: 'unstyled',
    className: clsx(
      'mrt-filter-text-input',
      classes.root,
      isDateFilter
        ? classes['date-filter']
        : isRangeFilter
        ? classes['range-filter']
        : !filterChipLabel && classes['not-filter-chip'],
    ),
    style: {
      ...(isMultiSelectFilter
        ? multiSelectProps?.style
        : isSelectFilter
        ? selectProps?.style
        : isDateFilter
        ? dateInputProps?.style
        : textInputProps?.style),
    },
  } as const;

  const ClearButton = filterValue ? (
    <ActionIcon
      aria-label={localization.clearFilter}
      color="gray"
      onClick={handleClear}
      size="sm"
      title={localization.clearFilter ?? ''}
      variant="transparent"
    >
      <IconX />
    </ActionIcon>
  ) : null;

  console.log(multiSelectProps)

  return filterChipLabel ? (
    <Box style={commonProps.style}>
      <Badge
        size="lg"
        onClick={handleClearEmptyFilterChip}
        className={classes['filter-chip-badge']}
        rightSection={ClearButton}
      >
        {filterChipLabel}
      </Badge>
    </Box>
  ) : isMultiSelectFilter ? (
    <MultiSelect
      {...commonProps}
      searchable
      {...multiSelectProps}
      onChange={(value) => setFilterValue(value)}
      className={clsx(className, multiSelectProps.className)}
      data={filterSelectOptions}
      ref={(node) => {
        if (node) {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            node;
          if (multiSelectProps.ref) {
            multiSelectProps.ref.current = node;
          }
        }
      }}
      style={commonProps.style}
      rightSection={filterValue?.toString()?.length ? ClearButton : undefined}
    />
  ) : isSelectFilter ? (
    <Select
      {...commonProps}
      searchable
      clearable
      {...selectProps}
      className={clsx(className, selectProps.className)}
      data={filterSelectOptions}
      style={commonProps.style}
      ref={(node) => {
        if (node) {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            node;
          if (selectProps.ref) {
            selectProps.ref.current = node;
          }
        }
      }}
    />
  ) : isDateFilter ? (
    <DateInput
      {...commonProps}
      allowDeselect
      clearable
      popoverProps={{ withinPortal: columnFilterDisplayMode !== 'popover' }}
      {...dateInputProps}
      className={clsx(className, dateInputProps.className)}
      ref={(node) => {
        if (node) {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            node;
          if (dateInputProps.ref) {
            dateInputProps.ref.current = node;
          }
        }
      }}
      style={commonProps.style}
    />
  ) : isAutoCompleteFilter ? (
    <Autocomplete
      {...commonProps}
      rightSection={filterValue?.toString()?.length ? ClearButton : undefined}
      onChange={(value) => setFilterValue(value)}
      {...autoCompleteProps}
      className={clsx(className, autoCompleteProps.className)}
      data={filterSelectOptions}
      ref={(node) => {
        if (node) {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            node;
          if (autoCompleteProps.ref) {
            autoCompleteProps.ref.current = node;
          }
        }
      }}
      style={commonProps.style}
    />
  ) : (
    <TextInput
      {...commonProps}
      rightSection={filterValue?.toString()?.length ? ClearButton : undefined}
      onChange={(e) => setFilterValue(e.target.value)}
      {...textInputProps}
      className={clsx(className, textInputProps.className)}
      ref={(node) => {
        if (node) {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            node;
          if (textInputProps.ref) {
            textInputProps.ref.current = node;
          }
        }
      }}
      style={commonProps.style}
    />
  );
};
