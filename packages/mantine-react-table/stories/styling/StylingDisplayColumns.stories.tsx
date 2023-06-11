import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import { Button } from '@mantine/core';

const meta: Meta = {
  title: 'Styling/Styling Display Columns',
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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(80),
  address: faker.location.streetAddress(),
}));

export const CustomizeDisplayColumns = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-actions': {
        mantineTableHeadCellProps: {
          sx: {
            fontSize: '20px',
            fontStyle: 'italic',
          },
        },
        size: 160,
      },
      'mrt-row-expand': {
        size: 70,
        enableColumnActions: true,
        enableResizing: true,
      },
      'mrt-row-numbers': {
        enableColumnOrdering: true,
        mantineTableBodyCellProps: {
          sx: {
            color: 'red',
            fontSize: '24px',
          },
        },
      },
    }}
    enableColumnOrdering
    enableColumnResizing
    enableRowNumbers
    enableRowSelection
    enableRowActions
    renderDetailPanel={() => <div>Detail Panel</div>}
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
