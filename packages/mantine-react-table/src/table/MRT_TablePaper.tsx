import React from 'react';
import { Paper } from '@mantine/core';
import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TableContainer } from './MRT_TableContainer';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_TablePaper = ({ table }: Props) => {
  const {
    getState,
    options: {
      enableBottomToolbar,
      enableTopToolbar,
      mantinePaperProps,
      renderBottomToolbar,
      renderTopToolbar,
    },
    refs: { tablePaperRef },
  } = table;
  const { isFullScreen } = getState();

  const tablePaperProps =
    mantinePaperProps instanceof Function
      ? mantinePaperProps({ table })
      : mantinePaperProps;

  return (
    <Paper
      shadow="xs"
      withBorder
      {...tablePaperProps}
      ref={(ref: HTMLDivElement) => {
        tablePaperRef.current = ref;
        if (tablePaperProps?.ref) {
          //@ts-ignore
          tablePaperProps.ref.current = ref;
        }
      }}
      sx={(theme) => ({
        transition: 'all 100ms ease-in-out',
        ...(tablePaperProps?.sx instanceof Function
          ? tablePaperProps?.sx(theme)
          : (tablePaperProps?.sx as any)),
      })}
      style={{
        ...tablePaperProps?.style,
        ...(isFullScreen
          ? {
              height: '100vh',
              margin: 0,
              maxHeight: '100vh',
              maxWidth: '100vw',
              padding: 0,
              width: '100vw',
            }
          : {}),
      }}
    >
      {enableTopToolbar &&
        (renderTopToolbar instanceof Function
          ? renderTopToolbar({ table })
          : renderTopToolbar ?? <MRT_TopToolbar table={table} />)}
      <MRT_TableContainer table={table} />
      {enableBottomToolbar &&
        (renderBottomToolbar instanceof Function
          ? renderBottomToolbar({ table })
          : renderBottomToolbar ?? <MRT_BottomToolbar table={table} />)}
    </Paper>
  );
};
