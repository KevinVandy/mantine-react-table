import React from 'react';
import { Meta, Story } from '@storybook/react';
import MantineReactTable, {
  MantineReactTableProps,
  MRT_ColumnDef,
} from 'mantine-react-table';
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

export const ColumnOrderingEnabled: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} enableColumnOrdering />
);

export const ColumnOrderingDisabledPerColumn: Story<
  MantineReactTableProps
> = () => (
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

export const ColumnOrderingWithSelect: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableRowSelection
  />
);

export const ColumnOrderingWithPinning: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enablePinning
  />
);

export const ColumnOrderingNoDragHandles: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnDragging={false}
    enableColumnOrdering
  />
);
