import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'autocomplete',
        //no need to specify autocomplete props data if using faceted values
        size: 100,
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive', // default (or between)
        mantineFilterRangeSliderProps: {
          //no need to specify min/max/step if using faceted values
          color: 'pink',
          step: 5_000,
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
        filterVariant: 'select',
        //no need to specify select props data if using faceted values
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterVariant: 'multi-select',
        //no need to specify select props data if using faceted values
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableFacetedValues: true,
    initialState: { showColumnFilters: true },
  });

  return <MantineReactTable table={table} />;
};

export default Example;
