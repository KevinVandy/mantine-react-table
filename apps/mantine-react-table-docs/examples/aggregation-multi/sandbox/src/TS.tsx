import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine component features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import { Box } from '@mantine/core';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { data, type Person } from './makeData';

const localeStringOptions = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Salary',
        accessorKey: 'salary',
        aggregationFn: ['count', 'mean', 'median', 'min', 'max'],
        //required to render an aggregated cell, show the average salary in the group
        AggregatedCell: ({ cell }) => (
          <>
            Count:{' '}
            <Box style={{ color: 'green', fontWeight: 'bold' }}>
              {cell.getValue<Array<number>>()?.[0]}
            </Box>
            Average:{' '}
            <Box style={{ color: 'green', fontWeight: 'bold' }}>
              {cell
                .getValue<Array<number>>()?.[1]
                ?.toLocaleString?.('en-US', localeStringOptions)}
            </Box>
            Median:{' '}
            <Box style={{ color: 'green', fontWeight: 'bold' }}>
              {cell
                .getValue<Array<number>>()?.[2]
                ?.toLocaleString?.('en-US', localeStringOptions)}
            </Box>
            Min:{' '}
            <Box style={{ color: 'green', fontWeight: 'bold' }}>
              {cell
                .getValue<Array<number>>()?.[3]
                ?.toLocaleString?.('en-US', localeStringOptions)}
            </Box>
            Max:{' '}
            <Box style={{ color: 'green', fontWeight: 'bold' }}>
              {cell
                .getValue<Array<number>>()?.[4]
                ?.toLocaleString?.('en-US', localeStringOptions)}
            </Box>
          </>
        ),
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => (
          <>
            {cell
              .getValue<number>()
              ?.toLocaleString?.('en-US', localeStringOptions)}
          </>
        ),
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableGrouping
      enableStickyHeader
      initialState={{
        density: 'xs',
        expanded: true, //expand all groups by default
        grouping: ['state', 'gender'], //an array of columns to group by by default (can be multiple)
        pagination: { pageIndex: 0, pageSize: 20 },
        sorting: [{ id: 'state', desc: false }], //sort by state by default
      }}
      mantineToolbarAlertBannerBadgeProps={{ color: 'primary' }}
      mantineTableContainerProps={{ style: { maxHeight: 700 } }}
    />
  );
};

export default Example;
