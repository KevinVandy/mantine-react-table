import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import { MantineReactTable } from 'mantine-react-table';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false, // could disable just this column's filter
        header: 'ID',
      },

      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      {
        id: 1,
        firstName: 'Hugh',
        middleName: 'Jay',
        lastName: 'Mungus',
      },
      {
        id: 2,
        firstName: 'Leroy',
        middleName: 'Leroy',
        lastName: 'Jenkins',
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnFilters={false} //disable all column filters
    />
  );
};

export default Example;
