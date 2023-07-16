import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { MantineProvider, useMantineTheme } from '@mantine/core';

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
};

const columns: MRT_ColumnDef<Person>[] = [
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
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
];

const data = [
  {
    firstName: 'Dylan',
    lastName: 'Murray',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    firstName: 'Raquel',
    lastName: 'Kohler',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    firstName: 'Ervin',
    lastName: 'Reinger',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    firstName: 'Brittany',
    lastName: 'McCullough',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    firstName: 'Branson',
    lastName: 'Frami',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

const Example = () => {
  const globalTheme = useMantineTheme(); //(optional) if you already have a theme defined in your app root, you can import here

  return (
    //Override theme just for this table
    <MantineProvider
      theme={{ ...globalTheme, primaryColor: 'red', primaryShade: 5 }}
    >
      <MantineReactTable
        columns={columns}
        data={data}
        enableRowSelection
        enableColumnOrdering
        enablePinning
      />
    </MantineProvider>
  );
};

export default Example;
