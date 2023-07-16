import { Checkbox, type CheckboxProps, Tooltip } from '@mantine/core';
import { type MRT_Column, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  column: MRT_Column<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterCheckbox = <TData extends Record<string, any> = {}>({
  column,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { localization, mantineFilterCheckboxProps },
  } = table;
  const { density } = getState();
  const { columnDef } = column;

  const mTableHeadCellFilterCheckboxProps =
    mantineFilterCheckboxProps instanceof Function
      ? mantineFilterCheckboxProps({
          column,
          table,
        })
      : mantineFilterCheckboxProps;

  const mcTableHeadCellFilterCheckboxProps =
    columnDef.mantineFilterCheckboxProps instanceof Function
      ? columnDef.mantineFilterCheckboxProps({
          column,
          table,
        })
      : columnDef.mantineFilterCheckboxProps;

  const checkboxProps = {
    ...mTableHeadCellFilterCheckboxProps,
    ...mcTableHeadCellFilterCheckboxProps,
  } as CheckboxProps;

  const filterLabel = localization.filterByColumn?.replace(
    '{column}',
    columnDef.header,
  );

  return (
    <Tooltip
      withinPortal
      openDelay={1000}
      label={checkboxProps?.title ?? filterLabel}
    >
      <Checkbox
        checked={column.getFilterValue() === 'true'}
        indeterminate={column.getFilterValue() === undefined}
        color={column.getFilterValue() === undefined ? 'default' : 'primary'}
        size={density === 'xs' ? 'sm' : 'md'}
        label={checkboxProps.title ?? filterLabel}
        {...checkboxProps}
        onClick={(e) => {
          e.stopPropagation();
          checkboxProps?.onClick?.(e);
        }}
        onChange={(e) => {
          column.setFilterValue(
            column.getFilterValue() === undefined
              ? 'true'
              : column.getFilterValue() === 'true'
              ? 'false'
              : undefined,
          );
          checkboxProps?.onChange?.(e);
        }}
        sx={(theme) => ({
          fontWeight: 'normal',
          marginTop: '8px',
          ...(checkboxProps?.sx instanceof Function
            ? checkboxProps.sx(theme)
            : (checkboxProps?.sx as any)),
        })}
        title={undefined}
      />
    </Tooltip>
  );
};
