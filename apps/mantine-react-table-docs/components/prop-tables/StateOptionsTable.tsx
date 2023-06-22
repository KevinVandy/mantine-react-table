import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_TableState,
} from 'mantine-react-table';
import { Anchor, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { type StateRow, stateOptions } from './stateOptions';

interface Props {
  onlyOptions?: Set<keyof MRT_TableState<StateRow>>;
}

const StateOptionsTable = ({ onlyOptions }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'stateOption',
          enableClickToCopy: true,
          header: 'State Option',
          mantineCopyButtonProps: ({ cell }) => ({
            className: 'state-option',
            id: `${cell.getValue<string>()}-state-option`,
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
          accessorKey: 'defaultValue',
          enableGlobalFilter: false,
          header: 'Default Value',
          Cell: ({ cell }) => (
            <SampleCodeSnippet language="typescript" noCopy>
              {cell.getValue<string>()}
            </SampleCodeSnippet>
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
      ] as MRT_ColumnDef<StateRow>[],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'stateOption'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyOptions) {
      return stateOptions.filter(({ stateOption }) =>
        onlyOptions.has(stateOption),
      );
    }
    return stateOptions;
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
      enablePinning
      enableRowNumbers
      enableBottomToolbar={false}
      enableTopToolbar={!onlyOptions}
      initialState={{
        columnVisibility: { description: false },
        density: 'xs',
        showGlobalFilter: true,
        sorting: [{ id: 'stateOption', desc: false }],
      }}
      mantineSearchTextInputProps={{
        placeholder: 'Search State Options',
        sx: { minWidth: '18rem' },
        variant: 'filled',
      }}
      mantinePaperProps={{
        sx: { marginBottom: '24px' },
        id: onlyOptions
          ? 'relevant-state-options-table'
          : 'state-options-table',
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

export default StateOptionsTable;
