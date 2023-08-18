import { useEffect, useRef, useState } from 'react';
import { ActionIcon, Collapse, Menu, TextInput, Tooltip } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_GlobalFilterTextInput = <
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
      mantineSearchTextInputProps,
    },
    refs: { searchInputRef },
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const textFieldProps =
    mantineSearchTextInputProps instanceof Function
      ? mantineSearchTextInputProps({ table })
      : mantineSearchTextInputProps;

  const isMounted = useRef(false);
  const [searchValue, setSearchValue] = useState(globalFilter ?? '');

  const [debouncedSearchValue] = useDebouncedValue(
    searchValue,
    manualFiltering ? 500 : 250,
  );

  useEffect(() => {
    setGlobalFilter(debouncedSearchValue || undefined);
  }, [debouncedSearchValue]);

  const handleClear = () => {
    setSearchValue('');
    setGlobalFilter(undefined);
  };

  useEffect(() => {
    if (isMounted.current) {
      if (globalFilter === undefined) {
        handleClear();
      } else {
        setSearchValue(globalFilter);
      }
    }
    isMounted.current = true;
  }, [globalFilter]);

  return (
    <Collapse
      in={showGlobalFilter}
      sx={{
        '& > div': {
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'nowrap',
        },
      }}
    >
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
          searchValue ? (
            <ActionIcon
              aria-label={localization.clearSearch}
              disabled={!searchValue?.length}
              onClick={handleClear}
              size="sm"
            >
              <Tooltip withinPortal label={localization.clearSearch}>
                <IconX />
              </Tooltip>
            </ActionIcon>
          ) : null
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
        sx={(theme) => ({
          minWidth: '250px',
          ...(textFieldProps?.sx instanceof Function
            ? textFieldProps.sx(theme)
            : (textFieldProps?.sx as any)),
        })}
      />
    </Collapse>
  );
};
