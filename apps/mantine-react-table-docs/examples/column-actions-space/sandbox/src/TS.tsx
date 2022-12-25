import React, { FC, useMemo } from 'react';
import MantineReactTable, { MRT_ColumnDef } from 'mantine-react-table';

const data =
  //data definitions...
  [
    {
      id: 1,
      firstName: 'Dillon',
      lastName: 'Howler',
    },
    {
      id: 2,
      firstName: 'Ross',
      lastName: 'Everest',
    },
  ]; //end

const Example: FC = () => {
  const columns = useMemo<MRT_ColumnDef<typeof data[0]>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
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
    ],
    [], //end
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      muiTableHeadCellProps={{
        sx: {
          '& .Mui-TableHeadCell-Content': {
            justifyContent: 'space-between',
          },
        },
      }}
    />
  );
};

export default Example;
