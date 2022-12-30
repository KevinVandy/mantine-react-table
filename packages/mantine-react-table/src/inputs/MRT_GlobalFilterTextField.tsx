import React, {
  ChangeEvent,
  // MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Collapse, TextInput } from '@mantine/core';
import { debounce } from '@mui/material/utils';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import { MRT_TableInstance } from '..';

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
      // enableGlobalFilterModes,
      // icons: { IconSearch, IconX },
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  // const handleGlobalFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

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
    <Collapse in={showGlobalFilter}>
      <TextInput
        placeholder={localization.search}
        onChange={handleChange}
        value={searchValue ?? ''}
        variant="default"
        // InputProps={{
        //   startAdornment: enableGlobalFilterModes ? (
        //     <InputAdornment position="start">
        //       <Tooltip withArrow label={localization.changeSearchMode}>
        //         <IconButton
        //           aria-label={localization.changeSearchMode}
        //           onClick={handleGlobalFilterMenuOpen}
        //           size="small"
        //           sx={{ height: '1.75rem', width: '1.75rem' }}
        //         >
        //           <IconSearch />
        //         </IconButton>
        //       </Tooltip>
        //     </InputAdornment>
        //   ) : (
        //     <IconSearch style={{ marginRight: '4px' }} />
        //   ),
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <Tooltip withArrow label={localization.clearSearch ?? ''}>
        //         <span>
        //           <IconButton
        //             aria-label={localization.clearSearch}
        //             disabled={!searchValue?.length}
        //             onClick={handleClear}
        //             size="small"
        //           >
        //             <IconX />
        //           </IconButton>
        //         </span>
        //       </Tooltip>
        //     </InputAdornment>
        //   ),
        // }}
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
      <MRT_FilterOptionMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        table={table}
        onSelect={handleClear}
      />
    </Collapse>
  );
};
