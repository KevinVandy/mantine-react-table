import { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Title } from '@mantine/core';
import { data, type Person } from './makeData';

export const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
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
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      //just for demo purposes
      defaultColumn={{
        Cell: ({ cell }) => {
          //see how often cells are re-rendered
          // console.info('render cell', cell.id);
          return <>{cell.getValue()}</>;
        },
      }}
      editDisplayMode="row"
      enableColumnOrdering
      enableDensityToggle={false} //density toggle is not compatible with memoization
      enableEditing
      enableColumnPinning
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageSize: 20, pageIndex: 0 } }}
      memoMode="cells"
      mantineTableContainerProps={{ style: { maxHeight: '500px' } }}
      renderDetailPanel={({ row }) => <div>{row.original.firstName}</div>}
      renderTopToolbarCustomActions={() => (
        <Title order={4}>Memoized Cells</Title>
      )}
    />
  );
};

export default Example;
