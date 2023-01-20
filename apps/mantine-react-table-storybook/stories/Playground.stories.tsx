import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  MantineReactTable,
  MantineReactTableProps,
  MRT_ColumnDef,
} from 'mantine-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Prop Playground',
  component: MantineReactTable,
};

export default meta;

const Template: Story<MantineReactTableProps<Person>> = (
  args: MantineReactTableProps<Person>,
) => <MantineReactTable {...args} />;

export const Default = Template.bind({});

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
}

Default.args = {
  columns: [
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
  ] as MRT_ColumnDef<Person>[],
  data: [...Array(6)].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
} as MantineReactTableProps<Person>;

// const mockData = [...Array(7)].map(() => ({
//   firstName: faker.name.firstName(),
//   lastName: faker.name.lastName(),
//   address: faker.address.streetAddress(),
//   city: faker.address.city(),
//   state: faker.address.state(),
// }));

// const mockData = [...Array(250)].map(() => ({
//   firstName: faker.name.firstName(),
//   lastName: faker.name.lastName(),
//   age: faker.datatype.number(80),
//   gender: faker.name.gender(true),
//   state: faker.address.state(),
//   salary: +faker.finance.amount(10000, 100000, 0),
// }));

// console.log(mockData, null, 2);
