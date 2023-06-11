import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import { Button, Menu } from '@mantine/core';
import { IconShare, IconUser, IconTrash } from '@tabler/icons-react';

const meta: Meta = {
  title: 'Features/Row Actions Examples',
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

const data = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const RowActionsEnabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActionMenuItems={({ row }) => [
      <Menu.Item
        icon={<IconUser />}
        key={1}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        icon={<IconTrash />}
        key={2}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        icon={<IconShare />}
        key={3}
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
    enableRowActions
    enableEditing
    renderRowActionMenuItems={({ row }) => [
      <Menu.Item
        icon={<IconUser />}
        key={1}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        icon={<IconTrash />}
        key={2}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        icon={<IconShare />}
        key={3}
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
        icon={<IconUser />}
        key={1}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        icon={<IconTrash />}
        key={2}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        icon={<IconShare />}
        key={3}
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
          variant="filled"
          color="lightblue"
          onClick={() => {
            console.info('View Profile', row);
          }}
        >
          View
        </Button>
        <Button
          variant="filled"
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
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
          variant="filled"
          color="lightblue"
          onClick={() => {
            console.info('View Profile', row);
          }}
        >
          View
        </Button>
        <Button
          variant="filled"
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
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
        icon={<IconUser />}
        key={1}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        icon={<IconTrash />}
        key={2}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        icon={<IconShare />}
        key={3}
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
        icon={<IconUser />}
        key={1}
        onClick={() => {
          console.info('View Profile', row);
        }}
      >
        View Profile
      </Menu.Item>,
      <Menu.Item
        icon={<IconTrash />}
        key={2}
        onClick={() => {
          console.info('Remove', row);
        }}
      >
        Remove
      </Menu.Item>,
      <Menu.Item
        icon={<IconShare />}
        key={3}
        onClick={() => {
          console.info('Share', row);
        }}
      >
        Share
      </Menu.Item>,
    ]}
  />
);
