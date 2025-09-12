import { useMemo } from 'react';
import { type Meta } from '@storybook/react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from '../../src';

const meta: Meta = {
  title: 'Fixed Bugs/Range Slider Popover Bug',
};

export default meta;

type Person = {
  name: string;
  salary: number;
  city: string;
  state: string;
};

const data: Person[] = [
  {
    name: 'John Doe',
    salary: 100000,
    city: 'New York',
    state: 'New York',
  },
  {
    name: 'Jane Smith',
    salary: 80000,
    city: 'Los Angeles',
    state: 'California',
  },
  {
    name: 'Bob Johnson',
    salary: 120000,
    city: 'Chicago',
    state: 'Illinois',
  },
  {
    name: 'Alice Brown',
    salary: 95000,
    city: 'Houston',
    state: 'Texas',
  },
];

/**
 * Bug: TypeError: input.select is not a function
 * 
 * Steps to reproduce:
 * 1. Set columnFilterDisplayMode to 'popover'
 * 2. Add a column with filterVariant: 'range-slider'
 * 3. Click the filter icon in the Salary column header
 * 4. Before fix: TypeError would be thrown
 * 5. After fix: Popover opens without error
 * 
 * Root cause: MRT_TableHeadCellFilterLabel.tsx assumed all inputs have select() method
 * Fix: Added type check before calling input.select()
 */
export const RangeSliderPopoverBugFixed = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text', // This works fine
      },
      {
        accessorKey: 'salary',
        header: 'Salary (Click filter icon to test)',
        filterVariant: 'range-slider', // This caused the bug
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
        mantineFilterRangeSliderProps: {
          color: 'blue',
          step: 10000,
          label: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
        },
      },
      {
        accessorKey: 'city',
        header: 'City',
        filterVariant: 'select', // This works fine
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterVariant: 'multi-select', // This works fine
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    columnFilterDisplayMode: 'popover', // Required to trigger the bug
    initialState: { showColumnFilters: true },
  });

  return (
    <div>
      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f8ff', border: '1px solid #0066cc', borderRadius: '4px' }}>
        <strong>Bug Test:</strong> Click the filter icon in the "Salary" column header. 
        <br />
        <strong>Before fix:</strong> Would throw "TypeError: input.select is not a function"
        <br />
        <strong>After fix:</strong> Popover opens normally without error
      </div>
      <MantineReactTable table={table} />
    </div>
  );
};