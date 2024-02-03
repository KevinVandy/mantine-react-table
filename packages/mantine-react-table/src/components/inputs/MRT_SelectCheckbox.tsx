import { type ChangeEvent, type MouseEvent } from 'react';
import {
  Checkbox,
  type CheckboxProps,
  Radio,
  type RadioProps,
  Switch,
  type SwitchProps,
  Tooltip,
} from '@mantine/core';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { getIsRowSelected } from '../../utils/row.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> extends CheckboxProps {
  row?: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_SelectCheckbox = <TData extends MRT_RowData>({
  row,
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableMultiRowSelection,
      enableRowPinning,
      localization,
      mantineSelectAllCheckboxProps,
      mantineSelectCheckboxProps,
      rowPinningDisplayMode,
      selectAllMode,
      selectDisplayMode,
    },
  } = table;
  const { density, isLoading } = getState();

  const selectAll = !row;

  const checkboxProps = {
    ...(selectAll
      ? parseFromValuesOrFunc(mantineSelectAllCheckboxProps, { table })
      : parseFromValuesOrFunc(mantineSelectCheckboxProps, {
          row,
          table,
        })),
    ...rest,
  };

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
    checked: selectAll ? allRowsSelected : getIsRowSelected({ row, table }),
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
      label={
        checkboxProps?.title ??
        (selectAll
          ? localization.toggleSelectAll
          : localization.toggleSelectRow)
      }
      openDelay={1000}
      withinPortal
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
