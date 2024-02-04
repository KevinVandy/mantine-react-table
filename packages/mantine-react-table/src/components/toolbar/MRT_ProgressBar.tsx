import clsx from 'clsx';
import classes from './MRT_ProgressBar.module.css';
import { Collapse, Progress, type ProgressProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> extends Partial<ProgressProps> {
  isTopToolbar: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ProgressBar = <TData extends MRT_RowData>({
  isTopToolbar,
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: { mantineProgressProps },
  } = table;
  const { isSaving, showProgressBars } = getState();

  const linearProgressProps = {
    ...parseFromValuesOrFunc(mantineProgressProps, {
      isTopToolbar,
      table,
    }),
    ...rest,
  };

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
