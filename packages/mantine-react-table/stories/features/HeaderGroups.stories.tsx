import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Header Groups Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'Name',
    id: 'name',
    columns: [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },

      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
    ],
  },
  {
    header: 'Info',
    id: 'info',
    columns: [
      {
        header: 'Age',
        accessorKey: 'age',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
    ],
  },
];

const data = [...Array(55)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(80),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
}));

export const HeaderGroups = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const HeaderGroupsWithStickyHeader = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableStickyHeader
    initialState={{ pagination: { pageIndex: 0, pageSize: 25 } }}
  />
);

export const HeaderAndFooterGroups = () => (
  <MantineReactTable
    columns={[
      {
        header: 'Name',
        id: 'name',
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
        id: 'info',
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
    data={data}
    enablePinning
  />
);

export const HeaderGroupsWithColumnOrdering = () => (
  <MantineReactTable columns={columns} data={data} enableColumnOrdering />
);

export const HeaderGroupsWithColumnPinning = () => (
  <MantineReactTable columns={columns} data={data} enablePinning />
);

export const HeaderGroupsWithColumResizing = () => (
  <MantineReactTable columns={columns} data={data} enableColumnResizing />
);

export const MixedHeaderGroups = () => {
  return (
    <MantineReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        {
          id: 'grouped',
          header: 'Grouped',
          columns: [
            {
              accessorKey: 'address',
              header: 'Address',
            },
          ],
        },
        {
          accessorKey: 'city',
          header: 'City',
        },
        {
          accessorKey: 'state',
          header: 'State',
        },
      ]}
      data={data}
    />
  );
};

export const DeepMixedHeaderGroups = () => {
  return (
    <MantineReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          id: 'grouped',
          header: 'Grouped',
          columns: [
            {
              header: 'Location',
              id: 'location',
              columns: [
                {
                  accessorKey: 'address',
                  header: 'Address',
                },
                {
                  accessorKey: 'city',
                  header: 'City',
                },
                {
                  accessorKey: 'state',
                  header: 'State',
                },
              ],
            },
          ],
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
      ]}
      data={data}
    />
  );
};
