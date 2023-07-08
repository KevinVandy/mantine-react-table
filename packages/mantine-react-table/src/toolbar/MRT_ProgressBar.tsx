import { Collapse, Progress } from '@chakra-ui/react';
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

      // sx={{
      //   bottom: isTopToolbar ? 0 : undefined,
      //   position: 'absolute',
      //   top: !isTopToolbar ? 0 : undefined,
      //   width: '100%',
      // }}
    >
      <Progress
        animate
        aria-label="Loading"
        aria-busy="true"
        position="relative"
        value={100}
        {...linearProgressProps}
      />
    </Collapse>
  );
};
