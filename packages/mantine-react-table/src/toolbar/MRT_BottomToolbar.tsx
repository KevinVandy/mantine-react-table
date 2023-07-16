import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ProgressBar } from './MRT_ProgressBar';
import { commonToolbarStyles } from './MRT_TopToolbar';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_BottomToolbar = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enablePagination,
      mantineBottomToolbarProps,
      positionPagination,
      positionToolbarAlertBanner,
      positionToolbarDropZone,
      renderBottomToolbarCustomActions,
    },
    refs: { bottomToolbarRef },
  } = table;
  const { isFullScreen } = getState();

  const isMobile = useMediaQuery('(max-width: 720px)');

  const toolbarProps =
    mantineBottomToolbarProps instanceof Function
      ? mantineBottomToolbarProps({ table })
      : mantineBottomToolbarProps;

  const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;

  return (
    <Box
      {...toolbarProps}
      ref={(node: HTMLDivElement) => {
        if (node) {
          bottomToolbarRef.current = node;
          if (toolbarProps?.ref) {
            toolbarProps.ref.current = node;
          }
        }
      }}
      sx={(theme) => ({
        ...commonToolbarStyles({ theme }),
        bottom: isFullScreen ? '0' : undefined,
        boxShadow: `0 1px 2px -1px ${theme.fn.rgba(theme.black, 0.1)} inset`,
        left: 0,
        position: isFullScreen ? 'fixed' : 'relative',
        right: 0,
        ...(toolbarProps?.sx instanceof Function
          ? toolbarProps.sx(theme)
          : (toolbarProps?.sx as any)),
      })}
    >
      <MRT_ProgressBar isTopToolbar={false} table={table} />
      {positionToolbarAlertBanner === 'bottom' && (
        <MRT_ToolbarAlertBanner
          stackAlertBanner={stackAlertBanner}
          table={table}
        />
      )}
      {['both', 'bottom'].includes(positionToolbarDropZone ?? '') && (
        <MRT_ToolbarDropZone table={table} />
      )}
      <Box
        sx={{
          alignItems: 'center',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px',
          width: '100%',
        }}
      >
        {renderBottomToolbarCustomActions ? (
          renderBottomToolbarCustomActions({ table })
        ) : (
          <span />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: stackAlertBanner ? 'relative' : 'absolute',
            right: 0,
            top: 0,
          }}
        >
          {enablePagination &&
            ['bottom', 'both'].includes(positionPagination ?? '') && (
              <MRT_TablePagination table={table} position="bottom" />
            )}
        </Box>
      </Box>
    </Box>
  );
};
