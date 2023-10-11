import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Table Alignment Examples',
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
  age: faker.number.int({ min: 20, max: 60 }),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const DefaultLeft = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const CenterCells = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableHeadCellProps={{
      align: 'center',
    }}
    mantineTableBodyCellProps={{
      align: 'center',
    }}
  />
);

export const CenterGridCells = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    layoutMode='grid'
    mantineTableHeadCellProps={{
      align: 'center',
    }}
    mantineTableBodyCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsWithGrabHandle = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnDragging
    mantineTableHeadCellProps={{
      align: 'center',
    }}
    mantineTableBodyCellProps={{
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
    mantineTableHeadCellProps={{
      align: 'center',
    }}
    mantineTableBodyCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsNoColumnActions = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
    mantineTableHeadCellProps={{
      align: 'center',
    }}
    mantineTableBodyCellProps={{
      align: 'center',
    }}
  />
);

export const RightCells = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableHeadCellProps={{
      align: 'right',
    }}
    mantineTableBodyCellProps={{
      align: 'right',
    }}
  />
);

export const RightGridCells = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    layoutMode='grid'
    mantineTableHeadCellProps={{
      align: 'right',
    }}
    mantineTableBodyCellProps={{
      align: 'right',
    }}
  />
);

export const RightAlignNumberColumn = () => (
  <MantineReactTable
    columns={[
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
        mantineTableBodyCellProps: {
          align: 'right',
        },
        mantineTableHeadCellProps: {
          align: 'right',
        },
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
    ]}
    data={data}
  />
);
