import React, { FC, MouseEvent } from 'react';
import {
  Checkbox,
  CheckboxProps,
  Radio,
  RadioProps,
  Tooltip,
} from '@mantine/core';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row?: MRT_Row;
  selectAll?: boolean;
  table: MRT_TableInstance;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row, selectAll, table }) => {
  const {
    getState,
    options: {
      localization,
      enableMultiRowSelection,
      mantineSelectCheckboxProps,
      mantineSelectAllCheckboxProps,
      selectAllMode,
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

  const commonProps = {
    'aria-label': selectAll
      ? localization.toggleSelectAll
      : localization.toggleSelectRow,
    checked: selectAll
      ? selectAllMode === 'page'
        ? table.getIsAllPageRowsSelected()
        : table.getIsAllRowsSelected()
      : row?.getIsSelected(),
    disabled: isLoading,
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
  } as CheckboxProps & RadioProps;

  return (
    <Tooltip
      withinPortal
      withArrow
      openDelay={1000}
      label={
        checkboxProps?.title ??
        (selectAll
          ? localization.toggleSelectAll
          : localization.toggleSelectRow)
      }
    >
      {enableMultiRowSelection === false ? (
        <Radio {...commonProps} />
      ) : (
        <Checkbox
          indeterminate={
            selectAll
              ? table.getIsSomeRowsSelected() &&
                !(selectAllMode === 'page'
                  ? table.getIsAllPageRowsSelected()
                  : table.getIsAllRowsSelected())
              : row?.getIsSomeSelected()
          }
          {...commonProps}
        />
      )}
    </Tooltip>
  );
};
