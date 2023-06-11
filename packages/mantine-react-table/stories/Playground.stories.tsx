import { type Meta } from '@storybook/react';
import {
  MantineReactTable,
  type MantineReactTableProps,
  type MRT_ColumnDef,
} from '../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Prop Playground',
  component: MantineReactTable,
};

export default meta;

const Template = (args: MantineReactTableProps<Person>) => (
  <MantineReactTable {...args} />
);

export const Default = Template.bind({});

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
}

//@ts-ignore
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
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(80),
    address: faker.location.streetAddress(),
  })),
} as MantineReactTableProps<Person>;
