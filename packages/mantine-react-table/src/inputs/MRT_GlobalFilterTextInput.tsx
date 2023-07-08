import { useEffect, useRef, useState } from 'react';
import {
  IconButton,
  Collapse,
  Menu,
  Input,
  Tooltip,
  MenuButton,
  Box,
} from '@chakra-ui/react';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import { type MRT_TableInstance } from '../types';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_GlobalFilterTextInput = <TData extends Record<string, any>>({
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
    <Collapse in={showGlobalFilter}>
      <Box
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
          <>
            <Menu>
              <MenuButton>
                <IconButton
                  aria-label={localization.changeSearchMode}
                  size="sm"
                  icon={<IconSearch />}
                />
              </MenuButton>
              <MRT_FilterOptionMenu table={table} onSelect={handleClear} />
            </Menu>
          </>
        )}
        <Input
          placeholder={localization.search}
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue ?? ''}
          variant="filled"
          icon={!enableGlobalFilterModes && <IconSearch />}
          rightSection={
            <IconButton
              aria-label={localization.clearSearch}
              disabled={!searchValue?.length}
              onClick={handleClear}
              size="sm"
              _disabled={{
                backgroundColor: 'none',
                border: 'none',
              }}
              icon={
                <Tooltip label={localization.clearSearch}>
                  <IconX />
                </Tooltip>
              }
            />
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
      </Box>
    </Collapse>
  );
};
