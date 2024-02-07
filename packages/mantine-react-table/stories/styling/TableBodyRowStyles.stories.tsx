import classes from './TableBodyRowStyles.stories.module.css';
import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Style Table Body Rows',
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
    mantineTableBodyCellProps={{ style: { border: 'none' } }}
    mantineTableBodyProps={{
      className: classes.stripeddetails,
    }}
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
