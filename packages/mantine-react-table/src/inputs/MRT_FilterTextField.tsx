import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ActionIcon, Flex, Menu, TextInput, Tooltip } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  rangeFilterIndex?: number;
  table: MRT_TableInstance;
}

export const MRT_FilterTextField: FC<Props> = ({
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
    },
    refs: { filterInputRefs },
    // setColumnFilterFns,
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const mTableHeadCellFilterTextInputProps =
    mantineFilterTextInputProps instanceof Function
      ? mantineFilterTextInputProps({
          column,
          table,
          rangeFilterIndex,
        })
      : mantineFilterTextInputProps;

  const mcTableHeadCellFilterTextInputProps =
    columnDef.mantineFilterTextInputProps instanceof Function
      ? columnDef.mantineFilterTextInputProps({
          column,
          table,
          rangeFilterIndex,
        })
      : columnDef.mantineFilterTextInputProps;

  const textFieldProps = {
    ...mTableHeadCellFilterTextInputProps,
    ...mcTableHeadCellFilterTextInputProps,
  };

  const isRangeFilter =
    columnDef.filterVariant === 'range' || rangeFilterIndex !== undefined;
  const isSelectFilter = columnDef.filterVariant === 'select';
  const isMultiSelectFilter = columnDef.filterVariant === 'multi-select';
  // const isTextboxFilter =
  //   columnDef.filterVariant === 'text' ||
  //   (!isSelectFilter && !isMultiSelectFilter);
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

  // const handleClearEmptyFilterChip = () => {
  //   setFilterValue('');
  //   column.setFilterValue(undefined);
  //   setColumnFilterFns((prev) => ({
  //     ...prev,
  //     [header.id]: 'fuzzy',
  //   }));
  // };

  if (columnDef.Filter) {
    return (
      <>{columnDef.Filter?.({ column, header, rangeFilterIndex, table })}</>
    );
  }

  return (
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
                size="sm"
                sx={{ height: '1.75rem', width: '1.75rem' }}
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
      <TextInput
        disabled={!!filterChipLabel}
        title={filterPlaceholder}
        // helperText={
        //   showChangeModeButton ? (
        //     <label>
        //       {localization.filterMode.replace(
        //         '{filterType}',
        //         // @ts-ignore
        //         localization[
        //           `filter${
        //             currentFilterOption?.charAt(0)?.toUpperCase() +
        //             currentFilterOption?.slice(1)
        //           }`
        //         ],
        //       )}
        //     </label>
        //   ) : null
        // }
        // FormHelperTextProps={{
        //   sx: {
        //     fontSize: '12px',
        //     lineHeight: '0.8rem',
        //     whiteSpace: 'nowrap',
        //   },
        // }}
        placeholder={
          filterChipLabel || isSelectFilter || isMultiSelectFilter
            ? undefined
            : filterPlaceholder
        }
        onChange={handleChange}
        onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
        // select={isSelectFilter || isMultiSelectFilter}
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
        value={filterValue?.toString()}
        variant="unstyled"
        icon={
          // filterChipLabel ? (
          //   <Chip
          //     onDelete={handleClearEmptyFilterChip}
          //     label={filterChipLabel}
          //   />
          // ) :
          null
        }
        // SelectProps={{
        //   displayEmpty: true,
        //   multiple: isMultiSelectFilter,
        //   renderValue: isMultiSelectFilter
        //     ? (selected: any) =>
        //         !selected?.length ? (
        //           <Box sx={{ opacity: 0.5 }}>{filterPlaceholder}</Box>
        //         ) : (
        //           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
        //             {(selected as string[])?.map((value) => {
        //               const selectedValue = columnDef.filterSelectOptions?.find(
        //                 (option) =>
        //                   option instanceof Object
        //                     ? option.value === value
        //                     : option === value,
        //               );
        //               return (
        //                 <Chip
        //                   key={value}
        //                   label={
        //                     selectedValue instanceof Object
        //                       ? selectedValue.text
        //                       : selectedValue
        //                   }
        //                 />
        //               );
        //             })}
        //           </Box>
        //         )
        //     : undefined,
        // }}
        {...textFieldProps}
        ref={(node) => {
          if (node) {
            filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
              node;
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
      {/* {(isSelectFilter || isMultiSelectFilter) && (
          <MenuItem divider disabled hidden value="">
            <Box sx={{ opacity: 0.5 }}>{filterPlaceholder}</Box>
          </MenuItem>
        )} */}
      {/* {columnDef?.filterSelectOptions?.map(
          (option: string | { text: string; value: string }) => {
            let value: string;
            let text: string;
            if (typeof option !== 'object') {
              value = option;
              text = option;
            } else {
              value = option.value;
              text = option.text;
            }
            return (
              <MenuItem
                key={value}
                sx={{
                  display: 'flex',
                  m: 0,
                  alignItems: 'center',
                  gap: '8px',
                }}
                value={value}
              >
                {isMultiSelectFilter && (
                  <Checkbox
                    checked={(
                      (column.getFilterValue() ?? []) as string[]
                    ).includes(value)}
                    sx={{ mr: '8px' }}
                  />
                )}
                {text}
              </MenuItem>
            );
          },
        )} */}
    </Flex>
  );
};
