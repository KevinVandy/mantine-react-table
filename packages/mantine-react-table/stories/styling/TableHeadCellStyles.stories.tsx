import { Box } from '@mantine/core';
import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { getPrimaryColor } from '../../src/utils/style.utils';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Style Table Head Cells',
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
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];
const data = [...Array(21)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const DefaultTableHeadCellStyles = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const StyleAllMantineTableHeadCell = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableHeadCellProps={{
      style: {
        backgroundColor: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
        color: '#fff',
      },
    }}
  />
);

export const StyleTableHeadCellsIndividually = () => (
  <MantineReactTable
    columns={[
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        mantineTableHeadCellProps: {
          style: (theme) => ({
            color: getPrimaryColor(theme),
          }),
        },
      },
      {
        accessorKey: 'age',
        header: 'Age',
        mantineTableHeadCellProps: {
          style: {
            color: 'red',
          },
        },
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
    ]}
    data={data}
  />
);

export const CustomHeadCellRenders = () => (
  <MantineReactTable
    columns={[
      {
        Header: <em>First Name</em>,
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        Header: () => <em>Last Name</em>,
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        Header: ({ column }) => (
          <Box color="primary.main">{column.columnDef.header}</Box>
        ),
        accessorKey: 'age',
        header: 'Current Age',
      },
      {
        accessorKey: 'address',
        header: 'Address of Residence (Permanent)',
      },
    ]}
    data={data}
    enableColumnResizing
  />
);
