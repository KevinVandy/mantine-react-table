import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TableContainer } from './MRT_TableContainer';
import { type MRT_TableInstance } from '../types';
import { Card, useColorModeValue } from '@chakra-ui/react';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TableWrapper = <TData extends Record<string, any>>({
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

  const tablePaperProps =
    mantinePaperProps instanceof Function
      ? mantinePaperProps({ table })
      : mantinePaperProps;

  return (
    <Card
      shadow="xs"
      variant="outline"
      {...tablePaperProps}
      ref={(ref: HTMLDivElement) => {
        tablePaperRef.current = ref;
        if (tablePaperProps?.ref) {
          //@ts-ignore
          tablePaperProps.ref.current = ref;
        }
      }}
      overflow="hidden"
      borderRadius={'md'}
      border={`1px solid `}
      borderColor={useColorModeValue('whiteAlpha.400', 'gray.200')}
      transition="all 100ms ease-in-out"
      // sx={(theme) => ({
      //   overflow: 'hidden',
      //   transition: 'all 100ms ease-in-out',
      //   ...(tablePaperProps?.sx instanceof Function
      //     ? tablePaperProps?.sx(theme)
      //     : (tablePaperProps?.sx as any)),
      // })}
      style={{
        overflow: 'hidden',
        transition: 'all 100ms ease-in-out',
        ...(tablePaperProps?.sx as any),
        ...tablePaperProps?.style,
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
              zIndex: 10,
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
    </Card>
  );
};
