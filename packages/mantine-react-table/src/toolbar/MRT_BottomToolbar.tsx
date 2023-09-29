import { Box, rgba } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import clsx from 'clsx';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ProgressBar } from './MRT_ProgressBar';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { type MRT_TableInstance } from '../types';
import { funcValue, styleValue } from '../funcValue';
import commonClasses from './common.styles.module.css';
import classes from './MRT_BottomToolbar.module.css';

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

  const toolbarProps = funcValue(mantineBottomToolbarProps, { table });

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
      className={clsx(
        commonClasses['common-toolbar-styles'],
        classes['bottom-toolbar'],
        isFullScreen && classes['bottom-toolbar-fullscreen'],
        toolbarProps?.className,
      )}
      style={(theme) => ({
        '--mantine-color-dark-7': isFullScreen ? '0' : undefined,
        '--mrt-bottom-toolbar-box-shadow-color': rgba(theme.black, 0.1),
        '--mrt-bottom-toolbar-position': isFullScreen ? 'fixed' : 'relative',
        ...(styleValue(toolbarProps, theme) as any),
      })}
      __vars={toolbarProps?.__vars}
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
      <Box className={classes['custom-toolbar-container']}>
        {renderBottomToolbarCustomActions ? (
          renderBottomToolbarCustomActions({ table })
        ) : (
          <span />
        )}
        <Box
          className={clsx(
            classes['paginator-container'],
            stackAlertBanner && classes['paginator-container-alert-banner'],
          )}
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
