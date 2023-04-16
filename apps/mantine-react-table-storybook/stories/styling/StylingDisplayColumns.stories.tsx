import React from 'react';
import { Meta } from '@storybook/react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { faker } from '@faker-js/faker';
import { Button } from '@mantine/core';

const meta: Meta = {
  title: 'Styling/Styling Display Columns',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
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

export const CustomizeDisplayColumns = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-actions': {
        mantineTableHeadCellProps: {
          sx: {
            fontSize: '20px',
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
        mantineTableBodyCellProps: {
          sx: {
            color: 'red',
            fontSize: '24px',
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
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <Button
          variant="filled"
          color="lightblue"
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
