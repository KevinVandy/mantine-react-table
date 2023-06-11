import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import { Text } from '@mantine/core';

const meta: Meta = {
  title: 'Styling/Custom Table Body Examples',
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
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(25)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 20, max: 60 }),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const CustomTableBody = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyProps={{
      children: 'Custom Table Body',
    }}
  />
);

export const CustomEmptyRowsJSX = () => (
  <MantineReactTable
    columns={columns}
    data={[]}
    renderEmptyRowsFallback={() => <Text>OMG THERE ARE NO ROWS 😳</Text>}
  />
);
