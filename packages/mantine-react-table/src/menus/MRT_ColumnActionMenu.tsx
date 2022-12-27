import React, { FC, useState } from 'react';
import { ActionIcon, Box } from '@mantine/core';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MRT_FilterOptionMenu } from './MRT_FilterOptionMenu';
import { MRT_ShowHideColumnsMenu } from './MRT_ShowHideColumnsMenu';
import type { MRT_Header, MRT_TableInstance } from '..';

export const commonMenuItemStyles = {
  py: '6px',
  my: 0,
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const commonListItemStyles = {
  display: 'flex',
  alignItems: 'center',
};

interface Props {
  anchorEl: HTMLElement | null;
  header: MRT_Header;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  table: MRT_TableInstance;
}

export const MRT_ColumnActionMenu: FC<Props> = ({
  anchorEl,
  header,
  setAnchorEl,
  table,
}) => {
  const {
    getState,
    toggleAllColumnsVisible,
    setColumnOrder,
    options: {
      columnFilterModeOptions,
      enableColumnFilterModes,
      enableColumnFilters,
      enableColumnResizing,
      enableGrouping,
      enableHiding,
      enablePinning,
      enableSorting,
      icons: {
        IconArrowAutofitContent,
        IconSortAscending,
        IconSortDescending,
        IconBoxMultiple,
        IconCaretRight,
        IconClearAll,
        IconColumns,
        IconEyeOff,
        IconFilter,
        IconFilterOff,
        IconPinned,
        IconPinnedOff,
      },
      localization,
      renderColumnActionsMenuItems,
    },
    refs: { filterInputRefs },
    setShowFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { columnSizing, columnVisibility, density } = getState();

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [showHideColumnsMenuAnchorEl, setShowHideColumnsMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleClearSort = () => {
    column.clearSorting();
    setAnchorEl(null);
  };

  const handleSortAsc = () => {
    column.toggleSorting(false);
    setAnchorEl(null);
  };

  const handleSortDesc = () => {
    column.toggleSorting(true);
    setAnchorEl(null);
  };

  const handleResetColumnSize = () => {
    column.resetSize();
    setAnchorEl(null);
  };

  const handleHideColumn = () => {
    column.toggleVisibility(false);
    setAnchorEl(null);
  };

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
    setAnchorEl(null);
  };

  const handleGroupByColumn = () => {
    column.toggleGrouping();
    setColumnOrder((old: any) => ['mrt-row-expand', ...old]);
    setAnchorEl(null);
  };

  const handleClearFilter = () => {
    column.setFilterValue('');
    setAnchorEl(null);
  };

  const handleFilterByColumn = () => {
    setShowFilters(true);
    queueMicrotask(() => filterInputRefs.current[`${column.id}-0`]?.focus());
    setAnchorEl(null);
  };

  const handleShowAllColumns = () => {
    toggleAllColumnsVisible(true);
    setAnchorEl(null);
  };

  const handleOpenFilterModeMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleOpenShowHideColumnsMenu = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    event.stopPropagation();
    setShowHideColumnsMenuAnchorEl(event.currentTarget);
  };

  const isSelectFilter = !!columnDef.filterSelectOptions;

  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;

  const showFilterModeSubMenu =
    enableColumnFilterModes &&
    columnDef.enableColumnFilterModes !== false &&
    !isSelectFilter &&
    (allowedColumnFilterOptions === undefined ||
      !!allowedColumnFilterOptions?.length);

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: density === 'compact',
      }}
    >
      {columnDef.renderColumnActionsMenuItems?.({
        closeMenu: () => setAnchorEl(null),
        column,
        table,
      }) ??
        renderColumnActionsMenuItems?.({
          closeMenu: () => setAnchorEl(null),
          column,
          table,
        }) ??
        (enableSorting &&
          column.getCanSort() && [
            <MenuItem
              disabled={!column.getIsSorted()}
              key={0}
              onClick={handleClearSort}
              sx={commonMenuItemStyles}
            >
              <Box sx={commonListItemStyles}>
                <ListItemIcon>
                  <IconClearAll />
                </ListItemIcon>
                {localization.clearSort}
              </Box>
            </MenuItem>,
            <MenuItem
              disabled={column.getIsSorted() === 'asc'}
              key={1}
              onClick={handleSortAsc}
              sx={commonMenuItemStyles}
            >
              <Box sx={commonListItemStyles}>
                <ListItemIcon>
                  <IconSortAscending />
                </ListItemIcon>
                {localization.sortByColumnAsc?.replace(
                  '{column}',
                  String(columnDef.header),
                )}
              </Box>
            </MenuItem>,
            <MenuItem
              divider={enableColumnFilters || enableGrouping || enableHiding}
              key={2}
              disabled={column.getIsSorted() === 'desc'}
              onClick={handleSortDesc}
              sx={commonMenuItemStyles}
            >
              <Box sx={commonListItemStyles}>
                <ListItemIcon>
                  <IconSortDescending />
                </ListItemIcon>
                {localization.sortByColumnDesc?.replace(
                  '{column}',
                  String(columnDef.header),
                )}
              </Box>
            </MenuItem>,
          ])}
      {enableColumnFilters &&
        column.getCanFilter() &&
        [
          <MenuItem
            disabled={!column.getFilterValue()}
            key={0}
            onClick={handleClearFilter}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <IconFilterOff />
              </ListItemIcon>
              {localization.clearFilter}
            </Box>
          </MenuItem>,
          <MenuItem
            divider={enableGrouping || enableHiding}
            key={1}
            onClick={handleFilterByColumn}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <IconFilter />
              </ListItemIcon>
              {localization.filterByColumn?.replace(
                '{column}',
                String(columnDef.header),
              )}
            </Box>
            {showFilterModeSubMenu && (
              <ActionIcon
                onClick={handleOpenFilterModeMenu}
                onMouseEnter={handleOpenFilterModeMenu}
                size="sm"
                sx={{ p: 0 }}
              >
                <IconCaretRight />
              </ActionIcon>
            )}
          </MenuItem>,
          showFilterModeSubMenu && (
            <MRT_FilterOptionMenu
              anchorEl={filterMenuAnchorEl}
              header={header}
              key={2}
              onSelect={handleFilterByColumn}
              setAnchorEl={setFilterMenuAnchorEl}
              table={table}
            />
          ),
        ].filter(Boolean)}
      {enableGrouping &&
        column.getCanGroup() && [
          <MenuItem
            divider={enablePinning}
            key={0}
            onClick={handleGroupByColumn}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <IconBoxMultiple />
              </ListItemIcon>
              {localization[
                column.getIsGrouped() ? 'ungroupByColumn' : 'groupByColumn'
              ]?.replace('{column}', String(columnDef.header))}
            </Box>
          </MenuItem>,
        ]}
      {enablePinning &&
        column.getCanPin() && [
          <MenuItem
            disabled={column.getIsPinned() === 'left' || !column.getCanPin()}
            key={0}
            onClick={() => handlePinColumn('left')}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <IconPinned style={{ transform: 'rotate(90deg)' }} />
              </ListItemIcon>
              {localization.pinToLeft}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={column.getIsPinned() === 'right' || !column.getCanPin()}
            key={1}
            onClick={() => handlePinColumn('right')}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <IconPinned style={{ transform: 'rotate(-90deg)' }} />
              </ListItemIcon>
              {localization.pinToRight}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={!column.getIsPinned()}
            divider={enableHiding}
            key={2}
            onClick={() => handlePinColumn(false)}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <IconPinnedOff />
              </ListItemIcon>
              {localization.unpin}
            </Box>
          </MenuItem>,
        ]}
      {enableColumnResizing &&
        column.getCanResize() && [
          <MenuItem
            disabled={!columnSizing[column.id]}
            key={0}
            onClick={handleResetColumnSize}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <IconArrowAutofitContent />
              </ListItemIcon>
              {localization.resetColumnSize}
            </Box>
          </MenuItem>,
        ]}
      {enableHiding && [
        <MenuItem
          disabled={!column.getCanHide()}
          key={0}
          onClick={handleHideColumn}
          sx={commonMenuItemStyles}
        >
          <Box sx={commonListItemStyles}>
            <ListItemIcon>
              <IconEyeOff />
            </ListItemIcon>
            {localization.hideColumn?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Box>
        </MenuItem>,
        <MenuItem
          disabled={
            !Object.values(columnVisibility).filter((visible) => !visible)
              .length
          }
          key={1}
          onClick={handleShowAllColumns}
          sx={commonMenuItemStyles}
        >
          <Box sx={commonListItemStyles}>
            <ListItemIcon>
              <IconColumns />
            </ListItemIcon>
            {localization.showAllColumns?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Box>
          <ActionIcon
            onClick={handleOpenShowHideColumnsMenu}
            onMouseEnter={handleOpenShowHideColumnsMenu}
            size="sm"
            sx={{ p: 0 }}
          >
            <IconCaretRight />
          </ActionIcon>
        </MenuItem>,
        <MRT_ShowHideColumnsMenu
          anchorEl={showHideColumnsMenuAnchorEl}
          isSubMenu
          key={2}
          setAnchorEl={setShowHideColumnsMenuAnchorEl}
          table={table}
        />,
      ]}
    </Menu>
  );
};
