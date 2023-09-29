import clsx from 'clsx';
import { type ReactNode } from 'react';
import { UnstyledButton, CopyButton, Tooltip } from '@mantine/core';
import { type MRT_Cell, type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_CopyButton.module.css';

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
            className={clsx(
              'mrt-copy-button',
              classes.button,
              buttonProps?.className,
            )}
            style={(theme) => ({
              ...(parseFromValuesOrFunc(buttonProps?.style, theme) as any),
            })}
            title={undefined}
            aria-role="presentation"
            onClick={(e) => {
              e.stopPropagation();
              copy();
            }}
          >
            {children}
          </UnstyledButton>
        </Tooltip>
      )}
    </CopyButton>
  );
};
