import React, { FC } from 'react';
import { Collapse, Progress } from '@mantine/core';
import type { MRT_TableInstance } from '..';

interface Props {
  isTopToolbar: boolean;
  table: MRT_TableInstance;
}

export const MRT_LinearProgressBar: FC<Props> = ({ isTopToolbar, table }) => {
  const {
    options: { muiLinearProgressProps },
    getState,
  } = table;
  const { isLoading, showProgressBars } = getState();

  const linearProgressProps =
    muiLinearProgressProps instanceof Function
      ? muiLinearProgressProps({ isTopToolbar, table })
      : muiLinearProgressProps;

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
