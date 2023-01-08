import { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import MantineReactTable, {
  MRT_ColumnDef,
  MRT_Cell,
} from 'mantine-react-table';
import { Anchor, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { CellInstanceAPI, cellInstanceAPIs } from './cellInstanceAPIs';

interface Props {
  onlyProps?: Set<keyof MRT_Cell>;
}

const CellInstanceAPIsTable: FC<Props> = ({ onlyProps }) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'cellInstanceAPI',
          enableClickToCopy: true,
          header: 'State Option',
          mantineCopyButtonProps: ({ cell }) => ({
            className: 'cell-instance-api',
            id: `${cell.getValue<string>()}-cell-instance-api`,
          }),
          Cell: ({ cell }) => cell.getValue<string>(),
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
                rel="noreferrer"
              >
                {row.original?.linkText}
              </Anchor>
            </Link>
          ),
        },
      ] as MRT_ColumnDef<CellInstanceAPI>[],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'cellInstanceAPI'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyProps) {
      return cellInstanceAPIs.filter(({ cellInstanceAPI }) =>
        onlyProps.has(cellInstanceAPI),
      );
    }
    return cellInstanceAPIs;
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
        sorting: [{ id: 'cellInstanceAPI', desc: false }],
      }}
      mantineSearchTextInputProps={{
        placeholder: 'Search Cell APIs',
        sx: { minWidth: '18rem' },
        variant: 'filled',
      }}
      mantinePaperProps={{
        sx: { marginBottom: '1.5rem' },
        id: onlyProps
          ? 'relevant-cell-instance-apis-table'
          : 'cell-instance-apis-table',
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

export default CellInstanceAPIsTable;
