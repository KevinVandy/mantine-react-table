import { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { MantineReactTable } from 'mantine-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
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
      displayColumnDefOptions={{
        'mrt-row-actions': {
          size: 350, //set custom width
          mantineTableHeadCellProps: {
            align: 'center', //change head cell props
          },
        },
        'mrt-row-numbers': {
          enableColumnOrdering: true, //turn on some features that are usually off
          enableResizing: true,
          mantineTableHeadCellProps: {
            style: {
              fontSize: '1.2rem',
            },
          },
        },
        'mrt-row-select': {
          enableColumnActions: true,
          enableHiding: true,
          size: 100,
        },
      }}
      enableColumnResizing
      enableColumnOrdering
      enableRowNumbers
      enableRowSelection
      enableRowActions
      renderRowActions={({ row }) => (
        <Box style={{ display: 'flex', gap: '16px' }}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </Box>
      )}
    />
  );
};

export default Example;
