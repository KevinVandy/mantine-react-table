import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Sticky Header Examples',
  parameters: {
    status: {
      type: 'stable',
    },
  },
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
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const StickyHeaderDisabledDefault = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    initialState={{ pagination: { pageSize: 25, pageIndex: 0 } }}
  />
);

export const EnableStickyHeader = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    initialState={{ pagination: { pageSize: 25, pageIndex: 0 } }}
    enableStickyHeader
  />
);

export const StickyHeaderShorterTable = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableStickyHeader
    enableRowSelection
    enablePinning
    initialState={{ pagination: { pageSize: 25, pageIndex: 0 } }}
    mantineTableContainerProps={{ sx: { maxHeight: 400 } }}
  />
);

const columnsWithFooters: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
    footer: 'First Name',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    footer: 'Last Name',
  },
  {
    header: 'Address',
    accessorKey: 'address',
    footer: 'Address',
  },
  {
    header: 'State',
    accessorKey: 'state',
    footer: 'State',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
    footer: 'Phone Number',
  },
];

export const disableStickyFooter = () => (
  <MantineReactTable
    columns={columnsWithFooters}
    data={data}
    initialState={{ pagination: { pageSize: 25, pageIndex: 0 } }}
    mantineTableContainerProps={{ sx: { maxHeight: 400 } }}
    enableStickyHeader
    enableStickyFooter={false}
    enableRowNumbers
  />
);

export const enableStickyFooter = () => (
  <MantineReactTable
    columns={columnsWithFooters}
    data={data}
    initialState={{ pagination: { pageSize: 25, pageIndex: 0 } }}
    mantineTableContainerProps={{ sx: { maxHeight: 400 } }}
    enableStickyHeader
    enableStickyFooter
    enableRowNumbers
  />
);
