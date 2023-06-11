import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import { Button, Menu } from '@mantine/core';
import { IconSend, IconUserCircle } from '@tabler/icons-react';

const meta: Meta = {
  title: 'Fixed Bugs/Click Propagation',
};

export default meta;

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
};

const columns: MRT_ColumnDef<Person>[] = [
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
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
];

const data = [...Array(6)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
}));

export const RowClickAndRowMenuActions = () => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableRowActions
      enableEditing
      renderRowActionMenuItems={() => (
        <>
          <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
          <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
        </>
      )}
      mantineTableBodyRowProps={{
        onClick: () => {
          alert('row click');
        },
      }}
    />
  );
};

export const RowClickAndRowButtonctions = () => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableRowActions
      enableEditing
      renderRowActions={() => (
        <Button onClick={(e) => e.stopPropagation()}>Test</Button>
      )}
      mantineTableBodyRowProps={{
        onClick: () => {
          alert('row click');
        },
      }}
    />
  );
};
