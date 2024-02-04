import clsx from 'clsx';
import classes from './MRT_TableHeadRow.module.css';
import { Box, TableTr, type TableTrProps } from '@mantine/core';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> extends TableTrProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  headerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  headerGroup,
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: { enableStickyHeader, layoutMode, mantineTableHeadRowProps },
  } = table;
  const { isFullScreen } = getState();

  const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } =
    columnVirtualizer ?? {};

  const tableRowProps = {
    ...parseFromValuesOrFunc(mantineTableHeadRowProps, {
      headerGroup,
      table,
    }),
    ...rest,
  };

  return (
    <TableTr
      {...tableRowProps}
      className={clsx(
        classes.root,
        (enableStickyHeader || isFullScreen) && classes.sticky,
        layoutMode?.startsWith('grid') && classes['layout-mode-grid'],
        tableRowProps?.className,
      )}
    >
      {virtualPaddingLeft ? (
        <Box component="th" display="flex" w={virtualPaddingLeft} />
      ) : null}
      {(virtualColumns ?? headerGroup.headers).map(
        (headerOrVirtualHeader, renderedHeaderIndex) => {
          let header = headerOrVirtualHeader as MRT_Header<TData>;
          if (columnVirtualizer) {
            renderedHeaderIndex = (headerOrVirtualHeader as MRT_VirtualItem)
              .index;
            header = headerGroup.headers[renderedHeaderIndex];
          }

          return (
            <MRT_TableHeadCell
              columnVirtualizer={columnVirtualizer}
              header={header}
              key={header.id}
              renderedHeaderIndex={renderedHeaderIndex}
              table={table}
            />
          );
        },
      )}
      {virtualPaddingRight ? (
        <Box component="th" display="flex" w={virtualPaddingRight} />
      ) : null}
    </TableTr>
  );
};
