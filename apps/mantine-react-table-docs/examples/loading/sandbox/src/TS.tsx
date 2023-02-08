import React, { useMemo } from 'react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { Person } from './makeData';

const Example = () => {
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
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  return (
    <MantineReactTable
      columns={columns}
      data={[]}
      state={{ isLoading: true }}
    />
  );
};

export default Example;
