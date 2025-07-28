import { MantineReactTable, useMantineReactTable } from '../../src';

import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Detail Panel Examples',
};

export default meta;

const data = [...Array(5)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(100) + 5,
  city: faker.location.city(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: faker.phone.number(),
  state: faker.location.state(),
  zipCode: faker.location.zipCode(),
}));

const columns = [
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
    accessorKey: 'age',
    header: 'age',
  },
];

export const DetailPanelEnabled = () => {
  const table = useMantineReactTable({
    columns,
    data,
    renderDetailPanel: ({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    ),
  });

  return <MantineReactTable table={table} />;
};

export const CustomExpandRotation = () => {
  const table = useMantineReactTable({
    columns,
    data,
    enableExpandAll: false,
    mantineExpandButtonProps: ({ row }) => ({
      style: {
        transform: row.getIsExpanded() ? 'rotate(-180deg)' : 'rotate(270deg)',
        transition: 'transform 0s',
      },
    }),
    renderDetailPanel: ({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    ),
  });

  return <MantineReactTable table={table} />;
};

export const DetailPanelEnabledConditional = () => {
  const table = useMantineReactTable({
    columns,
    data,
    mantineExpandButtonProps: ({ row }) => ({
      style: {
        transform: row.getIsExpanded() ? 'rotate(-180deg)' : 'rotate(270deg)',
        transition: 'transform 0s',
      },
    }),
    renderDetailPanel: ({ row }) =>
      row.original.age > 50 ? (
        <div style={{ display: 'grid' }}>
          <span>City: {row.original.city}</span>
          <span>State: {row.original.state}</span>
          <span>Zip: {row.original.zipCode}</span>
          <span>Phone: {row.original.phone}</span>
        </div>
      ) : undefined,
  });

  return <MantineReactTable table={table} />;
};

export const DetailPanelEnabledConditionalHide = () => {
  const table = useMantineReactTable({
    columns,
    data,
    mantineExpandButtonProps: ({ row }) => ({
      style: {
        display: row.original.age > 50 ? 'flex' : 'none',
      },
    }),
    renderDetailPanel: ({ row }) =>
      row.original.age > 50 ? (
        <div style={{ display: 'grid' }}>
          <span>City: {row.original.city}</span>
          <span>State: {row.original.state}</span>
          <span>Zip: {row.original.zipCode}</span>
          <span>Phone: {row.original.phone}</span>
        </div>
      ) : (
        'No details available'
      ),
  });

  return <MantineReactTable table={table} />;
};

export const DetailPanelExpandColumnLast = () => {
  const table = useMantineReactTable({
    columns,
    data,
    displayColumnDefOptions: {
      'mrt-row-expand': {
        mantineTableBodyCellProps: {
          align: 'right',
        },
        mantineTableHeadCellProps: {
          align: 'right',
        },
      },
    },
    positionExpandColumn: 'last',
    renderDetailPanel: ({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    ),
  });

  return <MantineReactTable table={table} />;
};

export const DetailPanelExpandedByDefault = () => {
  const table = useMantineReactTable({
    columns,
    data,
    initialState: { expanded: true },
    renderDetailPanel: ({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    ),
  });

  return <MantineReactTable table={table} />;
};

export const DetailPanelExpandAllDisabled = () => {
  const table = useMantineReactTable({
    columns,
    data,
    enableExpandAll: false,
    renderDetailPanel: ({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    ),
  });

  return <MantineReactTable table={table} />;
};
