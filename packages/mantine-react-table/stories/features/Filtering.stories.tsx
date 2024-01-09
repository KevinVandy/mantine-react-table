import { useEffect, useState } from 'react';
import { Button, Flex } from '@mantine/core';
import {
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  MantineReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Filtering Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
    accessorKey: 'isActive',
    header: 'Is Active',
    size: 110,
  },
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
    filterVariant: 'range',
    header: 'Age',
  },
  {
    Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), //transform data to readable format for cell render
    accessorFn: (row) => new Date(row.birthDate), //transform data before processing so sorting works
    accessorKey: 'birthDate',
    filterVariant: 'date',
    header: 'Birth Date',
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
];

const data = [...Array(120)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(100),
  birthDate: faker.date.birthdate({ max: 2020, min: 1990 }),
  firstName: faker.person.firstName(),
  gender: faker.person.sex(),
  hireDate: faker.date.past(),
  isActive: faker.datatype.boolean(),
  lastName: faker.person.lastName(),
  salary: faker.number.int(1000) * 1000,
  state: faker.location.state(),
}));

export const FilteringEnabledDefault = () => (
  <MantineReactTable columns={columns} data={data} />
);

export const PopoverDisplayMode = () => (
  <MantineReactTable
    columnFilterDisplayMode="popover"
    columns={columns}
    data={data}
  />
);

export const ColumnFilteringDisabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableColumnFilters={false}
  />
);

export const FilteringDisabled = () => (
  <MantineReactTable columns={columns} data={data} enableFilters={false} />
);

export const FilterHighlightingDisabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableFilterMatchHighlighting={false}
  />
);

export const FilterFnAndFilterVariants = () => (
  <MantineReactTable
    columns={[
      {
        Cell: ({ cell }) => (cell.getValue() === 'true' ? 'Yes' : 'No'),
        accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'),
        filterVariant: 'checkbox',
        header: 'Is Active',
        id: 'isActive',
        size: 200,
      },
      {
        accessorKey: 'firstName',
        filterFn: 'fuzzy', // default
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        filterFn: 'contains',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        filterVariant: 'range',
        header: 'Age',
      },
      {
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency',
          }),
        accessorKey: 'salary',
        filterVariant: 'range-slider',
        header: 'Salary',
        mantineFilterRangeSliderProps: {
          max: 100000,
          min: 1000,
        },
      },
      {
        accessorKey: 'gender',
        filterVariant: 'select',
        header: 'Gender',
        mantineFilterSelectProps: { data: ['Male', 'Female', 'Other'] as any },
      },
      {
        accessorKey: 'address',
        filterFn: 'includesStringSensitive',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        filterVariant: 'multi-select',
        header: 'State',
        mantineFilterMultiSelectProps: {
          data: [
            'Alabama',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'Florida',
            'Georgia',
            'New York',
            'Texas',
            'Washington',
          ] as any,
        },
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        accessorFn: (row) => {
          const bDay = new Date(row.birthDate);
          bDay.setHours(0, 0, 0, 0); // remove time from date
          return bDay;
        },
        filterVariant: 'date',
        header: 'Birth Date',
        id: 'birthDate',
        size: 200,
        sortingFn: 'datetime',
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        accessorFn: (row) => {
          const hDay = new Date(row.hireDate);
          hDay.setHours(0, 0, 0, 0); // remove time from date
          return hDay;
        },
        filterVariant: 'date-range',
        header: 'Hire Date',
        id: 'hireDate',
        size: 200,
        sortingFn: 'datetime',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const FilterFnAndFilterVariantsPopover = () => (
  <MantineReactTable
    columnFilterDisplayMode="popover"
    columns={[
      {
        Cell: ({ cell }) => (cell.getValue() === 'true' ? 'Yes' : 'No'),
        accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'),
        filterVariant: 'checkbox',
        header: 'Is Active',
        id: 'isActive',
        size: 200,
      },
      {
        accessorKey: 'firstName',
        filterFn: 'fuzzy', // default
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        filterFn: 'contains',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        filterVariant: 'range',
        header: 'Age',
      },
      {
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency',
          }),
        accessorKey: 'salary',
        filterVariant: 'range-slider',
        header: 'Salary',
        mantineFilterRangeSliderProps: {
          max: 100000,
          min: 1000,
        },
      },
      {
        accessorKey: 'gender',
        filterVariant: 'select',
        header: 'Gender',
        mantineFilterSelectProps: { data: ['Male', 'Female', 'Other'] as any },
      },
      {
        accessorKey: 'address',
        filterFn: 'includesStringSensitive',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        filterVariant: 'multi-select',
        header: 'State',
        mantineFilterMultiSelectProps: {
          data: [
            'Alabama',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'Florida',
            'Georgia',
            'New York',
            'Texas',
            'Washington',
          ] as any,
        },
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        accessorFn: (row) => {
          const bDay = new Date(row.birthDate);
          bDay.setHours(0, 0, 0, 0); // remove time from date
          return bDay;
        },
        filterVariant: 'date',
        header: 'Birth Date',
        id: 'birthDate',
        size: 200,
        sortingFn: 'datetime',
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        accessorFn: (row) => {
          const hDay = new Date(row.hireDate);
          hDay.setHours(0, 0, 0, 0); // remove time from date
          return hDay;
        },
        filterVariant: 'date-range',
        header: 'Hire Date',
        id: 'hireDate',
        size: 200,
        sortingFn: 'datetime',
      },
    ]}
    data={data}
  />
);

export const FilterFnAndFilterVariantsFaceted = () => (
  <MantineReactTable
    columns={[
      {
        accessorKey: 'firstName',
        filterVariant: 'autocomplete',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        filterVariant: 'select',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        filterVariant: 'range-slider',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        filterVariant: 'select',
        header: 'Gender',
      },
      {
        accessorKey: 'state',
        filterVariant: 'multi-select',
        header: 'State',
      },
    ]}
    data={data}
    enableFacetedValues
    initialState={{ showColumnFilters: true }}
  />
);

export const EnableFilterModes = () => (
  <MantineReactTable
    columns={[
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
        filterFn: 'between',
        header: 'Age',
      },
      {
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency',
          }),
        accessorKey: 'salary',
        filterVariant: 'range-slider',
        header: 'Salary',
        mantineFilterRangeSliderProps: {
          max: 100000,
          min: 1000,
        },
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        mantineFilterSelectProps: { data: ['Male', 'Female', 'Other'] as any },
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    enableColumnFilterModes
    initialState={{ showColumnFilters: true }}
  />
);

export const EnableFilterModesPopover = () => (
  <MantineReactTable
    columnFilterDisplayMode="popover"
    columns={[
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
        filterFn: 'between',
        header: 'Age',
      },
      {
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency',
          }),
        accessorKey: 'salary',
        filterVariant: 'range-slider',
        header: 'Salary',
        mantineFilterRangeSliderProps: {
          max: 100000,
          min: 1000,
        },
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        mantineFilterSelectProps: { data: ['Male', 'Female', 'Other'] as any },
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    enableColumnFilterModes
  />
);

export const DisableSomeFilterTypesForCertainColumns = () => (
  <MantineReactTable
    columns={[
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        columnFilterModeOptions: ['startsWith', 'endsWith'],
        filterFn: 'startsWith',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        columnFilterModeOptions: ['equals', 'notEquals'],
        filterFn: 'equals',
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    enableColumnFilterModes
    initialState={{ showColumnFilters: true }}
  />
);

export const FilteringDisabledForCertainColumns = () => (
  <MantineReactTable
    columns={[
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
        enableColumnFilter: false,
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        enableColumnFilter: false,
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomFilterFunctionPerColumn = () => (
  <MantineReactTable
    columns={[
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
        accessorKey: 'gender',
        filterFn: (row, _columnIds, filterValue) =>
          row
            .getValue<string>('gender')
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        filterFn: (row, _columnIds, filterValue) =>
          row
            .getValue<string>('state')
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
        header: 'State',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomFilterFns = () => (
  <MantineReactTable
    columns={[
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
        accessorKey: 'gender',
        filterFn: 'customFn',
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        filterFn: 'customFn',
        header: 'State',
      },
    ]}
    data={data}
    filterFns={{
      customFn: (row, _columnIds, filterValue) => {
        console.info('customFn', row, _columnIds, filterValue);
        return row
          .getValue<string>('state')
          .toLowerCase()
          .startsWith(filterValue.toLowerCase());
      },
    }}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomFilterComponent = () => (
  <MantineReactTable
    columns={[
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
        accessorKey: 'gender',
        // ),
        filterFn: (row, _columnIds, filterValue) =>
          row.getValue<string>('gender').toLowerCase() ===
          filterValue.toLowerCase(),
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
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const ManualFiltering = () => {
  const [rows, setRows] = useState(() => [...data]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );

  //this kind of logic would actually live on a server, not client-side
  useEffect(() => {
    if (columnFilters?.length) {
      let filteredRows = [...data];
      columnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        filteredRows = filteredRows.filter((row) => {
          return row[columnId as keyof typeof row]
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
      columnFilterModeOptions={null}
      columns={columns}
      data={rows}
      manualFiltering
      onColumnFiltersChange={setColumnFilters}
      state={{ columnFilters }}
    />
  );
};

export const ExternalSetFilterValue = () => (
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
