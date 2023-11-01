import { type MouseEvent, useEffect, useRef, useState, useMemo } from 'react';
import {
  ActionIcon,
  Autocomplete,
  Box,
  MultiSelect,
  Select,
  TextInput,
  packSx,
  type MantineTheme,
  Badge,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';
import { type MRT_Header, type MRT_TableInstance } from '../types';

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

  const mFilterTextInputProps =
    mantineFilterTextInputProps instanceof Function
      ? mantineFilterTextInputProps({
          column,
          table,
          rangeFilterIndex,
        })
      : mantineFilterTextInputProps;

  const mcFilterTextInputProps =
    columnDef.mantineFilterTextInputProps instanceof Function
      ? columnDef.mantineFilterTextInputProps({
          column,
          table,
          rangeFilterIndex,
        })
      : columnDef.mantineFilterTextInputProps;

  const textInputProps = {
    ...mFilterTextInputProps,
    ...mcFilterTextInputProps,
  };

  const mSelectProps =
    mantineFilterSelectProps instanceof Function
      ? mantineFilterSelectProps({ column, table, rangeFilterIndex })
      : mantineFilterSelectProps;

  const mcSelectProps =
    columnDef.mantineFilterSelectProps instanceof Function
      ? columnDef.mantineFilterSelectProps({ column, table, rangeFilterIndex })
      : columnDef.mantineFilterSelectProps;

  const selectProps = {
    ...mSelectProps,
    ...mcSelectProps,
  };

  const mMultiSelectProps =
    mantineFilterMultiSelectProps instanceof Function
      ? mantineFilterMultiSelectProps({ column, table, rangeFilterIndex })
      : mantineFilterMultiSelectProps;

  const mcMultiSelectProps =
    columnDef.mantineFilterMultiSelectProps instanceof Function
      ? columnDef.mantineFilterMultiSelectProps({
          column,
          table,
          rangeFilterIndex,
        })
      : columnDef.mantineFilterMultiSelectProps;

  const multiSelectProps = {
    ...mMultiSelectProps,
    ...mcMultiSelectProps,
  };

  const mDateInputProps =
    mantineFilterDateInputProps instanceof Function
      ? mantineFilterDateInputProps({ column, table, rangeFilterIndex })
      : mantineFilterDateInputProps;

  const mcDateInputProps =
    columnDef.mantineFilterDateInputProps instanceof Function
      ? columnDef.mantineFilterDateInputProps({
          column,
          table,
          rangeFilterIndex,
        })
      : columnDef.mantineFilterDateInputProps;

  const dateInputProps = {
    ...mDateInputProps,
    ...mcDateInputProps,
  };

  const mAutoCompleteProps =
    mantineFilterAutocompleteProps instanceof Function
      ? mantineFilterAutocompleteProps({ column, table, rangeFilterIndex })
      : mantineFilterAutocompleteProps;

  const mcAutoCompleteProps =
    columnDef.mantineFilterAutocompleteProps instanceof Function
      ? columnDef.mantineFilterAutocompleteProps({
          column,
          table,
          rangeFilterIndex,
        })
      : columnDef.mantineFilterAutocompleteProps;

  const autoCompleteProps = {
    ...mAutoCompleteProps,
    ...mcAutoCompleteProps,
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
    ? //@ts-ignore
      localization[
        `filter${
          currentFilterOption?.charAt?.(0)?.toUpperCase() +
          currentFilterOption?.slice(1)
        }`
      ]
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

  const commonProps = {
    disabled: !!filterChipLabel,
    placeholder: filterPlaceholder,
    'aria-label': filterPlaceholder,
    title: filterPlaceholder,
    onClick: (event: MouseEvent<HTMLInputElement>) => event.stopPropagation(),
    onChange: setFilterValue,
    value: filterValue,
    variant: 'unstyled',
    sx: (theme: MantineTheme) => ({
      borderBottom: `2px solid ${
        theme.colors.gray[theme.colorScheme === 'dark' ? 7 : 3]
      }`,
      minWidth: isDateFilter
        ? '125px'
        : isRangeFilter
        ? '80px'
        : !filterChipLabel
        ? '100px'
        : 'auto',
      width: '100%',
      '& .mantine-TextInput-input': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& .mantine-DateInput-input': {
        height: '2.1rem',
      },
      ...(packSx(
        isMultiSelectFilter
          ? multiSelectProps.sx
          : isSelectFilter
          ? selectProps.sx
          : isDateFilter
          ? dateInputProps.sx
          : textInputProps?.sx,
      ) as any),
    }),
  } as const;

  const ClearButton = filterValue ? (
    <ActionIcon
      aria-label={localization.clearFilter}
      onClick={handleClear}
      size="sm"
      title={localization.clearFilter ?? ''}
    >
      <IconX />
    </ActionIcon>
  ) : null;

  return filterChipLabel ? (
    <Box sx={commonProps.sx}>
      <Badge
        size="lg"
        onClick={handleClearEmptyFilterChip}
        sx={{ margin: '5px' }}
        rightSection={ClearButton}
      >
        {filterChipLabel}
      </Badge>
    </Box>
  ) : isMultiSelectFilter ? (
    <MultiSelect
      {...commonProps}
      clearable
      searchable
      withinPortal
      {...multiSelectProps}
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
      sx={commonProps.sx}
    />
  ) : isSelectFilter ? (
    <Select
      {...commonProps}
      clearable
      searchable
      withinPortal
      {...selectProps}
      data={filterSelectOptions}
      ref={(node) => {
        if (node) {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            node;
          if (selectProps.ref) {
            selectProps.ref.current = node;
          }
        }
      }}
      sx={commonProps.sx}
    />
  ) : isDateFilter ? (
    <DateInput
      {...commonProps}
      allowDeselect
      clearable
      popoverProps={{ withinPortal: columnFilterDisplayMode !== 'popover' }}
      {...dateInputProps}
      ref={(node) => {
        if (node) {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            node;
          if (dateInputProps.ref) {
            dateInputProps.ref.current = node;
          }
        }
      }}
      sx={commonProps.sx}
    />
  ) : isAutoCompleteFilter ? (
    <Autocomplete
      {...commonProps}
      rightSection={filterValue?.toString()?.length ? ClearButton : undefined}
      onChange={(value) => setFilterValue(value)}
      withinPortal
      {...autoCompleteProps}
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
      sx={commonProps.sx}
    />
  ) : (
    <TextInput
      {...commonProps}
      rightSection={filterValue?.toString()?.length ? ClearButton : undefined}
      onChange={(e) => setFilterValue(e.target.value)}
      {...textInputProps}
      ref={(node) => {
        if (node) {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            node;
          if (textInputProps.ref) {
            textInputProps.ref.current = node;
          }
        }
      }}
      sx={commonProps.sx}
    />
  );
};
