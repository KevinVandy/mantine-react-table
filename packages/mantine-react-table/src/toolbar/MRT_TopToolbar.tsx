import {
  Box,
  type ColorMode,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import { MRT_GlobalFilterTextInput } from '../inputs/MRT_GlobalFilterTextInput';
import { MRT_ProgressBar } from './MRT_ProgressBar';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { type MRT_TableInstance } from '../types';

export const commonToolbarStyles = (colorMode: ColorMode) => ({
  alignItems: 'flex-start',
  backgroundColor: colorMode === 'dark' ? 'gray.700' : 'white',
  backgroundImage: 'none',
  display: 'grid',
  flexWrap: 'wrap-reverse',
  minHeight: '3.5rem',
  overflow: 'visible',
  padding: '0 !important',
  transition: 'all 100ms ease-in-out',
  zIndex: 3,
});

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TopToolbar = <TData extends Record<string, any>>({
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
  const { colorMode } = useColorMode();
  console.log({ colorMode });
  const { isFullScreen, showGlobalFilter } = getState();

  const isMobile = useMediaQuery('(max-width: 720px)');

  const toolbarProps =
    mantineTopToolbarProps instanceof Function
      ? mantineTopToolbarProps({ table })
      : mantineTopToolbarProps;

  const stackAlertBanner =
    isMobile || !!renderTopToolbarCustomActions || showGlobalFilter;
  console.log({ stackAlertBanner });
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
      backgroundColor={useColorModeValue('blackAlpha.500', 'white')}
      position={isFullScreen ? 'sticky' : 'relative'}
      alignItems="flex-start"
      backgroundImage="none"
      display="grid"
      flexWrap="wrap-reverse"
      minHeight="3.5rem"
      overflow="visible"
      p="0"
      transition="all 100ms ease-in-out"
      zIndex={3}
      top={isFullScreen ? '0' : undefined}
      style={{
        ...(toolbarProps?.sx as any),
      }}
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
        alignItems="flex-start"
        boxSizing="border-box"
        justifyContent="space-between"
        padding="8px"
        position={stackAlertBanner ? 'relative' : 'absolute'}
        right={0}
        top={0}
        width="full"
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
