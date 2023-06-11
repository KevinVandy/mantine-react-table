import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Custom Column Widths',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    size: 50,
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
    size: 300,
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    size: 100,
  },
  {
    header: 'Age',
    accessorKey: 'age',
    size: 50,
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
];
const data = [...Array(21)].map(() => ({
  id: faker.number.int(100),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(80),
  address: faker.location.streetAddress(),
}));

export const CustomWidths = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const CustomWidthsGrid = () => (
  <MantineReactTable columns={columns} data={data} layoutMode="grid" />
);
