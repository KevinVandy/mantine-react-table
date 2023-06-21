import React, { useMemo } from 'react';
import {
  MRT_Table, //import alternative sub-component if we don't want toolbars
  type MRT_ColumnDef,
  useMantineReactTable,
} from 'mantine-react-table';
import { useMantineTheme } from '@mantine/core';
import { data, type Person } from './makeData';

export const Example = () => {
  const { colorScheme } = useMantineTheme();

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
    //end
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
      highlightOnHover: false,
      withColumnBorders: true, //not working in '@mantine/core' 6.0.14 apparently
      withBorder: colorScheme === 'light',
    },
  });

  //using MRT_Table instead of MantineReactTable if we don't want any of the toolbar features
  return <MRT_Table table={table} />;
};

export default Example;
