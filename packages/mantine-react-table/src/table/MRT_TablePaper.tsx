import { Paper } from '@mantine/core';
import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TableContainer } from './MRT_TableContainer';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePaper = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableBottomToolbar,
      enableTopToolbar,
      mantinePaperProps,
      mantinePaperFullscreenStyles,
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

  const tablePaperFullScreenStyles =
    mantinePaperFullscreenStyles instanceof Function
      ? mantinePaperFullscreenStyles({ table })
      : mantinePaperFullscreenStyles;

  console.log('MRT_TablePaper', tablePaperFullScreenStyles);

  return (
    <Paper
      shadow="xs"
      withBorder
      {...tablePaperProps}
      ref={(ref: HTMLDivElement) => {
        tablePaperRef.current = ref;
        if (tablePaperProps?.ref) {
          tablePaperProps.ref.current = ref;
        }
      }}
      sx={(theme) => ({
        overflow: 'hidden',
        transition: 'all 100ms ease-in-out',
        ...(tablePaperProps?.sx instanceof Function
          ? tablePaperProps?.sx(theme)
          : (tablePaperProps?.sx as any)),
      })}
      style={{
        ...(isFullScreen
          ? {
              bottom: 0,
              height: '100vh',
              left: 0,
              margin: 0,
              maxHeight: '100vh',
              maxWidth: '100vw',
              padding: 0,
              position: 'fixed',
              right: 0,
              top: 0,
              width: '100vw',
              zIndex: 100,
              ...tablePaperFullScreenStyles,
            }
          : {}),
        ...tablePaperProps?.style,
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
