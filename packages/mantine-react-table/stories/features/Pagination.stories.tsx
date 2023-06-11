import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Pagination Examples',
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

export const PaginationEnabledDefault = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const PaginationDisabledOrOverriden = () => (
  <MantineReactTable columns={columns} data={data} enablePagination={false} />
);

export const PaginationPositionBottom = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    positionPagination="bottom"
  />
);

export const PaginationPositionTop = () => (
  <MantineReactTable columns={columns} data={data} positionPagination="top" />
);

export const PaginationPositionTopAndBottom = () => (
  <MantineReactTable columns={columns} data={data} positionPagination="both" />
);

export const PaginationPositionTopAndBottomNoInternalActions = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    positionPagination="both"
    enableToolbarInternalActions={false}
  />
);

export const CustomizePaginationComponents = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
    // mantinePaginationProps={{
    //   rowsPerPageOptions: [5, 10, 20],
    //   showFirstButton: false,
    //   showLastButton: false,
    //   SelectProps: { native: true },
    //   labelRowsPerPage: 'Number of rows visible',
    // }}
  />
);
