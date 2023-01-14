import React, { FC, useMemo } from 'react';
import MantineReactTable, { MRT_ColumnDef } from 'mantine-react-table';

const Example: FC = () => {
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'id',
          enableColumnFilter: false, // could disable just this column's filter
          header: 'ID',
        },
        //column definitions...
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'middleName',
          header: 'Middle Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        //end
      ] as MRT_ColumnDef<(typeof data)[0]>[],
    [],
  );

  const data = useMemo(
    //data definitions...
    () => [
      {
        id: 1,
        firstName: 'Hugh',
        middleName: 'Jay',
        lastName: 'Mungus',
      },
      {
        id: 2,
        firstName: 'Leroy',
        middleName: 'Leroy',
        lastName: 'Jenkins',
      },
    ],
    [],
    //end
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnFilters={false} //disable all column filters
    />
  );
};

export default Example;
