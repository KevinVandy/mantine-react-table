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
  const { isLoading, isSaving, showProgressBars } = getState();

  const linearProgressProps =
    mantineProgressProps instanceof Function
      ? mantineProgressProps({ isTopToolbar, table })
      : mantineProgressProps;

  return (
    <Collapse
      in={isLoading || isSaving || showProgressBars}
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
        value={100}
        {...linearProgressProps}
        sx={(theme) => ({
          borderRadius: 0,
          '& .mantine-Progress-bar': {
            borderRadius: 0,
          },
          ...(linearProgressProps?.sx instanceof Function
            ? linearProgressProps.sx(theme)
            : (linearProgressProps?.sx as any)),
        })}
      />
    </Collapse>
  );
};
