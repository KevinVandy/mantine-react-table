import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MantineReactTable, {
  MantineReactTableProps,
  MRT_ColumnDef,
} from 'mantine-react-table';
import { Button, Flex } from '@mantine/core';
import { faker } from '@faker-js/faker';
import { ColumnFiltersState } from '@tanstack/react-table';

const meta: Meta = {
  title: 'Features/Filtering Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'Is Active',
    accessorKey: 'isActive',
    Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
    size: 110,
  },
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
    filterVariant: 'range',
  },
  {
    Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), //transform data to readable format for cell render
    accessorFn: (row) => new Date(row.birthDate), //transform data before processing so sorting works
    accessorKey: 'birthDate',
    header: 'Birth Date',
    mantineFilterTextInputProps: {
      type: 'date',
    },
    sortingFn: 'datetime',
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const data = [...Array(120)].map(() => ({
  isActive: faker.datatype.boolean(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(100),
  birthDate: faker.date.birthdate({ min: 1990, max: 2020 }),
  gender: faker.name.sex(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
}));

export const FilteringEnabledDefault: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const ColumnFilteringDisabled: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnFilters={false}
  />
);

export const FilteringDisabled: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} enableFilters={false} />
);

export const FilterFnAndFilterVariants: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={[
      {
        header: 'Is Active',
        accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'),
        id: 'isActive',
        filterVariant: 'checkbox',
        Cell: ({ cell }) => (cell.getValue() === 'true' ? 'Yes' : 'No'),
        size: 200,
      },
      {
        header: 'First Name',
        accessorKey: 'firstName',
        filterFn: 'fuzzy', // default
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        filterFn: 'contains',
      },
      {
        header: 'Age',
        accessorKey: 'age',
        filterVariant: 'range',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        mantineFilterSelectProps: { data: ['Male', 'Female', 'Other'] as any },
        filterVariant: 'select',
      },
      {
        header: 'Address',
        accessorKey: 'address',
        filterFn: 'includesStringSensitive',
      },
      {
        header: 'State',
        accessorKey: 'state',
        // mantineFilterSelectProps: {
        //   data: [
        //     { value: 'AL', label: 'Alabama' },
        //     { value: 'AZ', label: 'Arizona' },
        //     { value: 'CA', label: 'California' },
        //     { value: 'FL', label: 'Florida' },
        //     { value: 'GA', label: 'Georgia' },
        //     { value: 'NY', label: 'New York' },
        //     { value: 'TX', label: 'Texas' },
        //   ],
        // },
        // filterVariant: 'multi-select',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const FilteringChangeModeEnabled: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={[
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
        filterFn: 'between',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        mantineFilterSelectProps: { data: ['Male', 'Female', 'Other'] as any },
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
    ]}
    data={data}
    enableColumnFilterModes
    initialState={{ showColumnFilters: true }}
  />
);

export const DisableSomeFilterTypesForCertainColumns: Story<
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
        columnFilterModeOptions: ['startsWith', 'endsWith'],
        filterFn: 'startsWith',
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        columnFilterModeOptions: ['equals', 'notEquals'],
        filterFn: 'equals',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
    ]}
    data={data}
    enableColumnFilterModes
    initialState={{ showColumnFilters: true }}
  />
);

export const FilteringDisabledForCertainColumns: Story<
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
      },
      {
        header: 'Age',
        accessorKey: 'age',
        enableColumnFilter: false,
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
      },
      {
        header: 'Address',
        accessorKey: 'address',
        enableColumnFilter: false,
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomFilterFunctionPerColumn: Story<
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
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        filterFn: (row, _columnIds, filterValue) =>
          row
            .getValue<string>('gender')
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'State',
        accessorKey: 'state',
        filterFn: (row, _columnIds, filterValue) =>
          row
            .getValue<string>('state')
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomFilterFns: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={[
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
        header: 'Gender',
        accessorKey: 'gender',
        filterFn: 'customFn',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'State',
        accessorKey: 'state',
        filterFn: 'customFn',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
    filterFns={{
      customFn: (row, _columnIds, filterValue) => {
        console.info('customFn', row, _columnIds, filterValue);
        return row
          .getValue<string>('state')
          .toLowerCase()
          .startsWith(filterValue.toLowerCase());
      },
    }}
  />
);

export const CustomFilterComponent: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={[
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
        header: 'Gender',
        accessorKey: 'gender',
        // Filter: ({ header }) => (
        //   <TextField
        //     onChange={(e) =>
        //       header.column.setFilterValue(e.target.value || undefined)
        //     }
        //     select
        //     value={header.column.getFilterValue() ?? ''}
        //     margin="none"
        //     placeholder="Filter"
        //     variant="standard"
        //     fullWidth
        //   >
        //     {/*@ts-ignore*/}
        //     <MenuItem value={null}>All</MenuItem>
        //     <MenuItem value="Male">Male</MenuItem>
        //     <MenuItem value="Female">Female</MenuItem>
        //     <MenuItem value="Other">Other</MenuItem>
        //   </TextField>
        // ),
        filterFn: (row, _columnIds, filterValue) =>
          row.getValue<string>('gender').toLowerCase() ===
          filterValue.toLowerCase(),
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const ManualFiltering: Story<MantineReactTableProps> = () => {
  const [rows, setRows] = useState(() => [...data]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  //this kind of logic would actually live on a server, not client-side
  useEffect(() => {
    if (!!columnFilters?.length) {
      let filteredRows = [...data];
      columnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        filteredRows = filteredRows.filter((row) => {
          return row[columnId]
            ?.toString()
            ?.toLowerCase()
            ?.includes?.((filterValue as string).toLowerCase());
        });
      });
      setRows(filteredRows);
    } else {
      setRows([...data]);
    }
  }, [columnFilters]);

  return (
    <MantineReactTable
      columns={columns}
      data={rows}
      manualFiltering
      columnFilterModeOptions={null}
      onColumnFiltersChange={setColumnFilters}
      state={{ columnFilters }}
    />
  );
};

export const ExternalSetFilterValue: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    initialState={{ showColumnFilters: true }}
    renderTopToolbarCustomActions={({ table }) => (
      <Flex gap="md">
        <Button
          onClick={() =>
            table.setColumnFilters((prev) => [
              ...prev,
              { id: 'firstName', value: 'Joe' },
            ])
          }
        >
          Find Joes
        </Button>
        <Button
          onClick={() =>
            table.setColumnFilters((prev) => [
              ...prev,
              { id: 'age', value: [18, 25] },
            ])
          }
        >
          Find 18-25 Age Range
        </Button>
        <Button onClick={() => table.resetColumnFilters()}>
          Reset Filters
        </Button>
      </Flex>
    )}
  />
);
