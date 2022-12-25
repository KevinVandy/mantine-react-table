import React, { FC, useMemo } from 'react';
import MantineReactTable, { MRT_ColumnDef } from 'mantine-react-table';
import { data, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
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
      //end
    ],

    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableRowNumbers
      rowNumberMode="static"
    />
  );
};

export default Example;
