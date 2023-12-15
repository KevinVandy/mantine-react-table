import { ActionIcon, Menu, Tooltip } from '@mantine/core';

import {
  type MRT_RowData,
  type MRT_Header,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_ColumnActionMenu.module.css';

interface Props<TData extends MRT_RowData> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ColumnActionMenu = <TData extends MRT_RowData>({
  header,
  table,
}: Props<TData>) => {
  const {
    getState,
    toggleAllColumnsVisible,
    setColumnOrder,
    options: {
      columnFilterDisplayMode,
      enableColumnFilters,
      enableColumnResizing,
      enableGrouping,
      enableHiding,
      enableColumnPinning,
      enableSorting,
      enableSortingRemoval,
      icons: {
        IconArrowAutofitContent,
        IconBoxMultiple,
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
      mantineColumnActionsButtonProps,
      renderColumnActionsMenuItems,
    },
    refs: { filterInputRefs },
    setColumnSizingInfo,
    setShowColumnFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { columnSizing, columnVisibility } = getState();

  const arg = { column, table };
  const actionIconProps = {
    ...parseFromValuesOrFunc(mantineColumnActionsButtonProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineColumnActionsButtonProps, arg),
  };

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
    setColumnSizingInfo((old) => ({ ...old, isResizingColumn: false }));
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
    setShowColumnFilters(true);
    setTimeout(() => filterInputRefs.current[`${column.id}-0`]?.focus(), 100);
  };

  const handleShowAllColumns = () => {
    toggleAllColumnsVisible(true);
  };

  const internalColumnMenuItems = (
    <>
      {enableSorting && column.getCanSort() && (
        <>
          {enableSortingRemoval !== false && (
            <Menu.Item
              disabled={!column.getIsSorted()}
              leftSection={<IconClearAll />}
              onClick={handleClearSort}
            >
              {localization.clearSort}
            </Menu.Item>
          )}
          <Menu.Item
            disabled={column.getIsSorted() === 'asc'}
            leftSection={<IconSortAscending />}
            onClick={handleSortAsc}
          >
            {localization.sortByColumnAsc?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>
          <Menu.Item
            leftSection={<IconSortDescending />}
            disabled={column.getIsSorted() === 'desc'}
            onClick={handleSortDesc}
          >
            {localization.sortByColumnDesc?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>
          {(enableColumnFilters || enableGrouping || enableHiding) && (
            <Menu.Divider key={3} />
          )}
        </>
      )}
      {enableColumnFilters &&
        columnFilterDisplayMode !== 'popover' &&
        column.getCanFilter() && (
          <>
            <Menu.Item
              disabled={!column.getFilterValue()}
              leftSection={<IconFilterOff />}
              onClick={handleClearFilter}
            >
              {localization.clearFilter}
            </Menu.Item>
            <Menu.Item
              leftSection={<IconFilter />}
              onClick={handleFilterByColumn}
            >
              {localization.filterByColumn?.replace(
                '{column}',
                String(columnDef.header),
              )}
            </Menu.Item>
            {(enableGrouping || enableHiding) && <Menu.Divider key={2} />}
          </>
        )}
      {enableGrouping && column.getCanGroup() && (
        <>
          <Menu.Item
            leftSection={<IconBoxMultiple />}
            onClick={handleGroupByColumn}
          >
            {localization[
              column.getIsGrouped() ? 'ungroupByColumn' : 'groupByColumn'
            ]?.replace('{column}', String(columnDef.header))}
          </Menu.Item>
          {enableColumnPinning && <Menu.Divider />}
        </>
      )}
      {enableColumnPinning && column.getCanPin() && (
        <>
          <Menu.Item
            disabled={column.getIsPinned() === 'left' || !column.getCanPin()}
            leftSection={<IconPinned className={classes.left} />}
            onClick={() => handlePinColumn('left')}
          >
            {localization.pinToLeft}
          </Menu.Item>
          <Menu.Item
            disabled={column.getIsPinned() === 'right' || !column.getCanPin()}
            leftSection={<IconPinned className={classes.right} />}
            onClick={() => handlePinColumn('right')}
          >
            {localization.pinToRight}
          </Menu.Item>
          <Menu.Item
            disabled={!column.getIsPinned()}
            leftSection={<IconPinnedOff />}
            onClick={() => handlePinColumn(false)}
          >
            {localization.unpin}
          </Menu.Item>
          {enableHiding && <Menu.Divider />}
        </>
      )}
      {enableColumnResizing && column.getCanResize() && (
        <Menu.Item
          disabled={!columnSizing[column.id]}
          leftSection={<IconArrowAutofitContent />}
          key={0}
          onClick={handleResetColumnSize}
        >
          {localization.resetColumnSize}
        </Menu.Item>
      )}
      {enableHiding && (
        <>
          <Menu.Item
            disabled={!column.getCanHide()}
            leftSection={<IconEyeOff />}
            key={0}
            onClick={handleHideColumn}
          >
            {localization.hideColumn?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>
          <Menu.Item
            disabled={
              !Object.values(columnVisibility).filter((visible) => !visible)
                .length
            }
            leftSection={<IconColumns />}
            key={1}
            onClick={handleShowAllColumns}
          >
            {localization.showAllColumns?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>
        </>
      )}
    </>
  );

  return (
    <Menu closeOnItemClick withinPortal position="bottom-start">
      <Tooltip
        withinPortal
        openDelay={1000}
        label={actionIconProps?.title ?? localization.columnActions}
      >
        <Menu.Target>
          <ActionIcon
            aria-label={localization.columnActions}
            {...actionIconProps}
            size="sm"
            color="gray"
            variant="subtle"
          >
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <Menu.Dropdown>
        {columnDef.renderColumnActionsMenuItems?.({
          column,
          table,
          internalColumnMenuItems,
        }) ??
          renderColumnActionsMenuItems?.({
            column,
            table,
            internalColumnMenuItems,
          }) ??
          internalColumnMenuItems}
      </Menu.Dropdown>
    </Menu>
  );
};
