import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Table Dimensions Examples',
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

const data = [...Array(25)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const MaxWidthAndCentered = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantinePaperProps={{
      style: {
        maxWidth: '800px',
        margin: 'auto',
      },
    }}
  />
);

export const maxHeight = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableContainerProps={{
      style: {
        maxHeight: '500px',
      },
    }}
  />
);

export const minHeight = () => (
  <MantineReactTable
    columns={columns}
    data={data.slice(0, 5)}
    mantineTableContainerProps={{
      style: {
        minHeight: '800px',
      },
    }}
  />
);

export const minHeightParent = () => (
  <div style={{ height: '700px' }}>
    <MantineReactTable
      columns={columns}
      data={data.slice(0, 5)}
      mantineTableContainerProps={({ table }) => ({
        style: {
          height: `calc(100% - ${table.refs.topToolbarRef.current?.offsetHeight}px - ${table.refs.bottomToolbarRef.current?.offsetHeight}px)`,
        },
      })}
      mantinePaperProps={{
        style: {
          height: '100%',
        },
      }}
    />
  </div>
);
