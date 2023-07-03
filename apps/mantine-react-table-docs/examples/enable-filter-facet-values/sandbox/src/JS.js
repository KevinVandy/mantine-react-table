import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
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
          cell.getValue().toLocaleString('en-US', {
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
