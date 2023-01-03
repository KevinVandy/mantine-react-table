import React from 'react';
import { Meta, Story } from '@storybook/react';
import MantineReactTable, {
  MantineReactTableProps,
  MRT_ColumnDef,
} from 'mantine-react-table';
import { faker } from '@faker-js/faker';
import { Button } from '@mantine/core';

const meta: Meta = {
  title: 'Styling/Styling Display Columns',
};

export default meta;

const columns: MRT_ColumnDef<typeof data[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
];
const data = [...Array(21)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const CustomizeDisplayColumns: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-actions': {
        muiTableHeadCellProps: {
          sx: {
            fontSize: '1.25rem',
            fontStyle: 'italic',
          },
        },
        size: 160,
      },
      'mrt-row-expand': {
        size: 70,
        enableColumnActions: true,
        enableResizing: true,
      },
      'mrt-row-numbers': {
        enableColumnOrdering: true,
        muiTableBodyCellProps: {
          sx: {
            color: 'red',
            fontSize: '1.5rem',
          },
        },
      },
    }}
    enableColumnOrdering
    enableColumnResizing
    enableRowNumbers
    enableRowSelection
    enableRowActions
    renderDetailPanel={() => <div>Detail Panel</div>}
    renderRowActions={({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Button
          variant="filled"
          color="primary"
          onClick={() => {
            console.info('View Profile', row);
          }}
        >
          View
        </Button>
        <Button
          variant="filled"
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
        >
          Remove
        </Button>
      </div>
    )}
  />
);
