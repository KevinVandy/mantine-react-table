import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { data } from './makeData';

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
          accessorKey: 'age',
          header: 'Age',
        },
      ] as MRT_ColumnDef<(typeof data)[0]>[],
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
