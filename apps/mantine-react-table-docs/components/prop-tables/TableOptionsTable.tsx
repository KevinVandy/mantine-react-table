import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MantineReactTable,
  type MRT_TableOptions,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { Anchor, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { type TableOption, tableOptions } from './tableOptions';
import { getPrimaryColor } from 'mantine-react-table';

interface Props {
  onlyOptions?: Set<keyof MRT_TableOptions<TableOption>>;
}

const TableOptionsTable = ({ onlyOptions }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          enableClickToCopy: true,
          header: 'Prop Name',
          accessorKey: 'tableOption',
          mantineCopyButtonProps: ({ cell }) => ({
            className: 'prop',
            id: `${cell.getValue<string>()}-prop`,
          }),
          Cell: ({ renderedCellValue, row }) =>
            row.original?.required ? (
              <Text
                component="strong"
                style={(theme) => ({
                  color: getPrimaryColor(theme),
                })}
              >
                {renderedCellValue}*
              </Text>
            ) : (
              renderedCellValue
            ),
        },
        {
          header: 'Type',
          accessorKey: 'type',
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
          header: 'Required',
          accessorKey: 'required',
          enableGlobalFilter: false,
        },
        {
          header: 'Default Value',
          accessorKey: 'defaultValue',
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
          header: 'Description',
          accessorKey: 'description',
          enableGlobalFilter: false,
        },
        {
          header: 'More Info Links',
          accessorKey: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          Cell: ({ cell, row }) => (
            <Link href={cell.getValue() as string} passHref legacyBehavior>
              <Anchor
                color={
                  row.original.source === 'MRT'
                    ? 'dimmed'
                    : row.original.source === 'Mantine'
                      ? 'teal'
                      : row.original.source === 'TanStack Table'
                        ? 'blue'
                        : undefined
                }
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
      ] as MRT_ColumnDef<TableOption>[],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'tableOption'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyOptions) {
      return tableOptions.filter(({ tableOption }) =>
        onlyOptions.has(tableOption),
      );
    }
    return tableOptions;
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
        columnVisibility: { required: false, description: false },
        density: 'xs',
        showGlobalFilter: true,
        sorting: [{ id: 'tableOption', desc: false }],
      }}
      mantineSearchTextInputProps={{
        placeholder: 'Search All Props',
        style: { minWidth: '18rem' },
        variant: 'filled',
      }}
      mantinePaperProps={{
        style: { marginBottom: '24px' },
        id: onlyOptions ? 'relevant-props-table' : 'props-table',
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

export default TableOptionsTable;
