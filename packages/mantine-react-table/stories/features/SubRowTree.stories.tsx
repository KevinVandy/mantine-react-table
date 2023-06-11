import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Sub Row Tree Examples',
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
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(5)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(80),
  address: faker.location.streetAddress(),
  phoneNumber: faker.phone.number(),
  subRows: [...Array(faker.number.int(4))].map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(80),
    address: faker.location.streetAddress(),
    phoneNumber: faker.phone.number(),
    subRows: [...Array(3)].map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int(80),
      address: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      subRows: [...Array(2)].map(() => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int(80),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
      })),
    })),
  })),
}));

export const SubRowTreeEnabledDefault = () => (
  <MantineReactTable columns={columns} data={data} enableExpanding />
);

export const SubRowTreeDisableExpandAll = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableExpanding
    enableExpandAll={false}
  />
);

export const SubRowTreeFilterFromLeafRows = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    filterFromLeafRows
    initialState={{ showColumnFilters: true, expanded: true }}
  />
);

export const SubRowTreeMaxLeafRowFilterDepth0 = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    maxLeafRowFilterDepth={0}
    initialState={{ showColumnFilters: true, expanded: true }}
  />
);

export const SubRowTreeMaxLeafRowFilterDepth1 = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    maxLeafRowFilterDepth={1}
    initialState={{ showColumnFilters: true, expanded: true }}
  />
);

export const SubRowTreeMaxLeafRowFilterDepthAndFilterFromLeafRows = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    filterFromLeafRows
    maxLeafRowFilterDepth={0}
    initialState={{ showColumnFilters: true, expanded: true }}
  />
);

export const SubRowTreeWithSelection = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    enableRowSelection
  />
);

export const SubRowTreeWithSelectionNoSubRowSelection = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    enableRowSelection
    enableSubRowSelection={false}
  />
);

export const SubRowTreeWithSingleSelection = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableExpanding
    enableMultiRowSelection={false}
    enablePagination={false}
    enableRowSelection
  />
);
