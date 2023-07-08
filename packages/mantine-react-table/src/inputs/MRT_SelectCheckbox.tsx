import {
  Checkbox,
  Radio,
  Switch,
  Tooltip,
  type CheckboxProps,
  type RadioProps,
  type SwitchProps,
} from '@chakra-ui/react';
import {
  type SelectVariant,
  type MRT_Row,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends Record<string, any>> {
  row?: MRT_Row<TData>;
  selectAll?: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_SelectCheckbox = <TData extends Record<string, any>>({
  row,
  selectAll,
  table,
}: Props<TData>) => {
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

  const SelectVariant = checkboxProps?.variant;

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

    size: density === 'xs' ? 'sm' : 'md',
    ...checkboxProps,
    // title: undefined,
  } as CheckboxProps & RadioProps & SwitchProps & { variant: SelectVariant };

  return (
    <Tooltip
      hasArrow
      openDelay={1000}
      label={
        checkboxProps?.title ??
        (selectAll
          ? localization.toggleSelectAll
          : localization.toggleSelectRow)
      }
    >
      {SelectVariant === 'switch' ? (
        // <span>
        <Switch {...commonProps} />
      ) : // </span>
      SelectVariant === 'radio' || enableMultiRowSelection === false ? (
        <Radio {...commonProps} />
      ) : (
        <Checkbox
          onClick={(e) => {
            e.stopPropagation();
            checkboxProps?.onClick?.(e as any);
          }}
          onChange={
            row
              ? row.getToggleSelectedHandler()
              : selectAllMode === 'all'
              ? table.getToggleAllRowsSelectedHandler()
              : table.getToggleAllPageRowsSelectedHandler()
          }
          indeterminate={
            selectAll
              ? table.getIsSomeRowsSelected() && !allRowsSelected
              : row?.getIsSomeSelected()
          }
          {...commonProps}
        />
      )}
    </Tooltip>
  );
};
