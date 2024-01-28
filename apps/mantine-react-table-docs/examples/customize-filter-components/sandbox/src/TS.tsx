import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { data } from './makeData';

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
};

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        mantineFilterTextInputProps: { placeholder: 'ID' },
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        filterFn: 'equals',
        mantineFilterSelectProps: {
          data: ['Male', 'Female', 'Other'] as any,
        },
        filterVariant: 'select',
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      initialState={{ showColumnFilters: true }} //show filters by default
      mantineFilterTextInputProps={{
        style: { borderBottom: 'unset', marginTop: '8px' },
        variant: 'filled',
      }}
      mantineFilterSelectProps={{
        style: { borderBottom: 'unset', marginTop: '8px' },
        variant: 'filled',
      }}
    />
  );
};

export default Example;
