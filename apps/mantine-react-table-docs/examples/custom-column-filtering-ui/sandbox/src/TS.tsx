import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css';
import { useMemo } from 'react';
import {
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
  MRT_TableHeadCellFilterContainer,
  type MRT_Header,
} from 'mantine-react-table';
import { data, type Person } from './makeData';
import { Paper, Stack } from '@mantine/core';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        filterVariant: 'autocomplete',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        filterFn: 'equals',
        filterSelectOptions: ['Male', 'Female', 'Other'],
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

  const table = useMantineReactTable({
    columns,
    data,
    columnFilterDisplayMode: 'custom', //we will render our own filtering UI
    enableFacetedValues: true,
    mantineFilterTextInputProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
    }),
  });

  return (
    <Stack>
      <MRT_TableContainer table={table} />
      <Paper>
        <Stack>
          {table.getLeafHeaders().map((header) => (
            <MRT_TableHeadCellFilterContainer
              key={header.id}
              header={header as MRT_Header<Person>}
              table={table}
            />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Example;
