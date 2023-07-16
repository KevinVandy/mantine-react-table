import { Box } from '@mantine/core';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { type MRT_TableInstance, type MRT_VirtualItem } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooter = <TData extends Record<string, any> = {}>({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, layoutMode, mantineTableFooterProps },
  } = table;
  const { isFullScreen } = getState();

  const tableFooterProps =
    mantineTableFooterProps instanceof Function
      ? mantineTableFooterProps({ table })
      : mantineTableFooterProps;

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  return (
    <Box
      component="tfoot"
      {...tableFooterProps}
      sx={(theme) => ({
        bottom: stickFooter ? 0 : undefined,
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        opacity: stickFooter ? 0.97 : undefined,
        outline: stickFooter
          ? theme.colorScheme === 'light'
            ? `1px solid ${theme.colors.gray[3]}`
            : `1px solid ${theme.colors.gray[7]}`
          : undefined,
        position: stickFooter ? 'sticky' : undefined,
        zIndex: stickFooter ? 1 : undefined,
        ...(tableFooterProps?.sx instanceof Function
          ? tableFooterProps?.sx(theme)
          : (tableFooterProps?.sx as any)),
      })}
    >
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          table={table}
          virtualColumns={virtualColumns}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      ))}
    </Box>
  );
};
