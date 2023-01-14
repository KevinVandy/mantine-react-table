import React from 'react';
import { Meta, Story } from '@storybook/react';
import MantineReactTable, {
  MantineReactTableProps,
  MRT_ColumnDef,
} from 'mantine-react-table';
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
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const PaginationEnabledDefault: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const PaginationDisabledOrOverriden: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable columns={columns} data={data} enablePagination={false} />
);

export const PaginationPositionBottom: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    positionPagination="bottom"
  />
);

export const PaginationPositionTop: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} positionPagination="top" />
);

export const PaginationPositionTopAndBottom: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable columns={columns} data={data} positionPagination="both" />
);

export const PaginationPositionTopAndBottomNoInternalActions: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    positionPagination="both"
    enableToolbarInternalActions={false}
  />
);

export const CustomizePaginationComponents: Story<
  MantineReactTableProps
> = () => (
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
