import { useEffect, useState } from 'react';
import { type Meta } from '@storybook/react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Fixed Bugs/useEffects',
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
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const FilterModesRefetch = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );

  useEffect(() => {
    console.log('refetch', columnFilters);
  }, [columnFilters]);

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      initialState={{ showColumnFilters: true }}
      state={{ columnFilters }}
      onColumnFiltersChange={setColumnFilters}
    />
  );
};
