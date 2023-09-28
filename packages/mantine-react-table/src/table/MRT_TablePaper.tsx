import { Paper } from '@mantine/core';
import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TableContainer } from './MRT_TableContainer';
import { type MRT_TableInstance } from '../types';
import { funcValue, styleValue } from '../funcValue';

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
      renderBottomToolbar,
      renderTopToolbar,
    },
    refs: { tablePaperRef },
  } = table;
  const { isFullScreen } = getState();

  const tablePaperProps = funcValue(mantinePaperProps, { table });

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
      style={(theme) => ({
        overflow: 'hidden',
        transition: 'all 100ms ease-in-out',
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
            }
          : null),
        ...styleValue(tablePaperProps, theme),
      })}
    >
      {enableTopToolbar &&
        (funcValue(renderTopToolbar, { table }) ?? (
          <MRT_TopToolbar table={table} />
        ))}
      <MRT_TableContainer table={table} />
      {enableBottomToolbar &&
        (funcValue(renderBottomToolbar, { table }) ?? (
          <MRT_BottomToolbar table={table} />
        ))}
    </Paper>
  );
};
