import React, { FC, useMemo } from 'react';
import MantineReactTable, { MRT_ColumnDef } from 'mantine-react-table';
import { data, Person } from './makeData';
import { darken } from '@mui/material';

const Example: FC = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
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
      {
        accessorKey: 'address',
        header: 'Address',
        size: 300,
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

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      mantinePaperProps={{
        elevation: 0,
        sx: {
          borderRadius: '0',
          border: '1px dashed #e0e0e0',
        },
      }}
      mantineTableBodyProps={{
        sx: (theme) => ({
          '& tr:nth-of-type(odd)': {
            backgroundColor: darken(theme.palette.background.default, 0.1),
          },
        }),
      }}
    />
  );
};

export default Example;
