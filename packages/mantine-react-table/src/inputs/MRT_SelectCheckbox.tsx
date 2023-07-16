import { type MouseEvent } from 'react';
import {
  Checkbox,
  Radio,
  Switch,
  Tooltip,
  type CheckboxProps,
  type RadioProps,
  type SwitchProps,
} from '@mantine/core';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  row?: MRT_Row<TData>;
  selectAll?: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_SelectCheckbox = <TData extends Record<string, any> = {}>({
  row,
  selectAll,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableMultiRowSelection,
      localization,
      mantineSelectAllCheckboxProps,
      mantineSelectCheckboxProps,
      selectAllMode,
      selectDisplayMode,
    },
  } = table;
  const { density, isLoading } = getState();

  const checkboxProps = !row
    ? mantineSelectAllCheckboxProps instanceof Function
      ? mantineSelectAllCheckboxProps({ table })
      : mantineSelectAllCheckboxProps
    : mantineSelectCheckboxProps instanceof Function
    ? mantineSelectCheckboxProps({ row, table })
    : mantineSelectCheckboxProps;

  const allRowsSelected = selectAll
    ? selectAllMode === 'page'
      ? table.getIsAllPageRowsSelected()
      : table.getIsAllRowsSelected()
    : undefined;

  const commonProps = {
    'aria-label': selectAll
      ? localization.toggleSelectAll
      : localization.toggleSelectRow,
    checked: selectAll ? allRowsSelected : row?.getIsSelected(),
    disabled: isLoading || (row && !row.getCanSelect()),
    onChange: row
      ? row.getToggleSelectedHandler()
      : selectAllMode === 'all'
      ? table.getToggleAllRowsSelectedHandler()
      : table.getToggleAllPageRowsSelectedHandler(),
    size: density === 'xs' ? 'sm' : 'md',
    ...checkboxProps,
    onClick: (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      checkboxProps?.onClick?.(e);
    },
    title: undefined,
  } as CheckboxProps & RadioProps & SwitchProps;

  return (
    <Tooltip
      withinPortal
      openDelay={1000}
      label={
        checkboxProps?.title ??
        (selectAll
          ? localization.toggleSelectAll
          : localization.toggleSelectRow)
      }
    >
      <span>
        {selectDisplayMode === 'switch' ? (
          <Switch {...commonProps} />
        ) : selectDisplayMode === 'radio' ||
          enableMultiRowSelection === false ? (
          <Radio {...commonProps} />
        ) : (
          <Checkbox
            indeterminate={
              selectAll
                ? table.getIsSomeRowsSelected() && !allRowsSelected
                : row?.getIsSomeSelected()
            }
            {...commonProps}
          />
        )}
      </span>
    </Tooltip>
  );
};
