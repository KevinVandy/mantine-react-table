import React, { useEffect, useState } from 'react';
import { ActionIcon, Collapse, Menu, TextInput, Tooltip } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import type { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_GlobalFilterTextField = <
  TData extends Record<string, any> = {},
>({
  table,
}: Props<TData>) => {
  const {
    getState,
    setGlobalFilter,
    options: {
      enableGlobalFilterModes,
      icons: { IconSearch, IconX },
      localization,
      manualFiltering,
      muiSearchTextFieldProps,
    },
    refs: { searchInputRef },
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const textFieldProps =
    muiSearchTextFieldProps instanceof Function
      ? muiSearchTextFieldProps({ table })
      : muiSearchTextFieldProps;

  const [searchValue, setSearchValue] = useState(globalFilter ?? '');

  const [debouncedSearchValue] = useDebouncedValue(
    searchValue,
    manualFiltering ? 500 : 250,
  );

  useEffect(() => {
    setGlobalFilter(debouncedSearchValue || undefined);
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (globalFilter === undefined) {
      handleClear();
    }
  }, [globalFilter]);

  const handleClear = () => {
    setSearchValue('');
    setGlobalFilter(undefined);
  };

  return (
    <Collapse in={showGlobalFilter} sx={{ '& > div': { display: 'flex' } }}>
      {enableGlobalFilterModes && (
        <Menu withinPortal>
          <Menu.Target>
            <ActionIcon aria-label={localization.changeSearchMode} size="sm">
              <IconSearch />
            </ActionIcon>
          </Menu.Target>
          <MRT_FilterOptionMenu table={table} onSelect={handleClear} />
        </Menu>
      )}
      <TextInput
        placeholder={localization.search}
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue ?? ''}
        variant="filled"
        icon={!enableGlobalFilterModes && <IconSearch />}
        rightSection={
          <Tooltip
            withinPortal
            withArrow
            label={localization.clearSearch ?? ''}
          >
            <ActionIcon
              aria-label={localization.clearSearch}
              disabled={!searchValue?.length}
              onClick={handleClear}
              size="sm"
              sx={{
                '&:disabled': {
                  backgroundColor: 'transparent',
                  border: 'none',
                },
              }}
            >
              <IconX />
            </ActionIcon>
          </Tooltip>
        }
        {...textFieldProps}
        ref={(node) => {
          if (node) {
            searchInputRef.current = node;
            if (textFieldProps?.ref) {
              // @ts-ignore
              textFieldProps.ref = node;
            }
          }
        }}
      />
    </Collapse>
  );
};
