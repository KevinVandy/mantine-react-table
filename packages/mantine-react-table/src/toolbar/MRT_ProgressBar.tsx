import { Collapse, Progress } from '@mantine/core';
import { type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends Record<string, any> = {}> {
  isTopToolbar: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ProgressBar = <TData extends Record<string, any> = {}>({
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
      style={{
        bottom: isTopToolbar ? 0 : undefined,
        position: 'absolute',
        top: !isTopToolbar ? 0 : undefined,
        width: '100%',
      }}
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
