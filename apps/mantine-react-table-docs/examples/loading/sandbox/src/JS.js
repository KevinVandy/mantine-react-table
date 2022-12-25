import React, { useMemo } from 'react';
import MantineReactTable from 'mantine-react-table';

const Example = () => {
  const columns = useMemo(
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
