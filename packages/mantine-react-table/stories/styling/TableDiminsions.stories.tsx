import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Table Dimensions Examples',
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

const data = [...Array(25)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const MaxWidthAndCentered = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantinePaperProps={{
      style: {
        margin: 'auto',
        maxWidth: '800px',
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
      mantinePaperProps={{
        style: {
          height: '100%',
        },
      }}
      mantineTableContainerProps={({ table }) => ({
        style: {
          height: `calc(100% - ${table.refs.topToolbarRef.current?.offsetHeight}px - ${table.refs.bottomToolbarRef.current?.offsetHeight}px)`,
        },
      })}
    />
  </div>
);
