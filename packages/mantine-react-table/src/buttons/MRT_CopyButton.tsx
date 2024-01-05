import clsx from 'clsx';
import { type ReactNode } from 'react';
import { UnstyledButton, CopyButton, Tooltip } from '@mantine/core';
import {
  type MRT_RowData,
  type MRT_Cell,
  type MRT_TableInstance,
  type MRT_CellValue,
} from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_CopyButton.module.css';

interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> {
  cell: MRT_Cell<TData, TValue>;
  children: ReactNode;
  table: MRT_TableInstance<TData>;
}

export const MRT_CopyButton = <TData extends MRT_RowData>({
  cell,
  children,
  table,
}: Props<TData>) => {
  const {
    options: {
      localization: { copiedToClipboard, clickToCopy },
      mantineCopyButtonProps,
    },
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
            buttonProps?.title ?? (copied ? copiedToClipboard : clickToCopy)
          }
        >
          <UnstyledButton
            {...buttonProps}
            className={clsx(
              'mrt-copy-button',
              classes.root,
              buttonProps?.className,
            )}
            title={undefined}
            role="presentation"
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
