import { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { useMantineTheme } from '@mantine/core';
import { data, type Person } from './makeData';

export const Example = () => {
  const { colorScheme } = useMantineTheme();

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
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
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      mantineTableProps={{
        highlightOnHover: false,
        withColumnBorders: true,
        withBorder: colorScheme === 'light',
        style: {
          'thead > tr': {
            backgroundColor: 'inherit',
          },
          'thead > tr > th': {
            backgroundColor: 'inherit',
          },
          'tbody > tr > td': {
            backgroundColor: 'inherit',
          },
        },
      }}
    />
  );
};

export default Example;
