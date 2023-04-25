import React, { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import type { MRT_Cell, MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
  showLabel?: boolean;
}

export const MRT_EditCellTextInput = <TData extends Record<string, any> = {}>({
  cell,
  showLabel,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { mantineEditTextInputProps },
    refs: { editInputRefs },
    setEditingCell,
    setEditingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { editingRow } = getState();

  const [value, setValue] = useState(() => cell.getValue<string>());

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

  const textFieldProps: TextInputProps = {
    ...mTableBodyCellEditTextInputProps,
    ...mcTableBodyCellEditTextInputProps,
  };

  const saveRow = (newValue: string) => {
    if (editingRow) {
      setEditingRow({
        ...editingRow,
        _valuesCache: { ...editingRow._valuesCache, [column.id]: newValue },
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    textFieldProps.onChange?.(event);
    setValue(event.target.value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    textFieldProps.onBlur?.(event);
    saveRow(value);
    setEditingCell(null);
  };

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      editInputRefs.current[column.id]?.blur();
    }
  };

  if (columnDef.Edit) {
    return <>{columnDef.Edit?.({ cell, column, row, table })}</>;
  }

  return (
    <TextInput
      disabled={
        (columnDef.enableEditing instanceof Function
          ? columnDef.enableEditing(row)
          : columnDef.enableEditing) === false
      }
      // inputRef={(inputRef) => {
      //   if (inputRef) {
      //     editInputRefs.current[column.id] = inputRef;
      //     if (textFieldProps.inputRef) {
      //       textFieldProps.inputRef = inputRef;
      //     }
      //   }
      // }}
      label={showLabel ? column.columnDef.header : undefined}
      name={column.id}
      onKeyDown={handleEnterKeyDown}
      placeholder={columnDef.header}
      value={value}
      variant="default"
      {...textFieldProps}
      onClick={(e) => {
        e.stopPropagation();
        textFieldProps?.onClick?.(e);
      }}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};
