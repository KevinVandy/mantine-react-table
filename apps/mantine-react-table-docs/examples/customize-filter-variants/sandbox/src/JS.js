import React, { useMemo } from 'react';
import MantineReactTable from 'mantine-react-table';
import { citiesList, data, usStateList } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        header: 'Account Status',
        accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'), //must be strings
        id: 'isActive',
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
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
        filterFn: 'betweenInclusive', // use betweenInclusive instead of between
      },
      {
        accessorKey: 'city',
        header: 'City',
        filterVariant: 'select',
        filterSelectOptions: citiesList,
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterVariant: 'multi-select',
        filterSelectOptions: usStateList,
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
