import { type MouseEvent, useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Box,
  Chip,
  MultiSelect,
  Select,
  TextInput,
  packSx,
  type MantineTheme,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props {
  header: MRT_Header;
  rangeFilterIndex?: number;
  table: MRT_TableInstance;
}

export const MRT_FilterTextInput = ({
  header,
  rangeFilterIndex,
  table,
}: Props) => {
  const {
    options: {
      columnFilterModeOptions,
      icons: { IconX },
      localization,
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

  const isRangeFilter =
    columnDef.filterVariant === 'range' ||
    columnDef.filterVariant === 'date-range' ||
    rangeFilterIndex !== undefined;
  const isSelectFilter = columnDef.filterVariant === 'select';
  const isMultiSelectFilter = columnDef.filterVariant === 'multi-select';
  const isDateFilter =
    columnDef.filterVariant === 'date' ||
    columnDef.filterVariant === 'date-range';
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

  //send deboundedFilterValue to table instance
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
        const newFilterValues = old ?? ['', ''];
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

  return filterChipLabel ? (
    <Box sx={commonProps.sx}>
      <Chip onClick={handleClearEmptyFilterChip} sx={{ margin: '4px' }}>
        {filterChipLabel}{' '}
        <IconX size="12pt" style={{ transform: 'translate(6px, 3px)' }} />
      </Chip>
    </Box>
  ) : isMultiSelectFilter ? (
    <MultiSelect
      {...commonProps}
      data={multiSelectProps.data as any}
      searchable
      withinPortal
      {...multiSelectProps}
      sx={commonProps.sx}
    />
  ) : isSelectFilter ? (
    <Select
      {...commonProps}
      clearable
      data={selectProps.data as any}
      searchable
      withinPortal
      {...selectProps}
      sx={commonProps.sx}
    />
  ) : isDateFilter ? (
    <DateInput
      {...commonProps}
      allowDeselect
      clearable
      popoverProps={{ withinPortal: true }}
      {...dateInputProps}
      sx={commonProps.sx}
    />
  ) : (
    <TextInput
      {...commonProps}
      rightSection={
        !filterChipLabel && filterValue?.toString()?.length ? (
          <ActionIcon
            aria-label={localization.clearFilter}
            onClick={handleClear}
            size="sm"
            sx={{
              '&:disabled': {
                backgroundColor: 'transparent',
                border: 'none',
              },
            }}
            title={localization.clearFilter ?? ''}
          >
            <IconX />
          </ActionIcon>
        ) : null
      }
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
