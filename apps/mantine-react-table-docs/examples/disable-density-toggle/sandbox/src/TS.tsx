import { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo(
    () =>
      [
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
      ] as MRT_ColumnDef<Person>[],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableDensityToggle={false}
      initialState={{ density: 'xs' }}
    />
  );
};

export default Example;
