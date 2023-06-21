import { Collapse, Progress } from '@mantine/core';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  isTopToolbar: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ProgressBar = <TData extends Record<string, any>>({
  isTopToolbar,
  table,
}: Props<TData>) => {
  const {
    options: { mantineProgressProps },
    getState,
  } = table;
  const { isLoading, showProgressBars } = getState();

  const linearProgressProps =
    mantineProgressProps instanceof Function
      ? mantineProgressProps({ isTopToolbar, table })
      : mantineProgressProps;

  return (
    <Collapse
      in={isLoading || showProgressBars}
      sx={{
        bottom: isTopToolbar ? 0 : undefined,
        position: 'absolute',
        top: !isTopToolbar ? 0 : undefined,
        width: '100%',
      }}
    >
      <Progress
        animate
        aria-label="Loading"
        aria-busy="true"
        sx={{
          position: 'relative',
        }}
        value={100}
        {...linearProgressProps}
      />
    </Collapse>
  );
};
