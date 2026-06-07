import clsx from 'clsx';

import classes from './MRT_Table.module.css';

import { Fragment, useMemo } from 'react';

import {
  darken,
  lighten,
  Table,
  type TableProps,
  useMantineColorScheme,
} from '@mantine/core';
import { type TableScrollContainerProps } from '@mantine/core/lib/components/Table/TableScrollContainer';

import { useMRT_ColumnVirtualizer } from '../../hooks/useMRT_ColumnVirtualizer';
import {
  type HTMLPropsRef,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseCSSVarId } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { Memo_MRT_TableBody, MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableHead } from '../head/MRT_TableHead';

interface Props<TData extends MRT_RowData> extends TableProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_Table = <TData extends MRT_RowData>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getFlatHeaders,
    getState,
    options: {
      columns,
      enableTableFooter,
      enableTableHead,
      layoutMode,
      mantineScrollAreaProps,
      mantineTableProps,
      memoMode,
      withScrollArea,
    },
  } = table;
  const { columnSizing, columnSizingInfo, columnVisibility, density } =
    getState();

  const tableProps = {
    highlightOnHover: true,
    horizontalSpacing: density,
    verticalSpacing: density,
    ...parseFromValuesOrFunc(mantineTableProps, { table }),
    ...rest,
  };

  const columnSizeVars = useMemo(() => {
    const headers = getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const colSize = header.getSize();
      colSizes[`--header-${parseCSSVarId(header.id)}-size`] = colSize;
      colSizes[`--col-${parseCSSVarId(header.column.id)}-size`] = colSize;
    }
    return colSizes;
  }, [columns, columnSizing, columnSizingInfo, columnVisibility]);

  const columnVirtualizer = useMRT_ColumnVirtualizer(table);

  const commonTableGroupProps = {
    columnVirtualizer,
    table,
  };

  const { colorScheme } = useMantineColorScheme();

  const { stripedColor } = tableProps;

  const scrollContainerProps = (
    withScrollArea
      ? {
          h: '100%',
          minWidth: '100%',
          offsetScrollbars: 'present',
          w: '100%',
          ...mantineScrollAreaProps,
        }
      : {}
  ) as HTMLPropsRef<HTMLDivElement> & TableScrollContainerProps;
  const ScrollWrapper = withScrollArea ? Table.ScrollContainer : Fragment;

  return (
    <ScrollWrapper
      {...scrollContainerProps}
      className={clsx(
        withScrollArea && classes.scrollContainer,
        scrollContainerProps?.className,
      )}
      ref={(node: HTMLDivElement) => {
        if (node && !table.refs.scrollAreaViewportRef.current) {
          const viewPort = node.querySelector(
            '.mantine-ScrollArea-viewport',
          ) as HTMLDivElement;

          table.refs.scrollAreaViewportRef.current = viewPort;
          if (scrollContainerProps.ref) {
            scrollContainerProps.ref.current = viewPort;
          }
        }
      }}
    >
      <Table
        className={clsx(
          'mrt-table',
          classes.root,
          layoutMode?.startsWith('grid') && classes['root-grid'],
          tableProps.className,
        )}
        {...tableProps}
        __vars={{
          ...columnSizeVars,
          '--mrt-striped-row-background-color': stripedColor,
          '--mrt-striped-row-hover-background-color': stripedColor
            ? colorScheme === 'dark'
              ? lighten(stripedColor, 0.08)
              : darken(stripedColor, 0.12)
            : undefined,
          ...tableProps.__vars,
        }}
      >
        {enableTableHead && <MRT_TableHead {...commonTableGroupProps} />}
        {memoMode === 'table-body' || columnSizingInfo.isResizingColumn ? (
          <Memo_MRT_TableBody
            {...commonTableGroupProps}
            tableProps={tableProps}
          />
        ) : (
          <MRT_TableBody {...commonTableGroupProps} tableProps={tableProps} />
        )}
        {enableTableFooter && <MRT_TableFooter {...commonTableGroupProps} />}
      </Table>
    </ScrollWrapper>
  );
};
