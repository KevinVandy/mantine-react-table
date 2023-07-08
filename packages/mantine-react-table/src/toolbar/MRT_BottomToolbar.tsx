import { Box, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ProgressBar } from './MRT_ProgressBar';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_BottomToolbar = <TData extends Record<string, any>>({
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
      backgroundColor={useColorModeValue('blackAlpha.500', 'white')}
      position={isFullScreen ? 'fixed' : 'relative'}
      alignItems="flex-start"
      backgroundImage="none"
      display="grid"
      flexWrap="wrap-reverse"
      minHeight="3.5rem"
      overflow="visible"
      p="0"
      transition="all 100ms ease-in-out"
      zIndex={3}
      boxShadow={'0 1px 2px -1px gray.800 inset'}
      bottom={isFullScreen ? '0' : undefined}
      left={0}
      right={0}
      style={{
        // boxShadow: `0 1px 2px -1px gray.800 inset`,
        ...(toolbarProps?.sx as any),
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
