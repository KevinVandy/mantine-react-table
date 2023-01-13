import React, { useMemo } from 'react';
import MantineReactTable, {
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
} from 'mantine-react-table';
import { Box, Button, ActionIcon } from '@mantine/core';
import { IconPrinter } from '@tabler/icons';
import { data } from './makeData';

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
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
      },
    ],
    [],
    //end
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableRowSelection
      positionToolbarAlertBanner="bottom" //show selected rows count on bottom toolbar
      //add custom action buttons to top-left of top toolbar
      renderTopToolbarCustomActions={({ table }) => (
        <Box sx={{ display: 'flex', gap: '16px', padding: '4px' }}>
          <Button
            color="teal"
            onClick={() => {
              alert('Create New Account');
            }}
            variant="filled"
          >
            Create Account
          </Button>
          <Button
            color="red"
            disabled={!table.getIsSomeRowsSelected()}
            onClick={() => {
              alert('Delete Selected Accounts');
            }}
            variant="filled"
          >
            Delete Selected Accounts
          </Button>
        </Box>
      )}
      //customize built-in buttons in the top-right of top toolbar
      renderToolbarInternalActions={({ table }) => (
        <Box>
          {/* add custom button to print table  */}
          <ActionIcon
            onClick={() => {
              window.print();
            }}
          >
            <IconPrinter />
          </ActionIcon>
          {/* along-side built-in buttons in whatever order you want them */}
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ToggleFullScreenButton table={table} />
        </Box>
      )}
    />
  );
};

export default Example;
