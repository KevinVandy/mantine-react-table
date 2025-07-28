import { useMemo } from 'react';

import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from '../../src';

import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Fixed Bugs/Cell Alignment',
};

export default meta;

type Person = {
  address: string;
  city: string;
  name: {
    firstName: string;
    lastName: string;
  };
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    address: '261 Battle Ford',
    city: 'Columbus',
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    state: 'Ohio',
  },
  {
    address: '566 Brakus Inlet',
    city: 'Westerville',
    name: {
      firstName: 'Robert',
      lastName: 'Smith',
    },
    state: 'West Virginia',
  },
  {
    address: '7777 Kuhic Knoll',
    city: 'South Linda',
    name: {
      firstName: 'Kevin',
      lastName: 'Yan',
    },
    state: 'West Virginia',
  },
  {
    address: '722 Emie Stream',
    city: 'Huntington',
    name: {
      firstName: 'John',
      lastName: 'Upton',
    },
    state: 'Washington',
  },
  {
    address: '1 Kuhic Knoll',
    city: 'Ohiowa',
    name: {
      firstName: 'Nathan',
      lastName: 'Harris',
    },
    state: 'Nebraska',
  },
];

// Shared columns definition with centered alignment
const createColumns = (): MRT_ColumnDef<Person>[] => [
  {
    accessorKey: 'name.firstName', //access nested data with dot notation
    header: 'First Name',
    mantineTableBodyCellProps: {
      align: 'center',
    },
    mantineTableHeadCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'name.lastName',
    header: 'Last Name',
    mantineTableBodyCellProps: {
      align: 'center',
    },
    mantineTableHeadCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'address', //normal accessorKey
    header: 'Address',
    mantineTableBodyCellProps: {
      align: 'center',
    },
    mantineTableHeadCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'city',
    header: 'City',
    mantineTableBodyCellProps: {
      align: 'center',
    },
    mantineTableHeadCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'state',
    header: 'State',
    mantineTableBodyCellProps: {
      align: 'center',
    },
    mantineTableHeadCellProps: {
      align: 'center',
    },
  },
];

export const CellAlignment = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => createColumns(), []);

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableSorting: false,
    // enableHeaderActionsHoverReveal: true,
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
  });

  return <MantineReactTable table={table} />;
};

export const CellAlignmentWithSorting = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => createColumns(), []);

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableSorting: true, // Enable sorting
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
  });

  return <MantineReactTable table={table} />;
};

export const CellAlignmentWithColumnDragging = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => createColumns(), []);

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: true,
    enableColumnDragging: true, // Enable column dragging
    enableSorting: false,
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
  });

  return <MantineReactTable table={table} />;
};
