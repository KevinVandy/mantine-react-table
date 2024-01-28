import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
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
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableSelectAll: false,
    enableRowSelection: (row) => row.original.age >= 21, //enable row selection conditionally per row
    mantineSelectCheckboxProps: { color: 'red', size: 'lg' },
    positionToolbarAlertBanner: 'head-overlay',
  });

  return <MantineReactTable table={table} />;
};

export default Example;
