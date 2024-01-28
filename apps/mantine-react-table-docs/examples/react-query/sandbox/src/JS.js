import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';

//custom react-query hook
const useGetUsers = ({
  columnFilterFns,
  columnFilters,
  globalFilter,
  sorting,
  pagination,
}) => {
  //build the URL (https://www.mantine-react-table.com/api/data?start=0&size=10&filters=[]&globalFilter=&sorting=[])
  const fetchURL = new URL(
    '/api/data',
    process.env.NODE_ENV === 'production'
      ? 'https://www.mantine-react-table.com'
      : 'http://localhost:3001',
  );
  fetchURL.searchParams.set(
    'start',
    `${pagination.pageIndex * pagination.pageSize}`,
  );
  fetchURL.searchParams.set('size', `${pagination.pageSize}`);
  fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
  fetchURL.searchParams.set(
    'filterModes',
    JSON.stringify(columnFilterFns ?? {}),
  );
  fetchURL.searchParams.set('globalFilter', globalFilter ?? '');
  fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

  return useQuery({
    queryKey: ['users', fetchURL.href], //refetch whenever the URL changes (columnFilters, globalFilter, sorting, pagination)
    queryFn: () => fetch(fetchURL.href).then((res) => res.json()),
    placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
  });
};

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
      },
    ],
    [],
  );

  //Manage MRT state that we want to pass to our API
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnFilterFns, setColumnFilterFns] = //filter modes
    useState(
      Object.fromEntries(
        columns.map(({ accessorKey }) => [accessorKey, 'contains']),
      ),
    ); //default to "contains" for all columns
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //call our custom react-query hook
  const { data, isError, isFetching, isLoading, refetch } = useGetUsers({
    columnFilterFns,
    columnFilters,
    globalFilter,
    pagination,
    sorting,
  });

  //this will depend on your API response shape
  const fetchedUsers = data?.data ?? [];
  const totalRowCount = data?.meta?.totalRowCount ?? 0;

  const table = useMantineReactTable({
    columns,
    data: fetchedUsers,
    enableColumnFilterModes: true,
    columnFilterModeOptions: ['contains', 'startsWith', 'endsWith'],
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    mantineToolbarAlertBannerProps: isError
      ? {
          color: 'red',
          children: 'Error loading data',
        }
      : undefined,
    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderTopToolbarCustomActions: () => (
      <Tooltip label="Refresh Data">
        <ActionIcon onClick={() => refetch()}>
          <IconRefresh />
        </ActionIcon>
      </Tooltip>
    ),
    rowCount: totalRowCount,
    state: {
      columnFilterFns,
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
  });

  return <MantineReactTable table={table} />;
};

const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;
