import { Box, Flex, type MantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MRT_GlobalFilterTextInput } from '../inputs/MRT_GlobalFilterTextInput';
import { MRT_ProgressBar } from './MRT_ProgressBar';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { type MRT_TableInstance } from '../types';

export const commonToolbarStyles = ({ theme }: { theme: MantineTheme }) => ({
  alignItems: 'flex-start',
  backgroundColor:
    theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  backgroundImage: 'none',
  display: 'grid',
  flexWrap: 'wrap-reverse',
  minHeight: '3.5rem',
  overflow: 'visible',
  padding: '0',
  transition: 'all 100ms ease-in-out',
  zIndex: 3,
});

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TopToolbar = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableGlobalFilter,
      enablePagination,
      enableToolbarInternalActions,
      mantineTopToolbarProps,
      positionGlobalFilter,
      positionPagination,
      positionToolbarAlertBanner,
      positionToolbarDropZone,
      renderTopToolbarCustomActions,
    },
    refs: { topToolbarRef },
  } = table;

  const { isFullScreen, showGlobalFilter } = getState();

  const isMobile = useMediaQuery('(max-width: 720px)');

  const toolbarProps =
    mantineTopToolbarProps instanceof Function
      ? mantineTopToolbarProps({ table })
      : mantineTopToolbarProps;

  const stackAlertBanner =
    isMobile || !!renderTopToolbarCustomActions || showGlobalFilter;

  return (
    <Box
      {...toolbarProps}
      ref={(node: HTMLDivElement) => {
        if (node) {
          topToolbarRef.current = node;
          if (toolbarProps?.ref) {
            toolbarProps.ref.current = node;
          }
        }
      }}
      sx={(theme) => ({
        position: isFullScreen ? 'sticky' : 'relative',
        top: isFullScreen ? '0' : undefined,
        ...commonToolbarStyles({ theme }),
        ...(toolbarProps?.sx instanceof Function
          ? toolbarProps.sx(theme)
          : (toolbarProps?.sx as any)),
      })}
    >
      {positionToolbarAlertBanner === 'top' && (
        <MRT_ToolbarAlertBanner
          stackAlertBanner={stackAlertBanner}
          table={table}
        />
      )}
      {['both', 'top'].includes(positionToolbarDropZone ?? '') && (
        <MRT_ToolbarDropZone table={table} />
      )}
      <Flex
        sx={{
          alignItems: 'flex-start',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          padding: '8px',
          position: stackAlertBanner ? 'relative' : 'absolute',
          right: 0,
          top: 0,
          width: '100%',
        }}
      >
        {enableGlobalFilter && positionGlobalFilter === 'left' && (
          <MRT_GlobalFilterTextInput table={table} />
        )}
        {renderTopToolbarCustomActions?.({ table }) ?? <span />}
        {enableToolbarInternalActions ? (
          <Flex
            sx={{
              flexWrap: 'wrap-reverse',
              justifyContent: 'flex-end',
            }}
          >
            {enableGlobalFilter && positionGlobalFilter === 'right' && (
              <MRT_GlobalFilterTextInput table={table} />
            )}
            <MRT_ToolbarInternalButtons table={table} />
          </Flex>
        ) : (
          enableGlobalFilter &&
          positionGlobalFilter === 'right' && (
            <MRT_GlobalFilterTextInput table={table} />
          )
        )}
      </Flex>
      {enablePagination &&
        ['top', 'both'].includes(positionPagination ?? '') && (
          <Flex justify="end">
            <MRT_TablePagination table={table} position="top" />
          </Flex>
        )}
      <MRT_ProgressBar isTopToolbar table={table} />
    </Box>
  );
};
