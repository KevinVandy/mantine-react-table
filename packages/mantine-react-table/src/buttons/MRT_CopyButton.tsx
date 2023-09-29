import { type ReactNode } from 'react';
import { UnstyledButton, CopyButton, Tooltip, rgba } from '@mantine/core';
import { type MRT_Cell, type MRT_TableInstance } from '../types';
import { getPrimaryColor, parseFromValuesOrFunc } from '../column.utils';

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

  const arg = { cell, column, row, table };
  const buttonProps = {
    ...parseFromValuesOrFunc(mantineCopyButtonProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineCopyButtonProps, arg),
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
            style={(theme) => ({
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
                backgroundColor: rgba(getPrimaryColor(theme), 0.1),
              },
              ...(parseFromValuesOrFunc(buttonProps?.style, theme) as any),
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
