import { type MRT_ColumnDef, MantineReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';
import { IconCopy, IconDownload } from '@tabler/icons-react';
import { useContextMenu } from 'mantine-contextmenu';

const meta: Meta = {
  title: 'Features/Cell Action Examples',
};

export default meta;

interface Row {
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  state: string;
}

const columns: MRT_ColumnDef<Row>[] = [
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
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const data: Row[] = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const CellContextMenu = () => {
  const { showContextMenu } = useContextMenu();

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      mantineTableBodyCellProps={({ cell }) => ({
        onContextMenu: showContextMenu([
          {
            icon: <IconCopy size={16} />,
            key: 'copy',
            onClick: () => cell.getValue(),
            title: 'Copy to clipboard',
          },
          {
            icon: <IconDownload size={16} />,
            key: 'download',
            onClick: () => null,
            title: 'Download to your device',
          },
        ]),
        style: {
          cursor: 'context-menu',
        },
      })}
    />
  );
};
