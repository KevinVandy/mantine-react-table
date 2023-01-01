import React, { FC, useState } from 'react';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';

import { MRT_FilterOptionMenu } from './MRT_FilterOptionMenu';
import { MRT_ShowHideColumnsMenu } from './MRT_ShowHideColumnsMenu';
import type { MRT_Header, MRT_TableInstance } from '..';

export const commonListItemStyles = {
  display: 'flex',
  alignItems: 'center',
};

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_ColumnActionMenu: FC<Props> = ({ header, table }) => {
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
        IconBoxMultiple,
        IconCaretRight,
        IconClearAll,
        IconColumns,
        IconDotsVertical,
        IconEyeOff,
        IconFilter,
        IconFilterOff,
        IconPinned,
        IconPinnedOff,
        IconSortAscending,
        IconSortDescending,
      },
      localization,
      muiTableHeadCellColumnActionsButtonProps,
      renderColumnActionsMenuItems,
    },
    refs: { filterInputRefs },
    setShowFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { columnSizing, columnVisibility } = getState();

  const mTableHeadCellColumnActionsButtonProps =
    muiTableHeadCellColumnActionsButtonProps instanceof Function
      ? muiTableHeadCellColumnActionsButtonProps({ column, table })
      : muiTableHeadCellColumnActionsButtonProps;

  const mcTableHeadCellColumnActionsButtonProps =
    columnDef.muiTableHeadCellColumnActionsButtonProps instanceof Function
      ? columnDef.muiTableHeadCellColumnActionsButtonProps({
          column,
          table,
        })
      : columnDef.muiTableHeadCellColumnActionsButtonProps;

  const actionIconProps = {
    ...mTableHeadCellColumnActionsButtonProps,
    ...mcTableHeadCellColumnActionsButtonProps,
  };

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [showHideColumnsMenuAnchorEl, setShowHideColumnsMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleClearSort = () => {
    column.clearSorting();
  };

  const handleSortAsc = () => {
    column.toggleSorting(false);
  };

  const handleSortDesc = () => {
    column.toggleSorting(true);
  };

  const handleResetColumnSize = () => {
    column.resetSize();
  };

  const handleHideColumn = () => {
    column.toggleVisibility(false);
  };

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
  };

  const handleGroupByColumn = () => {
    column.toggleGrouping();
    setColumnOrder((old: any) => ['mrt-row-expand', ...old]);
  };

  const handleClearFilter = () => {
    column.setFilterValue('');
  };

  const handleFilterByColumn = () => {
    setShowFilters(true);
    queueMicrotask(() => filterInputRefs.current[`${column.id}-0`]?.focus());
  };

  const handleShowAllColumns = () => {
    toggleAllColumnsVisible(true);
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
    <Menu closeOnItemClick withinPortal>
      <Tooltip
        withinPortal
        withArrow
        openDelay={1000}
        position="top"
        label={actionIconProps?.title ?? localization.columnActions}
      >
        <Menu.Target>
          <ActionIcon
            aria-label={localization.columnActions}
            size="sm"
            {...actionIconProps}
            sx={(theme) => ({
              opacity: 0.5,
              transition: 'opacity 150ms',
              '&:hover': {
                opacity: 1,
              },
              ...(actionIconProps?.sx instanceof Function
                ? actionIconProps.sx(theme)
                : (actionIconProps?.sx as any)),
            })}
          >
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <Menu.Dropdown>
        {columnDef.renderColumnActionsMenuItems?.({
          column,
          table,
        }) ??
          renderColumnActionsMenuItems?.({
            column,
            table,
          }) ??
          (enableSorting &&
            column.getCanSort() && [
              <Menu.Item
                disabled={!column.getIsSorted()}
                icon={<IconClearAll />}
                key={0}
                onClick={handleClearSort}
              >
                {localization.clearSort}
              </Menu.Item>,
              <Menu.Item
                disabled={column.getIsSorted() === 'asc'}
                icon={<IconSortAscending />}
                key={1}
                onClick={handleSortAsc}
              >
                {localization.sortByColumnAsc?.replace(
                  '{column}',
                  String(columnDef.header),
                )}
              </Menu.Item>,
              <Menu.Item
                icon={<IconSortDescending />}
                key={2}
                disabled={column.getIsSorted() === 'desc'}
                onClick={handleSortDesc}
              >
                {localization.sortByColumnDesc?.replace(
                  '{column}',
                  String(columnDef.header),
                )}
              </Menu.Item>,
              (enableColumnFilters || enableGrouping || enableHiding) && (
                <Menu.Divider key={3} />
              ),
            ])}
        {enableColumnFilters &&
          column.getCanFilter() &&
          [
            <Menu.Item
              disabled={!column.getFilterValue()}
              icon={<IconFilterOff />}
              key={0}
              onClick={handleClearFilter}
            >
              {localization.clearFilter}
            </Menu.Item>,
            <Menu.Item
              icon={<IconFilter />}
              key={1}
              onClick={handleFilterByColumn}
            >
              {localization.filterByColumn?.replace(
                '{column}',
                String(columnDef.header),
              )}
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
            </Menu.Item>,
            enableGrouping || (enableHiding && <Menu.Divider key={2} />),
            showFilterModeSubMenu && (
              <MRT_FilterOptionMenu
                anchorEl={filterMenuAnchorEl}
                header={header}
                key={3}
                onSelect={handleFilterByColumn}
                setAnchorEl={setFilterMenuAnchorEl}
                table={table}
              />
            ),
          ].filter(Boolean)}
        {enableGrouping &&
          column.getCanGroup() && [
            <Menu.Item
              icon={<IconBoxMultiple />}
              key={0}
              onClick={handleGroupByColumn}
            >
              {localization[
                column.getIsGrouped() ? 'ungroupByColumn' : 'groupByColumn'
              ]?.replace('{column}', String(columnDef.header))}
            </Menu.Item>,
            enablePinning && <Menu.Divider key={2} />,
          ]}
        {enablePinning &&
          column.getCanPin() && [
            <Menu.Item
              disabled={column.getIsPinned() === 'left' || !column.getCanPin()}
              icon={<IconPinned style={{ transform: 'rotate(90deg)' }} />}
              key={0}
              onClick={() => handlePinColumn('left')}
            >
              {localization.pinToLeft}
            </Menu.Item>,
            <Menu.Item
              disabled={column.getIsPinned() === 'right' || !column.getCanPin()}
              icon={<IconPinned style={{ transform: 'rotate(-90deg)' }} />}
              key={1}
              onClick={() => handlePinColumn('right')}
            >
              {localization.pinToRight}
            </Menu.Item>,
            <Menu.Item
              disabled={!column.getIsPinned()}
              icon={<IconPinnedOff />}
              key={2}
              onClick={() => handlePinColumn(false)}
            >
              {localization.unpin}
            </Menu.Item>,
            enableHiding && <Menu.Divider key={2} />,
          ]}
        {enableColumnResizing &&
          column.getCanResize() && [
            <Menu.Item
              disabled={!columnSizing[column.id]}
              icon={<IconArrowAutofitContent />}
              key={0}
              onClick={handleResetColumnSize}
            >
              {localization.resetColumnSize}
            </Menu.Item>,
          ]}
        {enableHiding && [
          <Menu.Item
            disabled={!column.getCanHide()}
            icon={<IconEyeOff />}
            key={0}
            onClick={handleHideColumn}
          >
            {localization.hideColumn?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>,
          <Menu.Item
            disabled={
              !Object.values(columnVisibility).filter((visible) => !visible)
                .length
            }
            icon={<IconColumns />}
            key={1}
            onClick={handleShowAllColumns}
            rightSection={
              <ActionIcon
                onClick={handleOpenShowHideColumnsMenu}
                onMouseEnter={handleOpenShowHideColumnsMenu}
                size="sm"
              >
                <IconCaretRight />
              </ActionIcon>
            }
          >
            {localization.showAllColumns?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>,
          <MRT_ShowHideColumnsMenu
            anchorEl={showHideColumnsMenuAnchorEl}
            isSubMenu
            key={2}
            setAnchorEl={setShowHideColumnsMenuAnchorEl}
            table={table}
          />,
        ]}
      </Menu.Dropdown>
    </Menu>
  );
};
