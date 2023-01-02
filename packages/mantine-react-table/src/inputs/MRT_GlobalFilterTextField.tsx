import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ActionIcon, Collapse, Menu, TextInput, Tooltip } from '@mantine/core';
import { debounce } from '@mui/material/utils';
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

  const handleChangeDebounced = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(event.target.value ?? undefined);
      },
      manualFiltering ? 500 : 250,
    ),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleChangeDebounced(event);
  };

  const handleClear = () => {
    setSearchValue('');
    setGlobalFilter(undefined);
  };

  useEffect(() => {
    if (globalFilter === undefined) {
      handleClear();
    }
  }, [globalFilter]);

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
        onChange={handleChange}
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
