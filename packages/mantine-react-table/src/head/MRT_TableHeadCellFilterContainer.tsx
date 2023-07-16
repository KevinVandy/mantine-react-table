import { ActionIcon, Collapse, Flex, Menu, Text, Tooltip } from '@mantine/core';
import { MRT_FilterRangeFields } from '../inputs/MRT_FilterRangeFields';
import { MRT_FilterTextInput } from '../inputs/MRT_FilterTextInput';
import { MRT_FilterCheckbox } from '../inputs/MRT_FilterCheckbox';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import { MRT_FilterRangeSlider } from '../inputs/MRT_FilterRangeSlider';

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterContainer = <
  TData extends Record<string, any> = {},
>({
  header,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      columnFilterDisplayMode,
      enableColumnFilterModes,
      columnFilterModeOptions,
      icons: { IconFilterCog },
      localization,
    },
    refs: { filterInputRefs },
  } = table;
  const { showColumnFilters } = getState();
  const { column } = header;
  const { columnDef } = column;

  const currentFilterOption = columnDef._filterFn;
  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;
  const showChangeModeButton =
    enableColumnFilterModes &&
    columnDef.enableColumnFilterModes !== false &&
    (allowedColumnFilterOptions === undefined ||
      !!allowedColumnFilterOptions?.length);

  return (
    <Collapse in={showColumnFilters || columnFilterDisplayMode === 'popover'}>
      <Flex direction="column">
        <Flex align="flex-end">
          {columnDef.filterVariant === 'checkbox' ? (
            <MRT_FilterCheckbox column={column} table={table} />
          ) : columnDef.filterVariant === 'range-slider' ? (
            <MRT_FilterRangeSlider header={header} table={table} />
          ) : ['range', 'date-range'].includes(columnDef.filterVariant ?? '') ||
            ['between', 'betweenInclusive', 'inNumberRange'].includes(
              columnDef._filterFn,
            ) ? (
            <MRT_FilterRangeFields header={header} table={table} />
          ) : (
            <MRT_FilterTextInput header={header} table={table} />
          )}
          {showChangeModeButton && (
            <Menu withinPortal={columnFilterDisplayMode !== 'popover'}>
              <Tooltip
                label={localization.changeFilterMode}
                position="bottom-start"
                withinPortal
              >
                <Menu.Target>
                  <ActionIcon
                    aria-label={localization.changeFilterMode}
                    size="md"
                    sx={{ transform: 'translateY(-2px)' }}
                  >
                    <IconFilterCog />
                  </ActionIcon>
                </Menu.Target>
              </Tooltip>
              <MRT_FilterOptionMenu
                header={header}
                table={table}
                onSelect={() =>
                  setTimeout(
                    () => filterInputRefs.current[`${column.id}-0`]?.focus(),
                    100,
                  )
                }
              />
            </Menu>
          )}
        </Flex>
        {showChangeModeButton ? (
          <Text
            component="label"
            color="dimmed"
            sx={{ whiteSpace: 'nowrap', marginTop: '4px', fontSize: '10px' }}
          >
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
    </Collapse>
  );
};
