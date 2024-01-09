import { type ChangeEvent, type MouseEvent } from 'react';
import {
  Checkbox,
  Radio,
  Switch,
  Tooltip,
  type CheckboxProps,
  type RadioProps,
  type SwitchProps,
} from '@mantine/core';
import {
  type MRT_RowData,
  type MRT_Row,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends MRT_RowData> {
  row?: MRT_Row<TData>;
  selectAll?: boolean;
  staticRowIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_SelectCheckbox = <TData extends MRT_RowData>({
  row,
  selectAll,
  table,
  staticRowIndex,
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
      rowPinningDisplayMode,
      enableRowPinning,
    },
  } = table;
  const { density, isLoading } = getState();

  const checkboxProps = !row
    ? parseFromValuesOrFunc(mantineSelectAllCheckboxProps, { table })
    : parseFromValuesOrFunc(mantineSelectCheckboxProps, {
        row,
        table,
        staticRowIndex,
      });

  const isStickySelection =
    enableRowPinning && rowPinningDisplayMode?.includes('select');

  const allRowsSelected = selectAll
    ? selectAllMode === 'page'
      ? table.getIsAllPageRowsSelected()
      : table.getIsAllRowsSelected()
    : undefined;

  const onSelectionChange = (
    event: ChangeEvent<HTMLInputElement>,
    row: MRT_Row<TData>,
  ) => {
    if (row.getIsAllSubRowsSelected()) {
      row.subRows?.forEach((r) => r.toggleSelected(false));
    }
    row.getToggleSelectedHandler()(event);

    if (isStickySelection) {
      row.pin(
        !row.getIsPinned() && event.target.checked
          ? rowPinningDisplayMode?.includes('bottom')
            ? 'bottom'
            : 'top'
          : false,
      );
    }
  };

  const onSelectAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectAllMode === 'all'
      ? table.getToggleAllRowsSelectedHandler()(event)
      : table.getToggleAllPageRowsSelectedHandler()(event);
    if (isStickySelection) {
      table.setRowPinning({ bottom: [], top: [] });
    }
  };

  const commonProps = {
    'aria-label': selectAll
      ? localization.toggleSelectAll
      : localization.toggleSelectRow,
    checked: selectAll
      ? allRowsSelected
      : row?.getIsSelected() || row?.getIsAllSubRowsSelected(),
    disabled: isLoading || (row && !row.getCanSelect()),
    onChange: (event) => {
      event.stopPropagation();
      row ? onSelectionChange(event, row) : onSelectAllChange(event);
    },
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
