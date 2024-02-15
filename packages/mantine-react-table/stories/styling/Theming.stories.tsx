import { MantineProvider } from '@mantine/core';
import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Theming',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];

const data = [...Array(21)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const DefaultTheme = () => (
  <MantineReactTable columns={columns} data={data} enableRowSelection />
);

export const CustomLightTheme = () => {
  return (
    <MantineProvider
      theme={{
        colors: {
          'bright-pink': [
            '#F0BBDD',
            '#ED9BCF',
            '#EC7CC3',
            '#ED5DB8',
            '#F13EAF',
            '#F71FA7',
            '#FF00A1',
            '#E00890',
            '#C50E82',
            '#AD1374',
          ],
        },
        primaryColor: 'bright-pink',
        primaryShade: { dark: 7, light: 6 },
      }}
    >
      <MantineReactTable columns={columns} data={data} enableRowSelection />
    </MantineProvider>
  );
};

export const CustomDarkTheme = () => {
  return (
    <MantineProvider
      theme={{
        colors: {
          'bright-pink': [
            '#F0BBDD',
            '#ED9BCF',
            '#EC7CC3',
            '#ED5DB8',
            '#F13EAF',
            '#F71FA7',
            '#FF00A1',
            '#E00890',
            '#C50E82',
            '#AD1374',
          ],
        },
        primaryColor: 'bright-pink',
        primaryShade: { dark: 7, light: 6 },
      }}
    >
      <MantineReactTable columns={columns} data={data} enableRowSelection />
    </MantineProvider>
  );
};
