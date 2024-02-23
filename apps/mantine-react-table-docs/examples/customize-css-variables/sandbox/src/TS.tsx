import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import classes from './CSS.module.css'; //import your custom css
import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { data, type Person } from './makeData';
import { MantineProvider, useMantineTheme } from '@mantine/core';

const Example = () => {
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

  const parentTheme = useMantineTheme();

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableColumnPinning: true,
    enableRowPinning: true,
    mantineTableProps: { striped: 'even' },
    mantinePaperProps: { className: classes.paper },
    mantineTopToolbarProps: { className: classes.toolbars },
    mantineBottomToolbarProps: { className: classes.toolbars },
  });

  return (
    // Changing the Mantine Theme just for this table and not the whole app
    <MantineProvider theme={{ ...parentTheme, primaryColor: 'pink' }}>
      <MantineReactTable table={table} />
    </MantineProvider>
  );
};

export default Example;
