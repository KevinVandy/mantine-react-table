import { useEffect, useLayoutEffect, useState } from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import { MRT_Table } from './MRT_Table';
import { MRT_EditRowModal } from '../modals';
import { type MRT_TableInstance } from '../types';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TableContainer = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableStickyHeader,
      mantineLoadingOverlayProps,
      mantineTableContainerProps,
    },
    refs: { tableContainerRef, bottomToolbarRef, topToolbarRef },
  } = table;
  const {
    isFullScreen,
    isLoading,
    showLoadingOverlay,
    creatingRow,
    editingRow,
  } = getState();

  const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);

  const tableContainerProps =
    mantineTableContainerProps instanceof Function
      ? mantineTableContainerProps({ table })
      : mantineTableContainerProps;

  const loadingOverlayProps =
    mantineLoadingOverlayProps instanceof Function
      ? mantineLoadingOverlayProps({ table })
      : mantineLoadingOverlayProps;

  useIsomorphicLayoutEffect(() => {
    const topToolbarHeight =
      typeof document !== 'undefined'
        ? topToolbarRef.current?.offsetHeight ?? 0
        : 0;

    const bottomToolbarHeight =
      typeof document !== 'undefined'
        ? bottomToolbarRef?.current?.offsetHeight ?? 0
        : 0;

    setTotalToolbarHeight(topToolbarHeight + bottomToolbarHeight);
  });

  const createModalOpen = createDisplayMode === 'modal' && creatingRow;
  const editModalOpen = editDisplayMode === 'modal' && editingRow;

  return (
    <Box
      {...tableContainerProps}
      ref={(node: HTMLDivElement) => {
        if (node) {
          tableContainerRef.current = node;
          if (tableContainerProps?.ref) {
            //@ts-ignore
            tableContainerProps.ref.current = node;
          }
        }
      }}
      sx={(theme) => ({
        maxWidth: '100%',
        maxHeight: enableStickyHeader
          ? `clamp(350px, calc(100vh - ${totalToolbarHeight}px), 9999px)`
          : undefined,
        overflow: 'auto',
        position: 'relative',
        ...(tableContainerProps?.sx instanceof Function
          ? tableContainerProps.sx(theme)
          : (tableContainerProps?.sx as any)),
      })}
      style={{
        maxHeight: isFullScreen
          ? `calc(100vh - ${totalToolbarHeight}px)`
          : undefined,
        ...tableContainerProps?.style,
      }}
    >
      <LoadingOverlay
        visible={isLoading || showLoadingOverlay}
        {...loadingOverlayProps}
      />
      <MRT_Table table={table} />
      {(createModalOpen || editModalOpen) && (
        <MRT_EditRowModal open table={table} />
      )}
    </Box>
  );
};
