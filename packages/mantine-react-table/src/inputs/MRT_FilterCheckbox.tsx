import clsx from 'clsx';
import { Checkbox, type CheckboxProps, Tooltip } from '@mantine/core';

import { type MRT_Column, type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_FilterCheckBox.module.css';

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

  const arg = { column, table };
  const checkboxProps = {
    ...parseFromValuesOrFunc(mantineFilterCheckboxProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineFilterCheckboxProps, arg),
  } as CheckboxProps;

  const filterLabel = localization.filterByColumn?.replace(
    '{column}',
    columnDef.header,
  );

  const value = column.getFilterValue();

  return (
    <Tooltip
      withinPortal
      openDelay={1000}
      label={checkboxProps?.title ?? filterLabel}
    >
      <Checkbox
        className={clsx('mrt-filter-checkbox', classes.root)}
        checked={value === 'true'}
        indeterminate={value === undefined}
        color={value === undefined ? 'default' : 'primary'}
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
        title={undefined}
      />
    </Tooltip>
  );
};
