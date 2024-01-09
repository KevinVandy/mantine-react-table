import { Button, Menu } from '@mantine/core';
import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';
import { IconShare, IconTrash, IconUser } from '@tabler/icons-react';

const meta: Meta = {
  title: 'Features/Row Actions Examples',
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
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const data = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const RowActionsEnabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActionMenuItems={({ row }) => [
      <Menu.Item
        key={1}
        leftSection={<IconUser />}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        key={2}
        leftSection={<IconTrash />}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        key={3}
        leftSection={<IconShare />}
        onClick={() => {
          console.info('Share', row);
        }}
      >
        Share
      </Menu.Item>,
    ]}
  />
);

export const RowActionsAndEditingEnabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableEditing
    enableRowActions
    renderRowActionMenuItems={({ row }) => [
      <Menu.Item
        key={1}
        leftSection={<IconUser />}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        key={2}
        leftSection={<IconTrash />}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        key={3}
        leftSection={<IconShare />}
        onClick={() => {
          console.info('Share', row);
        }}
      >
        Share
      </Menu.Item>,
    ]}
  />
);

export const RowActionsLastColumn = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowActions
    initialState={{ density: 'xs' }}
    positionActionsColumn="last"
    renderRowActionMenuItems={({ row }) => [
      <Menu.Item
        key={1}
        leftSection={<IconUser />}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        key={2}
        leftSection={<IconTrash />}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        key={3}
        leftSection={<IconShare />}
        onClick={() => {
          console.info('Share', row);
        }}
      >
        Share
      </Menu.Item>,
    ]}
  />
);

export const CustomRowActionButtons = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActions={({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <Button
          color="lightblue"
          onClick={() => {
            console.info('View Profile', row);
          }}
          variant="filled"
        >
          View
        </Button>
        <Button
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
          variant="filled"
        >
          Remove
        </Button>
      </div>
    )}
  />
);

export const CustomRowActionButtonsLastColumn = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowActions
    positionActionsColumn="last"
    renderRowActions={({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <Button
          color="lightblue"
          onClick={() => {
            console.info('View Profile', row);
          }}
          variant="filled"
        >
          View
        </Button>
        <Button
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
          variant="filled"
        >
          Remove
        </Button>
      </div>
    )}
  />
);

export const RowActionsWithVirtualization = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowActions
    enableRowVirtualization
    renderRowActionMenuItems={({ row }) => [
      <Menu.Item
        key={1}
        leftSection={<IconUser />}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        key={2}
        leftSection={<IconTrash />}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        key={3}
        leftSection={<IconShare />}
        onClick={() => {
          console.info('Share', row);
        }}
      >
        Share
      </Menu.Item>,
    ]}
  />
);

export const RowActionsLastWithColumnOrdering = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableRowActions
    positionActionsColumn="last"
    renderRowActionMenuItems={({ row }) => [
      <Menu.Item
        key={1}
        leftSection={<IconUser />}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        key={2}
        leftSection={<IconTrash />}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        key={3}
        leftSection={<IconShare />}
        onClick={() => {
          console.info('Share', row);
        }}
      >
        Share
      </Menu.Item>,
    ]}
  />
);
