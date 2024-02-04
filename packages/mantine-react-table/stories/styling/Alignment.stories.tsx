import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Table Alignment Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    footer: 'First Name',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    footer: 'Last Name',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    footer: 'Age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    footer: 'Address',
    header: 'Address',
  },
  {
    accessorKey: 'state',
    footer: 'State',
    header: 'State',
  },
  {
    accessorKey: 'phoneNumber',
    footer: 'Phone Number',
    header: 'Phone Number',
  },
];

const data = [...Array(25)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int({ max: 60, min: 20 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const DefaultLeft = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const DefaultLeftGrid = () => (
  <MantineReactTable columns={columns} data={data} layoutMode="grid" />
);

export const RightCells = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyCellProps={{
      align: 'right',
    }}
    mantineTableFooterCellProps={{
      align: 'right',
    }}
    mantineTableHeadCellProps={{
      align: 'right',
    }}
  />
);

export const RightCellsGrid = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    layoutMode="grid"
    mantineTableBodyCellProps={{
      align: 'right',
    }}
    mantineTableFooterCellProps={{
      align: 'right',
    }}
    mantineTableHeadCellProps={{
      align: 'right',
    }}
  />
);

export const CenterCells = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyCellProps={{
      align: 'center',
    }}
    mantineTableFooterCellProps={{
      align: 'center',
    }}
    mantineTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsGrid = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    layoutMode="grid"
    mantineTableBodyCellProps={{
      align: 'center',
    }}
    mantineTableFooterCellProps={{
      align: 'center',
    }}
    mantineTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsWithGrabHandle = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnDragging
    mantineTableBodyCellProps={{
      align: 'center',
    }}
    mantineTableFooterCellProps={{
      align: 'center',
    }}
    mantineTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsWithGrabHandleNoSorting = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnDragging
    enableSorting={false}
    mantineTableBodyCellProps={{
      align: 'center',
    }}
    mantineTableFooterCellProps={{
      align: 'center',
    }}
    mantineTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsNoColumnActions = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
    mantineTableBodyCellProps={{
      align: 'center',
    }}
    mantineTableFooterCellProps={{
      align: 'center',
    }}
    mantineTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const RightAlignNumberColumn = () => (
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
        mantineTableBodyCellProps: {
          align: 'right',
        },
        mantineTableHeadCellProps: {
          align: 'right',
        },
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
    ]}
    data={data}
  />
);
