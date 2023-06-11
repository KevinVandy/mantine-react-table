import { type Meta } from '@storybook/react';
import {
  MantineReactTable,
  MRT_AggregationFns,
  type MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';
import { Box, Stack } from '@mantine/core';

const meta: Meta = {
  title: 'Features/Aggregation Examples',
};

export default meta;

const data = [...Array(2000)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 18, max: 65 }),
  gender: faker.person.sex(),
  state: faker.location.state(),
  salary: Number(faker.finance.amount(10000, 100000, 0)),
}));

const averageSalary =
  data.reduce((acc, curr) => acc + curr.salary, 0) / data.length;

const averageAge = data.reduce((acc, curr) => acc + curr.age, 0) / data.length;

const columns = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
    enableGrouping: false,
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    enableGrouping: false,
  },
  {
    header: 'Age',
    accessorKey: 'age',
    aggregationFn: 'max',
    AggregatedCell: ({ cell, table }) => (
      <>
        Max by{' '}
        {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
        <Box sx={{ color: 'green', fontWeight: 'bold' }}>
          {cell.getValue<number>()}
        </Box>
      </>
    ),
    Footer: () => (
      <Stack>
        Average Age:
        <Box color="orange">{Math.round(averageAge)}</Box>
      </Stack>
    ),
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
    GroupedCell: ({ cell }) => (
      <Box sx={{ color: 'primary.main' }}>{cell.getValue<string>()}</Box>
    ),
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Salary',
    accessorKey: 'salary',
    enableGrouping: false,
    aggregationFn: 'mean',
    AggregatedCell: ({ cell, table }) => (
      <>
        Average by{' '}
        {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
        <Box sx={{ color: 'green', fontWeight: 'bold' }}>
          {cell.getValue<number>()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      </>
    ),
    Cell: ({ cell }) => (
      <>
        {cell.getValue<number>()?.toLocaleString?.('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </>
    ),
    Footer: () => (
      <Stack>
        Average Salary:
        <Box color="orange">
          {averageSalary?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      </Stack>
    ),
  },
] as MRT_ColumnDef<(typeof data)[0]>[];

export const Aggregation = () => (
  <MantineReactTable columns={columns} data={data} enableGrouping />
);

export const AggregationExpandedDefault = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableGrouping
    initialState={{ expanded: true }}
  />
);

export const AggregationGroupedAndExpandedDefault = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableGrouping
    initialState={{
      expanded: true,
      grouping: ['state', 'gender'],
      isFullScreen: true,
      pagination: { pageIndex: 0, pageSize: 20 },
    }}
  />
);

export const MultiAggregationPerColumn = () => (
  <MantineReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
        enableGrouping: false,
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        enableGrouping: false,
      },
      {
        header: 'Age',
        accessorKey: 'age',
        //manually set multiple aggregation functions
        aggregationFn: (columnId, leafRows: any, childRows: any) => [
          MRT_AggregationFns.min(columnId, leafRows, childRows),
          MRT_AggregationFns.max(columnId, leafRows, childRows),
        ],
        AggregatedCell: ({ cell, table }) => (
          <>
            Min by{' '}
            {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
            <Box sx={{ color: 'green', fontWeight: 'bold' }}>
              {cell.getValue<[number, number]>()[0]}
            </Box>
            <br />
            Max by{' '}
            {
              table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header
            }:{' '}
            <Box sx={{ color: 'green', fontWeight: 'bold' }}>
              {cell.getValue<[number, number]>()[1]}
            </Box>
          </>
        ),
        Footer: () => (
          <Stack>
            Average Age:
            <Box color="orange">{Math.round(averageAge)}</Box>
          </Stack>
        ),
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        GroupedCell: ({ cell }) => (
          <Box sx={{ color: 'primary.main' }}>{cell.getValue<string>()}</Box>
        ),
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Salary',
        accessorKey: 'salary',
        enableGrouping: false,
        aggregationFn: ['count', 'mean'], //multiple aggregation functions
        AggregatedCell: ({ cell, table }) => (
          <>
            Count:{' '}
            <Box sx={{ color: 'green', fontWeight: 'bold' }}>
              {cell.getValue<[number, number]>()?.[0]}
            </Box>
            <br />
            Average by{' '}
            {
              table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header
            }:{' '}
            <Box sx={{ color: 'green', fontWeight: 'bold' }}>
              {cell
                .getValue<[number, number]>()?.[1]
                ?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
            </Box>
          </>
        ),
        Cell: ({ cell }) => (
          <>
            {cell.getValue<number>()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </>
        ),
        Footer: () => (
          <Stack>
            Average Salary:
            <Box color="orange">
              {averageSalary?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Box>
          </Stack>
        ),
      },
    ]}
    data={data}
    enableGrouping
    initialState={{
      expanded: true,
      grouping: ['state', 'gender'],
      isFullScreen: true,
      pagination: { pageIndex: 0, pageSize: 20 },
    }}
  />
);
