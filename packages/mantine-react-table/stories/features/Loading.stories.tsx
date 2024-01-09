import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Loading Examples',
};

export default meta;

interface Person {
  address: null | string;
  firstName: null | string;
  lastName: null | string;
  phoneNumber: null | string;
  state: null | string;
}

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

const blankData = [...Array(100)].map(() => ({
  address: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  state: null,
}));

export const Loading = () => (
  <MantineReactTable columns={columns} data={[]} state={{ isLoading: true }} />
);

export const LoadingWithSomeData = () => (
  <MantineReactTable
    columns={columns}
    data={[...data.slice(0, 5), ...blankData]}
    state={{ isLoading: true }}
  />
);

export const LoadingWithSelection = () => (
  <MantineReactTable
    columns={columns}
    data={[]}
    enableRowSelection
    state={{ isLoading: true }}
  />
);

export const LoadingWithDetailPanelExample = () => (
  <MantineReactTable
    columns={columns}
    data={[]}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.firstName?.toString()}</span>
        <span>State: {row.original.state}</span>
        <span>Address: {row.original.address}</span>
        <span>Phone: {row.original.phoneNumber}</span>
      </div>
    )}
    state={{ isLoading: true }}
  />
);

export const SkeletonDisplayColumns = () => (
  <MantineReactTable
    columns={columns}
    data={[]}
    enableExpanding
    enableRowActions
    enableRowNumbers
    enableRowSelection
    state={{ showSkeletons: true }}
  />
);

export const ReloadingExample = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    state={{ showProgressBars: true }}
  />
);

export const OnlyTopProgressBar = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineProgressProps={({ isTopToolbar }) => ({
      style: { display: isTopToolbar ? 'block' : 'none' },
    })}
    state={{ showProgressBars: true }}
  />
);
