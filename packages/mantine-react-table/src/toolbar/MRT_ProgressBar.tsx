import { Collapse, Progress } from '@mantine/core';
import clsx from 'clsx';
import { type MRT_RowData, type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';
import classes from './MRT_ProgressBar.module.css';

interface Props<TData extends MRT_RowData> {
  isTopToolbar: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ProgressBar = <TData extends MRT_RowData>({
  isTopToolbar,
  table,
}: Props<TData>) => {
  const {
    options: { mantineProgressProps },
    getState,
  } = table;
  const { isSaving, showProgressBars } = getState();

  const linearProgressProps = parseFromValuesOrFunc(mantineProgressProps, {
    isTopToolbar,
    table,
  });

  return (
    <Collapse
      in={isSaving || showProgressBars}
      className={clsx(
        classes.collapse,
        isTopToolbar && classes['collapse-top'],
      )}
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
