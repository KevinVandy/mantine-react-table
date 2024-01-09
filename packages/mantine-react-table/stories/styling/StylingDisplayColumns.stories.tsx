import { Button } from '@mantine/core';
import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Styling Display Columns',
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

export const CustomizeDisplayColumns = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-actions': {
        mantineTableHeadCellProps: {
          style: {
            fontSize: '20px',
            fontStyle: 'italic',
          },
        },
        size: 160,
      },
      'mrt-row-expand': {
        enableColumnActions: true,
        enableResizing: true,
        size: 70,
      },
      'mrt-row-numbers': {
        enableColumnOrdering: true,
        mantineTableBodyCellProps: {
          style: {
            color: 'red',
            fontSize: '24px',
          },
        },
      },
    }}
    enableColumnOrdering
    enableColumnResizing
    enableRowActions
    enableRowNumbers
    enableRowSelection
    renderDetailPanel={() => <div>Detail Panel</div>}
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
