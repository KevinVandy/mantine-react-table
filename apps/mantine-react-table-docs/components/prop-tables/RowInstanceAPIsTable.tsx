import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'mantine-react-table';
import { Anchor, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { type RowInstanceAPI, rowInstanceAPIs } from './rowInstanceAPIs';

interface Props {
  onlyOptions?: Set<keyof MRT_Row<RowInstanceAPI>>;
}

const RowInstanceAPIsTable = ({ onlyOptions }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'rowInstanceAPI',
          enableClickToCopy: true,
          header: 'State Option',
          mantineCopyButtonProps: ({ cell }) => ({
            className: 'row-instance-api',
            id: `${cell.getValue<string>()}-row-instance-api`,
          }),
        },
        {
          accessorKey: 'type',
          header: 'Type',
          enableGlobalFilter: false,
          Cell: ({ cell }) => (
            <SampleCodeSnippet
              language="typescript"
              withCopyButton={false}
              code={cell.getValue<string>()}
            />
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
      ] as MRT_ColumnDef<RowInstanceAPI>[],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'rowInstanceAPI'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyOptions) {
      return rowInstanceAPIs.filter(({ rowInstanceAPI }) =>
        onlyOptions.has(rowInstanceAPI),
      );
    }
    return rowInstanceAPIs;
  }, [onlyOptions]);

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
      enableColumnActions={!onlyOptions}
      enableColumnFilterModes
      enablePagination={false}
      enableColumnPinning
      enableRowNumbers
      enableBottomToolbar={false}
      enableTopToolbar={!onlyOptions}
      initialState={{
        columnVisibility: { description: false },
        density: 'xs',
        showGlobalFilter: true,
        sorting: [{ id: 'rowInstanceAPI', desc: false }],
      }}
      mantineSearchTextInputProps={{
        placeholder: 'Search Row APIs',
        style: { minWidth: '18rem' },
        variant: 'filled',
      }}
      mantinePaperProps={{
        style: { marginBottom: '24px' },
        id: onlyOptions
          ? 'relevant-row-instance-apis-table'
          : 'row-instance-apis-table',
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

export default RowInstanceAPIsTable;
