import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import {
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Box, Button, ActionIcon, Flex } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
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
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    positionToolbarAlertBanner: 'bottom',
    //add custom action buttons to top-left of top toolbar
    renderTopToolbarCustomActions: ({ table }) => (
      <Box style={{ display: 'flex', gap: '16px', padding: '4px' }}>
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
    ),
    //customize built-in buttons in the top-right of top toolbar
    renderToolbarInternalActions: ({ table }) => (
      <Flex gap="xs" align="center">
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
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default Example;
