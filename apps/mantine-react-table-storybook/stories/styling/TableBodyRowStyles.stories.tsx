import React from 'react';
import { Meta, Story } from '@storybook/react';
import MantineReactTable, {
  MantineReactTableProps,
  MRT_ColumnDef,
} from 'mantine-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Style Table Body Rows',
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

export const DefaultTableBodyRowStyles: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const DisableRowHoverEffect: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableProps={{
      highlightOnHover: false,
    }}
  />
);

export const StyleMuiTableBodyRow: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyRowProps={{
      sx: {
        backgroundColor: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
      },
    }}
  />
);

export const StyleCustomStripedRows: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyProps={{
      sx: () => ({
        '& tr:nth-of-type(odd)': {
          backgroundColor: 'limegreen',
        },
      }),
    }}
    mantineTableBodyCellProps={{ sx: { border: 'none' } }}
  />
);

export const StyleCustomStripedRowsDetailPanel: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyProps={{
      sx: () => ({
        '& tr:nth-child(4n+3)': {
          backgroundColor: 'limegreen',
        },
      }),
    }}
    mantineTableBodyCellProps={{ sx: { border: 'none' } }}
    renderDetailPanel={() => <div>Detail Panel</div>}
  />
);

export const ConditionallyStyleMuiTableRow: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyRowProps={({ row }) => ({
      sx: {
        backgroundColor:
          row.getValue<number>('age') > 50 ? 'rgba(255, 54, 33, 0.18)' : '',
        fontStyle: 'italic',
      },
    })}
  />
);
