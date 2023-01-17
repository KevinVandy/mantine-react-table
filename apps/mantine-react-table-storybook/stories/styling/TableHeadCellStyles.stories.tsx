import React from 'react';
import { Meta, Story } from '@storybook/react';
import MantineReactTable, {
  MantineReactTableProps,
  MRT_ColumnDef,
} from 'mantine-react-table';
import { faker } from '@faker-js/faker';
import { Box } from '@mantine/core';
import { getPrimaryShade } from 'mantine-react-table/src/column.utils';

const meta: Meta = {
  title: 'Styling/Style Table Head Cells',
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

export const DefaultTableHeadCellStyles: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const StyleAllMuiTableHeadCell: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableHeadCellProps={{
      sx: {
        backgroundColor: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
        color: '#fff',
      },
    }}
  />
);

export const StyleTableHeadCellsIndividually: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        mantineTableHeadCellProps: {
          sx: (theme) => ({
            color: theme.colors[theme.primaryColor][getPrimaryShade(theme)],
          }),
        },
      },
      {
        header: 'Age',
        accessorKey: 'age',
        mantineTableHeadCellProps: {
          sx: {
            color: 'red',
          },
        },
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
    ]}
    data={data}
  />
);

export const CustomHeadCellRenders: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
        Header: <em>First Name</em>,
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        Header: () => <em>Last Name</em>,
      },
      {
        header: 'Current Age',
        accessorKey: 'age',
        Header: ({ column }) => (
          <Box color="primary.main">{column.columnDef.header}</Box>
        ),
      },
      {
        header: 'Address of Residence (Permanent)',
        accessorKey: 'address',
      },
    ]}
    data={data}
    enableColumnResizing
  />
);
