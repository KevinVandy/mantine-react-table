import clsx from 'clsx';
import classes from './MRT_CopyButton.module.css';
import { type ReactNode } from 'react';
import {
  CopyButton,
  Tooltip,
  UnstyledButton,
  type UnstyledButtonProps,
} from '@mantine/core';
import {
  type MRT_Cell,
  type MRT_CellValue,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData, TValue = MRT_CellValue>
  extends UnstyledButtonProps {
  cell: MRT_Cell<TData, TValue>;
  children: ReactNode;
  table: MRT_TableInstance<TData>;
}

export const MRT_CopyButton = <TData extends MRT_RowData>({
  cell,
  children,
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: {
      localization: { clickToCopy, copiedToClipboard },
      mantineCopyButtonProps,
    },
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;

  const arg = { cell, column, row, table };
  const buttonProps = {
    ...parseFromValuesOrFunc(mantineCopyButtonProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineCopyButtonProps, arg),
    ...rest,
  };

  return (
    <CopyButton value={cell.getValue<string>()}>
      {({ copied, copy }) => (
        <Tooltip
          color={copied ? 'green' : undefined}
          label={
            buttonProps?.title ?? (copied ? copiedToClipboard : clickToCopy)
          }
          openDelay={1000}
          withinPortal
        >
          <UnstyledButton
            {...buttonProps}
            className={clsx(
              'mrt-copy-button',
              classes.root,
              buttonProps?.className,
            )}
            onClick={(e) => {
              e.stopPropagation();
              copy();
            }}
            role="presentation"
            title={undefined}
          >
            {children}
          </UnstyledButton>
        </Tooltip>
      )}
    </CopyButton>
  );
};
