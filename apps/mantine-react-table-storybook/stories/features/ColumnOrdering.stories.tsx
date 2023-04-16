import React from 'react';
import { Meta } from '@storybook/react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Ordering Examples',
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
    header: 'Email Address',
    accessorKey: 'email',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ColumnOrderingEnabled = () => (
  <MantineReactTable columns={columns} data={data} enableColumnOrdering />
);

export const ColumnOrderingDisabledPerColumn = () => (
  <MantineReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnOrdering: false,
      },
    ]}
    data={data}
    enableColumnOrdering
  />
);

export const ColumnOrderingWithSelect = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableRowSelection
  />
);

export const ColumnOrderingWithPinning = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enablePinning
  />
);

export const ColumnOrderingNoDragHandles = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnDragging={false}
    enableColumnOrdering
  />
);
