import { type FocusEvent, type KeyboardEvent, useState } from 'react';
import { Select, TextInput } from '@mantine/core';
import { type MRT_Cell, type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditCellTextInput = <TData extends Record<string, any> = {}>({
  cell,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
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

  const arg = { cell, column, row, table };
  const textInputProps = {
    ...parseFromValuesOrFunc(mantineEditTextInputProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineEditTextInputProps, arg),
  };

  const selectProps = {
    ...parseFromValuesOrFunc(mantineEditSelectProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineEditSelectProps, arg),
  };

  const saveInputValueToRowCache = (newValue: string | null) => {
    //@ts-ignore
    row._valuesCache[column.id] = newValue;
    if (isCreating) {
      setCreatingRow(row);
    } else if (isEditing) {
      setEditingRow(row);
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
    disabled: parseFromValuesOrFunc(columnDef.enableEditing, row) === false,
    label: ['modal', 'custom'].includes(
      (isCreating ? createDisplayMode : editDisplayMode) as string,
    )
      ? column.columnDef.header
      : undefined,
    name: cell.id,
    placeholder: !['modal', 'custom'].includes(
      (isCreating ? createDisplayMode : editDisplayMode) as string,
    )
      ? columnDef.header
      : undefined,
    value,
    variant: editDisplayMode === 'table' ? 'unstyled' : 'default',
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
    <TextInput
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
