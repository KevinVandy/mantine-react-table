import { MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Detail Panel Examples',
};

export default meta;

export const DetailPanelEnabled = () => (
  <MantineReactTable
    columns={[
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
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);

export const CustomExpandRotation = () => (
  <MantineReactTable
    columns={[
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
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    enableExpandAll={false}
    mantineExpandButtonProps={({ row }) => ({
      style: {
        transform: row.getIsExpanded() ? 'rotate(-180deg)' : 'rotate(270deg)',
        transition: 'transform 0s',
      },
    })}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);

export const DetailPanelEnabledConditional = () => (
  <MantineReactTable
    columns={[
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
    ]}
    data={[...Array(10)].map(() => ({
      address: faker.location.streetAddress(),
      age: faker.number.int(100) + 5,
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    renderDetailPanel={({ row }) =>
      row.original.age > 50 ? (
        <div style={{ display: 'grid' }}>
          <span>City: {row.original.city}</span>
          <span>State: {row.original.state}</span>
          <span>Zip: {row.original.zipCode}</span>
          <span>Phone: {row.original.phone}</span>
        </div>
      ) : undefined
    }
  />
);

export const DetailPanelEnabledConditionalHide = () => (
  <MantineReactTable
    columns={[
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
    ]}
    data={[...Array(10)].map(() => ({
      address: faker.location.streetAddress(),
      age: faker.number.int(100) + 5,
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    mantineExpandButtonProps={({ row }) => ({
      style: {
        display: row.original.age > 50 ? 'flex' : 'none',
      },
    })}
    renderDetailPanel={({ row }) =>
      row.original.age > 50 ? (
        <div style={{ display: 'grid' }}>
          <span>City: {row.original.city}</span>
          <span>State: {row.original.state}</span>
          <span>Zip: {row.original.zipCode}</span>
          <span>Phone: {row.original.phone}</span>
        </div>
      ) : (
        'No details available'
      )
    }
  />
);

export const DetailPanelExpandColumnLast = () => (
  <MantineReactTable
    columns={[
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
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    displayColumnDefOptions={{
      'mrt-row-expand': {
        mantineTableBodyCellProps: {
          align: 'right',
        },
        mantineTableHeadCellProps: {
          align: 'right',
        },
      },
    }}
    positionExpandColumn="last"
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);

export const DetailPanelExpandedByDefault = () => (
  <MantineReactTable
    columns={[
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
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    initialState={{ expanded: true }}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);

export const DetailPanelExpandAllDisabled = () => (
  <MantineReactTable
    columns={[
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
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    enableExpandAll={false}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);
