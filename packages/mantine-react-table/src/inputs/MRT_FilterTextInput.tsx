import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Box,
  Chip,
  MantineTheme,
  MultiSelect,
  packSx,
  Select,
  TextInput,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import type { MRT_Header, MRT_TableInstance } from '..';

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
      manualFiltering,
      mantineFilterTextInputProps,
      mantineFilterSelectProps,
      mantineFilterMultiSelectProps,
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

  const isRangeFilter =
    columnDef.filterVariant === 'range' ||
    columnDef.filterVariant === 'date-range' ||
    rangeFilterIndex !== undefined;
  const isSelectFilter = columnDef.filterVariant === 'select';
  const isMultiSelectFilter = columnDef.filterVariant === 'multi-select';
  const isDateFilter = columnDef.filterVariant === 'date';
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
        ] || []
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
      setFilterValue((tableFilterValue as [string, string])[rangeFilterIndex]);
    } else {
      setFilterValue(tableFilterValue as string);
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
      minWidth: isRangeFilter ? '80px' : !filterChipLabel ? '100px' : 'auto',
      width: '100%',
      ...(packSx(
        isMultiSelectFilter
          ? multiSelectProps.sx
          : isSelectFilter
          ? selectProps.sx
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
      withinPortal
      {...multiSelectProps}
    />
  ) : isSelectFilter ? (
    <Select
      {...commonProps}
      clearable
      data={selectProps.data as any}
      withinPortal
      {...selectProps}
    />
  ) : isDateFilter ? null : (
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
    />
  );
};
