import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Resizing Examples',
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
    header: 'Zip Code',
    accessorKey: 'zipCode',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(88)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  zipCode: faker.location.zipCode(),
  phoneNumber: faker.phone.number(),
}));

export const ColumnResizingEnabledDefaultOnChange = () => (
  <MantineReactTable columns={columns} data={data} enableColumnResizing />
);

export const ColumnResizingEnabledNoColumnActions = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    enableColumnActions={false}
  />
);

export const ColumnResizingDisabledSomeColumns = () => (
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
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Zip Code',
        accessorKey: 'zipCode',
        enableResizing: false,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
    ]}
    data={data}
    enableColumnResizing
  />
);

export const ColumnResizingEnabledOnEnd = () => (
  <MantineReactTable
    columnResizeMode="onEnd"
    columns={columns}
    data={data}
    enableColumnResizing
  />
);

export const ColumnResizingCustomDefaultWidths = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    defaultColumn={{ size: 150, minSize: 100, maxSize: 300 }}
  />
);

export const ColumnResizingWithPinning = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    enablePinning
    initialState={{ columnPinning: { left: ['firstName', 'lastName'] } }}
  />
);

export const ColumnResizingWithHeaderGroups = () => (
  <MantineReactTable
    columns={[
      {
        header: 'Name',
        footer: 'Name',
        columns: [
          {
            header: 'First Name',
            footer: 'First Name',
            accessorKey: 'firstName',
          },

          {
            header: 'Last Name',
            footer: 'Last Name',
            accessorKey: 'lastName',
          },
        ],
      },
      {
        header: 'Info',
        footer: 'Info',
        columns: [
          {
            header: 'Age',
            footer: 'Age',
            accessorKey: 'age',
          },
          {
            header: 'Address',
            footer: 'Address',
            accessorKey: 'address',
          },
        ],
      },
    ]}
    data={[...Array(5)].map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int(80),
      address: faker.location.streetAddress(),
    }))}
    enableColumnResizing
    enableRowSelection
  />
);

export const ColumnResizingWithHeaderGroupsGrid = () => (
  <MantineReactTable
    columns={[
      {
        header: 'Name',
        footer: 'Name',
        columns: [
          {
            header: 'First Name',
            footer: 'First Name',
            accessorKey: 'firstName',
          },

          {
            header: 'Last Name',
            footer: 'Last Name',
            accessorKey: 'lastName',
          },
        ],
      },
      {
        header: 'Info',
        footer: 'Info',
        columns: [
          {
            header: 'Age',
            footer: 'Age',
            accessorKey: 'age',
          },
          {
            header: 'Address',
            footer: 'Address',
            accessorKey: 'address',
          },
        ],
      },
    ]}
    data={[...Array(5)].map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int(80),
      address: faker.location.streetAddress(),
    }))}
    enableColumnResizing
    enableRowSelection
    layoutMode="grid"
  />
);

export const ColumnResizingLayoutGridNoFlexGrow = () => (
  <MantineReactTable
    columns={columns.slice(0, 3)}
    data={data}
    layoutMode="grid"
    enableRowSelection
    enableColumnResizing
    mantineTableHeadCellProps={{
      sx: {
        flex: '0 0 auto',
      },
    }}
    mantineTableBodyCellProps={{
      sx: {
        flex: '0 0 auto',
      },
    }}
  />
);
