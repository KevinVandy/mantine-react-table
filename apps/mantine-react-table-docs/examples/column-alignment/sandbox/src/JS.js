import React, { useMemo } from 'react';
import MantineReactTable from 'mantine-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 100,
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 100,
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'age',
        header: 'Age',
        mantineTableHeadCellProps: {
          align: 'right',
        },
        mantineTableBodyCellProps: {
          align: 'right',
        },
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        mantineTableHeadCellProps: {
          align: 'right',
        },
        mantineTableBodyCellProps: {
          align: 'right',
        },
        Cell: ({ cell }) =>
          cell
            .getValue()
            .toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      },
    ],
    [],
  );

  return <MantineReactTable columns={columns} data={data} />;
};

export default Example;
