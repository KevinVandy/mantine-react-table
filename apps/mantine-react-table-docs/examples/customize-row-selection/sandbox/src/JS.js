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
    mantineSelectCheckboxProps: { color: 'red', size: 'xl' },
  });

  return <MantineReactTable table={table} />;
};

export default Example;
