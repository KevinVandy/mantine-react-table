import React, { useMemo } from 'react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

const Example = () => {
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'id',
          enableColumnActions: false,
          header: 'ID',
        },
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
      ] as MRT_ColumnDef<(typeof data)[0]>[],
    [],
  );

  const data = useMemo(
    //data definitions...
    () => [
      {
        id: 1,
        firstName: 'Dylan',
        lastName: 'Murray',
      },
      {
        id: 2,
        firstName: 'Raquel',
        lastName: 'Kohler',
      },
    ],
    [],
    //end
  );

  return <MantineReactTable columns={columns} data={data} />;
};

export default Example;
