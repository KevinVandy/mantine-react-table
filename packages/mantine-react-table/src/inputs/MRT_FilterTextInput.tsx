import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActionIcon,
  Flex,
  Menu,
  MultiSelect,
  Select,
  SelectItem,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  rangeFilterIndex?: number;
  table: MRT_TableInstance;
}

export const MRT_FilterTextInput: FC<Props> = ({
  header,
  rangeFilterIndex,
  table,
}) => {
  const {
    options: {
      enableColumnFilterModes,
      columnFilterModeOptions,
      icons: { IconFilter, IconX },
      localization,
      manualFiltering,
      mantineFilterTextInputProps,
      mantineFilterSelectProps,
      mantineFilterMultiSelectProps,
    },
    refs: { filterInputRefs },
    // setColumnFilterFns,
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

  const textFieldProps = {
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
    columnDef.filterVariant === 'range' || rangeFilterIndex !== undefined;
  const isSelectFilter = columnDef.filterVariant === 'select';
  const isMultiSelectFilter = columnDef.filterVariant === 'multi-select';

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
    ? textFieldProps?.placeholder ??
      localization.filterByColumn?.replace('{column}', String(columnDef.header))
    : rangeFilterIndex === 0
    ? localization.min
    : rangeFilterIndex === 1
    ? localization.max
    : '';
  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;
  const showChangeModeButton =
    enableColumnFilterModes &&
    columnDef.enableColumnFilterModes !== false &&
    !rangeFilterIndex &&
    (allowedColumnFilterOptions === undefined ||
      !!allowedColumnFilterOptions?.length);

  const isMounted = useRef(false);

  const [filterValue, setFilterValue] = useState<
    string | number | Date | null | string[]
  >(() =>
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
        const newFilterValues = old ?? ['', ''];
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
    if (isMounted.current) {
      const tableFilterValue = column.getFilterValue();
      if (tableFilterValue === undefined) {
        handleClear();
      } else if (isRangeFilter && rangeFilterIndex !== undefined) {
        setFilterValue(
          (tableFilterValue as [string, string])[rangeFilterIndex],
        );
      } else {
        setFilterValue(tableFilterValue as string);
      }
    }
    isMounted.current = true;
  }, [column.getFilterValue()]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(
      textFieldProps.type === 'date'
        ? event.target.valueAsDate
        : textFieldProps.type === 'number'
        ? event.target.valueAsNumber
        : event.target.value,
    );
  };

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

  const props = {
    disabled: !!filterChipLabel,
    placeholder: filterPlaceholder,
    title: filterPlaceholder,
    onClick: (event: MouseEvent<HTMLInputElement>) => event.stopPropagation(),
  };

  return (
    <Flex direction="column" sx={{overflow: 'visible'}}>
      <Flex align="flex-end">
        {showChangeModeButton && (
          <Menu withinPortal>
            <Tooltip
              label={localization.changeFilterMode}
              position="bottom-start"
              withArrow
              withinPortal
            >
              <Menu.Target>
                <ActionIcon
                  aria-label={localization.changeFilterMode}
                  size="md"
                  sx={{ transform: 'translateY(-2px)' }}
                >
                  <IconFilter />
                </ActionIcon>
              </Menu.Target>
            </Tooltip>
            <MRT_FilterOptionMenu
              header={header}
              table={table}
              setFilterValue={setFilterValue}
            />
          </Menu>
        )}
        {isMultiSelectFilter ? (
          <MultiSelect
            {...props}
            clearable
            data={multiSelectProps.data as SelectItem[]}
            onChange={setFilterValue}
            value={filterValue as string[]}
            variant="unstyled"
            withinPortal
            {...multiSelectProps}
          />
        ) : isSelectFilter ? (
          <Select
            {...props}
            clearable
            data={selectProps.data as SelectItem[]}
            onChange={setFilterValue}
            value={filterValue as any}
            variant="unstyled"
            withinPortal
            {...selectProps}
            sx={(theme) => ({
              borderBottom: `2px solid ${
                theme.colors.gray[theme.colorScheme === 'dark' ? 7 : 3]
              }`,
              minWidth: isRangeFilter
                ? '100px'
                : !filterChipLabel
                ? '120px'
                : 'auto',
              width: 'calc(100% + 4px)',
              ...(selectProps?.sx instanceof Function
                ? selectProps.sx(theme)
                : (selectProps?.sx as any)),
            })}
          />
        ) : (
          <TextInput
            {...props}
            variant="unstyled"
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
            onChange={handleChange}
            value={filterValue?.toString() ?? ''}
            {...textFieldProps}
            ref={(node) => {
              if (node) {
                filterInputRefs.current[
                  `${column.id}-${rangeFilterIndex ?? 0}`
                ] = node;
                if (textFieldProps.ref) {
                  textFieldProps.ref.current = node;
                }
              }
            }}
            sx={(theme) => ({
              borderBottom: `2px solid ${
                theme.colors.gray[theme.colorScheme === 'dark' ? 7 : 3]
              }`,
              minWidth: isRangeFilter
                ? '100px'
                : !filterChipLabel
                ? '120px'
                : 'auto',
              width: 'calc(100% + 4px)',
              ...(textFieldProps?.sx instanceof Function
                ? textFieldProps.sx(theme)
                : (textFieldProps?.sx as any)),
            })}
          />
        )}
      </Flex>
      {showChangeModeButton ? (
        <Text component="label" color="dimmed" size="xs" pl="1.6rem" sx={{whiteSpace: 'nowrap', marginTop: '4px'}}>
          {localization.filterMode.replace(
            '{filterType}',
            // @ts-ignore
            localization[
              `filter${
                currentFilterOption?.charAt(0)?.toUpperCase() +
                currentFilterOption?.slice(1)
              }`
            ],
          )}
        </Text>
      ) : null}
    </Flex>
  );
};
