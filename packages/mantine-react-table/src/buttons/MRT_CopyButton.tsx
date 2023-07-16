import { type ReactNode } from 'react';
import { UnstyledButton, CopyButton, Tooltip } from '@mantine/core';
import { type MRT_Cell, type MRT_TableInstance } from '../types';
import { getPrimaryColor } from '../column.utils';

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
    <CopyButton value={cell.getValue<string>()}>
      {({ copied, copy }) => (
        <Tooltip
          color={copied ? 'green' : undefined}
          withinPortal
          openDelay={1000}
          label={
            buttonProps?.title ??
            (copied ? localization.copiedToClipboard : localization.clickToCopy)
          }
        >
          <UnstyledButton
            {...buttonProps}
            onClick={(e) => {
              e.stopPropagation();
              copy();
            }}
            sx={(theme) => ({
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '4px',
              color: 'inherit',
              cursor: 'copy',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              justifyContent: 'inherit',
              letterSpacing: 'inherit',
              margin: '-4px',
              minWidth: 'unset',
              padding: '4px',
              textAlign: 'inherit',
              textTransform: 'inherit',
              '&:active': {
                transform: 'translateY(1px)',
              },
              '&:hover': {
                backgroundColor: theme.fn.rgba(getPrimaryColor(theme), 0.1),
              },
              ...(buttonProps?.sx instanceof Function
                ? buttonProps.sx(theme)
                : (buttonProps?.sx as any)),
            })}
            title={undefined}
          >
            {children}
          </UnstyledButton>
        </Tooltip>
      )}
    </CopyButton>
  );
};
