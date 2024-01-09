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
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: '#ff9800',
  //     },
  //     background: {
  //       default: '#ffffef',
  //     },
  //     secondary: {
  //       main: '#00bcd4',
  //     },
  //   },
  // });
  return (
    <MantineProvider theme={{ primaryColor: '#ff9800' }}>
      <MantineReactTable columns={columns} data={data} enableRowSelection />
    </MantineProvider>
  );
};

export const CustomDarkTheme = () => {
  // const theme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //     primary: {
  //       main: '#81980f',
  //     },
  //     secondary: {
  //       main: '#00bcd4',
  //     },
  //   },
  // });
  return (
    <MantineProvider theme={{ colorScheme: 'dark', primaryColor: '#81980f' }}>
      <MantineReactTable columns={columns} data={data} enableRowSelection />
    </MantineProvider>
  );
};
