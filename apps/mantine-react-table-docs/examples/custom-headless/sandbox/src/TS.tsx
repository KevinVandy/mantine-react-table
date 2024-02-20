import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import {
  flexRender,
  MRT_GlobalFilterTextInput,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  type MRT_ColumnDef,
  useMantineReactTable,
  MRT_TableBodyCellValue,
} from 'mantine-react-table';
import { Divider, Flex, Stack, Table, Title } from '@mantine/core';
import { type Person, data } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'name.firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'name.lastName',
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

const Example = () => {
  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    //MRT display columns can still work, optionally override cell renders with `displayColumnDefOptions`
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    //customize the MRT components
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '15'],
    },
    paginationDisplayMode: 'pages',
  });

  return (
    <Stack>
      <Divider />
      <Title order={4}>My Custom Headless Table</Title>
      <Flex justify="space-between" align="center">
        {/**
         * Use MRT components along side your own markup.
         * They just need the `table` instance passed as a prop to work!
         */}
        <MRT_GlobalFilterTextInput table={table} />
        <MRT_TablePagination table={table} />
      </Flex>
      {/* Using Vanilla Mantine Table component here */}
      <Table
        captionSide="top"
        fz="md"
        highlightOnHover
        horizontalSpacing="xl"
        striped
        verticalSpacing="xs"
        withTableBorder
        withColumnBorders
        m="0"
      >
        {/* Use your own markup or stock Mantine components, customize however you want using the power of TanStack Table */}
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.Header ??
                          header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>
                  <MRT_TableBodyCellValue cell={cell} table={table} />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
    </Stack>
  );
};

export default Example;
