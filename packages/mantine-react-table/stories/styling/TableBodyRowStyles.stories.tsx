import { type Meta } from '@storybook/react';
import { MantineReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

import classes from './TableBodyRowStyles.module.css';

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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(80),
  address: faker.location.streetAddress(),
}));

export const DefaultTableBodyRowStyles = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const DisableRowHoverEffect = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableProps={{
      highlightOnHover: false,
    }}
  />
);

export const StyleMantineTableBodyRow = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyRowProps={{
      style: {
        backgroundColor: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
      },
    }}
  />
);

export const StyleCustomStripedRows = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyProps={{
      className: classes.striped,
    }}
  />
);

export const StyleCustomStripedRowsDetailPanel = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyProps={{
      className: classes.stripeddetails,
    }}
    mantineTableBodyCellProps={{ style: { border: 'none' } }}
    renderDetailPanel={() => <div>Detail Panel</div>}
  />
);

export const ConditionallyStyleMantineTableRow = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    mantineTableBodyRowProps={({ row }) => ({
      style: {
        backgroundColor:
          row.getValue<number>('age') > 50 ? 'rgba(255, 54, 33, 0.18)' : '',
        fontStyle: 'italic',
      },
    })}
  />
);
