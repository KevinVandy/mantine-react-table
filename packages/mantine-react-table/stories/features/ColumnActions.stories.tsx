import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import { Divider, Menu } from '@mantine/core';

const meta: Meta = {
  title: 'Features/Column Action Examples',
};

export default meta;

interface Row {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
}

const columns: MRT_ColumnDef<Row>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
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

const data: Row[] = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const ColumnActionsEnabledDefault = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const ColumnActionsDisabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
  />
);

export const ColumnActionsDisabledPerColumn = () => (
  <MantineReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Address',
        accessorKey: 'address',
        enableColumnActions: false,
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnActions: false,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        enableColumnActions: false,
      },
    ]}
    data={data}
  />
);

export const ColumnActionsEnabledPerColumn = () => (
  <MantineReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Address',
        accessorKey: 'address',
        enableColumnActions: true,
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnActions: true,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        enableColumnActions: true,
      },
    ]}
    data={data}
    enableColumnActions={false}
  />
);

export const CustomColumnActions = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    renderColumnActionsMenuItems={() => (
      <>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </>
    )}
  />
);

export const CustomColumnActionsPerColumn = () => (
  <MantineReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
        renderColumnActionsMenuItems: () => (
          <>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
          </>
        ),
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        renderColumnActionsMenuItems: () => (
          <>
            <Menu.Item>Item 2</Menu.Item>
            <Menu.Item>Item 3</Menu.Item>
          </>
        ),
      },
      {
        header: 'Address',
        accessorKey: 'address',
        enableColumnActions: true,
        renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
          <>
            {internalColumnMenuItems}
            <Divider />
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
          </>
        ),
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnActions: true,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        enableColumnActions: true,
      },
    ]}
    data={data}
  />
);
