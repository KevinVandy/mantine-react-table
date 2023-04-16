import React from 'react';
import { Meta } from '@storybook/react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Search Examples',
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

const data = [...Array(200)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
  age: +faker.datatype.float({ min: 0, max: 100 }),
}));

export const SearchEnabledDefault = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const SearchContains = () => (
  <MantineReactTable columns={columns} data={data} globalFilterFn="contains" />
);

export const CustomGlobalFilterFn = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    filterFns={{
      myCustomFilterFn: (row, id, filterValue) =>
        row.getValue<string>(id).startsWith(filterValue),
    }}
    globalFilterFn="myCustomFilterFn"
  />
);

export const SearchGlobalFilterModes = () => (
  <MantineReactTable columns={columns} data={data} enableGlobalFilterModes />
);

export const SearchGlobalFilterModeOptions = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableGlobalFilterModes
    globalFilterModeOptions={['asfd', 'contains', 'fuzzy']}
  />
);

export const SearchRankedResultsEnabledByDefault = () => (
  <MantineReactTable columns={columns} data={data} enableRowNumbers />
);

export const SearchDisableRankedResults = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    enableGlobalFilterRankedResults={false}
  />
);

export const ShowSearchRightBoxByDefault = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    initialState={{ showGlobalFilter: true }}
  />
);

export const ShowSearchBoxLeftByDefault = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    initialState={{ showGlobalFilter: true }}
    positionGlobalFilter="left"
  />
);

export const ShowSearchBoxLeftByDefaultWithSelection = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    initialState={{ showGlobalFilter: true }}
    positionGlobalFilter="left"
  />
);

export const JustASearchBox = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    initialState={{ showGlobalFilter: true }}
    enableToolbarInternalActions={false}
  />
);

export const SearchDisabled = () => (
  <MantineReactTable columns={columns} data={data} enableGlobalFilter={false} />
);

export const CustomizeSearchTextBox = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    initialState={{ showGlobalFilter: true }}
    mantineSearchTextInputProps={{
      variant: 'filled',
      placeholder: 'Search 100 rows',
      label: 'Search',
    }}
  />
);
