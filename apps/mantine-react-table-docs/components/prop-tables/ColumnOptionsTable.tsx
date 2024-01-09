import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Anchor, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { type ColumnOption, columnOptions } from './columnOptions';
import { getPrimaryColor } from 'mantine-react-table';

interface Props {
  onlyOptions?: Set<keyof MRT_ColumnDef<ColumnOption>>;
}

const ColumnOptionsTable = ({ onlyOptions }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'columnOption',
          enableClickToCopy: true,
          header: 'Column Option',
          mantineCopyButtonProps: ({ cell, row }) => ({
            className: 'column-option',
            id: `${cell.getValue<string>()}-column-option`,
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
          accessorKey: 'required',
          enableGlobalFilter: false,
          header: 'Required',
        },
        {
          accessorKey: 'defaultValue',
          enableGlobalFilter: false,
          header: 'Default Value',
          Cell: ({ cell }) => (
            <SampleCodeSnippet
              language="typescript"
              withCopyButton={false}
              code={cell.getValue<string>()}
            />
          ),
        },
        {
          accessorKey: 'description',
          enableGlobalFilter: false,
          header: 'Description',
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
      ] as MRT_ColumnDef<ColumnOption>[],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'columnOption'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyOptions) {
      return columnOptions.filter(({ columnOption }) =>
        onlyOptions.has(columnOption),
      );
    }
    return columnOptions;
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
        sorting: [{ id: 'columnOption', desc: false }],
      }}
      mantineSearchTextInputProps={{
        placeholder: 'Search Column Options',
        style: { minWidth: '18rem' },
        variant: 'filled',
      }}
      mantinePaperProps={{
        style: { marginBottom: '24px' },
        id: onlyOptions
          ? 'relevant-column-options-table'
          : 'column-options-table',
      }}
      positionGlobalFilter="left"
      renderDetailPanel={({ row }) => (
        <Text color={row.original.description ? 'teal' : 'gray'}>
          {row.original.description || 'No Description Provided... Yet...'}
        </Text>
      )}
      rowNumberDisplayMode="static"
      onColumnPinningChange={setColumnPinning}
      state={{ columnPinning }}
    />
  );
};

export default ColumnOptionsTable;
