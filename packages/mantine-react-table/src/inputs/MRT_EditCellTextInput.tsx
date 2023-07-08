import { type FocusEvent, type KeyboardEvent, useState } from 'react';
import { Select } from '@mantine/core';
import { Input } from '@chakra-ui/react';
import { type MRT_Cell, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditCellTextInput = <TData extends Record<string, any>>({
  cell,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      creatingMode,
      editingMode,
      mantineEditTextInputProps,
      mantineEditSelectProps,
    },
    refs: { editInputRefs },
    setEditingCell,
    setEditingRow,
    setCreatingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { creatingRow, editingRow } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;
  const isSelectEdit = columnDef.editVariant === 'select';

  const [value, setValue] = useState(() => cell.getValue<any>());

  const mTableBodyCellEditTextInputProps =
    mantineEditTextInputProps instanceof Function
      ? mantineEditTextInputProps({ cell, column, row, table })
      : mantineEditTextInputProps;

  const mcTableBodyCellEditTextInputProps =
    columnDef.mantineEditTextInputProps instanceof Function
      ? columnDef.mantineEditTextInputProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.mantineEditTextInputProps;

  const textInputProps = {
    ...mTableBodyCellEditTextInputProps,
    ...mcTableBodyCellEditTextInputProps,
  };

  const mTableBodyCellEditSelectProps =
    mantineEditSelectProps instanceof Function
      ? mantineEditSelectProps({ cell, column, row, table })
      : mantineEditSelectProps;

  const mcTableBodyCellEditSelectProps =
    columnDef.mantineEditSelectProps instanceof Function
      ? columnDef.mantineEditSelectProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.mantineEditSelectProps;

  const selectProps = {
    ...mTableBodyCellEditSelectProps,
    ...mcTableBodyCellEditSelectProps,
  };

  const saveInputValueToRowCache = (newValue: string | null) => {
    //@ts-ignore
    row._valuesCache[column.id] = newValue;
    if (isCreating) {
      setCreatingRow({ ...row });
    } else if (isEditing) {
      setEditingRow({ ...row });
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    textInputProps.onBlur?.(event);
    saveInputValueToRowCache(value);
    setEditingCell(null);
  };

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    textInputProps.onKeyDown?.(event);
    if (event.key === 'Enter') {
      editInputRefs.current[cell.id]?.blur();
    }
  };

  if (columnDef.Edit) {
    return columnDef.Edit?.({ cell, column, row, table });
  }

  const commonProps = {
    disabled:
      (columnDef.enableEditing instanceof Function
        ? columnDef.enableEditing(row)
        : columnDef.enableEditing) === false,
    label: ['modal', 'custom'].includes(
      (isCreating ? creatingMode : editingMode) as string,
    )
      ? column.columnDef.header
      : undefined,
    name: cell.id,
    placeholder: !['modal', 'custom'].includes(
      (isCreating ? creatingMode : editingMode) as string,
    )
      ? columnDef.header
      : undefined,
    value,
    variant: editingMode === 'table' ? 'unstyled' : 'default',
    onClick: (e: any) => {
      e.stopPropagation();
      textInputProps?.onClick?.(e);
    },
  } as const;

  if (isSelectEdit) {
    return (
      // @ts-ignore
      <Select
        {...commonProps}
        searchable
        value={value}
        withinPortal
        {...selectProps}
        onBlur={handleBlur}
        onChange={(value) => {
          selectProps.onChange?.(value as any);
          setValue(value);
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectProps?.onClick?.(e);
        }}
        ref={(node) => {
          if (node) {
            editInputRefs.current[cell.id] = node;
            if (selectProps.ref) {
              selectProps.ref.current = node;
            }
          }
        }}
      />
    );
  }

  return (
    <Input
      {...commonProps}
      onKeyDown={handleEnterKeyDown}
      value={value ?? ''}
      {...textInputProps}
      onBlur={handleBlur}
      onChange={(event) => {
        textInputProps.onChange?.(event);
        setValue(event.target.value);
      }}
      onClick={(event) => {
        event.stopPropagation();
        textInputProps?.onClick?.(event);
      }}
      ref={(node) => {
        if (node) {
          editInputRefs.current[cell.id] = node;
          if (textInputProps.ref) {
            textInputProps.ref.current = node;
          }
        }
      }}
    />
  );
};
