import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<(typeof data)[0]>[]>(
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
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      mantineTableHeadCellProps={{
        style: {
          '& .mantine-TableHeadCell-Content': {
            justifyContent: 'space-between',
          },
        },
      }}
    />
  );
};

export default Example;
