import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_TableInstance,
} from 'mantine-react-table';
import { Anchor, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { TableInstanceAPI, tableInstanceAPIs } from './tableInstanceAPIs';

interface Props {
  onlyProps?: Set<keyof MRT_TableInstance>;
}

const TableInstanceAPIsTable = ({ onlyProps }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'tableInstanceAPI',
          enableClickToCopy: true,
          header: 'State Option',
          mantineCopyButtonProps: ({ cell }) => ({
            className: 'table-instance-api',
            id: `${cell.getValue<string>()}-table-instance-api`,
          }),
        },
        {
          accessorKey: 'type',
          header: 'Type',
          enableGlobalFilter: false,
          Cell: ({ cell }) => (
            <SampleCodeSnippet language="typescript" noCopy>
              {cell.getValue<string>()}
            </SampleCodeSnippet>
          ),
        },
        {
          accessorKey: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          header: 'More Info Links',
          Cell: ({ cell, row }) => (
            <Link href={cell.getValue() as string} passHref legacyBehavior>
              <Anchor
                target={
                  (cell.getValue() as string).startsWith('http')
                    ? '_blank'
                    : undefined
                }
                rel="noopener"
              >
                {row.original?.linkText}
              </Anchor>
            </Link>
          ),
        },
      ] as MRT_ColumnDef<TableInstanceAPI>[],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'tableInstanceAPI'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyProps) {
      return tableInstanceAPIs.filter(({ tableInstanceAPI }) =>
        onlyProps.has(tableInstanceAPI),
      );
    }
    return tableInstanceAPIs;
  }, [onlyProps]);

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      displayColumnDefOptions={{
        'mrt-row-numbers': {
          size: 10,
        },
        'mrt-row-expand': {
          size: 10,
        },
      }}
      enableColumnActions={!onlyProps}
      enableColumnFilterModes
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableBottomToolbar={false}
      enableTopToolbar={!onlyProps}
      initialState={{
        columnVisibility: { description: false },
        density: 'xs',
        showGlobalFilter: true,
        sorting: [{ id: 'tableInstanceAPI', desc: false }],
      }}
      mantineSearchTextInputProps={{
        placeholder: 'Search Table APIs',
        sx: { minWidth: '18rem' },
        variant: 'filled',
      }}
      mantinePaperProps={{
        sx: { marginBottom: '24px' },
        id: onlyProps
          ? 'relevant-table-instance-apis-table'
          : 'table-instance-apis-table',
      }}
      positionGlobalFilter="left"
      renderDetailPanel={({ row }) => (
        <Text color={row.original.description ? 'teal' : 'gray'}>
          {row.original.description || 'No Description Provided... Yet...'}
        </Text>
      )}
      rowNumberMode="static"
      onColumnPinningChange={setColumnPinning}
      state={{ columnPinning }}
    />
  );
};

export default TableInstanceAPIsTable;
