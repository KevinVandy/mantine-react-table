import clsx from 'clsx';
import classes from './MRT_ProgressBar.module.css';
import { Collapse, Progress } from '@mantine/core';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> {
  isTopToolbar: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ProgressBar = <TData extends MRT_RowData>({
  isTopToolbar,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { mantineProgressProps },
  } = table;
  const { isSaving, showProgressBars } = getState();

  const linearProgressProps = parseFromValuesOrFunc(mantineProgressProps, {
    isTopToolbar,
    table,
  });

  return (
    <Collapse
      className={clsx(
        classes.collapse,
        isTopToolbar && classes['collapse-top'],
      )}
      in={isSaving || showProgressBars}
    >
      <Progress
        animated
        aria-busy="true"
        aria-label="Loading"
        radius={0}
        value={100}
        {...linearProgressProps}
      />
    </Collapse>
  );
};
