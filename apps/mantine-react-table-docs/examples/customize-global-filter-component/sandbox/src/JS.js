import React, { useMemo } from 'react';
import MantineReactTable from 'mantine-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
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
        accessorKey: 'middleName',
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
    ],
    [],
    //end
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableGlobalFilterModes
      initialState={{
        showGlobalFilter: true,
      }}
      positionGlobalFilter="left"
      mantineSearchTextInputProps={{
        placeholder: `Search ${data.length} rows`,
        sx: { minWidth: '300px' },
        variant: 'outlined',
      }}
    />
  );
};

export default Example;
