import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  MantineReactTable,
  MantineReactTableProps,
  MRT_ColumnDef,
} from 'mantine-react-table';
import { faker } from '@faker-js/faker';
import { MantineProvider } from '@mantine/core';

const meta: Meta = {
  title: 'Styling/Theming',
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
];

const data = [...Array(21)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const DefaultTheme: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} enableRowSelection />
);

export const CustomLightTheme: Story<MantineReactTableProps> = () => {
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

export const CustomDarkTheme: Story<MantineReactTableProps> = () => {
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
