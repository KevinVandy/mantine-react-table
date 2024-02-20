import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { data, type Person } from './makeData';

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
        accessorKey: 'email',
        header: 'Email Address',
        size: 300,
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnResizing
      layoutMode="grid"
      //Disables the default flex-grow behavior of the table cells
      mantineTableHeadCellProps={{
        style: {
          flex: '0 0 auto',
        },
      }}
      mantineTableBodyCellProps={{
        style: {
          flex: '0 0 auto',
        },
      }}
      //
    />
  );
};

export default Example;
