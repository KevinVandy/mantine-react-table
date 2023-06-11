import React, { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { citiesList, data, usStateList, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'), //must be strings
        id: 'isActive',
        header: 'Account Status',
        filterVariant: 'checkbox',
        Cell: ({ cell }) =>
          cell.getValue() === 'true' ? 'Active' : 'Inactive',
        size: 220,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text', // default
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.hireDate), //convert to date for sorting and filtering
        id: 'hireDate',
        header: 'Hire Date',
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), // convert back to string for display
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
        filterFn: 'betweenInclusive', // use betweenInclusive instead of between
      },
      {
        accessorKey: 'city',
        header: 'City',
        filterVariant: 'select',
        mantineFilterSelectProps: {
          data: citiesList as any,
        },
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterVariant: 'multi-select',
        mantineFilterMultiSelectProps: {
          data: usStateList as any,
        },
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      initialState={{ showColumnFilters: true }}
    />
  );
};

export default Example;
