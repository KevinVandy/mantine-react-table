import React, { MouseEvent, ReactNode, useState } from 'react';
import { Button, Tooltip } from '@mantine/core';
import { MRT_Cell, MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  children: ReactNode;
  table: MRT_TableInstance<TData>;
}

export const MRT_CopyButton = <TData extends Record<string, any> = {}>({
  cell,
  children,
  table,
}: Props<TData>) => {
  const {
    options: { localization, mantineCopyButtonProps },
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;

  const [copied, setCopied] = useState(false);

  const handleCopy = (event: MouseEvent, text: unknown) => {
    event.stopPropagation();
    navigator.clipboard.writeText(text as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const mTableBodyCellCopyButtonProps =
    mantineCopyButtonProps instanceof Function
      ? mantineCopyButtonProps({ cell, column, row, table })
      : mantineCopyButtonProps;

  const mcTableBodyCellCopyButtonProps =
    columnDef.mantineCopyButtonProps instanceof Function
      ? columnDef.mantineCopyButtonProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.mantineCopyButtonProps;

  const buttonProps = {
    ...mTableBodyCellCopyButtonProps,
    ...mcTableBodyCellCopyButtonProps,
  };

  return (
    <Tooltip
      withinPortal
      withArrow
      openDelay={1000}
      position="top"
      label={
        buttonProps?.title ??
        (copied ? localization.copiedToClipboard : localization.clickToCopy)
      }
    >
      <Button
        onClick={(e) => handleCopy(e, cell.getValue())}
        size="sm"
        type="button"
        variant="default"
        {...buttonProps}
        sx={(theme) => ({
          backgroundColor: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'copy',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          margin: '-0.25rem',
          minWidth: 'unset',
          textAlign: 'inherit',
          textTransform: 'inherit',
          ...(buttonProps?.sx instanceof Function
            ? buttonProps.sx(theme)
            : (buttonProps?.sx as any)),
        })}
        title={undefined}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
