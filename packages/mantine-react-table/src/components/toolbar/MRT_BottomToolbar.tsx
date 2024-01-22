import clsx from 'clsx';
import classes from './MRT_BottomToolbar.module.css';
import commonClasses from './common.styles.module.css';
import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MRT_ProgressBar } from './MRT_ProgressBar';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

export const MRT_BottomToolbar = <TData extends MRT_RowData>({
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

  const toolbarProps = parseFromValuesOrFunc(mantineBottomToolbarProps, {
    table,
  });

  const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;

  return (
    <Box
      {...toolbarProps}
      className={clsx(
        'mrt-bottom-toolbar',
        classes.root,
        commonClasses['common-toolbar-styles'],
        isFullScreen && classes['bottom-toolbar-fullscreen'],
        toolbarProps?.className,
      )}
      ref={(node: HTMLDivElement) => {
        if (node) {
          bottomToolbarRef.current = node;
          if (toolbarProps?.ref) {
            toolbarProps.ref.current = node;
          }
        }
      }}
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
            ['both', 'bottom'].includes(positionPagination ?? '') && (
              <MRT_TablePagination position="bottom" table={table} />
            )}
        </Box>
      </Box>
    </Box>
  );
};
